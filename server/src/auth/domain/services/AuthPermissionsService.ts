import {
    union as _union,
    uniq as _uniq,
} from 'lodash';
import {ForbiddenException} from '@steroidsjs/nest/src/usecases/exceptions';
import SearchQuery from '@steroidsjs/nest/src/usecases/base/SearchQuery';
import {CrudService} from '@steroidsjs/nest/src/usecases/services/CrudService';
import {In} from 'typeorm';
import {AuthRoleModel} from '../models/AuthRoleModel';
import {AuthPermissionModel} from '../models/AuthPermissionModel';
import {IAuthPermissionsRepository} from '../interfaces/IAuthPermissionsRepository';
import {getAllPermissionsTreeKeys} from '../../../config/allPermissions';
import {
    PERMISSION_AUTH_AUTHORIZED,
} from '../../infrastructure/permissions';
import {AuthPermissionSearchInputDto} from '../dtos/AuthPermissionSearchInputDto';
import {AuthPermissionSaveInputDto} from '../dtos/AuthPermissionSaveInputDto';
import {IAuthRoleRepository} from '../interfaces/IAuthRoleRepository';
import {UserModel} from '../../../user/domain/models/UserModel';

export class AuthPermissionsService extends CrudService<AuthPermissionModel,
    AuthPermissionSearchInputDto,
    AuthPermissionSaveInputDto> {
    protected modelClass = AuthPermissionModel;

    constructor(
        /** @see AuthPermissionRepository **/
        public repository: IAuthPermissionsRepository,

        /** @see AuthRoleRepository **/
        public authRoleRepository: IAuthRoleRepository,
    ) {
        super();
    }

    public async getRolesPermissions(user: UserModel, authRoleIds: number[]): Promise<string[]> {
        // Get all roles
        const allRoles = await this.authRoleRepository.createQuery()
            .with('authPermissions')
            .many();

        const getPermissionRecursive = (roleId) => {
            const role = allRoles.find(({id}) => id === roleId);
            return [
                ...(role?.authPermissions || []).map(item => item.name),
                ...(role?.parentId ? getPermissionRecursive(role?.parentId) : []),
            ];
        };

        const permissions = [];
        permissions.push(PERMISSION_AUTH_AUTHORIZED);
        for (const roleId of authRoleIds) {
            permissions.push(...getPermissionRecursive(roleId));
        }

        // TODO DEBUG MODE - all roles for all users
        // permissions.push(...getAllPermissionsKeys());

        return _uniq(permissions);
    }

    public checkRolePermission(authRoles: AuthRoleModel[], permission: AuthPermissionModel): boolean {
        const permissionsByRoles = authRoles.map(authRole => {
            const expiredTimeIsOut = new Date(authRole.expireTime) < new Date();
            if (!authRole.isActive || expiredTimeIsOut) {
                return [];
            }

            return (authRole.parent
                ? this.mergeWithParentPermissions(authRole.parent.authPermissions, authRole.authPermissions)
                : authRole.authPermissions)
                .map(authPermission => authPermission.id);
        });

        const permissions = _union(...permissionsByRoles);

        return permissions.includes(permission.id);
    }

    public checkRolePermissionOrPanic(authRoles: AuthRoleModel[], permission: AuthPermissionModel): boolean {
        const checkRolePermission = this.checkRolePermission(authRoles, permission);
        if (!checkRolePermission) {
            // TODO У вас нет разрешения + permission.description
            throw new ForbiddenException('Недостаточно прав');
        }

        return checkRolePermission;
    }

    public async findOrCreate(keys: string[]) {
        const searchQuery = new SearchQuery();
        searchQuery.where({name: In(keys)});
        const permissions = await this.findMany(searchQuery);
        const noExist = keys.filter(e => !permissions.find(element => element.name === e));
        const newPermissions = [];
        if (noExist) {
            for (const element of noExist) {
                const permissionDto = new AuthPermissionSaveInputDto();
                permissionDto.name = element;
                newPermissions.push(await this.create(permissionDto));
            }
            permissions.push(...newPermissions);
        }
        return permissions;
    }

    private mergeWithParentPermissions(parentPermissions, ownPermissions) {
        return parentPermissions.map(parentItem => ({
            ...ownPermissions.find((ownItem) => (ownItem.id === parentItem.id) && ownItem),
            ...parentItem,
        }));
    }

    public async getPermissionsTree() {
        return getAllPermissionsTreeKeys();
    }
}
