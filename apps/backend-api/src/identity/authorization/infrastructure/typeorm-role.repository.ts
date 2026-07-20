import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRoleRepository } from '../domain/role.repository.interface';
import { Role } from '../domain/role.entity';
import { RoleOrmEntity } from './role.orm.entity';

@Injectable()
export class TypeOrmRoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RoleOrmEntity)
    private readonly ormRepo: Repository<RoleOrmEntity>,
  ) {}

  private toDomain(orm: RoleOrmEntity): Role {
    return new Role({
      id: orm.id,
      name: orm.name,
      description: orm.description,
      permissions: orm.permissions ? orm.permissions.map(p => new (require('../domain/permission.entity').Permission)(p)) : [],
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  async save(role: Role): Promise<Role> {
    const ormEntity = this.ormRepo.create(role);
    const saved = await this.ormRepo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Role | null> {
    const ormEntity = await this.ormRepo.findOne({
      where: { id },
      relations: { permissions: true },
    });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findByName(name: string): Promise<Role | null> {
    const ormEntity = await this.ormRepo.findOne({
      where: { name },
      relations: { permissions: true },
    });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findAll(): Promise<Role[]> {
    const list = await this.ormRepo.find({ relations: { permissions: true } });
    return list.map(orm => this.toDomain(orm));
  }
}
