import { DomainEvent } from '../../../shared/events/domain-event.base';
export declare class DeviceFirmwareUpdatedEvent extends DomainEvent {
    readonly deviceId: string;
    readonly oldVersion: string | null;
    readonly newVersion: string;
    constructor(deviceId: string, oldVersion: string | null, newVersion: string);
}
