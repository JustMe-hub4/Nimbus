import { Inject, HttpStatus } from '@nestjs/common';
import { IStationRepository } from '../domain/station.repository.interface';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

export class GetStationUseCase {
  constructor(@Inject('IStationRepository') private stationRepo: IStationRepository) {}

  async execute(id: string) {
    const station = await this.stationRepo.findById(id);
    if (!station) {
      throw new AppException(ErrorCodes.STATION_NOT_FOUND, 'Station not found', HttpStatus.NOT_FOUND);
    }
    return station;
  }
}
