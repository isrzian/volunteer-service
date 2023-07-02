import {applyDecorators, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {extname, join} from 'path';

const MAX_BITS_SIZE = 25165824; // 10 mb;

interface IFileUploadOptions {
    maxFileSize?: number,
}

export function FileUpload(options?: IFileUploadOptions) {
    return applyDecorators(
        UseInterceptors(
            FileInterceptor(
                'file',
                {
                    storage: diskStorage({
                        // TODO use FileConfigService
                        destination: process.env.APP_FILE_STORAGE_ROOT_PATH || join(process.cwd(), '../files/uploaded'),

                        filename: (request, file, callback) => {
                            const randomName = Array(24).fill(null)
                                .map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                            return callback(null, `${randomName}${extname(file.originalname)}`);
                        },
                    }),
                    limits: {
                        fileSize: options?.maxFileSize || MAX_BITS_SIZE,
                    },
                },
            ),
        ),
    );
}
