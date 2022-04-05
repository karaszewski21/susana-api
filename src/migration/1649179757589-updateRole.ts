import {MigrationInterface, QueryRunner} from "typeorm";

export class updateRole1649179757589 implements MigrationInterface {
    name = 'updateRole1649179757589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_entity" DROP CONSTRAINT "FK_a20f37528070cb4b33ab0653a52"`);
        await queryRunner.query(`ALTER TABLE "role_entity" DROP COLUMN "accountsId"`);
        await queryRunner.query(`ALTER TABLE "account_entity" ADD "rolesId" integer`);
        await queryRunner.query(`ALTER TABLE "account_entity" ADD CONSTRAINT "FK_b023c3f6f6ea4e8021a319e8115" FOREIGN KEY ("rolesId") REFERENCES "role_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account_entity" DROP CONSTRAINT "FK_b023c3f6f6ea4e8021a319e8115"`);
        await queryRunner.query(`ALTER TABLE "account_entity" DROP COLUMN "rolesId"`);
        await queryRunner.query(`ALTER TABLE "role_entity" ADD "accountsId" integer`);
        await queryRunner.query(`ALTER TABLE "role_entity" ADD CONSTRAINT "FK_a20f37528070cb4b33ab0653a52" FOREIGN KEY ("accountsId") REFERENCES "account_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
