import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Redis } from 'ioredis';
import { PassportModule } from '@nestjs/passport';

// Entities (ORM)
import { UserOrmEntity } from './users/infrastructure/user.orm.entity';
import { OrganizationOrmEntity } from './organizations/infrastructure/organization.orm.entity';
import { MembershipOrmEntity } from './memberships/infrastructure/membership.orm.entity';
import { RoleOrmEntity } from './authorization/infrastructure/role.orm.entity';
import { PermissionOrmEntity } from './authorization/infrastructure/permission.orm.entity';
import { RefreshTokenOrmEntity } from './authentication/infrastructure/refresh-token.orm.entity';

// Repositories
import { TypeOrmUserRepository } from './users/infrastructure/typeorm-user.repository';
import { TypeOrmOrganizationRepository } from './organizations/infrastructure/typeorm-organization.repository';
import { TypeOrmMembershipRepository } from './memberships/infrastructure/typeorm-membership.repository';
import { TypeOrmRoleRepository } from './authorization/infrastructure/typeorm-role.repository';
import { TypeOrmPermissionRepository } from './authorization/infrastructure/typeorm-permission.repository';

// Services
import { BcryptPasswordService } from './authentication/infrastructure/bcrypt-password.service';
import { JwtTokenService } from './authentication/infrastructure/jwt-token.service';
import { RedisPermissionChecker } from './authorization/infrastructure/redis-permission-checker.service';
import { JwtStrategy } from './authentication/infrastructure/jwt.strategy';

// Use Cases
import { RegisterUseCase } from './authentication/application/register.use-case';
import { LoginUseCase } from './authentication/application/login.use-case';
import { RefreshTokenUseCase } from './authentication/application/refresh-token.use-case';
import { LogoutUseCase } from './authentication/application/logout.use-case';

// Controllers
import { AuthController } from './authentication/presentation/auth.controller';

// Events
import { InMemoryEventDispatcher } from '../shared/events/in-memory-event-dispatcher';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserOrmEntity,
      OrganizationOrmEntity,
      MembershipOrmEntity,
      RoleOrmEntity,
      PermissionOrmEntity,
      RefreshTokenOrmEntity,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_ACCESS_EXPIRY', '15m') },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    // Repository implementations
    { provide: 'IUserRepository', useClass: TypeOrmUserRepository },
    { provide: 'IOrganizationRepository', useClass: TypeOrmOrganizationRepository },
    { provide: 'IMembershipRepository', useClass: TypeOrmMembershipRepository },
    { provide: 'IRoleRepository', useClass: TypeOrmRoleRepository },
    { provide: 'IPermissionRepository', useClass: TypeOrmPermissionRepository },

    // Services
    { provide: 'IPasswordHasher', useClass: BcryptPasswordService },
    { provide: 'ITokenManager', useClass: JwtTokenService },
    { provide: 'IPermissionChecker', useClass: RedisPermissionChecker },

    // Redis client
    {
      provide: 'RedisClient',
      useFactory: (config: ConfigService) => {
        const url = config.get('REDIS_URL') || 'redis://localhost:6379';
        return new Redis(url);
      },
      inject: [ConfigService],
    },

    // Event dispatcher
    { provide: 'IEventDispatcher', useClass: InMemoryEventDispatcher },

    // Use Cases
    RegisterUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    LogoutUseCase,

    // Passport strategy
    JwtStrategy,
  ],
  exports: ['IPermissionChecker', 'ITokenManager', 'IEventDispatcher'],
})
export class IdentityModule {}
