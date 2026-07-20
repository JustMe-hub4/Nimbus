import { Inject } from '@nestjs/common';
import { IDeviceProfileRepository } from '../domain/device-profile.repository.interface';

export class ListDeviceProfilesUseCase {
  constructor(@Inject('IDeviceProfileRepository') private profileRepo: IDeviceProfileRepository) {}

  async execute() {
    return this.profileRepo.findAll();
  }
}
