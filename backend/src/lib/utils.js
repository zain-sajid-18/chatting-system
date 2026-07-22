import jwt from "jsonwebtoken";
import { env } from "./env.js";

export const generateToken = (userId, res) => {
  if (!env.JWT_SECRET) {
    throw new Error("JWT Secret is not set.");
  }

  const token = jwt.sign(
    { userId },
    env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,

    // JavaScript cannot access this cookie
    httpOnly: true,

    // Required for Vercel frontend → Render backend
    sameSite: env.NODE_ENV === "production" ? "none" : "lax",

    // Required when sameSite is "none"
    secure: env.NODE_ENV === "production",
  });

  return token;
};