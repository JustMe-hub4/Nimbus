import { DomainEvent } from '../../../shared/events/domain-event.base';
export declare class DeviceRenamedEvent extends DomainEvent {
    readonly deviceId: string;
    readonly oldName: string;
    readonly newName: string;
    constructor(deviceId: string, oldName: string, newName: string);
}
