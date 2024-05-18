import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

const isProduction = process.env.NODE_ENV === 'production';

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'user',
  password: 'dummypass',
  host: isProduction ? process.env.DATABASE_HOST_PROD : process.env.DATABASE_HOST_DEV,
  port: 5432,
  database: 'nube',
  entities: ['dist/src/apiFolder/*.entity.js'],
  migrations: ['dist/src/database/migrations/*.js'],
  synchronize: false,
  autoLoadEntities: true,
  migrationsRun: isProduction,
};

export default ormconfig;