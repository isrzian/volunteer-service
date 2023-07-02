import { MigrationInterface, QueryRunner } from 'typeorm';

export class VolunteerTable1688300339862 implements MigrationInterface {
  name = 'VolunteerTable1688300339862';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO public.volunteer
                (id, name, email, phone, "isAuthorizedToEpgu", "createTime", "updateTime")
            VALUES (
                    DEFAULT,
                    'Петров Петр Петрович',
                    'qwertyu@bk.ru',
                    '+79234567890',
                    false,
                    LOCALTIMESTAMP(0),
                    LOCALTIMESTAMP(0)
                    );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE
            FROM public.volunteer
            WHERE phone = '+79234567890';
        `);
  }
}
