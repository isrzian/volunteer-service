import {MigrationInterface, QueryRunner} from 'typeorm';

export class ApplicationTable1688038268647 implements MigrationInterface {
    name = 'ApplicationTable1688038268647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_81c8e4a8a8ce63faba03cbd769e" FOREIGN KEY ("applicantId") REFERENCES "applicant"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application"
            ADD CONSTRAINT "FK_529224d9f97b7a7e7b0b057e7dc" FOREIGN KEY ("operatorId") REFERENCES "operator"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_529224d9f97b7a7e7b0b057e7dc"
        `);
        await queryRunner.query(`
            ALTER TABLE "application" DROP CONSTRAINT "FK_81c8e4a8a8ce63faba03cbd769e"
        `);
    }
}
