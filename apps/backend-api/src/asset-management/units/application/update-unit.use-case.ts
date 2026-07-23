import { Inject, HttpStatus } from '@nestjs/common';
import { IUnitRepository } from '../domain/unit.repository.interface';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

export class UpdateUnitUseCase {
  constructor(@Inject('IUnitRepository') private unitRepo: IUnitRepository) {}

  async execute(
    id: string,
    updates: {
      symbol?: string;
      name?: string;
      category?: string;
      siEquivalent?: string;
      conversionMetadata?: Record<string, any>;
      precisionDefaults?: Record<string, any>;
      status?: 'ACTIVE' | 'DEPRECATED' | 'ARCHIVED';
    },
    updatedBy?: string,
  ) {
    const unit = await this.unitRepo.findById(id);
    if (!unit) {
      throw new AppException(ErrorCodes.UNIT_NOT_FOUND, 'Unit not found', HttpStatus.NOT_FOUND);
    }

    if (updates.symbol && updates.symbol !== unit.symbol) {
      const existing = await this.unitRepo.findBySymbol(updates.symbol);
      if (existing) {
        throw new AppException(
          ErrorCodes.UNIT_SYMBOL_ALREADY_EXISTS,
          'Unit symbol already exists',
          HttpStatus.CONFLICT,
        );
      }
      unit.symbol = updates.symbol;
    }

    if (updates.name) unit.name = updates.name;
    if (updates.category) unit.category = updates.category;
    if (updates.siEquivalent !== undefined) unit.siEquivalent = updates.siEquivalent;
    if (updates.conversionMetadata !== undefined) unit.conversionMetadata = updates.conversionMetadata;
    if (updates.precisionDefaults !== undefined) unit.precisionDefaults = updates.precisionDefaults;
    if (updates.status) unit.status = updates.status;

    unit.updatedBy = updatedBy;
    return this.unitRepo.save(unit);
  }
}
