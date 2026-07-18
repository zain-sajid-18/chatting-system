
import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().transform(Number).default("3000"),
  JWT_SECRET: z.string().min(1, "JWT_SECRET is required").default(process.env.JWT_SECRET),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  MONGO_URL: z.string().optional().default("mongodb://localhost:27017/chatting-system"),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().optional().default("onboarding@resend.dev"),
  EMAIL_FROM_NAME: z.string().optional().default("Zain Sajid"),
  CLIENT_URL: z.string().url().default("http://localhost:5173"),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(process.env.CLOUDINARY_API_KEY),
  CLOUDINARY_API_SECRET: z.string().optional(process.env.CLOUDINARY_API_SECRET),
  ARCJET_KEY: z.string().optional(process.env.ARCJET_KEY),
  ARCJET_ENVIRONMENT: z.enum(["development", "production"]).default(process.env.ARCJET_ENVIRONMENT),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:");
  console.error(parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
