# Progress Document

## Summary of Changes

This document outlines all the changes made to improve the chatting system:

---

## 1. Friend System Implementation (Previously Completed)

### Backend Changes:

#### Updated User Model (`backend/src/models/User.js`):
- Added `friends` array: Stores ObjectIds of friends
- Added `friendRequests` array: Stores friend requests with sender and status (pending, accepted, rejected)
- Added `emailVerified` boolean: Tracks if user's email is verified
- Added `verificationToken`: Hashed verification token
- Added `verificationTokenExpiresAt`: Expiration time for verification token

#### Created Friend Controller (`backend/src/controllers/friend.controller.js`):
- `searchUserByEmail`: Search for user by email, returns user and friend status
- `sendFriendRequest`: Send a friend request to another user
- `acceptFriendRequest`: Accept a friend request and add both users as friends
- `rejectFriendRequest`: Reject a friend request
- `getFriendRequests`: Get all pending friend requests
- `getFriends`: Get list of friends

#### Created Friend Routes (`backend/src/routes/friend.route.js`):
- `/api/friend/search`: GET - Search user by email
- `/api/friend/request`: POST - Send friend request
- `/api/friend/accept`: POST - Accept friend request
- `/api/friend/reject`: POST - Reject friend request
- `/api/friend/requests`: GET - Get friend requests
- `/api/friend/list`: GET - Get friends list

#### Updated Server (`backend/src/server.js`):
- Added friend routes to the express app

#### Updated Message Controller (`backend/src/controllers/message.controller.js`):
- Updated `getAllContacts` to return only friends instead of all users

---

## 2. Email Verification System (Previously Completed)

### Backend Changes:
- Updated `auth.controller.js`: Added `verifyEmail`, `resendVerificationEmail` functions
- Updated Signup: Generates verification token, hashes it, stores in DB, sends verification email
- Updated Login: Requires email to be verified
- Updated `emailHandlers.js`: Added `sendVerificationEmail` function
- Updated `emailTemplate.js`: Added verification email template
- Updated `auth.route.js`: Added routes for verify email and resend verification email

### Frontend Changes:
- Created `VerifyEmail.jsx`: Email verification page
- Updated `App.jsx`: Added route for verify email
- Updated `useAuthStore.js`: Added `resendVerificationEmail` function, updated signup toast

---

## 3. Responsive Design Improvements (Previously Completed)
- Updated `App.jsx`: Reduced padding on small screens
- Updated `ChatPage.jsx`: Mobile-first design, with back button for chat view

---

## 4. UX Improvements (Previously Completed)
- Clear "No friends yet" message when contact list is empty
- Friend search and request interface is intuitive
- Mobile navigation with back button
- Clean, consistent UI across all devices
- Email verification flow with success/error states

---

## 5. New Features Added

### 5.1 Sent Friend Requests & Cancel Functionality
- Backend: Updated User model to add `sentFriendRequests` array
- Backend: Updated `friend.controller.js` to add `cancelFriendRequest` and `getSentFriendRequests`
- Backend: Updated `friend.route.js` to add `/cancel` and `/sent-requests` endpoints
- Frontend: Updated `useChatStore.js` to add state and actions for sent friend requests
- Frontend: Updated `FriendRequests.jsx` to add tabs for received/sent requests and cancel button
- Frontend: Updated `FriendSearch.jsx` to allow canceling sent requests

### 5.2 Profile Modal with Email & Delete Account
- Backend: Updated `auth.controller.js` to add `deleteAccount` that deletes all user's messages and removes them from friends/friend requests
- Backend: Updated `auth.route.js` to add DELETE `/auth/delete` endpoint
- Frontend: Added `ProfileModal.jsx` component to display user's email and delete account option
- Frontend: Updated `ProfileHeader.jsx` to add profile button and modal integration
- Frontend: Updated `useAuthStore.js` to add `deleteAccount` action

### 5.3 Message Seen Feature
- Backend: Updated `Message.js` model to add `isSeen` boolean and `seenAt` date
- Backend: Updated `getMessagesByUserID` to mark messages as seen when a user opens a chat
- Backend: Added socket event "messagesSeen" to notify the sender when their messages are seen
- Frontend: Updated `useChatStore.js` to listen for "messagesSeen" event and update messages
- Frontend: Updated `ChatContainer.jsx` to display single/double checkmarks for sent messages

### 5.4 Typing Indicators
- Frontend: Updated `MessageInput.jsx` to emit typing events when user types
- Frontend: Updated `useChatStore.js` to add `isTyping` state and listen for typing events
- Frontend: Updated `ChatContainer.jsx` to display typing indicator

---

## Files Modified/Created:

### Backend:
- Modified: `backend/src/models/User.js`
- Modified: `backend/src/models/Message.js`
- Modified: `backend/src/controllers/message.controller.js`
- Modified: `backend/src/controllers/auth.controller.js`
- Modified: `backend/src/controllers/friend.controller.js`
- Modified: `backend/src/routes/auth.route.js`
- Modified: `backend/src/routes/friend.route.js`
- Modified: `backend/src/server.js`
- Modified: `backend/src/emails/emailTemplate.js`
- Modified: `backend/src/emails/emailHandlers.js`

### Frontend:
- Modified: `frontend/src/store/useChatStore.js`
- Modified: `frontend/src/store/useAuthStore.js`
- Modified: `frontend/src/pages/ChatPage.jsx`
- Modified: `frontend/src/App.jsx`
- Created: `frontend/src/pages/VerifyEmail.jsx`
- Created: `frontend/src/components/FriendSearch.jsx`
- Modified: `frontend/src/components/FriendRequests.jsx`
- Created: `frontend/src/components/ProfileModal.jsx`
- Modified: `frontend/src/components/ProfileHeader.jsx`
- Modified: `frontend/src/components/ChatContainer.jsx`
- Modified: `frontend/src/components/MessageInput.jsx`
- Created/Modified: `progress.md` (this file)
