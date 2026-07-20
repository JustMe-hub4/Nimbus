import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDeviceProfileRepository } from '../domain/device-profile.repository.interface';
import { DeviceProfile } from '../domain/device-profile.entity';
import { DeviceProfileOrmEntity } from './device-profile.orm.entity';

@Injectable()
export class TypeOrmDeviceProfileRepository implements IDeviceProfileRepository {
  constructor(
    @InjectRepository(DeviceProfileOrmEntity)
    private readonly ormRepo: Repository<DeviceProfileOrmEntity>,
  ) {}

  private toDomain(orm: DeviceProfileOrmEntity): DeviceProfile {
    return new DeviceProfile({
      id: orm.id,
      name: orm.name,
      description: orm.description,
      manufacturer: orm.manufacturer,
      model: orm.model,
      communicationProtocols: orm.communicationProtocols,
      supportedSensorTypes: orm.supportedSensorTypes,
      expectedMeasurements: orm.expectedMeasurements,
      firmwareCompatibility: orm.firmwareCompatibility,
      heartbeatDefaultInterval: orm.heartbeatDefaultInterval,
      calibrationRequired: orm.calibrationRequired,
      calibrationInstructions: orm.calibrationInstructions,
      metadata: orm.metadata,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
      createdBy: orm.createdBy,
      updatedBy: orm.updatedBy,
    });
  }

  async save(profile: DeviceProfile): Promise<DeviceProfile> {
    const ormEntity = this.ormRepo.create(profile);
    const saved = await this.ormRepo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<DeviceProfile | null> {
    const orm = await this.ormRepo.findOne({ where: { id } });
    return orm ? this.toDomain(orm) : null;
  }

  async findByName(name: string): Promise<DeviceProfile | null> {
    const orm = await this.ormRepo.findOne({ where: { name } });
    return orm ? this.toDomain(orm) : null;
  }

  async findAll(): Promise<DeviceProfile[]> {
    const list = await this.ormRepo.find();
    return list.map(orm => this.toDomain(orm));
  }

  async softDelete(id: string, deletedBy: string): Promise<void> {
    await this.ormRepo.update(id, { deletedAt: new Date(), deletedBy });
  }
}
