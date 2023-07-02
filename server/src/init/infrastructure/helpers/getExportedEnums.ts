import LanguageEnum from '../../../base/domain/LanguageEnum';
import {ApplicationStatusEnum} from '../../../applicant/domain/enums/ApplicationStatusEnum';

export default function getExportedEnums() {
    return [
        LanguageEnum,
        ApplicationStatusEnum,
    ];
}
