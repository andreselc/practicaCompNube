"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstMigration1715788212725 = void 0;
class FirstMigration1715788212725 {
    constructor() {
        this.name = 'FirstMigration1715788212725';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "directories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT true, CONSTRAINT "PK_d9318ce2673e948a761c266b63e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "email" ("id" SERIAL NOT NULL, "emails" character varying NOT NULL, "directoryId" integer, CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "email" ADD CONSTRAINT "FK_225f0c9577bdbe4a71902d90c80" FOREIGN KEY ("directoryId") REFERENCES "directories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "email" DROP CONSTRAINT "FK_225f0c9577bdbe4a71902d90c80"`);
        await queryRunner.query(`DROP TABLE "email"`);
        await queryRunner.query(`DROP TABLE "directories"`);
    }
}
exports.FirstMigration1715788212725 = FirstMigration1715788212725;
//# sourceMappingURL=1715788212725-first_migration.js.map