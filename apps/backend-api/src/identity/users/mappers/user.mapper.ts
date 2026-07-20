import { User } from '../domain/user.entity';

export class UserMapper {
  static toResponse(user: User) {
    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      isActive: user.isActive,
      createdAt: user.createdAt,
    };
  }
}
