export class Station {
  public readonly id: string;
  public name: string;
  public description: string | null;
  public location: string | null;
  public organizationId: string;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;
  public createdBy: string | null;
  public updatedBy: string | null;
  public deletedBy: string | null;

  constructor(props: Partial<Station>) {
    Object.assign(this, props);
  }

  public updateName(name: string): void {
    this.name = name;
  }

  public updateDescription(description: string | null): void {
    this.description = description;
  }

  public updateLocation(location: string | null): void {
    this.location = location;
  }

  public softDelete(deletedBy: string): void {
    this.deletedAt = new Date();
    this.deletedBy = deletedBy;
  }
}
