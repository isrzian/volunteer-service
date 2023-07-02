import {
    PrimaryKeyField,
    StringField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';

/**
 * Список разрешений в системе
 */
export class AuthPermissionModel {
    @PrimaryKeyField()
    id: number;

    @StringField({
        label: 'Уникальное системное имя (латиницей)',
    })
    name: string;
}
