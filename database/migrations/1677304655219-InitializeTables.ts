import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitializeTables1677304655219 implements MigrationInterface {
  name = 'InitializeTables1677304655219';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "accounts" ("code" integer NOT NULL, "name_vi" character varying NOT NULL, "name_en" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_490319656e54a7957dc1fed027c" PRIMARY KEY ("code"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "accounts"`);
  }
}
