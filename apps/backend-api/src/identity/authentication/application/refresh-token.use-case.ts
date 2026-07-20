import { Inject, HttpStatus } from '@nestjs/common';
import { ITokenManager } from '../domain/token.service';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

export class RefreshTokenUseCase {
  constructor(@Inject('ITokenManager') private tokenManager: ITokenManager) {}

  async execute(refreshToken: string) {
    try {
      return await this.tokenManager.rotateRefreshToken(refreshToken);
    } catch (error) {
      throw new AppException(
        ErrorCodes.INVALID_REFRESH_TOKEN,
        'Invalid or expired refresh token',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
