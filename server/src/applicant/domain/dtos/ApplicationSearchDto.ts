import {SearchInputDto} from '@steroidsjs/nest/src/usecases/dtos/SearchInputDto';
import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {ApplicationModel} from '../models/ApplicationModel';

export class ApplicationSearchDto extends SearchInputDto {
    @ExtendField(ApplicationModel, {nullable: true})
    isDone?: boolean;

    @ExtendField(ApplicationModel, {nullable: true})
    applicantId?: boolean;

    @ExtendField(ApplicationModel, {nullable: true})
    operatorId?: number;
}
