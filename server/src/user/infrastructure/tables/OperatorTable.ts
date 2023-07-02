import {DeepPartial} from 'typeorm';
import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {OperatorModel} from '../../domain/models/OperatorModel';

@TableFromModel(OperatorModel, 'operator')
export class OperatorTable implements DeepPartial<OperatorModel> {}
