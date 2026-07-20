"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementType = void 0;
class MeasurementType {
    constructor(props) {
        Object.assign(this, props);
    }
    updateName(name) {
        this.name = name;
    }
    updateUnit(unit) {
        this.unit = unit;
    }
    updateRange(min, max) {
        this.minValue = min;
        this.maxValue = max;
    }
    updateDescription(description) {
        this.description = description;
    }
}
exports.MeasurementType = MeasurementType;
//# sourceMappingURL=measurement-type.entity.js.map