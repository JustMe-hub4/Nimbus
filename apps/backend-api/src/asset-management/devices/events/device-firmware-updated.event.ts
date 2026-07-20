import { DomainEvent } from '../../../shared/events/domain-event.base';

export class DeviceFirmwareUpdatedEvent extends DomainEvent {
  constructor(
    public readonly deviceId: string,
    public readonly oldVersion: string | null,
    public readonly newVersion: string,
  ) {
    super('DeviceFirmwareUpdated', deviceId);
  }
}
