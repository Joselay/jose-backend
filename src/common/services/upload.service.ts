import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

interface CloudinaryUploadResult {
  secure_url: string;
  [key: string]: any;
}

interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);

  constructor() {
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      this.logger.warn(
        'Cloudinary credentials not configured. File uploads will fail.',
      );
    } else {
      this.logger.log(
        'Cloudinary configuration detected. Upload service ready.',
      );
    }
  }

  async uploadFile(file: UploadedFile): Promise<string> {
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new BadRequestException(
        'Cloudinary is not configured. File uploads are unavailable.',
      );
    }

    return this.uploadToCloudinary(file);
  }

  private async uploadToCloudinary(file: UploadedFile): Promise<string> {
    this.logger.log(`Uploading file "${file.originalname}" to Cloudinary`);

    return new Promise<string>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'teacher-avatars',
          resource_type: 'auto',
          use_filename: true,
          unique_filename: true,
        },
        (error, result) => {
          if (error) {
            this.logger.error(
              `Failed to upload to Cloudinary: ${error.message}`,
            );
            return reject(error);
          }
          if (result) {
            this.logger.log(
              `File uploaded successfully to Cloudinary: ${result.secure_url}`,
            );
            resolve(result.secure_url);
          } else {
            reject(new Error('Cloudinary upload failed: No result returned'));
          }
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }
}
