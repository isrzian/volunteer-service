import {MigrationInterface, QueryRunner} from 'typeorm';

export class OperatorTable1688038268646 implements MigrationInterface {
    name = 'OperatorTable1688038268646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "operator" (
                "id" SERIAL NOT NULL,
                "name" character varying,
                "userId" integer,
                "isActive" boolean NOT NULL DEFAULT true,
                "position" character varying,
                "createTime" TIMESTAMP(0) NOT NULL,
                "updateTime" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "REL_c542d9f0136893b079ccf1e372" UNIQUE ("userId"),
                CONSTRAINT "PK_8b950e1572745d9f69be7748ae8" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "operator"
        `);
    }
}
