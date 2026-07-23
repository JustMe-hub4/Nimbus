import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseOrmEntity } from '../../../shared/infrastructure/base.orm.entity';

@Entity('units')
export class UnitOrmEntity extends BaseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  symbol: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  dimension: string | null;

  @Column({ name: 'si_equivalent', nullable: true })
  siEquivalent: string | null;

  @Column({ name: 'conversion_metadata', type: 'jsonb', nullable: true })
  conversionMetadata: Record<string, any> | null;

  @Column({ name: 'precision_defaults', type: 'jsonb', nullable: true })
  precisionDefaults: Record<string, any> | null;

  @Column({ type: 'varchar', default: 'ACTIVE' })
  status: string;
}
