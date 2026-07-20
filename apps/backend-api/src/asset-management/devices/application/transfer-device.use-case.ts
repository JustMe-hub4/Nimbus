import { Inject, HttpStatus } from '@nestjs/common';
import { IDeviceRepository } from '../domain/device.repository.interface';
import { IStationRepository } from '../../stations/domain/station.repository.interface';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';
import { DeviceTransferredEvent } from '../events/device-transferred.event';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';

export class TransferDeviceUseCase {
  constructor(
    @Inject('IDeviceRepository') private deviceRepo: IDeviceRepository,
    @Inject('IStationRepository') private stationRepo: IStationRepository,
    @Inject('IEventDispatcher') private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(
    deviceId: string,
    newStationId: string,
    newOrganizationId: string,
    updatedBy?: string,
  ) {
    const device = await this.deviceRepo.findById(deviceId);
    if (!device) {
      throw new AppException(ErrorCodes.DEVICE_NOT_FOUND, 'Device not found', HttpStatus.NOT_FOUND);
    }

    if (device.deletedAt) {
      throw new AppException(
        ErrorCodes.DEVICE_ALREADY_DECOMMISSIONED,
        'Cannot transfer a decommissioned device',
        HttpStatus.BAD_REQUEST,
      );
    }

    const station = await this.stationRepo.findById(newStationId);
    if (!station) {
      throw new AppException(ErrorCodes.STATION_NOT_FOUND, 'New station not found', HttpStatus.NOT_FOUND);
    }
    if (station.organizationId !== newOrganizationId) {
      throw new AppException(
        ErrorCodes.VALIDATION_FAILED,
        'Station does not belong to the specified organization',
        HttpStatus.BAD_REQUEST,
      );
    }

    const oldStationId = device.stationId;
    const oldOrganizationId = device.organizationId;

    device.transfer(newStationId, newOrganizationId);
    device.updatedBy = updatedBy;
    const saved = await this.deviceRepo.save(device);

    this.eventDispatcher.publish(
      new DeviceTransferredEvent(
        saved.id,
        oldStationId,
        newStationId,
        oldOrganizationId,
        newOrganizationId,
      ),
    );

    return saved;
  }
}
