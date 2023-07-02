import {
    PrimaryKeyField,
    RelationField,
    StringField,
    CreateTimeField,
    UpdateTimeField, UidField, RelationIdField, BooleanField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import { UserModel } from '../../../user/domain/models/UserModel';

/**
 * Авторизации пользователя с токенами
 */
export class AuthLoginModel {
    @PrimaryKeyField()
    id: number;

    @UidField()
    uid: string;

    @RelationField({
        label: 'ID пользователя',
        type: 'ManyToOne',
        relationClass: () => UserModel,
    })
    user: UserModel;

    @RelationIdField({
        nullable: true,
        relationName: 'user',
    })
    userId: number;

    @StringField({
        label: 'Токен доступа',
        noColumn: true,
    })
    accessToken: string;

    @StringField({
        label: 'Время истечения токена',
        noColumn: true,
    })
    accessExpireTime: Date;

    @StringField({
        label: 'Токен для обновления',
    })
    refreshToken: string;

    @StringField({
        label: 'Время истечения токена обновления',
    })
    refreshExpireTime: Date;

    @StringField({
        label: 'IP адрес',
        nullable: true,
    })
    ipAddress: string;

    @StringField({
        label: 'Месторасположение',
        nullable: true,
    })
    location: string;

    @StringField({
        label: 'User-agent',
        nullable: true,
    })
    userAgent: string;

    @BooleanField({
        label: 'Отозван?',
        nullable: true,
    })
    isRevoked: boolean;

    @CreateTimeField({
        label: 'Создан',
    })
    createTime: string;

    @UpdateTimeField({
        label: 'Обновлен',
    })
    updateTime: string;
}
