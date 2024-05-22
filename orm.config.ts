import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'user',
  password: 'dummypass',
  host: 'codrr_pg',
  port: 5432,
  database: 'nube',
  entities: ['dist/src/apiFolder/*.entity.js'],
  migrations: ['dist/src/database/migrations/*.js'],
  synchronize: false,
  autoLoadEntities: true,
  migrationsRun: true,
};

export default ormconfig;