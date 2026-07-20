import { DomainEvent } from './domain-event.base';

export interface IEventDispatcher {
  publish(event: DomainEvent): void;
  publishAll(events: DomainEvent[]): void;
}
