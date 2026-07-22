
import User from "../models/User.js";
import Message from "../models/Message.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail, sendVerificationEmail } from "../emails/emailHandlers.js";
import { cloudinary, isCloudinaryConfigured } from "../lib/cloudinary.js";
import { env } from "../lib/env.js";
import logger from "../lib/logger.js";

export const signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, with one uppercase letter, one number, and one special character",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedVerificationToken = await bcrypt.hash(verificationToken, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      verificationToken: hashedVerificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    await newUser.save();
    generateToken(newUser._id, res);

    // Send verification email
    const verificationUrl = `${env.CLIENT_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(newUser.email)}`;
    
    try {
      await sendVerificationEmail(newUser.email, newUser.fullName, verificationUrl);
      await sendWelcomeEmail(newUser.email, newUser.fullName, env.CLIENT_URL);
    } catch (error) {
      logger.error("Failed to send email(s):", error.message);
    }

    res.status(201).json({
      message: "User created successfully. Please check your email to verify your account.",
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      profilePic: newUser.profilePic,
      emailVerified: newUser.emailVerified,
    });
  } catch (error) {
    logger.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token, email } = req.query;
    if (!token || !email) {
      return res.status(400).json({ message: "Token and email are required" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // First check if email is already verified
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification link" });
    }

    if (user.emailVerified) {
      // Email is already verified
      return res.status(200).json({ message: "Email verified successfully" });
    }

    // Check if token is valid and not expired
    if (!user.verificationToken || !user.verificationTokenExpiresAt || user.verificationTokenExpiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired verification link" });
    }

    const isTokenValid = await bcrypt.compare(token, user.verificationToken);
    if (!isTokenValid) {
      return res.status(400).json({ message: "Invalid or expired verification link" });
    }

    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    logger.error("Error in verifyEmail controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resendVerificationEmail = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.emailVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const hashedVerificationToken = await bcrypt.hash(verificationToken, 10);

    user.verificationToken = hashedVerificationToken;
    user.verificationTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    await user.save();

    // Send verification email
    const verificationUrl = `${env.CLIENT_URL}/verify-email?token=${verificationToken}&email=${encodeURIComponent(user.email)}`;
    try {
      await sendVerificationEmail(user.email, user.fullName, verificationUrl);
    } catch (error) {
      logger.error("Failed to send verification email:", error.message);
      return res.status(500).json({ message: "Failed to send verification email" });
    }

    res.status(200).json({ message: "Verification email resent successfully" });
  } catch (error) {
    logger.error("Error in resendVerificationEmail controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (!user.emailVerified) {
      return res.status(403).json({ message: "Please verify your email before logging in" });
    }
    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      emailVerified: user.emailVerified,
    });
  } catch (error) {
    logger.error("Error in login controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateProfile = async (req, res, next) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic) {
      return res.status(400).json({ message: "Profile picture is required" });
    }
    if (!isCloudinaryConfigured) {
      return res.status(400).json({ message: "Image uploads are not available at this time." });
    }
    const userId = req.user._id;
    const upload = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: upload.secure_url },
      { new: true }
    ).select("-password");
    res.status(200).json(updatedUser);
  } catch (error) {
    logger.error("Error in updateProfile controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;
    
    // Delete all messages sent or received by this user
    await Message.deleteMany({
      $or: [{ senderId: userId }, { receiverId: userId }]
    });
    
    // Remove user from friends lists and friend requests of other users
    await User.updateMany(
      { friends: userId },
      { $pull: { friends: userId } }
    );
    
    await User.updateMany(
      { "friendRequests.sender": userId },
      { $pull: { friendRequests: { sender: userId } } }
    );
    
    await User.updateMany(
      { "sentFriendRequests.receiver": userId },
      { $pull: { sentFriendRequests: { receiver: userId } } }
    );
    
    // Delete the user
    await User.findByIdAndDelete(userId);
    
    // Clear the cookie
    res.cookie("jwt", "", { maxAge: 0 });
    
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    logger.error("Error in deleteAccount controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
