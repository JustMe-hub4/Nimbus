import { Inject, HttpStatus } from '@nestjs/common';
import { IDeviceRepository } from '../domain/device.repository.interface';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';
import { DeviceValidator } from '../domain/validators/device.validator';
import { DeviceRenamedEvent } from '../events/device-renamed.event';
import { DeviceFirmwareUpdatedEvent } from '../events/device-firmware-updated.event';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';
import { DeviceStatus } from '../domain/device-status.enum';

export class UpdateDeviceUseCase {
  constructor(
    @Inject('IDeviceRepository') private deviceRepo: IDeviceRepository,
    @Inject('IEventDispatcher') private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(
    id: string,
    updates: {
      name?: string;
      firmwareVersion?: string;
      hardwareRevision?: string;
      heartbeatInterval?: number;
      metadata?: Record<string, any>;
      status?: DeviceStatus;
    },
    updatedBy?: string,
  ) {
    const device = await this.deviceRepo.findById(id);
    if (!device) {
      throw new AppException(ErrorCodes.DEVICE_NOT_FOUND, 'Device not found', HttpStatus.NOT_FOUND);
    }

    if (device.deletedAt) {
      throw new AppException(
        ErrorCodes.DEVICE_ALREADY_DECOMMISSIONED,
        'Cannot update a decommissioned device',
        HttpStatus.BAD_REQUEST,
      );
    }

    let nameChanged = false;
    let firmwareChanged = false;

    if (updates.name && updates.name !== device.name) {
      DeviceValidator.validateName(updates.name);
      const oldName = device.name;
      device.updateName(updates.name);
      nameChanged = true;
    }

    if (updates.firmwareVersion !== undefined && updates.firmwareVersion !== device.firmwareVersion) {
      const oldFirmware = device.firmwareVersion;
      device.updateFirmware(updates.firmwareVersion);
      firmwareChanged = true;
    }

    if (updates.hardwareRevision !== undefined) {
      device.updateHardware(updates.hardwareRevision);
    }

    if (updates.heartbeatInterval !== undefined) {
      device.updateHeartbeatInterval(updates.heartbeatInterval);
    }

    if (updates.metadata !== undefined) {
      device.updateMetadata(updates.metadata);
    }

    if (updates.status !== undefined) {
      device.updateStatus(updates.status);
    }

    device.updatedBy = updatedBy;
    const saved = await this.deviceRepo.save(device);

    if (nameChanged) {
      this.eventDispatcher.publish(
        new DeviceRenamedEvent(saved.id, updates.name, saved.name),
      );
    }

    if (firmwareChanged) {
      this.eventDispatcher.publish(
        new DeviceFirmwareUpdatedEvent(saved.id, null, updates.firmwareVersion),
      );
    }

    return saved;
  }
}
