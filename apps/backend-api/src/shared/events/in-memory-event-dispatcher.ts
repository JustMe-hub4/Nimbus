import { Injectable } from '@nestjs/common';
import { IEventDispatcher } from './event-dispatcher.interface';
import { DomainEvent } from './domain-event.base';

@Injectable()
export class InMemoryEventDispatcher implements IEventDispatcher {
  private readonly handlers: ((event: DomainEvent) => void)[] = [];

  register(handler: (event: DomainEvent) => void): void {
    this.handlers.push(handler);
  }

  publish(event: DomainEvent): void {
    this.handlers.forEach(handler => handler(event));
  }

  publishAll(events: DomainEvent[]): void {
    events.forEach(event => this.publish(event));
  }
}
