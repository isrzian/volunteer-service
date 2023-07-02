import {MigrationInterface, QueryRunner} from 'typeorm';

export class ApplicantTable1688038268647 implements MigrationInterface {
    name = 'ApplicantTable1688038268647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "applicant"
            ADD CONSTRAINT "FK_546a819aa07c196d7aa0f9d17db" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "applicant" DROP CONSTRAINT "FK_546a819aa07c196d7aa0f9d17db"
        `);
    }
}
