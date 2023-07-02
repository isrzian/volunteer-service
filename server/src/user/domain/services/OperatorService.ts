import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {OperatorModel} from '../models/OperatorModel';
import {OperatorSearchDto} from '../dtos/OperatorSearchDto';
import {OperatorSaveDto} from '../dtos/OperatorSaveDto';
import {IOperatorRepository} from '../interfaces/IOperatorRepository';

export class OperatorService extends CrudService<OperatorModel,
    OperatorSearchDto,
    OperatorSaveDto | OperatorModel> {
    protected modelClass = OperatorModel;

    constructor(
        /** OperatorRepository */
        public repository: IOperatorRepository,
    ) {
        super();
    }
}
