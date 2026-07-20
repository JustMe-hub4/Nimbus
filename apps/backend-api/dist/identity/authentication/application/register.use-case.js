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
exports.RegisterUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../users/domain/user.entity");
const user_mapper_1 = require("../../users/mappers/user.mapper");
const organization_entity_1 = require("../../organizations/domain/organization.entity");
const slug_vo_1 = require("../../organizations/domain/slug.vo");
const roles_1 = require("../../shared/constants/roles");
const membership_entity_1 = require("../../memberships/domain/membership.entity");
const email_validator_1 = require("../../users/validators/email.validator");
const password_validator_1 = require("../../users/validators/password.validator");
const user_registered_event_1 = require("../events/user-registered.event");
const app_exception_1 = require("../../../shared/exceptions/app.exception");
const error_codes_1 = require("../../../shared/exceptions/error-codes");
let RegisterUseCase = class RegisterUseCase {
    constructor(userRepo, passwordHasher, orgRepo, membershipRepo, roleRepo, eventDispatcher) {
        this.userRepo = userRepo;
        this.passwordHasher = passwordHasher;
        this.orgRepo = orgRepo;
        this.membershipRepo = membershipRepo;
        this.roleRepo = roleRepo;
        this.eventDispatcher = eventDispatcher;
    }
    async execute(email, password, fullName) {
        try {
            email_validator_1.EmailValidator.validate(email);
            password_validator_1.PasswordValidator.validate(password);
        }
        catch (error) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.VALIDATION_FAILED, error.message || 'Validation failed', common_1.HttpStatus.BAD_REQUEST);
        }
        const existing = await this.userRepo.findByEmail(email);
        if (existing) {
            throw new app_exception_1.AppException(error_codes_1.ErrorCodes.USER_ALREADY_EXISTS, 'User with this email already exists', common_1.HttpStatus.CONFLICT);
        }
        const hash = await this.passwordHasher.hash(password);
        const user = new user_entity_1.User({ email, passwordHash: hash, fullName, isActive: true });
        await this.userRepo.save(user);
        const orgName = `${fullName}'s Organization`;
        const slug = new slug_vo_1.Slug(orgName);
        const org = new organization_entity_1.Organization({ name: orgName, slug: slug.getValue(), createdBy: user.id });
        await this.orgRepo.save(org);
        const adminRole = await this.roleRepo.findByName(roles_1.DEFAULT_ROLES.ADMIN);
        if (adminRole) {
            const membership = new membership_entity_1.Membership({
                user,
                organization: org,
                role: adminRole,
                createdBy: user.id,
            });
            await this.membershipRepo.save(membership);
        }
        this.eventDispatcher.publish(new user_registered_event_1.UserRegisteredEvent(user.id, user.email, org.id));
        return user_mapper_1.UserMapper.toResponse(user);
    }
};
exports.RegisterUseCase = RegisterUseCase;
exports.RegisterUseCase = RegisterUseCase = __decorate([
    __param(0, (0, common_1.Inject)('IUserRepository')),
    __param(1, (0, common_1.Inject)('IPasswordHasher')),
    __param(2, (0, common_1.Inject)('IOrganizationRepository')),
    __param(3, (0, common_1.Inject)('IMembershipRepository')),
    __param(4, (0, common_1.Inject)('IRoleRepository')),
    __param(5, (0, common_1.Inject)('IEventDispatcher')),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object])
], RegisterUseCase);
//# sourceMappingURL=register.use-case.js.map