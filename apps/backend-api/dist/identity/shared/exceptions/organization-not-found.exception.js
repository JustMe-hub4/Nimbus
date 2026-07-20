"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationNotFoundError = void 0;
class OrganizationNotFoundError extends Error {
    constructor(idOrSlug) {
        super(`Organization with ID/slug ${idOrSlug} not found`);
        this.name = 'OrganizationNotFoundError';
    }
}
exports.OrganizationNotFoundError = OrganizationNotFoundError;
//# sourceMappingURL=organization-not-found.exception.js.map