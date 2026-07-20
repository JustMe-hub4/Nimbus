"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryService = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: 'localhost',
    port: 5432,
    database: 'nimbus',
    user: 'nimbus',
    password: 'nimbus_dev_password',
});
let TelemetryService = class TelemetryService {
    async getLatest() {
        const result = await pool.query(`SELECT * FROM telemetry 
       ORDER BY time DESC 
       LIMIT 10`);
        return {
            count: result.rows.length,
            data: result.rows,
        };
    }
    async getStats() {
        const result = await pool.query(`SELECT 
        device_id,
        COUNT(*) as readings,
        ROUND(AVG(temperature)::numeric, 2) as avg_temperature,
        ROUND(AVG(humidity)::numeric, 2) as avg_humidity,
        ROUND(MIN(temperature)::numeric, 2) as min_temperature,
        ROUND(MAX(temperature)::numeric, 2) as max_temperature,
        MAX(time) as last_seen
       FROM telemetry 
       GROUP BY device_id`);
        return {
            devices: result.rows,
        };
    }
};
exports.TelemetryService = TelemetryService;
exports.TelemetryService = TelemetryService = __decorate([
    (0, common_1.Injectable)()
], TelemetryService);
//# sourceMappingURL=telemetry.service.js.map