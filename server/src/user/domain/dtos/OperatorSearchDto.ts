import {SearchInputDto} from '@steroidsjs/nest/src/usecases/dtos/SearchInputDto';
import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {OperatorModel} from '../models/OperatorModel';

export class OperatorSearchDto extends SearchInputDto {
    @ExtendField(OperatorModel)
    isActive?: boolean;
}
