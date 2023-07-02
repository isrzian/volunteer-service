import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {ApplicantModel} from '../../domain/models/ApplicantModel';
import {ApplicantTable} from '../tables/ApplicantTable';

@Injectable()
export class ApplicantRepository extends CrudRepository<ApplicantModel> {
    constructor(
        @InjectRepository(ApplicantTable)
        public dbRepository: Repository<ApplicantTable>,
    ) {
        super();
    }

    protected modelClass = ApplicantModel;
}
