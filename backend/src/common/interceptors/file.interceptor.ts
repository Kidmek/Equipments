import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
import { createUploadsDirectory } from '../utils/file.utils';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  private multerInterceptor: NestInterceptor;

  constructor() {
    this.multerInterceptor = new (FilesInterceptor('images', 4, {
      limits: {
        fileSize: 5 * 1024 * 1024, // Max file size: 5MB
      },
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          createUploadsDirectory();
          cb(null, path.join(process.cwd(), 'uploads')); // Store in 'uploads' directory
        },
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`); // Filename format
        },
      }),
    }))();
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    return this.multerInterceptor.intercept(context, next);
  }
}
