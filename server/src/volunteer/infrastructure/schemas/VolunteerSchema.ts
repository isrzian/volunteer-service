import { ExtendField } from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import { VolunteerModel } from '../../domain/models/VolunteerModel';
import { ApplicationSchema } from '../../../applicant/infrastructure/schemas/ApplicationSchema';

export class VolunteerSchema {
  @ExtendField(VolunteerModel)
  id: number;

  @ExtendField(VolunteerModel)
  name: string;

  @ExtendField(VolunteerModel)
  email: string;

  @ExtendField(VolunteerModel)
  phone: string;

  @ExtendField(VolunteerModel)
  isAuthorizedToEpgu: boolean;

  @ExtendField(VolunteerModel, {
    relationClass: () => ApplicationSchema,
  })
  applications: ApplicationSchema[];

  @ExtendField(VolunteerModel)
  applicationsIds: number[];

  @ExtendField(VolunteerModel)
  createTime: string;

  @ExtendField(VolunteerModel)
  updateTime: string;
}
