import { Inject } from '@nestjs/common';
import { ISensorProfileRepository } from '../domain/sensor-profile.repository.interface';

export class ListSensorProfilesUseCase {
  constructor(@Inject('ISensorProfileRepository') private profileRepo: ISensorProfileRepository) {}

  async execute() {
    return this.profileRepo.findAll();
  }
}
