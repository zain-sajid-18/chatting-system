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

    logger.info(
      `Email sent successfully to ${to}. Message ID: ${response.messageId}`
    );

    return response;
  } catch (error) {
    logger.error(
      `Failed to send email to ${to}: ${
        error?.message || error
      }`
    );

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