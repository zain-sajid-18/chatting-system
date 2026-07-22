import express from "express";

import {
  signup,
  login,
  logout,
  updateProfile,
  verifyEmail,
  resendVerificationEmail,
  deleteAccount,
} from "../controllers/auth.controller.js";

import {
  arcjetProtection,
} from "../controllers/arcjet.controller.js";

import {
  protectRoute,
} from "../middleware/auth.middleware.js";


const router =
  express.Router();


router.use(
  arcjetProtection
);


router.post(
  "/signup",
  signup
);


router.get(
  "/verify-email",
  verifyEmail
);


router.post(
  "/resend-verification-email",
  resendVerificationEmail
);


router.post(
  "/login",
  login
);


router.post(
  "/logout",
  logout
);


router.post(
  "/update-profile",
  protectRoute,
  updateProfile
);


router.delete(
  "/delete",
  protectRoute,
  deleteAccount
);


router.get(
  "/check",
  protectRoute,
  (req, res) =>
    res.status(200).json(req.user)
);


export default router;