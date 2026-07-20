"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceProfileCreatedEvent = void 0;
const domain_event_base_1 = require("../../../shared/events/domain-event.base");
class DeviceProfileCreatedEvent extends domain_event_base_1.DomainEvent {
    constructor(profileId, name, manufacturer, model) {
        super('DeviceProfileCreated', profileId);
        this.profileId = profileId;
        this.name = name;
        this.manufacturer = manufacturer;
        this.model = model;
    }
}
exports.DeviceProfileCreatedEvent = DeviceProfileCreatedEvent;
//# sourceMappingURL=device-profile-created.event.js.map