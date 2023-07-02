import {
    repeat as _repeat,
    random as _random,
    padStart as _padStart,
} from 'lodash';
import {formatISO9075, addSeconds, addMinutes} from 'date-fns';
import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {ConfigService} from '@nestjs/config';
import SearchQuery from '@steroidsjs/nest/src/usecases/base/SearchQuery';
import {DataMapper} from '@steroidsjs/nest/src/usecases/helpers/DataMapper';
import {ValidationException} from '@steroidsjs/nest/src/usecases/exceptions/ValidationException';
import {validateOrReject} from '@steroidsjs/nest/src/usecases/helpers/ValidationHelper';
import {IAuthConfirmRepository} from '../interfaces/IAuthConfirmRepository';
import {AuthConfirmModel} from '../models/AuthConfirmModel';
import {INotifierCallOptions, INotifierSmsOptions, INotifierVoiceMessageOptions}
    from '../../../notifier/domain/interfaces/INotifierSendOptions';
import {NotifierService} from '../../../notifier/domain/services/NotifierService';
import {UserService} from '../../../user/domain/services/UserService';
import {AuthConfirmSearchInputDto} from '../dtos/AuthConfirmSearchInputDto';
import {AuthConfirmSaveInputDto} from '../dtos/AuthConfirmSaveInputDto';
import NotifierProviderType from '../../../notifier/domain/enums/NotifierProviderType';
import NotifierSendException from '../../../notifier/domain/exceptions/NotifierSendException';
import {AuthConfirmSendSmsDto} from '../dtos/AuthConfirmSendSmsDto';
import {AuthConfirmLoginDto} from '../dtos/AuthConfirmLoginDto';
import {UserRegistrationDto} from '../../../user/domain/dtos/UserRegistrationDto';
import {AuthService} from './AuthService';
import {SmscVoiceType} from '../../../notifier/domain/types/SmscVoiceType';

export interface IAuthConfirmServiceConfig {
    expireMins: number,
    repeatLimitSec: number,
    attemptsCount: number,
    smsCodeLength: number,
    callCodeLength: number,
    isEnableDebugStaticCode: boolean,
    providerName: string,
    voice: SmscVoiceType,
    providerType: 'call' | 'sms' | 'voice',
    messageTemplate: string,
}

export const generateCode = (length = 6) => {
    length = Math.min(32, Math.max(1, length));
    return _padStart(_random(0, (10 ** length) - 1), length, '0');
};

export class AuthConfirmService extends CrudService<AuthConfirmModel,
    AuthConfirmSearchInputDto, AuthConfirmSaveInputDto> {
    protected modelClass = AuthConfirmModel;

    constructor(
        public repository: IAuthConfirmRepository,
        private notifierService: NotifierService,
        private userService: UserService,
        private configService: ConfigService,
        private authService: AuthService,
    ) {
        super();
    }

    private async sendCall(config: IAuthConfirmServiceConfig, phone: string) {
        let code;
        if (config.isEnableDebugStaticCode) {
            code = _repeat('1', config.callCodeLength);
        } else {
            // Делаем дозвон пользователю
            const response = await this.notifierService.send({
                call: {
                    phone,
                    name: config.providerName,
                } as INotifierCallOptions,
            });

            code = response[NotifierProviderType.CALL];

            // Берем последние цифры из полученного кода
            code = code.substring(code.length - config.callCodeLength);
        }

        return code;
    }

    private async sendSms(config: IAuthConfirmServiceConfig, phone: string) {
        let code;
        if (config.isEnableDebugStaticCode) {
            code = _repeat('1', config.smsCodeLength);
        } else {
            // Отправляем смс код
            code = generateCode(config.smsCodeLength);

            try {
                await this.notifierService.send({
                    sms: {
                        phone,
                        message: config.messageTemplate
                            .replace('{code}', code)
                            .replace('{appTitle}', this.configService.get('title')),
                        name: config.providerName,
                    } as INotifierSmsOptions,
                });
            } catch (e) {
                if (e instanceof NotifierSendException) {
                    throw new ValidationException({
                        phone: 'Не удалось отправить код',
                    });
                } else {
                    throw e;
                }
            }
        }
        return code;
    }

    private async sendVoiceMessage(config: IAuthConfirmServiceConfig, phone: string) {
        let code;
        if (config.isEnableDebugStaticCode) {
            code = _repeat('1', config.smsCodeLength);
        } else {
            code = generateCode(config.smsCodeLength);
            const pronunciationCode = code.split('').join(' '); // Чтобы проговорил цифры кода, а не число из цифр

            try {
                await this.notifierService.send({
                    voice: {
                        phone,
                        message: config.messageTemplate
                            .replace('{code}', `${pronunciationCode}`)
                            .replace('{appTitle}', this.configService.get('title'))
                            .concat(`, повторяю, ${pronunciationCode}`),
                        voice: 'm4',
                    } as INotifierVoiceMessageOptions,
                });
            } catch (e) {
                if (e instanceof NotifierSendException) {
                    throw new ValidationException({
                        phone: 'Не удалось отправить код',
                    });
                } else {
                    throw e;
                }
            }
        }
        return code;
    }

    async sendCode(
        dto: AuthConfirmSendSmsDto,
        providerType: string | null,
        schemaClass = null,
    ): Promise<AuthConfirmModel> {
        await validateOrReject(dto);

        // Инициализируем конфиг
        const config: IAuthConfirmServiceConfig = {
            expireMins: 60,
            repeatLimitSec: 60,
            attemptsCount: 5,
            smsCodeLength: 4,
            callCodeLength: 4,
            isEnableDebugStaticCode: false,
            providerName: 'smsc',
            providerType: 'voice',
            messageTemplate: 'Ваш код авторизации в {appTitle} - {code}',
            ...this.configService.get('auth.confirm'),
        };
        if (!config.providerName) {
            throw new Error('Wrong configuration, please set "auth.confirm.providerName" param.');
        }

        if (!providerType) {
            providerType = config.providerType;
        }

        // Получаем пользователя по номеру телефона
        const user = await this.userService.findByLogin(dto.phone);

        // Не отправляем повторно смс, если она была отправлена недавно. Используем ту же модель
        // TODO Не уверен насколько это правильная логика.. Нужно подумать.
        if (config.repeatLimitSec > 0) {
            const model = await this.findOne(
                (new SearchQuery())
                    .with('user')
                    .where([
                        '>=',
                        'lastSentTime',
                        formatISO9075(addSeconds(new Date(), -1 * config.repeatLimitSec)),
                    ])
                    .andWhere({
                        phone: dto.phone,
                        isConfirmed: false,
                    }),
            );
            if (model) {
                return schemaClass ? DataMapper.create(schemaClass, model) : model;
            }
        }

        // Генерируем код и отправляем смс или звоним
        let code;
        let providerName;
        switch (providerType) {
            case NotifierProviderType.CALL:
                try {
                    code = await this.sendCall(config, dto.phone);
                    providerName = NotifierProviderType.CALL;
                } catch (e) {
                    if (e instanceof NotifierSendException) {
                        code = await this.sendSms(config, dto.phone);
                        providerName = NotifierProviderType.SMS;
                    }
                }

                break;

            case NotifierProviderType.SMS:
                code = await this.sendSms(config, dto.phone);
                providerName = NotifierProviderType.SMS;
                break;

            case NotifierProviderType.VOICE:
                code = await this.sendVoiceMessage(config, dto.phone);
                providerName = NotifierProviderType.VOICE;
                break;

            default:
                throw new Error('Wrong provider type: ' + providerType);
        }

        if (!code) {
            throw new Error('Code is not generated, provider type: ' + providerType);
        }

        // Сохраняем в БД
        const model = await this.repository.create(
            DataMapper.create(AuthConfirmModel, {
                phone: dto.phone,
                code,
                providerName,
                expireTime: formatISO9075(addMinutes(new Date(), config.expireMins)),
                lastSentTime: formatISO9075(new Date()),
                attemptsCount: config.attemptsCount,
                userId: user?.id || null,
            } as AuthConfirmModel),
        );

        return schemaClass ? DataMapper.create(schemaClass, model) : model;
    }

    async confirmCode(dto: AuthConfirmLoginDto, schemaClass = null) {
        // Валидация кода происходит в PhoneCodeAuthGuard

        const authConfirmModel = await this.findOne(
            (new SearchQuery())
                .with('user')
                .where({
                    uid: dto.uid,
                }),
        );

        // Делаем отмету, что код подтвержден
        await this.update(authConfirmModel.id, {isConfirmed: true});

        // Создаем пользователя, если такого еще нет
        if (!authConfirmModel.user) {
            authConfirmModel.user = await this.authService.registration(
                DataMapper.create(UserRegistrationDto, {
                    phone: authConfirmModel.phone,
                }),
            );
        }

        // Авторизуемся
        const authUserDto = await this.authService.createAuthUserDto(
            this.authService.createTokenPayload(authConfirmModel.user),
        );
        const loginModel = await this.authService.login(authUserDto);

        return schemaClass ? DataMapper.create(schemaClass, loginModel) : loginModel;
    }
}
