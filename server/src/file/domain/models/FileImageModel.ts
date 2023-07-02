import {
    PrimaryKeyField,
    RelationField,
    StringField,
    CreateTimeField, IntegerField, RelationIdField, BooleanField,
} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import { FileModel } from './FileModel';

/**
 * Миниатюры изображений файлов
 */
export class FileImageModel {
    @PrimaryKeyField()
    id: number;

    @StringField()
    previewName: string;

    @BooleanField()
    isOriginal: boolean;

    @StringField({
        label: 'Url по которому доступен файл',
        noColumn: true,
    })
    url: string;

    @StringField({
        label: 'Имя хранилища',
        nullable: true,
    })
    storageName: string;

    @StringField({
        label: 'Название файла',
    })
    fileName: string;

    @IntegerField({
        label: 'Размер изображения (байты)',
    })
    fileSize: number;

    @StringField({
        label: 'MIME тип изображения',
        nullable: true,
    })
    fileMimeType: string;

    @StringField({
        label: 'Директория',
        nullable: true,
    })
    folder: string;

    @IntegerField({
        label: 'Ширина',
        nullable: true,
    })
    width: number;

    @IntegerField({
        label: 'Высота',
        nullable: true,
    })
    height: number;

    @CreateTimeField({
        label: 'Создан',
    })
    createTime: string;

    @RelationField({
        label: 'Файл',
        type: 'ManyToOne',
        relationClass: () => FileModel,
    })
    file: FileModel;

    @RelationIdField({
        nullable: true,
        relationName: 'file',
    })
    fileId: number;
}
