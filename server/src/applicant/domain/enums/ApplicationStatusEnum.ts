import BaseEnum from '@steroidsjs/nest/src/domain/base/BaseEnum';

export class ApplicationStatusEnum extends BaseEnum {
  static COMPLETED = 'completed';

  static IN_PROCESS = 'in_process';

  static NEW = 'new';

  static VERIFIED = 'verified';

  static getLabels() {
    return {
      [this.NEW]: 'Новая',
      [this.VERIFIED]: 'Проверено',
      [this.IN_PROCESS]: 'Выполняется',
      [this.COMPLETED]: 'Готова',
    };
  }
}
