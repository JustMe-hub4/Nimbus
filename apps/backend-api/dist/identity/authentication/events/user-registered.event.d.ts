import { DomainEvent } from '../../../shared/events/domain-event.base';
export declare class UserRegisteredEvent extends DomainEvent {
    readonly userId: string;
    readonly email: string;
    readonly organizationId: string;
    constructor(userId: string, email: string, organizationId: string);
}
