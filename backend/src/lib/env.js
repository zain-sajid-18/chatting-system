import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({

  PORT: z
    .string()
    .transform(Number)
    .default("3000"),

  JWT_SECRET: z
    .string()
    .min(1, "JWT_SECRET is required"),

  NODE_ENV: z
    .enum([
      "development",
      "production",
      "test",
    ])
    .default("development"),

  MONGO_URL: z
    .string()
    .optional()
    .default(
      "mongodb://localhost:27017/chatting-system"
    ),

  // Brevo
  BREVO_API_KEY: z
    .string()
    .optional(),

  EMAIL_FROM: z
    .string()
    .email(
      "EMAIL_FROM must be a valid email address"
    )
    .default("your-email@example.com"),

  EMAIL_FROM_NAME: z
    .string()
    .default("Chatting System"),

  CLIENT_URL: z
    .string()
    .url()
    .default("http://localhost:5173"),

  CLOUDINARY_CLOUD_NAME: z
    .string()
    .optional(),

  CLOUDINARY_API_KEY: z
    .string()
    .optional(),

  CLOUDINARY_API_SECRET: z
    .string()
    .optional(),

  ARCJET_KEY: z
    .string()
    .optional(),

  ARCJET_ENVIRONMENT: z
    .enum([
      "development",
      "production",
    ])
    .default("development"),
});

const parsedEnv =
  envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:"
  );

  console.error(
    parsedEnv.error.flatten().fieldErrors
  );

  process.exit(1);
}

export const env = parsedEnv.data;