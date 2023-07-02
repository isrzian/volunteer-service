import {DeepPartial} from 'typeorm';
import {TableFromModel} from '@steroidsjs/nest/src/infrastructure/decorators/TableFromModel';
import {ApplicationModel} from '../../domain/models/ApplicationModel';

@TableFromModel(ApplicationModel, 'application')
export class ApplicationTable implements DeepPartial<ApplicationModel> {}
