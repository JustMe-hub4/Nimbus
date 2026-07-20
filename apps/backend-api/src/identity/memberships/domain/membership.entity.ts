import { User } from '../../users/domain/user.entity';
import { Organization } from '../../organizations/domain/organization.entity';
import { Role } from '../../authorization/domain/role.entity';

export class Membership {
  public readonly id: string;
  public user: User;
  public organization: Organization;
  public role: Role | null;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;
  public createdBy: string | null;
  public updatedBy: string | null;

  constructor(props: Partial<Membership>) {
    Object.assign(this, props);
  }
}
