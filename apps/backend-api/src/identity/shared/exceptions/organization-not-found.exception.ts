export class OrganizationNotFoundError extends Error {
  constructor(idOrSlug: string) {
    super(`Organization with ID/slug ${idOrSlug} not found`);
    this.name = 'OrganizationNotFoundError';
  }
}
