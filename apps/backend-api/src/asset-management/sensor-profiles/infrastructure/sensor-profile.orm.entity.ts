import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseOrmEntity } from '../../../shared/infrastructure/base.orm.entity';

@Entity('sensor_profiles')
export class SensorProfileOrmEntity extends BaseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  manufacturer: string | null;

  @Column({ nullable: true })
  model: string | null;

  @Column({ name: 'communication_protocol', nullable: true })
  communicationProtocol: string | null;

  @Column({ name: 'sampling_interval', nullable: true })
  samplingInterval: number | null;

  @Column({ name: 'operating_voltage', nullable: true })
  operatingVoltage: string | null;

  @Column({ name: 'calibration_required', default: false })
  calibrationRequired: boolean;

  @Column({ name: 'calibration_instructions', nullable: true })
  calibrationInstructions: string | null;

  @Column({ name: 'accuracy_value', type: 'float', nullable: true })
  accuracyValue: number | null;

  @Column({ name: 'accuracy_unit', nullable: true })
  accuracyUnit: string | null;

  @Column({ name: 'accuracy_condition', nullable: true })
  accuracyCondition: string | null;

  @Column({ name: 'precision_value', type: 'float', nullable: true })
  precisionValue: number | null;

  @Column({ name: 'precision_unit', nullable: true })
  precisionUnit: string | null;

  @Column({ name: 'datasheet_url', nullable: true })
  datasheetUrl: string | null;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, any> | null;
}
