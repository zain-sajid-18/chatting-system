import { brevoClient, sender } from "../lib/brevo.js";
import {
  createVerificationEmailTemplate,
  createWelcomeEmailTemplate,
} from "./emailTemplate.js";
import logger from "../lib/logger.js";

const sendEmail = async ({
  to,
  name,
  subject,
  html,
}) => {
  if (!brevoClient) {
    logger.warn(
      "Email skipped because BREVO_API_KEY is not configured."
    );

    return null;
  }

  try {
    logger.info(`4. Brevo API request started for email: ${to}`);
    const response =
      await brevoClient.transactionalEmails.sendTransacEmail({
        sender: {
          email: sender.email,
          name: sender.name,
        },

        to: [
          {
            email: to,
            name,
          },
        ],

        subject,

        htmlContent: html,
      });

    logger.info(`5. Brevo email sent successfully to ${to}. Message ID: ${response.messageId}`);

    return response;
  } catch (error) {
    logger.error(
      `Failed to send email to ${to}: ${
        error?.message || error
      }`
    );

    // Log more error details if available
    if (error?.response?.data) {
      logger.error(`Brevo API error details for ${to}: ${JSON.stringify(error.response.data)}`);
    }

    throw error;
  }
};

export const sendVerificationEmail = async (
  email,
  name,
  verificationUrl
) => {
  return sendEmail({
    to: email,
    name,

    subject:
      "Verify Your Email - Chatting System",

    html: createVerificationEmailTemplate(
      name,
      verificationUrl
    ),
  });
};

export const sendWelcomeEmail = async (
  email,
  name,
  clientURL
) => {
  return sendEmail({
    to: email,
    name,

    subject:
      "Welcome to Chatting System",

    html: createWelcomeEmailTemplate(
      name,
      clientURL
    ),
  });
};