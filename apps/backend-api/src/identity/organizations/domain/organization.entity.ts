export class Organization {
  public readonly id: string;
  public name: string;
  public slug: string;
  public description: string | null;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;
  public createdBy: string | null;
  public updatedBy: string | null;

  constructor(props: Partial<Organization>) {
    Object.assign(this, props);
  }

  public updateName(name: string): void {
    this.name = name;
    // slug should be regenerated if name changes, but we'll handle separately
  }
}
