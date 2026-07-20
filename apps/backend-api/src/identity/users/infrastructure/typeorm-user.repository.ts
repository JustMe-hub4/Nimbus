import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUserRepository } from '../domain/user.repository.interface';
import { User } from '../domain/user.entity';
import { UserOrmEntity } from './user.orm.entity';

@Injectable()
export class TypeOrmUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly ormRepo: Repository<UserOrmEntity>,
  ) {}

  async save(user: User): Promise<User> {
    const ormEntity = this.ormRepo.create(user);
    const saved = await this.ormRepo.save(ormEntity);
    return new User(saved);
  }

  async findByEmail(email: string): Promise<User | null> {
    const ormEntity = await this.ormRepo.findOne({ where: { email } });
    return ormEntity ? new User(ormEntity) : null;
  }

  async findById(id: string): Promise<User | null> {
    const ormEntity = await this.ormRepo.findOne({ where: { id } });
    return ormEntity ? new User(ormEntity) : null;
  }

  async softDelete(id: string, deletedBy: string): Promise<void> {
    await this.ormRepo.update(id, { deletedAt: new Date(), deletedBy });
  }
}
