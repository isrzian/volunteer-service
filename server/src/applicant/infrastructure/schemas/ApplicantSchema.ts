import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {ApplicantModel} from '../../domain/models/ApplicantModel';
import {UserSchema} from '../../../user/infrastructure/schemas/UserSchema';

export class ApplicantSchema {
    @ExtendField(ApplicantModel, {
        relationClass: () => UserSchema,
    })
    user: UserSchema;

    @ExtendField(ApplicantModel)
    userId: number;

    @ExtendField(ApplicantModel)
    id: number;

    @ExtendField(ApplicantModel)
    surname: string;

    @ExtendField(ApplicantModel)
    name: string;

    @ExtendField(ApplicantModel)
    patronymic: string;

    @ExtendField(ApplicantModel)
    email: string;

    @ExtendField(ApplicantModel)
    phone: string;

    @ExtendField(ApplicantModel)
    createTime: string;

    @ExtendField(ApplicantModel)
    updateTime: string;
}
