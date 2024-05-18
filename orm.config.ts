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
  entities: ['./src/apiFolder/*.entity{.ts,.js}'],
  migrations: ['./database/migrations/*{.ts,.js}'],
  synchronize: false,
  autoLoadEntities: true,
};

export default ormconfig;