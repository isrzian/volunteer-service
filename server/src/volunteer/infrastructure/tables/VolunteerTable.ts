import {DeepPartial} from 'typeorm';
import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {VolunteerModel} from '../../domain/models/VolunteerModel';

@TableFromModel(VolunteerModel, 'volunteer')
export class VolunteerTable implements DeepPartial<VolunteerModel> {}
