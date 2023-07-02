import {
    BooleanField,
    CreateTimeField, EnumField,
    PrimaryKeyField,
    RelationField,
    RelationIdField,
    StringField,
    TextField,
    UpdateTimeField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {ApplicantModel} from './ApplicantModel';
import {ApplicationStatusEnum} from '../enums/ApplicationStatusEnum';
import {OperatorModel} from '../../../user/domain/models/OperatorModel';
import {VolunteerModel} from '../../../volunteer/domain/models/VolunteerModel';

/**
 * Заявление о помощи
 */
export class ApplicationModel {
    @RelationField({
        type: 'ManyToOne',
        relationClass: () => ApplicantModel,
        label: 'Заявитель',
    })
    applicant: ApplicantModel;

    @RelationIdField({
        relationName: 'applicant',
    })
    applicantId: number;

    @RelationField({
        type: 'ManyToMany',
        relationClass: () => VolunteerModel,
        label: 'Исполнитель',
        isOwningSide: true,
        inverseSide: (volunteer: VolunteerModel) => volunteer.applications,
        nullable: true,
    })
    volunteers: VolunteerModel;

    @RelationIdField({
        relationName: 'volunteers',
        isArray: true,
        nullable: true,
    })
    volunteersIds: number;

    @RelationField({
        label: 'ID оператора',
        type: 'ManyToOne',
        relationClass: () => OperatorModel,
    })
    operator: OperatorModel;

    @RelationIdField({
        nullable: true,
        relationName: 'operator',
    })
    operatorId: number;

    @PrimaryKeyField()
    id: number;

    @StringField({
        label: 'Заголовок',
        nullable: true,
    })
    title: string;

    @TextField({
        nullable: true,
        label: 'Описание',
    })
    description: string;

    @BooleanField({
        defaultValue: false,
        label: 'Выполнена?',
    })
    isDone: boolean;

    @EnumField({
        enum: ApplicationStatusEnum,
        defaultValue: ApplicationStatusEnum.NEW,
        nullable: false,
    })
    status: string;

    @CreateTimeField({
        label: 'Создан',
    })
    createTime: string;

    @UpdateTimeField({
        label: 'Обновлен',
    })
    updateTime: string;
}
