import { Inject, HttpStatus } from '@nestjs/common';
import { IUnitRepository } from '../domain/unit.repository.interface';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

export class GetUnitUseCase {
  constructor(@Inject('IUnitRepository') private unitRepo: IUnitRepository) {}

  async execute(id: string) {
    const unit = await this.unitRepo.findById(id);
    if (!unit) {
      throw new AppException(ErrorCodes.UNIT_NOT_FOUND, 'Unit not found', HttpStatus.NOT_FOUND);
    }
    return unit;
  }
}
