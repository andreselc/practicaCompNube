import { MigrationInterface, QueryRunner } from "typeorm";
export declare class FirstMigration1715788212725 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
