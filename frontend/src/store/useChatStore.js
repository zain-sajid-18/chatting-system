import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
  friendRequests: [],
  searchedUser: null,
  isSearching: false,

  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };
    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({
        messages: messages
          .filter((msg) => msg._id !== tempId)
          .concat(res.data),
      });
    } catch (error) {
      set({ messages: messages });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      const currentMessages = get().messages;
      set({ messages: [...currentMessages, newMessage] });

      if (isSoundEnabled) {
        const notificationSound = new Audio("/sounds/notification.mp3");

        notificationSound.currentTime = 0; // reset to start
        notificationSound.play().catch((e) => console.log("Audio play failed:", e));
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  searchUser: async (email) => {
    set({ isSearching: true });
    try {
      const res = await axiosInstance.get(`/friend/search?email=${encodeURIComponent(email)}`);
      set({ searchedUser: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "User not found");
      set({ searchedUser: null });
    } finally {
      set({ isSearching: false });
    }
  },

  sendFriendRequest: async (receiverId) => {
    try {
      await axiosInstance.post("/friend/request", { receiverId });
      toast.success("Friend request sent!");
      set((state) => ({
        searchedUser: state.searchedUser ? { ...state.searchedUser, hasSentRequest: true } : null,
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  acceptFriendRequest: async (senderId) => {
    try {
      await axiosInstance.post("/friend/accept", { senderId });
      toast.success("Friend request accepted!");
      set((state) => ({
        friendRequests: state.friendRequests.filter((req) => req.sender._id !== senderId),
      }));
      get().getAllContacts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  rejectFriendRequest: async (senderId) => {
    try {
      await axiosInstance.post("/friend/reject", { senderId });
      toast.success("Friend request rejected!");
      set((state) => ({
        friendRequests: state.friendRequests.filter((req) => req.sender._id !== senderId),
      }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  getFriendRequests: async () => {
    try {
      const res = await axiosInstance.get("/friend/requests");
      set({ friendRequests: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },
}));
