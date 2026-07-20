import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseOrmEntity } from '../../shared/infrastructure/base.orm.entity';

@Entity('permissions')
export class PermissionOrmEntity extends BaseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;
}
