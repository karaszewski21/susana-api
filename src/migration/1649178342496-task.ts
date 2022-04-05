import {MigrationInterface, QueryRunner} from "typeorm";

export class task1649178342496 implements MigrationInterface {
    name = 'task1649178342496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "code" integer NOT NULL, CONSTRAINT "PK_7bc1bd2364b6e9bf7c84b1e52e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "position_desktop_entity" ("id" SERIAL NOT NULL, "x" integer NOT NULL, "y" integer NOT NULL, CONSTRAINT "PK_f584a11d80518d5acbacedc61f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "position_mobile_entity" ("id" SERIAL NOT NULL, "x" integer NOT NULL, "y" integer NOT NULL, CONSTRAINT "PK_b199d296e30714e5e484bd0b16f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "practice_type_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "icon" character varying NOT NULL, CONSTRAINT "PK_0593f76055da4825ea380d0688f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "practiceId" character varying NOT NULL, "accountId" integer, "positionDesktopId" integer, "positionMobileId" integer, "practiceTypeId" integer, CONSTRAINT "REL_2cf86eba71a396657345f3ac73" UNIQUE ("positionDesktopId"), CONSTRAINT "REL_d1922e02fd1d2bed087c65c7d5" UNIQUE ("positionMobileId"), CONSTRAINT "PK_b27d5ab3487c9d60383845f1c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "account_entity" ADD "roleId" integer`);
        await queryRunner.query(`ALTER TABLE "account_entity" ADD CONSTRAINT "UQ_8c24f140d29789d82f34b9ea78b" UNIQUE ("roleId")`);
        await queryRunner.query(`ALTER TABLE "tasks_entity" ADD CONSTRAINT "FK_56e7d12d810eacca417c46939c3" FOREIGN KEY ("accountId") REFERENCES "account_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks_entity" ADD CONSTRAINT "FK_2cf86eba71a396657345f3ac73c" FOREIGN KEY ("positionDesktopId") REFERENCES "position_desktop_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks_entity" ADD CONSTRAINT "FK_d1922e02fd1d2bed087c65c7d56" FOREIGN KEY ("positionMobileId") REFERENCES "position_mobile_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks_entity" ADD CONSTRAINT "FK_094a953766ab74026a39b778cd7" FOREIGN KEY ("practiceTypeId") REFERENCES "practice_type_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "account_entity" ADD CONSTRAINT "FK_8c24f140d29789d82f34b9ea78b" FOREIGN KEY ("roleId") REFERENCES "role_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account_entity" DROP CONSTRAINT "FK_8c24f140d29789d82f34b9ea78b"`);
        await queryRunner.query(`ALTER TABLE "tasks_entity" DROP CONSTRAINT "FK_094a953766ab74026a39b778cd7"`);
        await queryRunner.query(`ALTER TABLE "tasks_entity" DROP CONSTRAINT "FK_d1922e02fd1d2bed087c65c7d56"`);
        await queryRunner.query(`ALTER TABLE "tasks_entity" DROP CONSTRAINT "FK_2cf86eba71a396657345f3ac73c"`);
        await queryRunner.query(`ALTER TABLE "tasks_entity" DROP CONSTRAINT "FK_56e7d12d810eacca417c46939c3"`);
        await queryRunner.query(`ALTER TABLE "account_entity" DROP CONSTRAINT "UQ_8c24f140d29789d82f34b9ea78b"`);
        await queryRunner.query(`ALTER TABLE "account_entity" DROP COLUMN "roleId"`);
        await queryRunner.query(`DROP TABLE "tasks_entity"`);
        await queryRunner.query(`DROP TABLE "practice_type_entity"`);
        await queryRunner.query(`DROP TABLE "position_mobile_entity"`);
        await queryRunner.query(`DROP TABLE "position_desktop_entity"`);
        await queryRunner.query(`DROP TABLE "role_entity"`);
    }

}
