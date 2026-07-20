import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDeviceRepository } from '../domain/device.repository.interface';
import { Device } from '../domain/device.entity';
import { DeviceOrmEntity } from './device.orm.entity';

@Injectable()
export class TypeOrmDeviceRepository implements IDeviceRepository {
  constructor(
    @InjectRepository(DeviceOrmEntity)
    private readonly ormRepo: Repository<DeviceOrmEntity>,
  ) {}

  private toDomain(orm: DeviceOrmEntity): Device {
    return new Device({
      id: orm.id,
      organizationId: orm.organizationId,
      stationId: orm.stationId,
      deviceProfileId: orm.deviceProfileId,
      name: orm.name,
      serialNumber: orm.serialNumber,
      firmwareVersion: orm.firmwareVersion,
      hardwareRevision: orm.hardwareRevision,
      heartbeatInterval: orm.heartbeatInterval,
      lastHeartbeat: orm.lastHeartbeat,
      status: orm.status as any,
      metadata: orm.metadata,
      createdAt: orm.createdAt,
      updatedAt: orm.updatedAt,
      deletedAt: orm.deletedAt,
      createdBy: orm.createdBy,
      updatedBy: orm.updatedBy,
      deletedBy: orm.deletedBy,
    });
  }

  async save(device: Device): Promise<Device> {
    let ormEntity: DeviceOrmEntity;

    if (device.id) {
      // Update existing entity
      ormEntity = await this.ormRepo.preload({
        id: device.id,
        organizationId: device.organizationId,
        stationId: device.stationId,
        deviceProfileId: device.deviceProfileId,
        name: device.name,
        serialNumber: device.serialNumber,
        firmwareVersion: device.firmwareVersion,
        hardwareRevision: device.hardwareRevision,
        heartbeatInterval: device.heartbeatInterval,
        lastHeartbeat: device.lastHeartbeat,
        status: device.status,
        metadata: device.metadata,
        updatedBy: device.updatedBy,
        deletedAt: device.deletedAt,
        deletedBy: device.deletedBy,
      });
    } else {
      // Create new entity
      ormEntity = this.ormRepo.create({
        organizationId: device.organizationId,
        stationId: device.stationId,
        deviceProfileId: device.deviceProfileId,
        name: device.name,
        serialNumber: device.serialNumber,
        firmwareVersion: device.firmwareVersion,
        hardwareRevision: device.hardwareRevision,
        heartbeatInterval: device.heartbeatInterval,
        lastHeartbeat: device.lastHeartbeat,
        status: device.status,
        metadata: device.metadata,
        createdBy: device.createdBy,
        updatedBy: device.updatedBy,
      });
    }

    const saved = await this.ormRepo.save(ormEntity);
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<Device | null> {
    const orm = await this.ormRepo.findOne({ where: { id } });
    return orm ? this.toDomain(orm) : null;
  }

  async findBySerialNumber(serial: string): Promise<Device | null> {
    const orm = await this.ormRepo.findOne({ where: { serialNumber: serial } });
    return orm ? this.toDomain(orm) : null;
  }

  async findByStation(stationId: string): Promise<Device[]> {
    const list = await this.ormRepo.find({ where: { stationId } });
    return list.map(orm => this.toDomain(orm));
  }

  async findByOrganization(organizationId: string): Promise<Device[]> {
    const list = await this.ormRepo.find({ where: { organizationId } });
    return list.map(orm => this.toDomain(orm));
  }

  async findAll(): Promise<Device[]> {
    const list = await this.ormRepo.find();
    return list.map(orm => this.toDomain(orm));
  }

  async softDelete(id: string, deletedBy: string): Promise<void> {
    await this.ormRepo.update(id, { deletedAt: new Date(), deletedBy });
  }
}
