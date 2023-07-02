import BaseEnum from '@steroidsjs/nest/src/domain/base/BaseEnum';

export default class JwtTokenStatusEnum extends BaseEnum {
    static VALID = 'valid';

    static TOKEN_ERROR = 'JsonWebTokenError';

    static EXPIRED_ERROR = 'TokenExpiredError';
}
