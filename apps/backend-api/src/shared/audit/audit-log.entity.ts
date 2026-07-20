import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseOrmEntity } from '../infrastructure/base.orm.entity';

@Entity('audit_logs')
export class AuditLogOrmEntity extends BaseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'aggregate_type' })
  aggregateType: string; // e.g., 'Device'

  @Column({ name: 'aggregate_id' })
  aggregateId: string;

  @Column()
  action: string; // e.g., 'UPDATED', 'RENAMED', 'TRANSFERRED'

  @Column({ name: 'old_value', type: 'jsonb', nullable: true })
  oldValue: any;

  @Column({ name: 'new_value', type: 'jsonb', nullable: true })
  newValue: any;

  @Column({ name: 'changed_by' })
  changedBy: string; // user ID

  @Column({ name: 'ip_address', nullable: true })
  ipAddress: string | null;

  @Column({ name: 'user_agent', nullable: true })
  userAgent: string | null;
}
