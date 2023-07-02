import {Module} from '@nestjs/common';
import * as path from 'path';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModuleHelper} from '@steroidsjs/nest/src/infrastructure/helpers/ModuleHelper';
import {ApplicationTable} from './tables/ApplicationTable';
import {ApplicantTable} from './tables/ApplicantTable';
import {IApplicationRepository} from '../domain/interfaces/IApplicationRepository';
import {ApplicationRepository} from './repositories/ApplicationRepository';
import {ApplicationService} from '../domain/services/ApplicationService';
import {IApplicantRepository} from '../domain/interfaces/IApplicantRepository';
import {ApplicantRepository} from './repositories/ApplicantRepository';
import {ApplicantService} from '../domain/services/ApplicantService';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ApplicationTable,
            ApplicantTable,
        ]),
    ],
    controllers: ModuleHelper.importDir(path.join(__dirname, '/controllers')),
    providers: [
        {
            provide: IApplicationRepository,
            useClass: ApplicationRepository,
        },
        ModuleHelper.provide(ApplicationService, [
            IApplicationRepository,
        ]),
        {
            provide: IApplicantRepository,
            useClass: ApplicantRepository,
        },
        ModuleHelper.provide(ApplicantService, [
            IApplicantRepository,
        ]),
    ],
    exports: [
        ApplicationService,
        ApplicantService,
        IApplicationRepository,
        IApplicantRepository,
    ],
})
export class ApplicantModule {
}
