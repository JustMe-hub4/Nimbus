import { DomainEvent } from '../../../shared/events/domain-event.base';
export declare class DeviceDecommissionedEvent extends DomainEvent {
    readonly deviceId: string;
    readonly serialNumber: string;
    constructor(deviceId: string, serialNumber: string);
}
