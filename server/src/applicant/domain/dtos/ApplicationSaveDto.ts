import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {ApplicationModel} from '../models/ApplicationModel';

export class ApplicationSaveDto {
    @ExtendField(ApplicationModel)
    applicantId?: number;

    @ExtendField(ApplicationModel)
    operatorId?: number;

    @ExtendField(ApplicationModel)
    title?: string;

    @ExtendField(ApplicationModel)
    description?: string;

    @ExtendField(ApplicationModel)
    isDone?: boolean;

    @ExtendField(ApplicationModel)
    status?: string;

    @ExtendField(ApplicationModel)
    volunteersIds?: number;
}
