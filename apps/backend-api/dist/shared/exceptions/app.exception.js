"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppException = void 0;
const common_1 = require("@nestjs/common");
class AppException extends common_1.HttpException {
    constructor(code, message, status = common_1.HttpStatus.INTERNAL_SERVER_ERROR, details) {
        super({ statusCode: status, code, message, details, timestamp: new Date().toISOString() }, status);
        this.code = code;
        this.details = details;
    }
}
exports.AppException = AppException;
//# sourceMappingURL=app.exception.js.map