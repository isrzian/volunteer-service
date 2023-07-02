import {DeepPartial} from 'typeorm';
import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {ApplicantModel} from '../../domain/models/ApplicantModel';

@TableFromModel(ApplicantModel, 'applicant')
export class ApplicantTable implements DeepPartial<ApplicantModel> {}
