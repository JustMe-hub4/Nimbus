import { Inject } from '@nestjs/common';
import { IStationRepository } from '../domain/station.repository.interface';

export class ListStationsUseCase {
  constructor(@Inject('IStationRepository') private stationRepo: IStationRepository) {}

  async execute(organizationId?: string) {
    if (organizationId) {
      return this.stationRepo.findByOrganization(organizationId);
    }
    return this.stationRepo.findAll();
  }
}
