import {MigrationInterface, QueryRunner} from 'typeorm';

export class ApplicationTable1688038268646 implements MigrationInterface {
    name = 'ApplicationTable1688038268646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "application" (
                "applicantId" integer,
                "operatorId" integer,
                "id" SERIAL NOT NULL,
                "title" character varying,
                "description" text,
                "isDone" boolean NOT NULL DEFAULT false,
                "status" character varying NOT NULL DEFAULT 'new',
                "createTime" TIMESTAMP(0) NOT NULL,
                "updateTime" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "application"
        `);
    }
}
