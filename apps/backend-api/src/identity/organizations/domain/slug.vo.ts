import { slugify } from '../../shared/utils/slugify';

export class Slug {
  private readonly value: string;

  constructor(text: string) {
    this.value = slugify(text);
  }

  getValue(): string {
    return this.value;
  }

  equals(other: Slug): boolean {
    return this.value === other.value;
  }
}
