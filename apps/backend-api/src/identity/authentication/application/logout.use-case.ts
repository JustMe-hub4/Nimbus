import { Inject, HttpStatus } from '@nestjs/common';
import { ITokenManager } from '../domain/token.service';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

export class LogoutUseCase {
  constructor(@Inject('ITokenManager') private tokenManager: ITokenManager) {}

  async execute(refreshToken: string) {
    try {
      await this.tokenManager.revokeRefreshToken(refreshToken);
    } catch (error) {
      throw new AppException(
        ErrorCodes.INVALID_REFRESH_TOKEN,
        'Invalid refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
