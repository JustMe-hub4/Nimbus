import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'nimbus',
  user: 'nimbus',
  password: 'nimbus_dev_password',
});

@Injectable()
export class TelemetryService {
  async getLatest() {
    const result = await pool.query(
      `SELECT * FROM telemetry 
       ORDER BY time DESC 
       LIMIT 10`
    );
    return {
      count: result.rows.length,
      data: result.rows,
    };
  }

  async getStats() {
    const result = await pool.query(
      `SELECT 
        device_id,
        COUNT(*) as readings,
        ROUND(AVG(temperature)::numeric, 2) as avg_temperature,
        ROUND(AVG(humidity)::numeric, 2) as avg_humidity,
        ROUND(MIN(temperature)::numeric, 2) as min_temperature,
        ROUND(MAX(temperature)::numeric, 2) as max_temperature,
        MAX(time) as last_seen
       FROM telemetry 
       GROUP BY device_id`
    );
    return {
      devices: result.rows,
    };
  }
}
