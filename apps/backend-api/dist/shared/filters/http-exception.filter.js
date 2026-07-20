"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const app_exception_1 = require("../exceptions/app.exception");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let code = 'INTERNAL_SERVER_ERROR';
        let message = 'Internal server error';
        let details = undefined;
        if (exception instanceof app_exception_1.AppException) {
            const ex = exception.getResponse();
            status = exception.getStatus();
            code = ex.code || code;
            message = ex.message || message;
            details = ex.details;
        }
        else if (exception instanceof common_1.UnauthorizedException) {
            status = common_1.HttpStatus.UNAUTHORIZED;
            code = 'UNAUTHORIZED';
            message = 'Invalid or missing token';
        }
        else if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exResponse = exception.getResponse();
            message = typeof exResponse === 'string' ? exResponse : exResponse.message || message;
            details = exResponse.details;
        }
        else if (exception instanceof Error) {
            message = exception.message;
        }
        response.status(status).json({
            statusCode: status,
            code,
            message,
            details,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
//# sourceMappingURL=http-exception.filter.js.map