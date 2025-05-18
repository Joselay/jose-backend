import { v2 as cloudinary } from 'cloudinary';

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
      console.log(
        '✅ Cloudinary configured successfully - uploads will go to Cloudinary',
      );
    } else {
      console.warn(
        '⚠️ Cloudinary credentials not found - uploads will be stored locally',
      );
    }
  },
};
