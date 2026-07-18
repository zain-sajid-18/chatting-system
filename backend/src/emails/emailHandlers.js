
import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";
import logger from "../lib/logger.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  if (!resendClient) {
    logger.warn("Skipping welcome email: RESEND_API_KEY not set.");
    return;
  }

  try {
    const { data, error } = await resendClient.emails.send({
      from: `${sender.name} <${sender.email}>`,
      to: email,
      subject: "Welcome to my Chatting system.",
      html: createWelcomeEmailTemplate(name, clientURL),
    });

    if (error) {
      logger.error("Error sending welcome email:", error);
    } else {
      logger.info("Welcome Email sent successfully", data);
    }
  } catch (error) {
    logger.error("Error in sendWelcomeEmail:", error);
  }
};
