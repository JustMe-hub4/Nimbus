import { DomainEvent } from '../../../shared/events/domain-event.base';
export declare class DeviceRegisteredEvent extends DomainEvent {
    readonly deviceId: string;
    readonly serialNumber: string;
    readonly name: string;
    readonly organizationId: string;
    readonly stationId: string;
    constructor(deviceId: string, serialNumber: string, name: string, organizationId: string, stationId: string);
}
