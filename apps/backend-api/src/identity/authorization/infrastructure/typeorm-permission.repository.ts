import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPermissionRepository } from '../domain/permission.repository.interface';
import { Permission } from '../domain/permission.entity';
import { PermissionOrmEntity } from './permission.orm.entity';

@Injectable()
export class TypeOrmPermissionRepository implements IPermissionRepository {
  constructor(
    @InjectRepository(PermissionOrmEntity)
    private readonly ormRepo: Repository<PermissionOrmEntity>,
  ) {}

  private toDomain(orm: PermissionOrmEntity): Permission {
    return new Permission({
      id: orm.id,
      name: orm.name,
      description: orm.description,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
    });
  }

  async save(permission: Permission): Promise<Permission> {
    const ormEntity = this.ormRepo.create(permission);
    const saved = await this.ormRepo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Permission | null> {
    const ormEntity = await this.ormRepo.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findByName(name: string): Promise<Permission | null> {
    const ormEntity = await this.ormRepo.findOne({ where: { name } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findAll(): Promise<Permission[]> {
    const list = await this.ormRepo.find();
    return list.map(orm => this.toDomain(orm));
  }
}
