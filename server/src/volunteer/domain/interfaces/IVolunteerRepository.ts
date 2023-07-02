import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {VolunteerModel} from '../models/VolunteerModel';

export const IVolunteerRepository = 'IVolunteerRepository';

export type IVolunteerRepository = ICrudRepository<VolunteerModel>
