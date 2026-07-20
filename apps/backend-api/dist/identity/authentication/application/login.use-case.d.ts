import { IUserRepository } from '../../users/domain/user.repository.interface';
import { IPasswordHasher } from '../domain/password.service';
import { ITokenManager } from '../domain/token.service';
export declare class LoginUseCase {
    private userRepo;
    private passwordHasher;
    private tokenManager;
    constructor(userRepo: IUserRepository, passwordHasher: IPasswordHasher, tokenManager: ITokenManager);
    execute(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            isActive: boolean;
            createdAt: Date;
        };
    }>;
}
