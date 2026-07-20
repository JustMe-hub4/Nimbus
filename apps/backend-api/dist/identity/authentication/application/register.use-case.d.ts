import { IUserRepository } from '../../users/domain/user.repository.interface';
import { IPasswordHasher } from '../domain/password.service';
import { IOrganizationRepository } from '../../organizations/domain/organization.repository.interface';
import { IMembershipRepository } from '../../memberships/domain/membership.repository.interface';
import { IRoleRepository } from '../../authorization/domain/role.repository.interface';
import { IEventDispatcher } from '../../../shared/events/event-dispatcher.interface';
export declare class RegisterUseCase {
    private userRepo;
    private passwordHasher;
    private orgRepo;
    private membershipRepo;
    private roleRepo;
    private eventDispatcher;
    constructor(userRepo: IUserRepository, passwordHasher: IPasswordHasher, orgRepo: IOrganizationRepository, membershipRepo: IMembershipRepository, roleRepo: IRoleRepository, eventDispatcher: IEventDispatcher);
    execute(email: string, password: string, fullName: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        isActive: boolean;
        createdAt: Date;
    }>;
}
