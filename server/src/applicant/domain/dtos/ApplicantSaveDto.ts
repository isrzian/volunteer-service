import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {ApplicantModel} from '../models/ApplicantModel';

export class ApplicantSaveDto {
    @ExtendField(ApplicantModel)
    userId?: number;

    @ExtendField(ApplicantModel)
    surname?: string;

    @ExtendField(ApplicantModel)
    name?: string;

    @ExtendField(ApplicantModel)
    patronymic?: string;

    @ExtendField(ApplicantModel)
    email?: string;

    @ExtendField(ApplicantModel)
    phone?: string;
}
