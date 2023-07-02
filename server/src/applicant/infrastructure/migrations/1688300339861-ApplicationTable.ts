import {MigrationInterface, QueryRunner} from 'typeorm';

export class ApplicationTable1688300339861 implements MigrationInterface {
    name = 'ApplicationTable1688300339861'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "application_volunteer" (
                "applicationId" integer NOT NULL,
                "volunteerId" integer NOT NULL,
                CONSTRAINT "PK_419f7eb40ff33df337d68ca04d1" PRIMARY KEY ("applicationId", "volunteerId")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "application_volunteer"
        `);
    }
}
