import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUnitRepository } from '../domain/unit.repository.interface';
import { Unit } from '../domain/unit.entity';
import { UnitOrmEntity } from './unit.orm.entity';

@Injectable()
export class TypeOrmUnitRepository implements IUnitRepository {
  constructor(
    @InjectRepository(UnitOrmEntity)
    private readonly ormRepo: Repository<UnitOrmEntity>,
  ) {}

  private toDomain(orm: UnitOrmEntity): Unit {
    return new Unit({
      id: orm.id,
      symbol: orm.symbol,
      name: orm.name,
      category: orm.category,
      siEquivalent: orm.siEquivalent,
      conversionMetadata: orm.conversionMetadata,
      precisionDefaults: orm.precisionDefaults,
      status: orm.status as any,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
      createdBy: orm.createdBy,
      updatedBy: orm.updatedBy,
    });
  }

  async save(unit: Unit): Promise<Unit> {
    const ormEntity = this.ormRepo.create(unit);
    const saved = await this.ormRepo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Unit | null> {
    const orm = await this.ormRepo.findOne({ where: { id } });
    return orm ? this.toDomain(orm) : null;
  }

  async findBySymbol(symbol: string): Promise<Unit | null> {
    const orm = await this.ormRepo.findOne({ where: { symbol } });
    return orm ? this.toDomain(orm) : null;
  }

  async findAll(activeOnly: boolean = false): Promise<Unit[]> {
    const where = activeOnly ? { status: 'ACTIVE' } : {};
    const list = await this.ormRepo.find({ where });
    return list.map(orm => this.toDomain(orm));
  }

  async softDelete(id: string, deletedBy: string): Promise<void> {
    await this.ormRepo.update(id, { deletedAt: new Date(), deletedBy });
  }
}
