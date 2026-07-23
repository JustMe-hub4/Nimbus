import { DomainEvent } from '../../../shared/events/domain-event.base';

export class UnitCreatedEvent extends DomainEvent {
  constructor(
    public readonly unitId: string,
    public readonly symbol: string,
    public readonly name: string,
    public readonly category: string,
  ) {
    super('UnitCreated', unitId);
  }
}
