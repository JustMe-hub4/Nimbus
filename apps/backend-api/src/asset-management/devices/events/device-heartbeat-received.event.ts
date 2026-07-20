import { DomainEvent } from '../../../shared/events/domain-event.base';

export class DeviceHeartbeatReceivedEvent extends DomainEvent {
  constructor(
    public readonly deviceId: string,
    public readonly heartbeatTimestamp: Date,
  ) {
    super('DeviceHeartbeatReceived', deviceId);
  }
}
