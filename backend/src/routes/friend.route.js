import express from "express";
import {
  searchUserByEmail,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
  getFriends,
  cancelFriendRequest,
  getSentFriendRequests
} from "../controllers/friend.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(protectRoute);

router.get("/search", searchUserByEmail);
router.post("/request", sendFriendRequest);
router.post("/cancel", cancelFriendRequest);
router.post("/accept", acceptFriendRequest);
router.post("/reject", rejectFriendRequest);
router.get("/requests", getFriendRequests);
router.get("/sent-requests", getSentFriendRequests);
router.get("/list", getFriends);

export default router;