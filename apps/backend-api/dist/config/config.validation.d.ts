export declare class EnvironmentVariables {
    DATABASE_URL: string;
    REDIS_URL: string;
    JWT_SECRET: string;
    BCRYPT_ROUNDS: number;
    JWT_ACCESS_EXPIRY: string;
    REFRESH_TOKEN_DAYS: number;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
