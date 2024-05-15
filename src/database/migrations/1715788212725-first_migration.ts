import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1715788212725 implements MigrationInterface {
    name = 'FirstMigration1715788212725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "directories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL DEFAULT true, CONSTRAINT "PK_d9318ce2673e948a761c266b63e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "email" ("id" SERIAL NOT NULL, "emails" character varying NOT NULL, "directoryId" integer, CONSTRAINT "PK_1e7ed8734ee054ef18002e29b1c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "email" ADD CONSTRAINT "FK_225f0c9577bdbe4a71902d90c80" FOREIGN KEY ("directoryId") REFERENCES "directories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "email" DROP CONSTRAINT "FK_225f0c9577bdbe4a71902d90c80"`);
        await queryRunner.query(`DROP TABLE "email"`);
        await queryRunner.query(`DROP TABLE "directories"`);
    }

}
