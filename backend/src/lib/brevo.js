import { BrevoClient } from "@getbrevo/brevo";
import { env } from "./env.js";
import logger from "./logger.js";

let brevoClient = null;

const sender = {
  email: env.EMAIL_FROM,
  name: env.EMAIL_FROM_NAME,
};

if (env.BREVO_API_KEY) {
  brevoClient = new BrevoClient({
    apiKey: env.BREVO_API_KEY,
  });

  logger.info("Brevo email service initialized successfully.");
} else {
  logger.warn(
    "BREVO_API_KEY is not set. Emails will not be sent."
  );
}

export { brevoClient, sender };