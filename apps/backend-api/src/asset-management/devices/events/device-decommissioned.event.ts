import { DomainEvent } from '../../../shared/events/domain-event.base';

export class DeviceDecommissionedEvent extends DomainEvent {
  constructor(
    public readonly deviceId: string,
    public readonly serialNumber: string,
  ) {
    super('DeviceDecommissioned', deviceId);
  }
}
