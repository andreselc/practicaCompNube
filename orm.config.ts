import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: 5432,
  database: process.env.POSTGRES_DATABASE,
  entities: ['dist/src/apiFolder/*.entity.js'],
  migrations: ['dist/src/database/migrations/*.js'],
  synchronize: false,
  autoLoadEntities: true,
  migrationsRun: true,
};

export default ormconfig;