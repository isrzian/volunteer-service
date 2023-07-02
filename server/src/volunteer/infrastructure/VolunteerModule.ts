import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModuleHelper} from '@steroidsjs/nest/src/infrastructure/helpers/ModuleHelper';
import * as path from 'path';
import {VolunteerTable} from './tables/VolunteerTable';
import {IVolunteerRepository} from '../domain/interfaces/IVolunteerRepository';
import {VolunteerRepository} from './repositories/VolunteerRepository';
import {VolunteerService} from '../domain/services/VolunteerService';

@Module({
    imports: [
        TypeOrmModule.forFeature([VolunteerTable]),
    ],
    controllers: ModuleHelper.importDir(path.join(__dirname, '/controllers')),
    providers: [
        {
            provide: IVolunteerRepository,
            useClass: VolunteerRepository,
        },
        ModuleHelper.provide(VolunteerService, [
            IVolunteerRepository,
        ]),
    ],
    exports: [
        VolunteerService,
        IVolunteerRepository,
    ],
})
export class VolunteerModule {
}
