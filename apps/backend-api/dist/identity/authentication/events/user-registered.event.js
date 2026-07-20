"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisteredEvent = void 0;
const domain_event_base_1 = require("../../../shared/events/domain-event.base");
class UserRegisteredEvent extends domain_event_base_1.DomainEvent {
    constructor(userId, email, organizationId) {
        super('UserRegistered', userId);
        this.userId = userId;
        this.email = email;
        this.organizationId = organizationId;
    }
}
exports.UserRegisteredEvent = UserRegisteredEvent;
//# sourceMappingURL=user-registered.event.js.map