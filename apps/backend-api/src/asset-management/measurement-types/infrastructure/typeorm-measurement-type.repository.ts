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
      name: orm.name,
      unit: orm.unit,
      minValue: orm.minValue,
      maxValue: orm.maxValue,
      description: orm.description,
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
      name: type.name,
      unit: type.unit,
      minValue: type.minValue,
      maxValue: type.maxValue,
      description: type.description,
      createdBy: type.createdBy,
    });
    const saved = await this.ormRepo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<MeasurementType | null> {
    const ormEntity = await this.ormRepo.findOne({ where: { id } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findByName(name: string): Promise<MeasurementType | null> {
    const ormEntity = await this.ormRepo.findOne({ where: { name } });
    return ormEntity ? this.toDomain(ormEntity) : null;
  }

  async findAll(): Promise<MeasurementType[]> {
    const list = await this.ormRepo.find();
    return list.map(orm => this.toDomain(orm));
  }

  async softDelete(id: string, deletedBy: string): Promise<void> {
    await this.ormRepo.update(id, { deletedAt: new Date(), deletedBy });
  }
}
