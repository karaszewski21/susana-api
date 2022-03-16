import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1646328517071 implements MigrationInterface {
  name = 'Init1646328517071';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "account_entity" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_b482dad15becff9a89ad707dcbe" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "account_entity"`);
  }
}
