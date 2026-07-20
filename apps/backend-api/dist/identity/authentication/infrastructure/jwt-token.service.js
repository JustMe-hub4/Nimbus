"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../../users/domain/user.entity");
const refresh_token_orm_entity_1 = require("./refresh-token.orm.entity");
const crypto = require("crypto");
const uuid_1 = require("uuid");
let JwtTokenService = class JwtTokenService {
    constructor(jwtService, configService, refreshTokenRepo) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.refreshTokenRepo = refreshTokenRepo;
    }
    async generateAccessToken(user) {
        const payload = { sub: user.id, email: user.email };
        return this.jwtService.signAsync(payload, {
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRY', '15m'),
        });
    }
    async generateRefreshToken(user) {
        const rawToken = (0, uuid_1.v7)();
        const hash = crypto.createHash('sha256').update(rawToken).digest('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + this.configService.get('REFRESH_TOKEN_DAYS', 7));
        const ormEntity = this.refreshTokenRepo.create({
            tokenHash: hash,
            user: { id: user.id },
            expiresAt,
            revoked: false,
        });
        await this.refreshTokenRepo.save(ormEntity);
        return { token: rawToken, hash, expiresAt };
    }
    async validateRefreshToken(rawToken) {
        const hash = crypto.createHash('sha256').update(rawToken).digest('hex');
        const stored = await this.refreshTokenRepo.findOne({
            where: { tokenHash: hash, revoked: false },
            relations: { user: true },
        });
        if (!stored)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        if (stored.expiresAt < new Date())
            throw new common_1.UnauthorizedException('Refresh token expired');
        if (!stored.user.isActive)
            throw new common_1.UnauthorizedException('User inactive');
        return new user_entity_1.User(stored.user);
    }
    async revokeRefreshToken(rawToken) {
        const hash = crypto.createHash('sha256').update(rawToken).digest('hex');
        await this.refreshTokenRepo.update({ tokenHash: hash }, { revoked: true });
    }
    async rotateRefreshToken(rawToken) {
        const user = await this.validateRefreshToken(rawToken);
        await this.revokeRefreshToken(rawToken);
        const accessToken = await this.generateAccessToken(user);
        const { token: refreshToken } = await this.generateRefreshToken(user);
        return { accessToken, refreshToken };
    }
};
exports.JwtTokenService = JwtTokenService;
exports.JwtTokenService = JwtTokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(refresh_token_orm_entity_1.RefreshTokenOrmEntity)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_2.Repository])
], JwtTokenService);
//# sourceMappingURL=jwt-token.service.js.map