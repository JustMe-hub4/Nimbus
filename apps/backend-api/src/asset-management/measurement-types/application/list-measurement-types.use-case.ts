import { Inject } from '@nestjs/common';
import { IMeasurementTypeRepository } from '../domain/measurement-type.repository.interface';

export class ListMeasurementTypesUseCase {
  constructor(@Inject('IMeasurementTypeRepository') private mtRepo: IMeasurementTypeRepository) {}

  async execute(category?: string) {
    return this.mtRepo.findAll(category);
  }
}
