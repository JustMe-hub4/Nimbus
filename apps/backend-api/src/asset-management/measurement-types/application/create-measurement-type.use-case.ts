import { Inject, HttpStatus } from '@nestjs/common';
import { IMeasurementTypeRepository } from '../domain/measurement-type.repository.interface';
import { IUnitRepository } from '../../units/domain/unit.repository.interface';
import { MeasurementType } from '../domain/measurement-type.entity';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';
import { MeasurementTypeCreatedEvent } from '../events/measurement-type-created.event';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';

export class CreateMeasurementTypeUseCase {
  constructor(
    @Inject('IMeasurementTypeRepository') private mtRepo: IMeasurementTypeRepository,
    @Inject('IUnitRepository') private unitRepo: IUnitRepository,
    @Inject('IEventDispatcher') private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(input: {
    code: string;
    name: string;
    description?: string;
    category: string;
    defaultUnitId: string;
    minValue?: number;
    maxValue?: number;
    precision?: number;
    aggregationStrategy?: 'AVG' | 'MAX' | 'MIN' | 'LAST' | 'SUM';
    semanticDescription?: string;
    embeddingEligible?: boolean;
    knowledgePriority?: number;
    createdBy?: string;
  }) {
    // Check code uniqueness
    const existing = await this.mtRepo.findByName(input.code);
    if (existing) {
      throw new AppException(
        ErrorCodes.MEASUREMENT_TYPE_ALREADY_EXISTS,
        'Measurement type code already exists',
        HttpStatus.CONFLICT,
      );
    }

    // Check unit exists
    const unit = await this.unitRepo.findById(input.defaultUnitId);
    if (!unit) {
      throw new AppException(ErrorCodes.UNIT_NOT_FOUND, 'Default unit not found', HttpStatus.NOT_FOUND);
    }

    // Validate min <= max
    if (input.minValue !== undefined && input.maxValue !== undefined && input.minValue > input.maxValue) {
      throw new AppException(
        ErrorCodes.VALIDATION_FAILED,
        'Minimum value must be less than or equal to maximum value',
        HttpStatus.BAD_REQUEST,
      );
    }

    const mt = new MeasurementType({
      code: input.code,
      name: input.name,
      description: input.description || null,
      category: input.category,
      defaultUnitId: input.defaultUnitId,
      minValue: input.minValue ?? null,
      maxValue: input.maxValue ?? null,
      precision: input.precision || null,
      aggregationStrategy: input.aggregationStrategy || null,
      semanticDescription: input.semanticDescription || null,
      embeddingEligible: input.embeddingEligible ?? false,
      knowledgePriority: input.knowledgePriority ?? 0,
      createdBy: input.createdBy,
    });

    const saved = await this.mtRepo.save(mt);

    this.eventDispatcher.publish(
      new MeasurementTypeCreatedEvent(saved.id, saved.code, saved.name, saved.category, saved.defaultUnitId),
    );

    return saved;
  }
}
