import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {VolunteerSearchDto} from '../dtos/VolunteerSearchDto';
import {VolunteerSaveDto} from '../dtos/VolunteerSaveDto';
import {VolunteerModel} from '../models/VolunteerModel';
import {IVolunteerRepository} from '../interfaces/IVolunteerRepository';

export class VolunteerService extends CrudService<VolunteerModel,
    VolunteerSearchDto,
    VolunteerSaveDto | VolunteerModel> {
    protected modelClass = VolunteerModel;

    constructor(
        /** UserRepository */
        public repository: IVolunteerRepository,
    ) {
        super();
    }
}
