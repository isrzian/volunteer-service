import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {OperatorModel} from '../models/OperatorModel';

export class OperatorSaveDto {
    @ExtendField(OperatorModel)
    applicationsIds?: number[];

    @ExtendField(OperatorModel)
    name?: number;

    @ExtendField(OperatorModel)
    userId?: number;

    @ExtendField(OperatorModel)
    isActive?: boolean;

    @ExtendField(OperatorModel)
    position?: string;
}
