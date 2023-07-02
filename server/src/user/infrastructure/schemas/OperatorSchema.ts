import {ExtendField} from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import {OperatorModel} from '../../domain/models/OperatorModel';
import {UserSchema} from './UserSchema';

export class OperatorSchema {
    @ExtendField(OperatorModel)
    applicationsIds: number[];

    @ExtendField(OperatorModel)
    id: number;

    @ExtendField(OperatorModel)
    name: number;

    @ExtendField(OperatorModel, {
        relationClass: () => UserSchema,
    })
    user: UserSchema;

    @ExtendField(OperatorModel)
    userId: number;

    @ExtendField(OperatorModel)
    isActive: boolean;

    @ExtendField(OperatorModel)
    position: string;

    @ExtendField(OperatorModel)
    createTime: string;

    @ExtendField(OperatorModel)
    updateTime: string;
}
