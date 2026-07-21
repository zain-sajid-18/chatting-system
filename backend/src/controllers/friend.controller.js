import User from "../models/User.js";
import logger from "../lib/logger.js";

export const searchUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email }).select("-password -friendRequests -friends");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const loggedInUser = req.user._id;
    const isFriend = req.user.friends.some(friendId => friendId.toString() === user._id.toString());
    const isRequested = req.user.friendRequests.some(req => req.sender.toString() === user._id.toString());
    const hasSentRequest = (await User.findById(user._id)).friendRequests.some(req => req.sender.toString() === loggedInUser.toString());

    res.status(200).json({ user, isFriend, isRequested, hasSentRequest });
  } catch (error) {
    logger.error("Error in searchUserByEmail controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendFriendRequest = async (req, res) => {
  try {
    const { receiverId } = req.body;
    const senderId = req.user._id;

    if (senderId.toString() === receiverId) {
      return res.status(400).json({ message: "You can't send a friend request to yourself" });
    }

    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingRequest = receiver.friendRequests.find(
      req => req.sender.toString() === senderId.toString()
    );

    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    if (req.user.friends.includes(receiverId)) {
      return res.status(400).json({ message: "Already friends with this user" });
    }

    receiver.friendRequests.push({ sender: senderId, status: "pending" });
    await receiver.save();

    res.status(200).json({ message: "Friend request sent successfully" });
  } catch (error) {
    logger.error("Error in sendFriendRequest controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { senderId } = req.body;
    const receiverId = req.user._id;

    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    const requestIndex = receiver.friendRequests.findIndex(
      req => req.sender.toString() === senderId.toString() && req.status === "pending"
    );

    if (requestIndex === -1) {
      return res.status(404).json({ message: "Friend request not found" });
    }

    receiver.friendRequests[requestIndex].status = "accepted";
    receiver.friends.push(senderId);
    sender.friends.push(receiverId);

    await receiver.save();
    await sender.save();

    res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    logger.error("Error in acceptFriendRequest controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const rejectFriendRequest = async (req, res) => {
  try {
    const { senderId } = req.body;
    const receiverId = req.user._id;

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    receiver.friendRequests = receiver.friendRequests.filter(
      req => !(req.sender.toString() === senderId.toString() && req.status === "pending")
    );

    await receiver.save();

    res.status(200).json({ message: "Friend request rejected" });
  } catch (error) {
    logger.error("Error in rejectFriendRequest controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("friendRequests.sender", "-password -friendRequests -friends");

    const pendingRequests = user.friendRequests.filter(req => req.status === "pending");

    res.status(200).json(pendingRequests);
  } catch (error) {
    logger.error("Error in getFriendRequests controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("friends", "-password -friendRequests -friends");
    res.status(200).json(user.friends);
  } catch (error) {
    logger.error("Error in getFriends controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};