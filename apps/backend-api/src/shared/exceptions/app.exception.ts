import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(
    public readonly code: string,
    message: string,
    status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    public readonly details?: any,
  ) {
    super({ statusCode: status, code, message, details, timestamp: new Date().toISOString() }, status);
  }
}
