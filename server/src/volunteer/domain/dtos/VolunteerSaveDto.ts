import { ExtendField } from '@steroidsjs/nest/src/infrastructure/decorators/fields/ExtendField';
import { VolunteerModel } from '../models/VolunteerModel';

export class VolunteerSaveDto {
  @ExtendField(VolunteerModel)
  name: string;

  @ExtendField(VolunteerModel)
  email: string;

  @ExtendField(VolunteerModel)
  phone: string;

  @ExtendField(VolunteerModel)
  isAuthorizedToEpgu: boolean;

  @ExtendField(VolunteerModel)
  applicationsIds: number[];
}
