import { Inject, HttpStatus } from '@nestjs/common';
import { IStationRepository } from '../domain/station.repository.interface';
import { Station } from '../domain/station.entity';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';
import { StationCreatedEvent } from '../events/station-created.event';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';

export class CreateStationUseCase {
  constructor(
    @Inject('IStationRepository') private stationRepo: IStationRepository,
    @Inject('IEventDispatcher') private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(
    name: string,
    organizationId: string,
    description?: string | null,
    location?: string | null,
    createdBy?: string,
  ) {
    if (!name) {
      throw new AppException(ErrorCodes.VALIDATION_FAILED, 'Station name is required', HttpStatus.BAD_REQUEST);
    }
    if (!organizationId) {
      throw new AppException(ErrorCodes.VALIDATION_FAILED, 'Organization ID is required', HttpStatus.BAD_REQUEST);
    }

    const station = new Station({
      name,
      description,
      location,
      organizationId,
      createdBy,
    });

    const saved = await this.stationRepo.save(station);

    this.eventDispatcher.publish(new StationCreatedEvent(saved.id, saved.name, saved.organizationId));

    return saved;
  }
}
