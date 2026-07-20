"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Station = void 0;
class Station {
    constructor(props) {
        Object.assign(this, props);
    }
    updateName(name) {
        this.name = name;
    }
    updateDescription(description) {
        this.description = description;
    }
    updateLocation(location) {
        this.location = location;
    }
    softDelete(deletedBy) {
        this.deletedAt = new Date();
        this.deletedBy = deletedBy;
    }
}
exports.Station = Station;
//# sourceMappingURL=station.entity.js.map