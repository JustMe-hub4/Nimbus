export declare abstract class DomainEvent {
    readonly eventName: string;
    readonly occurredAt: Date;
    readonly aggregateId: string;
    constructor(eventName: string, aggregateId: string);
}
