const { DataSource } = require('typeorm');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

module.exports = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/**/*.orm.entity.ts'],
  migrations: [
    'src/identity/migrations/*.ts',
    'src/asset-management/migrations/*.ts',
    'src/shared/migrations/*.ts',
  ],
  synchronize: false,
  logging: true,
});
