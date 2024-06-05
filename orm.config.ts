import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
config();

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  username: 'postgres',
  password: '210302',
  host: 'codrr_pg',
  //host:'localhost',
  port: 5432,
  database: 'nube',
  entities: ['dist/src/apiFolder/*.entity.js'],
  migrations: ['dist/src/database/migrations/*.js'],
  synchronize: false,
  autoLoadEntities: true,
  migrationsRun: true,
};

export default ormconfig;