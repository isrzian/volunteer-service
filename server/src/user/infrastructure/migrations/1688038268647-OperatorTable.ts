import {MigrationInterface, QueryRunner} from 'typeorm';

export class OperatorTable1688038268647 implements MigrationInterface {
    name = 'OperatorTable1688038268647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "operator"
            ADD CONSTRAINT "FK_c542d9f0136893b079ccf1e372c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "operator" DROP CONSTRAINT "FK_c542d9f0136893b079ccf1e372c"
        `);
    }
}
