import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as fs from 'fs';
import * as path from 'path';
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
  private readonly uploadDir = 'uploads/avatars';

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: UploadedFile): Promise<string> {
    if (
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
    ) {
      return this.uploadToCloudinary(file);
    } else {
      return this.saveLocally(file);
    }
  }

  private async saveLocally(file: UploadedFile): Promise<string> {
    try {
      const filename = `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`;
      const filepath = path.join(this.uploadDir, filename);

      fs.writeFileSync(filepath, file.buffer);

      const baseUrl =
        process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
      return `${baseUrl}/${filepath}`;
    } catch (error) {
      this.logger.error(`Failed to save file locally: ${error.message}`);
      throw error;
    }
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
