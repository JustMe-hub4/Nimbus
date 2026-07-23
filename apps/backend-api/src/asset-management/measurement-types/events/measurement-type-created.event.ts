import { DomainEvent } from '../../../shared/events/domain-event.base';

export class MeasurementTypeCreatedEvent extends DomainEvent {
  constructor(
    public readonly measurementTypeId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly category: string,
    public readonly defaultUnitId: string,
  ) {
    super('MeasurementTypeCreated', measurementTypeId);
  }
}
