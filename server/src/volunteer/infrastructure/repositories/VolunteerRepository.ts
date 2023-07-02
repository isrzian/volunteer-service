import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {VolunteerModel} from '../../domain/models/VolunteerModel';
import {VolunteerTable} from '../tables/VolunteerTable';

@Injectable()
export class VolunteerRepository extends CrudRepository<VolunteerModel> {
    constructor(
        @InjectRepository(VolunteerTable)
        public dbRepository: Repository<VolunteerTable>,
    ) {
        super();
    }

    protected modelClass = VolunteerModel;
}
