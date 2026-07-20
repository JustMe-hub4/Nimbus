import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IStationRepository } from '../domain/station.repository.interface';
import { Station } from '../domain/station.entity';
import { StationOrmEntity } from './station.orm.entity';

@Injectable()
export class TypeOrmStationRepository implements IStationRepository {
  constructor(
    @InjectRepository(StationOrmEntity)
    private readonly ormRepo: Repository<StationOrmEntity>,
  ) {}

  private toDomain(orm: StationOrmEntity): Station {
    return new Station({
      id: orm.id,
      name: orm.name,
      description: orm.description,
      location: orm.location,
      organizationId: orm.organizationId,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
      createdBy: orm.createdBy,
      updatedBy: orm.updatedBy,
    });
  }

  async save(station: Station): Promise<Station> {
    const ormEntity = this.ormRepo.create(station);
    const saved = await this.ormRepo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Station | null> {
    const orm = await this.ormRepo.findOne({ where: { id } });
    return orm ? this.toDomain(orm) : null;
  }

  async findByOrganization(organizationId: string): Promise<Station[]> {
    const list = await this.ormRepo.find({ where: { organizationId } });
    return list.map(orm => this.toDomain(orm));
  }

  async findAll(): Promise<Station[]> {
    const list = await this.ormRepo.find();
    return list.map(orm => this.toDomain(orm));
  }

  async softDelete(id: string, deletedBy: string): Promise<void> {
    await this.ormRepo.update(id, { deletedAt: new Date(), deletedBy });
  }
}
