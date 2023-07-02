import {MigrationInterface, QueryRunner} from 'typeorm';

export class FileTable1688038268646 implements MigrationInterface {
    name = 'FileTable1688038268646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "file" (
                "id" SERIAL NOT NULL,
                "uid" character varying(36),
                "md5" character varying(32),
                "title" character varying,
                "storageName" character varying,
                "fileName" character varying NOT NULL,
                "fileSize" integer NOT NULL,
                "fileMimeType" character varying NOT NULL,
                "folder" character varying,
                "createTime" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "file"
        `);
    }
}
