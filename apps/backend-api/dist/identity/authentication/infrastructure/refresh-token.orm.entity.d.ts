import { BaseOrmEntity } from '../../shared/infrastructure/base.orm.entity';
import { UserOrmEntity } from '../../users/infrastructure/user.orm.entity';
export declare class RefreshTokenOrmEntity extends BaseOrmEntity {
    id: string;
    tokenHash: string;
    user: UserOrmEntity;
    expiresAt: Date;
    revoked: boolean;
    replacedByTokenId: string | null;
}
