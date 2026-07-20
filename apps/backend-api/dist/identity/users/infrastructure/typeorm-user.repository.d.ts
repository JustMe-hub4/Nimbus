import { Repository } from 'typeorm';
import { IUserRepository } from '../domain/user.repository.interface';
import { User } from '../domain/user.entity';
import { UserOrmEntity } from './user.orm.entity';
export declare class TypeOrmUserRepository implements IUserRepository {
    private readonly ormRepo;
    constructor(ormRepo: Repository<UserOrmEntity>);
    save(user: User): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    softDelete(id: string, deletedBy: string): Promise<void>;
}
