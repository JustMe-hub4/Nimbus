import { User } from '../../users/domain/user.entity';
import { Organization } from '../../organizations/domain/organization.entity';
import { Role } from '../../authorization/domain/role.entity';
export declare class Membership {
    readonly id: string;
    user: User;
    organization: Organization;
    role: Role | null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    createdBy: string | null;
    updatedBy: string | null;
    constructor(props: Partial<Membership>);
}
