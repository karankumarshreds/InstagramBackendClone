import { ConnectionOptions } from 'typeorm';

const isProd = process.env.NODE_ENV === 'prod';

export default {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'instagram-clone',
  synchronize: isProd ? false : true,
  logging: isProd ? false : true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 2000,
  entities: [`src/entity/**/*.${isProd ? 'js' : 'ts'}`],
  migrations: [`src/migration/**/*.${isProd ? 'js' : 'ts'}`],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
  },
} as ConnectionOptions;
