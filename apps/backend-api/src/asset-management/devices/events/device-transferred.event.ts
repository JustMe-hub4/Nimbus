import { DomainEvent } from '../../../shared/events/domain-event.base';

export class DeviceTransferredEvent extends DomainEvent {
  constructor(
    public readonly deviceId: string,
    public readonly oldStationId: string,
    public readonly newStationId: string,
    public readonly oldOrganizationId: string,
    public readonly newOrganizationId: string,
  ) {
    super('DeviceTransferred', deviceId);
  }
}
