import {MigrationInterface, QueryRunner} from 'typeorm';

export class ApplicationTable1688300339862 implements MigrationInterface {
    name = 'ApplicationTable1688300339862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX "IDX_b66738bc02f7d60504b038999c" ON "application_volunteer" ("applicationId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_672ad70a393e71c68a0a1172af" ON "application_volunteer" ("volunteerId")
        `);
        await queryRunner.query(`
            ALTER TABLE "application_volunteer"
            ADD CONSTRAINT "FK_b66738bc02f7d60504b038999cf" FOREIGN KEY ("applicationId") REFERENCES "application"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "application_volunteer"
            ADD CONSTRAINT "FK_672ad70a393e71c68a0a1172af1" FOREIGN KEY ("volunteerId") REFERENCES "volunteer"("id") ON DELETE NO ACTION ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "application_volunteer" DROP CONSTRAINT "FK_672ad70a393e71c68a0a1172af1"
        `);
        await queryRunner.query(`
            ALTER TABLE "application_volunteer" DROP CONSTRAINT "FK_b66738bc02f7d60504b038999cf"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_672ad70a393e71c68a0a1172af"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_b66738bc02f7d60504b038999c"
        `);
    }
}
