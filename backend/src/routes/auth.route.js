import express from "express";
import { arcjetProtection } from "../controllers/arcjet.controller.js";
const router=express.Router();
import { signup,login,logout,updateProfile,verifyEmail, resendVerificationEmail, deleteAccount } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
router.use(arcjetProtection);
router.post("/signup",signup);
router.get("/verify-email",verifyEmail);
router.post("/resend-verification-email", protectRoute, resendVerificationEmail);
router.post('/login',login);
router.post('/logout',logout);
router.post('/update-profile',protectRoute,updateProfile);
router.delete('/delete',protectRoute,deleteAccount);
router.get("/check",protectRoute,(req,res)=>res.status(200).json(req.user));

export default router;