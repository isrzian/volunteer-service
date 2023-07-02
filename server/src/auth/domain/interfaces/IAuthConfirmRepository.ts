import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {AuthConfirmModel} from '../models/AuthConfirmModel';

export const IAuthConfirmRepository = 'IAuthConfirmRepository';

export type IAuthConfirmRepository = ICrudRepository<AuthConfirmModel>
