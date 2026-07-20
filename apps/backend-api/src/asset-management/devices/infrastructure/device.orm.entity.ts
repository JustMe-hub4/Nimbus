import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';
import { BaseOrmEntity } from '../../../shared/infrastructure/base.orm.entity';

@Entity('devices')
@Index(['organizationId', 'stationId'])
export class DeviceOrmEntity extends BaseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'organization_id' })
  organizationId: string;

  @Column({ name: 'station_id' })
  stationId: string;

  @Column({ name: 'device_profile_id', nullable: true })
  deviceProfileId: string | null;

  @Column()
  name: string;

  @Column({ name: 'serial_number', unique: true })
  serialNumber: string;

  @Column({ name: 'firmware_version', nullable: true })
  firmwareVersion: string | null;

  @Column({ name: 'hardware_revision', nullable: true })
  hardwareRevision: string | null;

  @Column({ name: 'heartbeat_interval', nullable: true })
  heartbeatInterval: number | null;

  @Column({ name: 'last_heartbeat', type: 'timestamptz', nullable: true })
  lastHeartbeat: Date | null;

  @Column({ type: 'varchar', default: 'OFFLINE' })
  status: string;

  @Column({ type: 'float', default: 100 })
  health: number;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any> | null;

  // New fields
  @Column({ name: 'first_seen', type: 'timestamptz', nullable: true })
  firstSeen: Date | null;

  @Column({ name: 'last_seen', type: 'timestamptz', nullable: true })
  lastSeen: Date | null;

  @Column({ name: 'last_telemetry', type: 'timestamptz', nullable: true })
  lastTelemetry: Date | null;

  @Column({ name: 'connection_count', default: 0 })
  connectionCount: number;

  @Column({ name: 'restart_count', default: 0 })
  restartCount: number;

  @Column({ name: 'semantic_type', nullable: true })
  semanticType: string | null;

  @Column({ name: 'embedding_eligible', default: false })
  embeddingEligible: boolean;

  @Column({ name: 'knowledge_priority', default: 0 })
  knowledgePriority: number;

  @Column({ name: 'agent_readable', default: true })
  agentReadable: boolean;
}
