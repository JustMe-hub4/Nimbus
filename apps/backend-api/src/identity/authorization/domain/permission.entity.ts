export class Permission {
  public readonly id: string;
  public name: string;
  public description: string | null;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(props: Partial<Permission>) {
    Object.assign(this, props);
  }
}
