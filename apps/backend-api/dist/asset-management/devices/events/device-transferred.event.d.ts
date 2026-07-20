import { DomainEvent } from '../../../shared/events/domain-event.base';
export declare class DeviceTransferredEvent extends DomainEvent {
    readonly deviceId: string;
    readonly oldStationId: string;
    readonly newStationId: string;
    readonly oldOrganizationId: string;
    readonly newOrganizationId: string;
    constructor(deviceId: string, oldStationId: string, newStationId: string, oldOrganizationId: string, newOrganizationId: string);
}
