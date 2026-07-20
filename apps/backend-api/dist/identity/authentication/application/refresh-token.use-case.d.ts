import { ITokenManager } from '../domain/token.service';
export declare class RefreshTokenUseCase {
    private tokenManager;
    constructor(tokenManager: ITokenManager);
    execute(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
