import { Permission } from './permission.entity';

export class Role {
  public readonly id: string;
  public name: string;
  public description: string | null;
  public permissions: Permission[];
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: Partial<Role>) {
    Object.assign(this, props);
    this.permissions = props.permissions || [];
  }
}
