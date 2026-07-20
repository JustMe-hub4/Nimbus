import { DomainEvent } from '../../../shared/events/domain-event.base';

export class DeviceRenamedEvent extends DomainEvent {
  constructor(
    public readonly deviceId: string,
    public readonly oldName: string,
    public readonly newName: string,
  ) {
    super('DeviceRenamed', deviceId);
  }
}
