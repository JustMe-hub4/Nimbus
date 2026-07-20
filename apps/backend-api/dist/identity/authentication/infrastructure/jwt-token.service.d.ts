import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '../../users/domain/user.entity';
import { RefreshTokenOrmEntity } from './refresh-token.orm.entity';
import { ITokenManager } from '../domain/token.service';
export declare class JwtTokenService implements ITokenManager {
    private jwtService;
    private configService;
    private refreshTokenRepo;
    constructor(jwtService: JwtService, configService: ConfigService, refreshTokenRepo: Repository<RefreshTokenOrmEntity>);
    generateAccessToken(user: User): Promise<string>;
    generateRefreshToken(user: User): Promise<{
        token: string;
        hash: string;
        expiresAt: Date;
    }>;
    validateRefreshToken(rawToken: string): Promise<User>;
    revokeRefreshToken(rawToken: string): Promise<void>;
    rotateRefreshToken(rawToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
