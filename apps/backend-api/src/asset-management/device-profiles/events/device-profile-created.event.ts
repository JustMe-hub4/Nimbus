import { DomainEvent } from '../../../shared/events/domain-event.base';

export class DeviceProfileCreatedEvent extends DomainEvent {
  constructor(
    public readonly profileId: string,
    public readonly name: string,
    public readonly manufacturer: string | null,
    public readonly model: string | null,
  ) {
    super('DeviceProfileCreated', profileId);
  }
}
