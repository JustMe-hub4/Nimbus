import { User } from '../../users/domain/user.entity';

export interface ITokenManager {
  generateAccessToken(user: User): Promise<string>;
  generateRefreshToken(user: User): Promise<{ token: string; hash: string; expiresAt: Date }>;
  validateRefreshToken(rawToken: string): Promise<User>;
  revokeRefreshToken(rawToken: string): Promise<void>;
  rotateRefreshToken(rawToken: string): Promise<{ accessToken: string; refreshToken: string }>;
}
