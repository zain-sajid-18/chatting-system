
import { Resend } from "resend";
import { env } from "./env.js";
import logger from "./logger.js";

let resendClient = null;
let sender = {
  email: env.EMAIL_FROM,
  name: env.EMAIL_FROM_NAME,
};

if (env.RESEND_API_KEY) {
  resendClient = new Resend(env.RESEND_API_KEY);
} else {
  logger.warn("RESEND_API_KEY not set, welcome emails will not be sent.");
}

export { resendClient, sender };
