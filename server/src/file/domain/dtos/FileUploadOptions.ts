import {BooleanField, IntegerField, StringField} from '@steroidsjs/nest/src/infrastructure/decorators/fields';
import {FileExpressSourceDto} from './sources/FileExpressSourceDto';
import {FileLocalSourceDto} from './sources/FileLocalSourceDto';
import {FileStreamSourceDto} from './sources/FileStreamSourceDto';

export class FileUploadOptions {
    @StringField({
        label: 'Files uids',
        isArray: true,
        nullable: true,
    })
    uids?: string;

    @StringField({
        label: 'Custom file title',
        nullable: true,
    })
    title?: string;

    @StringField({
        label: 'Relative path to sub-folder',
        nullable: true,
    })
    folder?: string;

    @StringField({
        label: 'Path to source file or express file or stream',
    })
    source?: FileExpressSourceDto | FileLocalSourceDto | FileStreamSourceDto;

    @StringField({
        label: 'Storage name (file, aws, ...)',
        nullable: true,
    })
    storageName: 'file' | string;

    @IntegerField({
        label: 'Max file size in megabyte',
        nullable: true,
    })
    maxSizeMb: number;

    @StringField({
        label: 'Set file mime types list for check',
        isArray: true,
        nullable: true,
    })
    mimeTypes: string[];

    @BooleanField({
        label: 'Set true, for auto set mime types as images (gif, jpeg, pjpeg, png)',
    })
    imagesOnly: boolean;
}
