"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementTypeResponseDto = void 0;
class MeasurementTypeResponseDto {
    static fromDomain(type) {
        return {
            id: type.id,
            name: type.name,
            unit: type.unit,
            minValue: type.minValue,
            maxValue: type.maxValue,
            description: type.description,
            createdAt: type.createdAt,
            updatedAt: type.updatedAt,
        };
    }
}
exports.MeasurementTypeResponseDto = MeasurementTypeResponseDto;
//# sourceMappingURL=measurement-type-response.dto.js.map