import { Repository } from 'typeorm';
import { IMembershipRepository } from '../domain/membership.repository.interface';
import { Membership } from '../domain/membership.entity';
import { MembershipOrmEntity } from './membership.orm.entity';
export declare class TypeOrmMembershipRepository implements IMembershipRepository {
    private readonly ormRepo;
    constructor(ormRepo: Repository<MembershipOrmEntity>);
    private toDomain;
    save(membership: Membership): Promise<Membership>;
    findByUserAndOrg(userId: string, orgId: string): Promise<Membership | null>;
    findByUser(userId: string): Promise<Membership[]>;
    findByOrg(orgId: string): Promise<Membership[]>;
    softDelete(id: string, deletedBy: string): Promise<void>;
}
