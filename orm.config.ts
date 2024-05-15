import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();
export default new DataSource({
  type: 'postgres',
  username: 'user',
  password: 'dummypass',
  host: 'localhost',
  port: 5432,
  database: 'nube',
  entities: ['./src/apiFolder/*.entity{.ts,.js}'],
  migrations: ['./db/migrations/*{.ts,.js}'],
});
