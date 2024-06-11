"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const ormconfig = {
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
exports.default = ormconfig;
//# sourceMappingURL=orm.config.js.map