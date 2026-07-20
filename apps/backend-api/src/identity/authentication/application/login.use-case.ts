import { Inject, HttpStatus } from '@nestjs/common';
import { IUserRepository } from '../../users/domain/user.repository.interface';
import { IPasswordHasher } from '../domain/password.service';
import { ITokenManager } from '../domain/token.service';
import { UserMapper } from '../../users/mappers/user.mapper';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

export class LoginUseCase {
  constructor(
    @Inject('IUserRepository') private userRepo: IUserRepository,
    @Inject('IPasswordHasher') private passwordHasher: IPasswordHasher,
    @Inject('ITokenManager') private tokenManager: ITokenManager,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !user.isActive) {
      throw new AppException(
        ErrorCodes.INVALID_CREDENTIALS,
        'Invalid credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const valid = await this.passwordHasher.compare(password, user.passwordHash);
    if (!valid) {
      throw new AppException(
        ErrorCodes.INVALID_CREDENTIALS,
        'Invalid credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const accessToken = await this.tokenManager.generateAccessToken(user);
    const { token: refreshToken } = await this.tokenManager.generateRefreshToken(user);

    return {
      accessToken,
      refreshToken,
      user: UserMapper.toResponse(user),
    };
  }
}
