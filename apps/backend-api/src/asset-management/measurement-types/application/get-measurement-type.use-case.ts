import { Inject, HttpStatus } from '@nestjs/common';
import { IMeasurementTypeRepository } from '../domain/measurement-type.repository.interface';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

export class GetMeasurementTypeUseCase {
  constructor(@Inject('IMeasurementTypeRepository') private repo: IMeasurementTypeRepository) {}

  async execute(id: string) {
    const measurementType = await this.repo.findById(id);
    if (!measurementType) {
      throw new AppException(
        ErrorCodes.MEASUREMENT_TYPE_NOT_FOUND,
        `Measurement type with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return measurementType;
  }
}
