import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {ApplicationTable} from '../tables/ApplicationTable';
import {ApplicationModel} from '../../domain/models/ApplicationModel';

@Injectable()
export class ApplicationRepository extends CrudRepository<ApplicationModel> {
    constructor(
        @InjectRepository(ApplicationTable)
        public dbRepository: Repository<ApplicationTable>,
    ) {
        super();
    }

    protected modelClass = ApplicationModel;
}
