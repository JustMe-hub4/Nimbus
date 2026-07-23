import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IMeasurementTypeRepository } from '../domain/measurement-type.repository.interface';
import { MeasurementType } from '../domain/measurement-type.entity';
import { MeasurementTypeOrmEntity } from './measurement-type.orm.entity';

@Injectable()
export class TypeOrmMeasurementTypeRepository implements IMeasurementTypeRepository {
  constructor(
    @InjectRepository(MeasurementTypeOrmEntity)
    private readonly ormRepo: Repository<MeasurementTypeOrmEntity>,
  ) {}

  private toDomain(orm: MeasurementTypeOrmEntity): MeasurementType {
    return new MeasurementType({
      id: orm.id,
      code: orm.code,
      name: orm.name,
      description: orm.description,
      category: orm.category,
      defaultUnitId: orm.defaultUnitId,
      minValue: orm.minValue,
      maxValue: orm.maxValue,
      precision: orm.precision,
      aggregationStrategy: orm.aggregationStrategy as any,
      semanticDescription: orm.semanticDescription,
      embeddingEligible: orm.embeddingEligible,
      knowledgePriority: orm.knowledgePriority,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
      createdBy: orm.createdBy,
      updatedBy: orm.updatedBy,
      deletedBy: orm.deletedBy,
    });
  }

  async save(type: MeasurementType): Promise<MeasurementType> {
    const ormEntity = this.ormRepo.create({
      code: type.code,
      name: type.name,
      description: type.description,
      category: type.category,
      defaultUnitId: type.defaultUnitId,
      minValue: type.minValue,
      maxValue: type.maxValue,
      precision: type.precision,
      aggregationStrategy: type.aggregationStrategy,
      semanticDescription: type.semanticDescription,
      embeddingEligible: type.embeddingEligible,
      knowledgePriority: type.knowledgePriority,
      createdBy: type.createdBy,
      updatedBy: type.updatedBy,
      deletedAt: type.deletedAt,
      deletedBy: type.deletedBy,
    });
    const saved = await this.ormRepo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<MeasurementType | null> {
    const orm = await this.ormRepo.findOne({ where: { id } });
    return orm ? this.toDomain(orm) : null;
  }

  async findByName(name: string): Promise<MeasurementType | null> {
    const orm = await this.ormRepo.findOne({ where: { name } });
    return orm ? this.toDomain(orm) : null;
  }

  async findByCode(code: string): Promise<MeasurementType | null> {
    const orm = await this.ormRepo.findOne({ where: { code } });
    return orm ? this.toDomain(orm) : null;
  }

  async findAll(category?: string): Promise<MeasurementType[]> {
    const where = category ? { category } : {};
    const list = await this.ormRepo.find({ where });
    return list.map(orm => this.toDomain(orm));
  }

  async softDelete(id: string, deletedBy: string): Promise<void> {
    await this.ormRepo.update(id, { deletedAt: new Date(), deletedBy });
  }
}
