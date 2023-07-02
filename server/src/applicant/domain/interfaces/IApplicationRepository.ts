import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {ApplicationModel} from '../models/ApplicationModel';

export const IApplicationRepository = 'IApplicationRepository';

export type IApplicationRepository = ICrudRepository<ApplicationModel>
