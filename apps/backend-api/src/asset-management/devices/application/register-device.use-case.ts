import { Inject, HttpStatus } from '@nestjs/common';
import { IDeviceRepository } from '../domain/device.repository.interface';
import { IStationRepository } from '../../stations/domain/station.repository.interface';
import { Device } from '../domain/device.entity';
import { DeviceValidator } from '../domain/validators/device.validator';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';
import { DeviceRegisteredEvent } from '../events/device-registered.event';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';

export class RegisterDeviceUseCase {
  constructor(
    @Inject('IDeviceRepository') private deviceRepo: IDeviceRepository,
    @Inject('IStationRepository') private stationRepo: IStationRepository,
    @Inject('IEventDispatcher') private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(input: {
    organizationId: string;
    stationId: string;
    deviceProfileId?: string;
    name: string;
    serialNumber: string;
    firmwareVersion?: string;
    hardwareRevision?: string;
    heartbeatInterval?: number;
    metadata?: Record<string, any>;
    createdBy?: string;
  }) {
    DeviceValidator.validateName(input.name);
    DeviceValidator.validateSerialNumber(input.serialNumber);

    const station = await this.stationRepo.findById(input.stationId);
    if (!station) {
      throw new AppException(ErrorCodes.STATION_NOT_FOUND, 'Station not found', HttpStatus.NOT_FOUND);
    }
    if (station.organizationId !== input.organizationId) {
      throw new AppException(
        ErrorCodes.VALIDATION_FAILED,
        'Station does not belong to the specified organization',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existing = await this.deviceRepo.findBySerialNumber(input.serialNumber);
    if (existing) {
      throw new AppException(
        ErrorCodes.DEVICE_SERIAL_ALREADY_EXISTS,
        'Device with this serial number already exists',
        HttpStatus.CONFLICT,
      );
    }

    const device = new Device({
      organizationId: input.organizationId,
      stationId: input.stationId,
      deviceProfileId: input.deviceProfileId || null,
      name: input.name,
      serialNumber: input.serialNumber,
      firmwareVersion: input.firmwareVersion || null,
      hardwareRevision: input.hardwareRevision || null,
      heartbeatInterval: input.heartbeatInterval || null,
      metadata: input.metadata || null,
      createdBy: input.createdBy,
    });

    const saved = await this.deviceRepo.save(device);

    this.eventDispatcher.publish(
      new DeviceRegisteredEvent(
        saved.id,
        saved.serialNumber,
        saved.name,
        saved.organizationId,
        saved.stationId,
      ),
    );

    return saved;
  }
}
