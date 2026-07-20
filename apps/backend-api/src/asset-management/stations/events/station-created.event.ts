import { DomainEvent } from '../../../shared/events/domain-event.base';

export class StationCreatedEvent extends DomainEvent {
  constructor(
    public readonly stationId: string,
    public readonly stationName: string,
    public readonly organizationId: string,
  ) {
    super('StationCreated', stationId);
  }
}
