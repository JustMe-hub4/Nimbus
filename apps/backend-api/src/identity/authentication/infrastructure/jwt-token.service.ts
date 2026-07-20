import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/domain/user.entity';
import { RefreshTokenOrmEntity } from './refresh-token.orm.entity';
import { ITokenManager } from '../domain/token.service';
import * as crypto from 'crypto';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class JwtTokenService implements ITokenManager {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(RefreshTokenOrmEntity)
    private refreshTokenRepo: Repository<RefreshTokenOrmEntity>,
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get('JWT_ACCESS_EXPIRY', '15m'),
    });
  }

  async generateRefreshToken(user: User): Promise<{ token: string; hash: string; expiresAt: Date }> {
    const rawToken = uuidv7();
    const hash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + this.configService.get('REFRESH_TOKEN_DAYS', 7));

    const ormEntity = this.refreshTokenRepo.create({
      tokenHash: hash,
      user: { id: user.id } as any,
      expiresAt,
      revoked: false,
    });
    await this.refreshTokenRepo.save(ormEntity);

    return { token: rawToken, hash, expiresAt };
  }

  async validateRefreshToken(rawToken: string): Promise<User> {
    const hash = crypto.createHash('sha256').update(rawToken).digest('hex');
    const stored = await this.refreshTokenRepo.findOne({
      where: { tokenHash: hash, revoked: false },
      relations: { user: true },
    });
    if (!stored) throw new UnauthorizedException('Invalid refresh token');
    if (stored.expiresAt < new Date()) throw new UnauthorizedException('Refresh token expired');
    if (!stored.user.isActive) throw new UnauthorizedException('User inactive');
    return new User(stored.user);
  }

  async revokeRefreshToken(rawToken: string): Promise<void> {
    const hash = crypto.createHash('sha256').update(rawToken).digest('hex');
    await this.refreshTokenRepo.update({ tokenHash: hash }, { revoked: true });
  }

  async rotateRefreshToken(rawToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.validateRefreshToken(rawToken);
    await this.revokeRefreshToken(rawToken);
    const accessToken = await this.generateAccessToken(user);
    const { token: refreshToken } = await this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }
}
