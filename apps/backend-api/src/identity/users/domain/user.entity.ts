export class User {
  public readonly id: string;
  public email: string;
  public passwordHash: string;
  public fullName: string;
  public isActive: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date | null;
  public createdBy: string | null;
  public updatedBy: string | null;

  constructor(props: Partial<User>) {
    Object.assign(this, props);
  }

  public deactivate(): void {
    this.isActive = false;
  }

  public updateName(name: string): void {
    this.fullName = name;
  }
}
