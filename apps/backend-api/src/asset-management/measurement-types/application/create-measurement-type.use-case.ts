import { Inject, HttpStatus } from '@nestjs/common';
import { IMeasurementTypeRepository } from '../domain/measurement-type.repository.interface';
import { MeasurementType } from '../domain/measurement-type.entity';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';
import { MeasurementTypeCreatedEvent } from '../events/measurement-type-created.event';

export class CreateMeasurementTypeUseCase {
  constructor(
    @Inject('IMeasurementTypeRepository') private repo: IMeasurementTypeRepository,
    @Inject('IEventDispatcher') private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(name: string, unit: string, minValue: number | null, maxValue: number | null, description: string | null, createdBy: string) {
    // Check if name already exists
    const existing = await this.repo.findByName(name);
    if (existing) {
      throw new AppException(
        ErrorCodes.MEASUREMENT_TYPE_ALREADY_EXISTS,
        `Measurement type "${name}" already exists`,
        HttpStatus.CONFLICT,
      );
    }

    // Domain validations can be added here (e.g., unit length, min <= max, etc.)
    if (minValue !== null && maxValue !== null && minValue > maxValue) {
      throw new AppException(
        ErrorCodes.VALIDATION_FAILED,
        'Minimum value must be less than or equal to maximum value',
        HttpStatus.BAD_REQUEST,
      );
    }

    const measurementType = new MeasurementType({
      name,
      unit,
      minValue,
      maxValue,
      description,
      createdBy,
    });

    const saved = await this.repo.save(measurementType);

    this.eventDispatcher.publish(new MeasurementTypeCreatedEvent(saved.id, saved.name, saved.unit));

    return saved;
  }
}
