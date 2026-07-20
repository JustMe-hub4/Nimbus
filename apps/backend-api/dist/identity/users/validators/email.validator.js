"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidator = void 0;
class EmailValidator {
    static isValid(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    static validate(email) {
        if (!this.isValid(email)) {
            throw new Error('Invalid email format');
        }
    }
}
exports.EmailValidator = EmailValidator;
//# sourceMappingURL=email.validator.js.map