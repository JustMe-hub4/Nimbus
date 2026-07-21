import { Router } from 'express';
import { Pool } from 'pg';

const router = Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://nimbus:nimbus_dev_password@localhost:5432/nimbus',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

router.get('/latest', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM telemetry ORDER BY time DESC LIMIT 10`
    );
    res.json({ count: result.rows.length, data: result.rows });
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export { router as telemetryRouter };
