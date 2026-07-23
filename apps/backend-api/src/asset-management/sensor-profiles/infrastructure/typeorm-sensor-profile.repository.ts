import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISensorProfileRepository } from '../domain/sensor-profile.repository.interface';
import { SensorProfile } from '../domain/sensor-profile.entity';
import { SensorProfileOrmEntity } from './sensor-profile.orm.entity';

@Injectable()
export class TypeOrmSensorProfileRepository implements ISensorProfileRepository {
  constructor(
    @InjectRepository(SensorProfileOrmEntity)
    private readonly ormRepo: Repository<SensorProfileOrmEntity>,
  ) {}

  private toDomain(orm: SensorProfileOrmEntity, measurementTypeIds: string[] = []): SensorProfile {
    return new SensorProfile({
      id: orm.id,
      name: orm.name,
      manufacturer: orm.manufacturer,
      model: orm.model,
      communicationProtocol: orm.communicationProtocol,
      supportedMeasurementTypeIds: measurementTypeIds,
      samplingInterval: orm.samplingInterval,
      operatingVoltage: orm.operatingVoltage,
      calibrationRequired: orm.calibrationRequired,
      calibrationInstructions: orm.calibrationInstructions,
      accuracyValue: orm.accuracyValue,
      accuracyUnit: orm.accuracyUnit,
      accuracyCondition: orm.accuracyCondition,
      precisionValue: orm.precisionValue,
      precisionUnit: orm.precisionUnit,
      datasheetUrl: orm.datasheetUrl,
      metadata: orm.metadata,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
      createdBy: orm.createdBy,
      updatedBy: orm.updatedBy,
    });
  }

  async save(profile: SensorProfile): Promise<SensorProfile> {
    const ormEntity = this.ormRepo.create({
      id: profile.id,
      name: profile.name,
      manufacturer: profile.manufacturer,
      model: profile.model,
      communicationProtocol: profile.communicationProtocol,
      samplingInterval: profile.samplingInterval,
      operatingVoltage: profile.operatingVoltage,
      calibrationRequired: profile.calibrationRequired,
      calibrationInstructions: profile.calibrationInstructions,
      accuracyValue: profile.accuracyValue,
      accuracyUnit: profile.accuracyUnit,
      accuracyCondition: profile.accuracyCondition,
      precisionValue: profile.precisionValue,
      precisionUnit: profile.precisionUnit,
      datasheetUrl: profile.datasheetUrl,
      metadata: profile.metadata,
      createdBy: profile.createdBy,
      updatedBy: profile.updatedBy,
    });
    const saved = await this.ormRepo.save(ormEntity);

    // Update the join table
    await this.updateMeasurementTypeRelations(saved.id, profile.supportedMeasurementTypeIds);

    return this.toDomain(saved, profile.supportedMeasurementTypeIds);
  }

  async findById(id: string): Promise<SensorProfile | null> {
    const orm = await this.ormRepo.findOne({ where: { id } });
    if (!orm) return null;
    const measurementTypeIds = await this.getMeasurementTypeIds(id);
    return this.toDomain(orm, measurementTypeIds);
  }

  async findByName(name: string): Promise<SensorProfile | null> {
    const orm = await this.ormRepo.findOne({ where: { name } });
    if (!orm) return null;
    const measurementTypeIds = await this.getMeasurementTypeIds(orm.id);
    return this.toDomain(orm, measurementTypeIds);
  }

  async findAll(): Promise<SensorProfile[]> {
    const list = await this.ormRepo.find();
    const result = [];
    for (const orm of list) {
      const ids = await this.getMeasurementTypeIds(orm.id);
      result.push(this.toDomain(orm, ids));
    }
    return result;
  }

  async softDelete(id: string, deletedBy: string): Promise<void> {
    await this.ormRepo.update(id, { deletedAt: new Date(), deletedBy });
    // Optionally we could leave the join records; we'll let them be cascaded if we set onDelete: CASCADE on the join table (already set)
  }

  // Helper methods for join table
  private async getMeasurementTypeIds(profileId: string): Promise<string[]> {
    const result = await this.ormRepo.manager.query(
      `SELECT measurement_type_id FROM sensor_profile_measurement_types WHERE sensor_profile_id = $1`,
      [profileId]
    );
    return result.map(row => row.measurement_type_id);
  }

  private async updateMeasurementTypeRelations(profileId: string, typeIds: string[]): Promise<void> {
    // Delete existing
    await this.ormRepo.manager.query(
      `DELETE FROM sensor_profile_measurement_types WHERE sensor_profile_id = $1`,
      [profileId]
    );
    // Insert new
    for (const typeId of typeIds) {
      await this.ormRepo.manager.query(
        `INSERT INTO sensor_profile_measurement_types (sensor_profile_id, measurement_type_id) VALUES ($1, $2)`,
        [profileId, typeId]
      );
    }
  }
}
