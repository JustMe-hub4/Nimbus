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
exports.LoginUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_mapper_1 = require("../../users/mappers/user.mapper");
const app_exception_1 = require("../../../shared/exceptions/app.exception");
const error_codes_1 = require("../../../shared/exceptions/error-codes");
let LoginUseCase = class LoginUseCase {
    constructor(userRepo, passwordHasher, tokenManager) {
        this.userRepo = userRepo;
        this.passwordHasher = passwordHasher;
        this.tokenManager = tokenManager;
    }
    async execute(email, password) {
        const user = await this.userRepo.findByEmail(email);
        if (!user || !user.isActive) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.INVALID_CREDENTIALS, 'Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        const valid = await this.passwordHasher.compare(password, user.passwordHash);
        if (!valid) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.INVALID_CREDENTIALS, 'Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        const accessToken = await this.tokenManager.generateAccessToken(user);
        const { token: refreshToken } = await this.tokenManager.generateRefreshToken(user);
        return {
            accessToken,
            refreshToken,
            user: user_mapper_1.UserMapper.toResponse(user),
        };
    }
};
exports.LoginUseCase = LoginUseCase;
exports.LoginUseCase = LoginUseCase = __decorate([
    __param(0, (0, common_1.Inject)('IUserRepository')),
    __param(1, (0, common_1.Inject)('IPasswordHasher')),
    __param(2, (0, common_1.Inject)('ITokenManager')),
    __metadata("design:paramtypes", [Object, Object, Object])
], LoginUseCase);
//# sourceMappingURL=login.use-case.js.map