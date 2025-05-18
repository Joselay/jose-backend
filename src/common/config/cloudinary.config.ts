import { Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

const logger = new Logger('CloudinaryConfig');

export const CloudinaryConfig = {
  configureCloudinary: () => {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (cloudName && apiKey && apiSecret) {
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
      });
      logger.log('✅ Cloudinary configured successfully');
    } else {
      logger.error(
        '❌ Cloudinary credentials missing. Application may not function correctly!',
      );
      logger.error(
        'Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.',
      );
    }
  },
};
