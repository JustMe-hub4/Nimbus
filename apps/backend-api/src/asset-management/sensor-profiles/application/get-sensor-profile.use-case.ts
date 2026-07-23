import { Inject, HttpStatus } from '@nestjs/common';
import { ISensorProfileRepository } from '../domain/sensor-profile.repository.interface';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

export class GetSensorProfileUseCase {
  constructor(@Inject('ISensorProfileRepository') private profileRepo: ISensorProfileRepository) {}

  async execute(id: string) {
    const profile = await this.profileRepo.findById(id);
    if (!profile) {
      throw new AppException(ErrorCodes.PROFILE_NOT_FOUND, 'Sensor profile not found', HttpStatus.NOT_FOUND);
    }
    return profile;
  }
}
