"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidator = void 0;
class PasswordValidator {
    static isStrong(password) {
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    }
    static validate(password) {
        if (!this.isStrong(password)) {
            throw new Error('Password too weak');
        }
    }
}
exports.PasswordValidator = PasswordValidator;
//# sourceMappingURL=password.validator.js.map