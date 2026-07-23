import { Inject } from '@nestjs/common';
import { IUnitRepository } from '../domain/unit.repository.interface';

export class ListUnitsUseCase {
  constructor(@Inject('IUnitRepository') private unitRepo: IUnitRepository) {}

  async execute(activeOnly: boolean = false) {
    return this.unitRepo.findAll(activeOnly);
  }
}
