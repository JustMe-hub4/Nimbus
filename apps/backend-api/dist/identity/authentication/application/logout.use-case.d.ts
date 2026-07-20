import { ITokenManager } from '../domain/token.service';
export declare class LogoutUseCase {
    private tokenManager;
    constructor(tokenManager: ITokenManager);
    execute(refreshToken: string): Promise<void>;
}
