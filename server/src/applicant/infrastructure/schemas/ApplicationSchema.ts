import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {ApplicationModel} from '../../domain/models/ApplicationModel';
import {OperatorSchema} from '../../../user/infrastructure/schemas/OperatorSchema';
import {ApplicantSchema} from './ApplicantSchema';

export class ApplicationSchema {
    @ExtendField(ApplicationModel, {
        relationClass: () => ApplicantSchema,
    })
    applicant: ApplicantSchema;

    @ExtendField(ApplicationModel)
    applicantId: number;

    @ExtendField(ApplicationModel, {
        relationClass: () => OperatorSchema,
    })
    operator: OperatorSchema;

    @ExtendField(ApplicationModel)
    operatorId: number;

    @ExtendField(ApplicationModel)
    id: number;

    @ExtendField(ApplicationModel)
    title: string;

    @ExtendField(ApplicationModel)
    description: string;

    @ExtendField(ApplicationModel)
    isDone: boolean;

    @ExtendField(ApplicationModel)
    status: string;

    @ExtendField(ApplicationModel)
    createTime: string;

    @ExtendField(ApplicationModel)
    updateTime: string;
}
