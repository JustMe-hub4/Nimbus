import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseOrmEntity } from '../../../shared/infrastructure/base.orm.entity';

@Entity('measurement_types')
export class MeasurementTypeOrmEntity extends BaseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  unit: string;

  @Column({ name: 'min_value', type: 'float', nullable: true })
  minValue: number | null;

  @Column({ name: 'max_value', type: 'float', nullable: true })
  maxValue: number | null;

  @Column({ nullable: true })
  description: string | null;
}
