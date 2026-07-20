import { Inject, HttpStatus } from '@nestjs/common';
import { IUserRepository } from '../../users/domain/user.repository.interface';
import { IPasswordHasher } from '../domain/password.service';
import { User } from '../../users/domain/user.entity';
import { UserMapper } from '../../users/mappers/user.mapper';
import { IOrganizationRepository } from '../../organizations/domain/organization.repository.interface';
import { Organization } from '../../organizations/domain/organization.entity';
import { Slug } from '../../organizations/domain/slug.vo';
import { DEFAULT_ROLES } from '../../shared/constants/roles';
import { IMembershipRepository } from '../../memberships/domain/membership.repository.interface';
import { Membership } from '../../memberships/domain/membership.entity';
import { IRoleRepository } from '../../authorization/domain/role.repository.interface';
import { EmailValidator } from '../../users/validators/email.validator';
import { PasswordValidator } from '../../users/validators/password.validator';
import { UserRegisteredEvent } from '../events/user-registered.event';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';
import { AppException } from '../../../shared/exceptions/app.exception';
import { ErrorCodes } from '../../../shared/exceptions/error-codes';

export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository') private userRepo: IUserRepository,
    @Inject('IPasswordHasher') private passwordHasher: IPasswordHasher,
    @Inject('IOrganizationRepository') private orgRepo: IOrganizationRepository,
    @Inject('IMembershipRepository') private membershipRepo: IMembershipRepository,
    @Inject('IRoleRepository') private roleRepo: IRoleRepository,
    @Inject('IEventDispatcher') private eventDispatcher: IEventDispatcher,
  ) {}

  async execute(email: string, password: string, fullName: string) {
    // Domain validation
    try {
      EmailValidator.validate(email);
      PasswordValidator.validate(password);
    } catch (error) {
      throw new AppException(
        ErrorCodes.VALIDATION_FAILED,
        error.message || 'Validation failed',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new AppException(
        ErrorCodes.USER_ALREADY_EXISTS,
        'User with this email already exists',
        HttpStatus.CONFLICT,
      );
    }

    const hash = await this.passwordHasher.hash(password);
    const user = new User({ email, passwordHash: hash, fullName, isActive: true });
    await this.userRepo.save(user);

    const orgName = `${fullName}'s Organization`;
    const slug = new Slug(orgName);
    const org = new Organization({ name: orgName, slug: slug.getValue(), createdBy: user.id });
    await this.orgRepo.save(org);

    const adminRole = await this.roleRepo.findByName(DEFAULT_ROLES.ADMIN);
    if (adminRole) {
      const membership = new Membership({
        user,
        organization: org,
        role: adminRole,
        createdBy: user.id,
      });
      await this.membershipRepo.save(membership);
    }

    // Publish event
    this.eventDispatcher.publish(new UserRegisteredEvent(user.id, user.email, org.id));

    return UserMapper.toResponse(user);
  }
}
