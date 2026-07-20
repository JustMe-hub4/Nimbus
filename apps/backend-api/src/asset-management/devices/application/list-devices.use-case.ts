import { Inject } from '@nestjs/common';
import { IDeviceRepository } from '../domain/device.repository.interface';

export class ListDevicesUseCase {
  constructor(@Inject('IDeviceRepository') private deviceRepo: IDeviceRepository) {}

  async execute(filters?: { organizationId?: string; stationId?: string }) {
    if (filters?.stationId) {
      return this.deviceRepo.findByStation(filters.stationId);
    }
    if (filters?.organizationId) {
      return this.deviceRepo.findByOrganization(filters.organizationId);
    }
    return this.deviceRepo.findAll();
  }
}
