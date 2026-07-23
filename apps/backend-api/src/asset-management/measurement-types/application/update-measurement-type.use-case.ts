import { Inject, HttpStatus } from '@nestjs/common';
import { IMeasurementTypeRepository } from '../domain/measurement-type.repository.interface';
import { IUnitRepository } from '../../units/domain/unit.repository.interface';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

export class UpdateMeasurementTypeUseCase {
  constructor(
    @Inject('IMeasurementTypeRepository') private mtRepo: IMeasurementTypeRepository,
    @Inject('IUnitRepository') private unitRepo: IUnitRepository,
  ) {}

  async execute(
    id: string,
    updates: {
      name?: string;
      description?: string;
      category?: string;
      defaultUnitId?: string;
      minValue?: number;
      maxValue?: number;
      precision?: number;
      aggregationStrategy?: 'AVG' | 'MAX' | 'MIN' | 'LAST' | 'SUM';
      semanticDescription?: string;
      embeddingEligible?: boolean;
      knowledgePriority?: number;
    },
    updatedBy?: string,
  ) {
    const mt = await this.mtRepo.findById(id);
    if (!mt) {
      throw new AppException(ErrorCodes.MEASUREMENT_TYPE_NOT_FOUND, 'Measurement type not found', HttpStatus.NOT_FOUND);
    }

    // Check name uniqueness if changed
    if (updates.name && updates.name !== mt.name) {
      const existing = await this.mtRepo.findByName(updates.name);
      if (existing) {
        throw new AppException(
          ErrorCodes.MEASUREMENT_TYPE_ALREADY_EXISTS,
          'Measurement type name already exists',
          HttpStatus.CONFLICT,
        );
      }
      mt.name = updates.name;
    }

    // Check default unit exists if changed
    if (updates.defaultUnitId && updates.defaultUnitId !== mt.defaultUnitId) {
      const unit = await this.unitRepo.findById(updates.defaultUnitId);
      if (!unit) {
        throw new AppException(ErrorCodes.UNIT_NOT_FOUND, 'Default unit not found', HttpStatus.NOT_FOUND);
      }
      mt.defaultUnitId = updates.defaultUnitId;
    }

    // Validate min <= max if both provided
    if (updates.minValue !== undefined && updates.maxValue !== undefined && updates.minValue > updates.maxValue) {
      throw new AppException(
        ErrorCodes.VALIDATION_FAILED,
        'Minimum value must be less than or equal to maximum value',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (updates.description !== undefined) mt.description = updates.description;
    if (updates.category) mt.category = updates.category;
    if (updates.minValue !== undefined) mt.minValue = updates.minValue;
    if (updates.maxValue !== undefined) mt.maxValue = updates.maxValue;
    if (updates.precision !== undefined) mt.precision = updates.precision;
    if (updates.aggregationStrategy !== undefined) mt.aggregationStrategy = updates.aggregationStrategy;
    if (updates.semanticDescription !== undefined) mt.semanticDescription = updates.semanticDescription;
    if (updates.embeddingEligible !== undefined) mt.embeddingEligible = updates.embeddingEligible;
    if (updates.knowledgePriority !== undefined) mt.knowledgePriority = updates.knowledgePriority;

    mt.updatedBy = updatedBy;
    return this.mtRepo.save(mt);
  }
}
