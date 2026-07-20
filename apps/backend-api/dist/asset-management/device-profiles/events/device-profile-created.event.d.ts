import { DomainEvent } from '../../../shared/events/domain-event.base';
export declare class DeviceProfileCreatedEvent extends DomainEvent {
    readonly profileId: string;
    readonly name: string;
    readonly manufacturer: string | null;
    readonly model: string | null;
    constructor(profileId: string, name: string, manufacturer: string | null, model: string | null);
}
