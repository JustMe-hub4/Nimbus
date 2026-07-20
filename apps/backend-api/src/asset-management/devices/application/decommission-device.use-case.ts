import { Inject, HttpStatus } from '@nestjs/common';
import { IDeviceRepository } from '../domain/device.repository.interface';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';
import { DeviceDecommissionedEvent } from '../events/device-decommissioned.event';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';

export class DecommissionDeviceUseCase {
  constructor(
    @Inject('IDeviceRepository') private deviceRepo: IDeviceRepository,
    @Inject('IEventDispatcher') private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(id: string, deletedBy: string) {
    const device = await this.deviceRepo.findById(id);
    if (!device) {
      throw new AppException(ErrorCodes.DEVICE_NOT_FOUND, 'Device not found', HttpStatus.NOT_FOUND);
    }

    if (device.deletedAt) {
      throw new AppException(
        ErrorCodes.DEVICE_ALREADY_DECOMMISSIONED,
        'Device is already decommissioned',
        HttpStatus.BAD_REQUEST,
      );
    }

    device.decommission();
    device.softDelete(deletedBy);
    const saved = await this.deviceRepo.save(device);

    this.eventDispatcher.publish(
      new DeviceDecommissionedEvent(saved.id, saved.serialNumber),
    );

    return saved;
  }
}
