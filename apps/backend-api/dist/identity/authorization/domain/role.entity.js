"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
class Role {
    constructor(props) {
        Object.assign(this, props);
        this.permissions = props.permissions || [];
    }
}
exports.Role = Role;
//# sourceMappingURL=role.entity.js.map