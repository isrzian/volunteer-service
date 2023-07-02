import {ICrudRepository} from '@steroidsjs/nest/src/usecases/interfaces/ICrudRepository';
import {OperatorModel} from '../models/OperatorModel';

export const IOperatorRepository = 'IOperatorRepository';

export type IOperatorRepository = ICrudRepository<OperatorModel>
