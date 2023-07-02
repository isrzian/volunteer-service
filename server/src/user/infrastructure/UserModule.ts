import {forwardRef, Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ModuleHelper} from '@steroidsjs/nest/src/infrastructure/helpers/ModuleHelper';
import * as path from 'path';
import {UserRepository} from './repositories/UserRepository';
import {UserTable} from './tables/UserTable';
import {UserService} from '../domain/services/UserService';
import {IUserRepository} from '../domain/interfaces/IUserRepository';
import {AuthModule} from '../../auth/infrastructure/AuthModule';
import {ISessionService} from '../../auth/domain/interfaces/ISessionService';
import {IOperatorRepository} from '../domain/interfaces/IOperatorRepository';
import {OperatorRepository} from './repositories/OperatorRepository';
import {OperatorService} from '../domain/services/OperatorService';
import {OperatorTable} from './tables/OperatorTable';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserTable, OperatorTable]),
        forwardRef(() => AuthModule),
    ],
    controllers: ModuleHelper.importDir(path.join(__dirname, '/controllers')),
    providers: [
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
        ModuleHelper.provide(UserService, [
            IUserRepository,
            ISessionService,
        ]),
        {
            provide: IOperatorRepository,
            useClass: OperatorRepository,
        },
        ModuleHelper.provide(OperatorService, [
            IOperatorRepository,
        ]),
    ],
    exports: [
        UserService,
        OperatorService,
        IUserRepository,
        IOperatorRepository,
    ],
})
export class UserModule {
}
