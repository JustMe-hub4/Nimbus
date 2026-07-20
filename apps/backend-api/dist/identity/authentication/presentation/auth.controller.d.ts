import { RegisterUseCase } from '../application/register.use-case';
import { LoginUseCase } from '../application/login.use-case';
import { RefreshTokenUseCase } from '../application/refresh-token.use-case';
import { LogoutUseCase } from '../application/logout.use-case';
export declare class AuthController {
    private registerUseCase;
    private loginUseCase;
    private refreshUseCase;
    private logoutUseCase;
    constructor(registerUseCase: RegisterUseCase, loginUseCase: LoginUseCase, refreshUseCase: RefreshTokenUseCase, logoutUseCase: LogoutUseCase);
    register(body: {
        email: string;
        password: string;
        fullName: string;
    }): Promise<{
        id: string;
        email: string;
        fullName: string;
        isActive: boolean;
        createdAt: Date;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
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
    refresh(body: {
        refreshToken: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(body: {
        refreshToken: string;
    }): Promise<void>;
}
