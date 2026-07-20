"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StationCreatedEvent = void 0;
const domain_event_base_1 = require("../../../shared/events/domain-event.base");
class StationCreatedEvent extends domain_event_base_1.DomainEvent {
    constructor(stationId, stationName, organizationId) {
        super('StationCreated', stationId);
        this.stationId = stationId;
        this.stationName = stationName;
        this.organizationId = organizationId;
    }
}
exports.StationCreatedEvent = StationCreatedEvent;
//# sourceMappingURL=station-created.event.js.map