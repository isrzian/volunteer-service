import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {ApplicantModel} from '../models/ApplicantModel';

export const IApplicantRepository = 'IApplicantRepository';

export type IApplicantRepository = ICrudRepository<ApplicantModel>
