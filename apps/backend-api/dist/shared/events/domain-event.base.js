"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
class DomainEvent {
    constructor(eventName, aggregateId) {
        this.eventName = eventName;
        this.occurredAt = new Date();
        this.aggregateId = aggregateId;
    }
}
exports.DomainEvent = DomainEvent;
//# sourceMappingURL=domain-event.base.js.map