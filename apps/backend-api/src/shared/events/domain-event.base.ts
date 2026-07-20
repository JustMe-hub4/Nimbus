export abstract class DomainEvent {
  public readonly eventName: string;
  public readonly occurredAt: Date;
  public readonly aggregateId: string;

  constructor(eventName: string, aggregateId: string) {
    this.eventName = eventName;
    this.occurredAt = new Date();
    this.aggregateId = aggregateId;
  }
}
