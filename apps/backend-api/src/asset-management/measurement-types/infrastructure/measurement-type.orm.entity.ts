import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseOrmEntity } from '../../../shared/infrastructure/base.orm.entity';

@Entity('measurement_types')
export class MeasurementTypeOrmEntity extends BaseOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string | null;

  @Column()
  category: string;

  @Column({ name: 'default_unit_id' })
  defaultUnitId: string;

  @Column({ name: 'min_value', type: 'float', nullable: true })
  minValue: number | null;

  @Column({ name: 'max_value', type: 'float', nullable: true })
  maxValue: number | null;

  @Column({ nullable: true })
  precision: number | null;

  @Column({ name: 'aggregation_strategy', nullable: true })
  aggregationStrategy: string | null;

  @Column({ name: 'semantic_description', nullable: true })
  semanticDescription: string | null;

  @Column({ name: 'embedding_eligible', default: false })
  embeddingEligible: boolean;

  @Column({ name: 'knowledge_priority', default: 0 })
  knowledgePriority: number;
}
