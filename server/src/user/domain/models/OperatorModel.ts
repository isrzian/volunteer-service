import {
    BooleanField,
    CreateTimeField,
    PrimaryKeyField,
    RelationField,
    RelationIdField,
    StringField,
    UpdateTimeField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {UserModel} from './UserModel';
import {ApplicationModel} from '../../../applicant/domain/models/ApplicationModel';

export class OperatorModel {
    @RelationField({
        type: 'OneToMany',
        relationClass: () => ApplicationModel,
        inverseSide: (application: ApplicationModel) => application.operator,
    })
    applications: ApplicationModel[];

    @RelationIdField({
        relationName: 'applications',
        isArray: true,
        nullable: true,
    })
    applicationsIds: number[];

    @PrimaryKeyField()
    id: number;

    @StringField({
        nullable: true,
    })
    name: number;

    @RelationField({
        type: 'OneToOne',
        relationClass: () => UserModel,
        isOwningSide: true,
    })
    user: UserModel;

    @RelationIdField({
        nullable: true,
        relationName: 'user',
    })
    userId: number;

    @BooleanField({
        defaultValue: true,
    })
    isActive: boolean;

    @StringField({
        label: 'Должность',
        nullable: true,
    })
    position: string;

    @CreateTimeField({
        label: 'Создан',
    })
    createTime: string;

    @UpdateTimeField({
        label: 'Обновлен',
    })
    updateTime: string;
}
