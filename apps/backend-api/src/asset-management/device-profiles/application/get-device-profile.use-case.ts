import { Inject, HttpStatus } from '@nestjs/common';
import { IDeviceProfileRepository } from '../domain/device-profile.repository.interface';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

export class GetDeviceProfileUseCase {
  constructor(@Inject('IDeviceProfileRepository') private profileRepo: IDeviceProfileRepository) {}

  async execute(id: string) {
    const profile = await this.profileRepo.findById(id);
    if (!profile) {
      throw new AppException(ErrorCodes.PROFILE_NOT_FOUND, 'Device profile not found', HttpStatus.NOT_FOUND);
    }
    return profile;
  }
}
