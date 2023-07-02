import { MigrationInterface, QueryRunner } from 'typeorm';

export class VolunteerTable1688300339861 implements MigrationInterface {
  name = 'VolunteerTable1688300339861';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "volunteer" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "phone" character varying(16) NOT NULL,
                "isAuthorizedToEpgu" boolean NOT NULL DEFAULT false,
                "createTime" TIMESTAMP(0) NOT NULL,
                "updateTime" TIMESTAMP(0) NOT NULL,
                CONSTRAINT "PK_76924da1998b3e07025e04c4d3c" PRIMARY KEY ("id")
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "volunteer"
        `);
  }
}
