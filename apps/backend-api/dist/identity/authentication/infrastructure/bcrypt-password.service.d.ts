import { ConfigService } from '@nestjs/config';
import { IPasswordHasher } from '../domain/password.service';
export declare class BcryptPasswordService implements IPasswordHasher {
    private configService;
    private readonly saltRounds;
    constructor(configService: ConfigService);
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}
