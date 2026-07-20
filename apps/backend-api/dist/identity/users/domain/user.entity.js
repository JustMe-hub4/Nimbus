"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(props) {
        Object.assign(this, props);
    }
    deactivate() {
        this.isActive = false;
    }
    updateName(name) {
        this.fullName = name;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map