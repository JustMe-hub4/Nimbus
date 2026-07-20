import { IEventDispatcher } from './event-dispatcher.interface';
import { DomainEvent } from './domain-event.base';
export declare class InMemoryEventDispatcher implements IEventDispatcher {
    private readonly handlers;
    register(handler: (event: DomainEvent) => void): void;
    publish(event: DomainEvent): void;
    publishAll(events: DomainEvent[]): void;
}
