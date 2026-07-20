import { Membership } from './membership.entity';
import { User } from '../../users/domain/user.entity';
import { Organization } from '../../organizations/domain/organization.entity';

export interface IMembershipRepository {
  save(membership: Membership): Promise<Membership>;
  findByUserAndOrg(userId: string, orgId: string): Promise<Membership | null>;
  findByUser(userId: string): Promise<Membership[]>;
  findByOrg(orgId: string): Promise<Membership[]>;
  softDelete(id: string, deletedBy: string): Promise<void>;
}
