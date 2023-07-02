import {MigrationInterface, QueryRunner} from 'typeorm';

export class ApplicantTable1688038268646 implements MigrationInterface {
    name = 'ApplicantTable1688038268646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "applicant" (
                "userId" integer,
                "id" SERIAL NOT NULL,
                "surname" character varying,
                "name" character varying,
                "patronymic" character varying,
                "email" character varying,
                "phone" character varying(20),
                "createTime" TIMESTAMP(0) NOT NULL,
                "updateTime" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "UQ_521910c40d7b5b15bffdb7c3faa" UNIQUE ("phone"),
                CONSTRAINT "REL_546a819aa07c196d7aa0f9d17d" UNIQUE ("userId"),
                CONSTRAINT "PK_f4a6e907b8b17f293eb073fc5ea" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "applicant"
        `);
    }
}
