import { Router } from 'express';
import { Pool } from 'pg';

const router = Router();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  database: process.env.DB_NAME || 'nimbus',
  user: process.env.DB_USER || 'nimbus',
  password: process.env.DB_PASSWORD || 'nimbus_dev_password',
});

router.get('/latest', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM telemetry ORDER BY time DESC LIMIT 10`
    );
    res.json({ count: result.rows.length, data: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch telemetry' });
  }
});

router.get('/stats', async (req, res) => {
  try {
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
    res.json({ devices: result.rows });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export { router as telemetryRouter };
