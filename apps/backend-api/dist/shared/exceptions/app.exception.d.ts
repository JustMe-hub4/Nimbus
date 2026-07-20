import { HttpException, HttpStatus } from '@nestjs/common';
export declare class AppException extends HttpException {
    readonly code: string;
    readonly details?: any;
    constructor(code: string, message: string, status?: HttpStatus, details?: any);
}
