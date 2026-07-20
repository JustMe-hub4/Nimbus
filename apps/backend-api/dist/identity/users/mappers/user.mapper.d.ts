import { User } from '../domain/user.entity';
export declare class UserMapper {
    static toResponse(user: User): {
        id: string;
        email: string;
        fullName: string;
        isActive: boolean;
        createdAt: Date;
    };
}
