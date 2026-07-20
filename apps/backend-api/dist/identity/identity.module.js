"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const ioredis_1 = require("ioredis");
const passport_1 = require("@nestjs/passport");
const user_orm_entity_1 = require("./users/infrastructure/user.orm.entity");
const organization_orm_entity_1 = require("./organizations/infrastructure/organization.orm.entity");
const membership_orm_entity_1 = require("./memberships/infrastructure/membership.orm.entity");
const role_orm_entity_1 = require("./authorization/infrastructure/role.orm.entity");
const permission_orm_entity_1 = require("./authorization/infrastructure/permission.orm.entity");
const refresh_token_orm_entity_1 = require("./authentication/infrastructure/refresh-token.orm.entity");
const typeorm_user_repository_1 = require("./users/infrastructure/typeorm-user.repository");
const typeorm_organization_repository_1 = require("./organizations/infrastructure/typeorm-organization.repository");
const typeorm_membership_repository_1 = require("./memberships/infrastructure/typeorm-membership.repository");
const typeorm_role_repository_1 = require("./authorization/infrastructure/typeorm-role.repository");
const typeorm_permission_repository_1 = require("./authorization/infrastructure/typeorm-permission.repository");
const bcrypt_password_service_1 = require("./authentication/infrastructure/bcrypt-password.service");
const jwt_token_service_1 = require("./authentication/infrastructure/jwt-token.service");
const redis_permission_checker_service_1 = require("./authorization/infrastructure/redis-permission-checker.service");
const jwt_strategy_1 = require("./authentication/infrastructure/jwt.strategy");
const register_use_case_1 = require("./authentication/application/register.use-case");
const login_use_case_1 = require("./authentication/application/login.use-case");
const refresh_token_use_case_1 = require("./authentication/application/refresh-token.use-case");
const logout_use_case_1 = require("./authentication/application/logout.use-case");
const auth_controller_1 = require("./authentication/presentation/auth.controller");
const in_memory_event_dispatcher_1 = require("../shared/events/in-memory-event-dispatcher");
let IdentityModule = class IdentityModule {
};
exports.IdentityModule = IdentityModule;
exports.IdentityModule = IdentityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                user_orm_entity_1.UserOrmEntity,
                organization_orm_entity_1.OrganizationOrmEntity,
                membership_orm_entity_1.MembershipOrmEntity,
                role_orm_entity_1.RoleOrmEntity,
                permission_orm_entity_1.PermissionOrmEntity,
                refresh_token_orm_entity_1.RefreshTokenOrmEntity,
            ]),
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: (config) => ({
                    secret: config.get('JWT_SECRET'),
                    signOptions: { expiresIn: config.get('JWT_ACCESS_EXPIRY', '15m') },
                }),
                inject: [config_1.ConfigService],
            }),
            passport_1.PassportModule,
            config_1.ConfigModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            { provide: 'IUserRepository', useClass: typeorm_user_repository_1.TypeOrmUserRepository },
            { provide: 'IOrganizationRepository', useClass: typeorm_organization_repository_1.TypeOrmOrganizationRepository },
            { provide: 'IMembershipRepository', useClass: typeorm_membership_repository_1.TypeOrmMembershipRepository },
            { provide: 'IRoleRepository', useClass: typeorm_role_repository_1.TypeOrmRoleRepository },
            { provide: 'IPermissionRepository', useClass: typeorm_permission_repository_1.TypeOrmPermissionRepository },
            { provide: 'IPasswordHasher', useClass: bcrypt_password_service_1.BcryptPasswordService },
            { provide: 'ITokenManager', useClass: jwt_token_service_1.JwtTokenService },
            { provide: 'IPermissionChecker', useClass: redis_permission_checker_service_1.RedisPermissionChecker },
            {
                provide: 'RedisClient',
                useFactory: (config) => {
                    const url = config.get('REDIS_URL') || 'redis://localhost:6379';
                    return new ioredis_1.Redis(url);
                },
                inject: [config_1.ConfigService],
            },
            { provide: 'IEventDispatcher', useClass: in_memory_event_dispatcher_1.InMemoryEventDispatcher },
            register_use_case_1.RegisterUseCase,
            login_use_case_1.LoginUseCase,
            refresh_token_use_case_1.RefreshTokenUseCase,
            logout_use_case_1.LogoutUseCase,
            jwt_strategy_1.JwtStrategy,
        ],
        exports: ['IPermissionChecker', 'ITokenManager', 'IEventDispatcher'],
    })
], IdentityModule);
//# sourceMappingURL=identity.module.js.map