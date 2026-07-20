export class EmailValidator {
  static isValid(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  static validate(email: string): void {
    if (!this.isValid(email)) {
      throw new Error('Invalid email format');
    }
  }
}
