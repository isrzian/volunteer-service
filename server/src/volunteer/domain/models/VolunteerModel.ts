import {
  PrimaryKeyField,
  StringField,
  BooleanField,
  EmailField,
  RelationField,
  RelationIdField,
  CreateTimeField,
  UpdateTimeField,
  PhoneField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import { ApplicationModel } from '../../../applicant/domain/models/ApplicationModel';

export class VolunteerModel {
  @PrimaryKeyField()
  id: number;

  @StringField()
  name: string;

  @EmailField()
  email: string;

  @PhoneField()
  phone: string;

  @BooleanField({
    defaultValue: false,
  })
  isAuthorizedToEpgu: boolean;

  @RelationField({
    type: 'ManyToMany',
    relationClass: () => ApplicationModel,
    isOwningSide: false,
    inverseSide: (application: ApplicationModel) => application.volunteers,
    nullable: true,
  })
  applications: ApplicationModel[];

  @RelationIdField({
    relationName: 'applications',
    isArray: true,
    nullable: true,
  })
  applicationsIds: number[];

  @CreateTimeField({
    label: 'Создан',
  })
  createTime: string;

  @UpdateTimeField({
    label: 'Обновлен',
  })
  updateTime: string;
}
