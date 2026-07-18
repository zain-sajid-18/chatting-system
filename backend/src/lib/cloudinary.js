
import { v2 as cloudinary } from "cloudinary";
import { env } from "./env.js";
import logger from "./logger.js";

let isCloudinaryConfigured = false;

if (
  env.CLOUDINARY_CLOUD_NAME &&
  env.CLOUDINARY_API_KEY &&
  env.CLOUDINARY_API_SECRET
) {
  cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
  });
  isCloudinaryConfigured = true;
} else {
  logger.warn("Cloudinary credentials not set, image uploads will not work.");
}

export { cloudinary, isCloudinaryConfigured };
