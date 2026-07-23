import { Unit } from './unit.entity';

export interface IUnitRepository {
  save(unit: Unit): Promise<Unit>;
  findById(id: string): Promise<Unit | null>;
  findBySymbol(symbol: string): Promise<Unit | null>;
  findAll(activeOnly?: boolean): Promise<Unit[]>;
  softDelete(id: string, deletedBy: string): Promise<void>;
}
