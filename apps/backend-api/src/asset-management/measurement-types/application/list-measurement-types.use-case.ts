import { Inject } from '@nestjs/common';
import { IMeasurementTypeRepository } from '../domain/measurement-type.repository.interface';

export class ListMeasurementTypesUseCase {
  constructor(@Inject('IMeasurementTypeRepository') private repo: IMeasurementTypeRepository) {}

  async execute() {
    return this.repo.findAll();
  }
}
