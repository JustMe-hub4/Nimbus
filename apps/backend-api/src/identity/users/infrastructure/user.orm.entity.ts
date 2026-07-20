import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BaseOrmEntity } from '../../shared/infrastructure/base.orm.entity';

@Entity('users')
export class UserOrmEntity extends BaseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}
