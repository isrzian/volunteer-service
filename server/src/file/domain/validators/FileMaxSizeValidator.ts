import {IValidator, IValidatorParams} from '@steroidsjs/nest/src/usecases/interfaces/IValidator';
import {FieldValidatorException} from '@steroidsjs/nest/src/usecases/exceptions/FieldValidatorException';
import {FileUploadOptions} from '../dtos/FileUploadOptions';
import {FileSaveDto} from '../dtos/FileSaveDto';

export class FileMaxSizeValidator implements IValidator {
    async validate(dto: FileSaveDto, params: IValidatorParams) {
        const options = params.params as FileUploadOptions;
        if (options.maxSizeMb && dto[params.name] > options.maxSizeMb * (1024 ** 2)) {
            throw new FieldValidatorException('Файл слишком большой, максимальный размер: {size}', {
                size: options.maxSizeMb + ' Mb',
            });
        }
    }
}
