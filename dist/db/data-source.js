"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
let dbOptions = {
    type: 'sqlite',
    database: '',
    entities: [],
    migrations: ['dist/db/migrations/*.js'],
};
switch (process.env.NODE_ENV) {
    case 'development':
        Object.assign(dbOptions, {
            type: 'sqlite',
            database: 'dev-db.sqlite',
            entities: ['**/*.entity.js'],
        });
        break;
    case 'test':
        Object.assign(dbOptions, {
            type: 'sqlite',
            database: 'test-db.sqlite',
            entities: ['**/*.entity.ts'],
            migrationsRun: true
        });
        break;
    case 'production':
        Object.assign(dbOptions, {
            type: "postgres",
            url: process.env.DATABASE_URL,
            migrationsRun: true,
            entities: ["**/*.entity.js"],
            ssl: {
                rejectUnauthorized: false,
            },
        });
        break;
    default:
        throw new Error('Unknown environment');
}
exports.dataSourceOptions = dbOptions;
const dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.default = dataSource;
//# sourceMappingURL=data-source.js.map