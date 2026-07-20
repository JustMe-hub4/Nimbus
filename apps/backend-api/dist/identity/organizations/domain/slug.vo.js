"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slug = void 0;
const slugify_1 = require("../../shared/utils/slugify");
class Slug {
    constructor(text) {
        this.value = (0, slugify_1.slugify)(text);
    }
    getValue() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.Slug = Slug;
//# sourceMappingURL=slug.vo.js.map