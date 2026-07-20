import { DomainEvent } from '../../../shared/events/domain-event.base';

export class UserRegisteredEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly organizationId: string,
  ) {
    super('UserRegistered', userId);
  }
}
