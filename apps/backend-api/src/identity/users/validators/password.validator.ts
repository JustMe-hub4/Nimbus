export class PasswordValidator {
  static isStrong(password: string): boolean {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  }

  static validate(password: string): void {
    if (!this.isStrong(password)) {
      throw new Error('Password too weak');
    }
  }
}
