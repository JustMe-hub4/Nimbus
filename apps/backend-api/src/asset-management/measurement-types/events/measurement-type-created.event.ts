import { DomainEvent } from '../../../shared/events/domain-event.base';

export class MeasurementTypeCreatedEvent extends DomainEvent {
  constructor(
    public readonly measurementTypeId: string,
    public readonly name: string,
    public readonly unit: string,
  ) {
    super('MeasurementTypeCreated', measurementTypeId);
  }
}
