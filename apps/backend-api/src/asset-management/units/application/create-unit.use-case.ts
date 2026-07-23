import { Inject, HttpStatus } from '@nestjs/common';
import { IUnitRepository } from '../domain/unit.repository.interface';
import { Unit } from '../domain/unit.entity';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';
import { UnitCreatedEvent } from '../events/unit-created.event';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';

export class CreateUnitUseCase {
  constructor(
    @Inject('IUnitRepository') private unitRepo: IUnitRepository,
    @Inject('IEventDispatcher') private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(input: {
    symbol: string;
    name: string;
    category: string;
    siEquivalent?: string;
    conversionMetadata?: Record<string, any>;
    precisionDefaults?: Record<string, any>;
    status?: 'ACTIVE' | 'DEPRECATED' | 'ARCHIVED';
    createdBy?: string;
  }) {
    const existing = await this.unitRepo.findBySymbol(input.symbol);
    if (existing) {
      throw new AppException(
        ErrorCodes.UNIT_SYMBOL_ALREADY_EXISTS,
        'Unit symbol already exists',
        HttpStatus.CONFLICT,
      );
    }

    const unit = new Unit({
      symbol: input.symbol,
      name: input.name,
      category: input.category,
      siEquivalent: input.siEquivalent || null,
      conversionMetadata: input.conversionMetadata || null,
      precisionDefaults: input.precisionDefaults || null,
      status: input.status || 'ACTIVE',
      createdBy: input.createdBy,
    });

    const saved = await this.unitRepo.save(unit);

    this.eventDispatcher.publish(
      new UnitCreatedEvent(saved.id, saved.symbol, saved.name, saved.category),
    );

    return saved;
  }
}
