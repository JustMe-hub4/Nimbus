import { DomainEvent } from '../../../shared/events/domain-event.base';
export declare class DeviceHeartbeatReceivedEvent extends DomainEvent {
    readonly deviceId: string;
    readonly heartbeatTimestamp: Date;
    constructor(deviceId: string, heartbeatTimestamp: Date);
}
