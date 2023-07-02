import {
    CreateTimeField,
    EmailField,
    PhoneField,
    PrimaryKeyField,
    RelationField,
    RelationIdField,
    StringField,
    UpdateTimeField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {UserModel} from '../../../user/domain/models/UserModel';

/**
 * Заявитель о помощи
 */
export class ApplicantModel {
    @RelationField({
        label: 'ID пользователя в системе (если зарегистрирован)',
        type: 'OneToOne',
        isOwningSide: true,
        relationClass: () => UserModel,
        inverseSide: (user: UserModel) => user.applicant,
    })
    user: UserModel;

    @RelationIdField({
        nullable: true,
        relationName: 'user',
    })
    userId: number;

    @PrimaryKeyField()
    id: number;

    @StringField({
        label: 'Фамилия',
        nullable: true,
    })
    surname: string;

    @StringField({
        label: 'Имя',
        nullable: true,
    })
    name: string;

    @StringField({
        label: 'Отчество',
        nullable: true,
    })
    patronymic: string;

    @EmailField({
        label: 'Адрес электронной почты',
        nullable: true,
    })
    email: string;

    @PhoneField({
        label: 'Основной номер телефона',
        nullable: true,
        unique: true,
        max: 20,
    })
    phone: string;

    @CreateTimeField({
        label: 'Создан',
    })
    createTime: string;

    @UpdateTimeField({
        label: 'Обновлен',
    })
    updateTime: string;
}
