import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseOrmEntity } from '../../../shared/infrastructure/base.orm.entity';

@Entity('device_profiles')
export class DeviceProfileOrmEntity extends BaseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @Column({ nullable: true })
  manufacturer: string | null;

  @Column({ nullable: true })
  model: string | null;

  @Column({ name: 'communication_protocols', type: 'jsonb', default: '[]' })
  communicationProtocols: string[];

  @Column({ name: 'supported_sensor_types', type: 'jsonb', default: '[]' })
  supportedSensorTypes: string[];

  @Column({ name: 'expected_measurements', type: 'jsonb', default: '[]' })
  expectedMeasurements: string[];

  @Column({ name: 'firmware_compatibility', type: 'jsonb', default: '[]' })
  firmwareCompatibility: string[];

  @Column({ name: 'heartbeat_default_interval', default: 60 })
  heartbeatDefaultInterval: number;

  @Column({ name: 'calibration_required', default: false })
  calibrationRequired: boolean;

  @Column({ name: 'calibration_instructions', nullable: true })
  calibrationInstructions: string | null;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any> | null;
}
