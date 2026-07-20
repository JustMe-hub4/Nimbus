import { DomainEvent } from '../../../shared/events/domain-event.base';

export class DeviceRegisteredEvent extends DomainEvent {
  constructor(
    public readonly deviceId: string,
    public readonly serialNumber: string,
    public readonly name: string,
    public readonly organizationId: string,
    public readonly stationId: string,
  ) {
    super('DeviceRegistered', deviceId);
  }
}
