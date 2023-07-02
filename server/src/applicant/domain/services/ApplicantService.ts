import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {ApplicantModel} from '../models/ApplicantModel';
import {ApplicantSearchDto} from '../dtos/ApplicantSearchDto';
import {ApplicantSaveDto} from '../dtos/ApplicantSaveDto';
import {IApplicantRepository} from '../interfaces/IApplicantRepository';

export class ApplicantService extends CrudService<ApplicantModel,
    ApplicantSearchDto,
    ApplicantSaveDto | ApplicantModel> {
    protected modelClass = ApplicantModel;

    constructor(
        /** ApplicantRepository */
        public repository: IApplicantRepository,
    ) {
        super();
    }
}
