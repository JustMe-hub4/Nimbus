"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceRenamedEvent = void 0;
const domain_event_base_1 = require("../../../shared/events/domain-event.base");
class DeviceRenamedEvent extends domain_event_base_1.DomainEvent {
    constructor(deviceId, oldName, newName) {
        super('DeviceRenamed', deviceId);
        this.deviceId = deviceId;
        this.oldName = oldName;
        this.newName = newName;
    }
}
exports.DeviceRenamedEvent = DeviceRenamedEvent;
//# sourceMappingURL=device-renamed.event.js.map