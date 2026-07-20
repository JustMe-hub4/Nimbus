import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

config({ path: path.join(__dirname, '.env') });

export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/**/*.orm.entity.ts'],
  migrations: ['src/identity/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
