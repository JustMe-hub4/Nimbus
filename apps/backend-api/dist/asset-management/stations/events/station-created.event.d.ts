import { DomainEvent } from '../../../shared/events/domain-event.base';
export declare class StationCreatedEvent extends DomainEvent {
    readonly stationId: string;
    readonly stationName: string;
    readonly organizationId: string;
    constructor(stationId: string, stationName: string, organizationId: string);
}
