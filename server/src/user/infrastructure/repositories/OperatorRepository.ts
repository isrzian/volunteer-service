import {Repository} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {CrudRepository} from '@steroidsjs/nest/src/infrastructure/repositories/CrudRepository';
import {OperatorModel} from '../../domain/models/OperatorModel';
import {OperatorTable} from '../tables/OperatorTable';

@Injectable()
export class OperatorRepository extends CrudRepository<OperatorModel> {
    constructor(
        @InjectRepository(OperatorTable)
        public dbRepository: Repository<OperatorTable>,
    ) {
        super();
    }

    protected modelClass = OperatorModel;
}
