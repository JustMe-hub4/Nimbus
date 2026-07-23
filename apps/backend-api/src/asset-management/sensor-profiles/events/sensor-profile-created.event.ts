import { DomainEvent } from '../../../shared/events/domain-event.base';

export class SensorProfileCreatedEvent extends DomainEvent {
  constructor(
    public readonly profileId: string,
    public readonly name: string,
    public readonly manufacturer: string | null,
    public readonly model: string | null,
  ) {
    super('SensorProfileCreated', profileId);
  }
}
