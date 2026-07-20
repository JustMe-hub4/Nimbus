"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementTypeCreatedEvent = void 0;
const domain_event_base_1 = require("../../../shared/events/domain-event.base");
class MeasurementTypeCreatedEvent extends domain_event_base_1.DomainEvent {
    constructor(measurementTypeId, name, unit) {
        super('MeasurementTypeCreated', measurementTypeId);
        this.measurementTypeId = measurementTypeId;
        this.name = name;
        this.unit = unit;
    }
}
exports.MeasurementTypeCreatedEvent = MeasurementTypeCreatedEvent;
//# sourceMappingURL=measurement-type-created.event.js.map