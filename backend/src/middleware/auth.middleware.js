import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { env } from '../lib/env.js';
import logger from '../lib/logger.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided." });
        }
        const decoded = jwt.verify(token, env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized - Invalid Token provided" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        req.user = user;
        next();

    } catch (error) {
        logger.error("Error in protectRoute middleware", error);
        return res.status(401).json({ message: "Internal Server error" });
    }
};