# 💬 Chatting System

A production-ready real-time chatting application built with the **MERN stack**, featuring secure authentication, email verification, friend management, one-on-one messaging, real-time communication, image sharing, typing indicators, message read receipts, and responsive design.

The project is deployed with a separate frontend and backend architecture and uses modern security, validation, logging, email, cloud storage, and real-time communication technologies.

--
---

# ✨ Key Features

## 🔐 Authentication & Account Security

* User registration with strong password validation
* Password confirmation during signup
* Secure password hashing using `bcryptjs`
* JWT-based authentication
* HTTP-only authentication cookies
* Secure production cookie configuration
* Protected backend routes
* Login and logout functionality
* Persistent authentication state
* Email verification system
* Verification token expiration
* Resend verification email functionality
* Account deletion functionality

### Password Requirements

Passwords must include:

* Minimum 8 characters
* At least one uppercase letter
* At least one number
* At least one special character

---

# 📧 Email Verification

New users are required to verify their email before accessing the application.

### Verification Flow

```text
User creates an account
        ↓
Verification token is generated
        ↓
Token is hashed and stored in MongoDB
        ↓
Verification email is sent using Resend
        ↓
User clicks verification link
        ↓
Frontend opens verification page
        ↓
Backend validates the token
        ↓
Email is marked as verified
        ↓
User can log in
```

### Email Features

* Verification email generation
* Secure hashed verification tokens
* Token expiration
* Verification status tracking
* Resend verification email functionality
* Production email delivery using Resend

---

# 👥 Friend System

Users cannot freely message every registered account.

The application uses a friend-request system to control communication.

### Features

* Search users by email
* Send friend requests
* View received friend requests
* View sent friend requests
* Accept friend requests
* Reject friend requests
* Cancel sent friend requests
* View friends list
* Chat only with accepted friends

### Friend Request Flow

```text
Search user by email
        ↓
Send friend request
        ↓
Recipient receives request
        ↓
Recipient accepts or rejects
        ↓
If accepted:
Both users become friends
        ↓
One-on-one chat becomes available
```

---

# 💬 Real-Time Messaging

The application provides real-time one-on-one communication using **Socket.IO**.

### Messaging Features

* One-on-one messaging
* Real-time message delivery
* Message history
* Online/offline user status
* Typing indicators
* Message seen/read status
* Single and double checkmarks
* Optimistic message UI
* Image sharing
* Cloudinary-based image storage

---

# ⚡ Real-Time Socket Events

### Server → Client

| Event            | Description                             |
| ---------------- | --------------------------------------- |
| `getOnlineUsers` | Sends currently online user IDs         |
| `newMessage`     | Delivers newly received messages        |
| `typing`         | Sends typing status                     |
| `messagesSeen`   | Notifies sender that messages were seen |

### Client → Server

| Event    | Description                         |
| -------- | ----------------------------------- |
| `typing` | Sends typing status to another user |

---

# 🖼️ Image Sharing

Users can send images through chat.

Images are:

1. Selected from the user's device
2. Uploaded to Cloudinary
3. Stored as a secure cloud URL
4. Sent through the messaging system

This prevents the application server from directly storing large image files.

---

# 📱 Responsive Design

The application is designed to work across:

* Desktop
* Tablet
* Mobile devices

Mobile-specific improvements include:

* Mobile-first chat layout
* Back navigation from chat view
* Responsive contact list
* Responsive friend management
* Adaptive spacing and UI components

---

# 🛡️ Security & Production Improvements

The backend includes multiple production-oriented security measures.

### Helmet

Adds security-related HTTP headers.

### CORS

Restricts frontend-backend communication to the configured frontend URL.

### HTTP-Only Cookies

JWT tokens are stored in HTTP-only cookies to reduce exposure to client-side JavaScript.

### Rate Limiting

Protects API endpoints from excessive requests.

### Arcjet

Provides additional bot protection and request security.

### Zod

Validates environment variables and prevents the application from starting with invalid configuration.

### bcryptjs

Securely hashes user passwords before database storage.

---

# 🧰 Technology Stack

## Frontend

* React 19
* Vite
* React Router
* Zustand
* Axios
* Socket.IO Client
* Tailwind CSS
* DaisyUI
* Lucide React
* React Hot Toast

## Backend

* Node.js
* Express.js
* Socket.IO
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Zod
* Winston
* Helmet
* CORS
* Express Rate Limit
* Arcjet

## Cloud Services

* MongoDB Atlas — Database
* Cloudinary — Image storage
* Resend — Email delivery
* Render — Backend deployment
* Vercel — Frontend deployment

---

# 🏗️ Project Architecture

```text
chatting-system/
│
├── backend/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── arcjet.controller.js
│   │   │   ├── auth.controller.js
│   │   │   ├── friend.controller.js
│   │   │   └── message.controller.js
│   │   │
│   │   ├── emails/
│   │   │   ├── emailHandlers.js
│   │   │   └── emailTemplate.js
│   │   │
│   │   ├── lib/
│   │   │   ├── arcjet.js
│   │   │   ├── cloudinary.js
│   │   │   ├── db.js
│   │   │   ├── env.js
│   │   │   ├── logger.js
│   │   │   ├── resend.js
│   │   │   └── utils.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── error.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── Message.js
│   │   │   └── User.js
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   ├── friend.route.js
│   │   │   └── message.route.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatContainer.jsx
│   │   │   ├── FriendRequests.jsx
│   │   │   ├── FriendSearch.jsx
│   │   │   ├── MessageInput.jsx
│   │   │   ├── ProfileHeader.jsx
│   │   │   └── ProfileModal.jsx
│   │   │
│   │   ├── hooks/
│   │   │
│   │   ├── lib/
│   │   │   └── axios.js
│   │   │
│   │   ├── pages/
│   │   │   ├── ChatPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── VerifyEmail.jsx
│   │   │
│   │   ├── store/
│   │   │   ├── useAuthStore.js
│   │   │   └── useChatStore.js
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
└── README.md
```

---

# ⚙️ Local Development Setup

## Prerequisites

Make sure the following are installed:

* Node.js
* MongoDB Atlas account or local MongoDB
* Cloudinary account
* Resend account
* Arcjet account

---

# 🔧 Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
.env
```

Use `.env.example` as a reference and configure the required environment variables.

Start the development server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

---

# 🎨 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

---

# 🔑 Environment Variables

## Backend

Example backend environment variables:

```env
NODE_ENV=development
PORT=3000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RESEND_API_KEY=your_resend_api_key

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

## Frontend

```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

> Never commit real secrets, API keys, passwords, or private credentials to GitHub.

---

# 🔌 API Documentation

## Authentication Routes

Base URL:

```text
/api/auth
```

| Method | Endpoint               | Description               |
| ------ | ---------------------- | ------------------------- |
| POST   | `/signup`              | Create a new account      |
| POST   | `/login`               | Log in                    |
| POST   | `/logout`              | Log out                   |
| GET    | `/check`               | Check authenticated user  |
| POST   | `/update-profile`      | Update profile picture    |
| DELETE | `/delete`              | Delete account            |
| GET    | `/verify-email/:token` | Verify email              |
| POST   | `/resend-verification` | Resend verification email |

---

## Friend Routes

Base URL:

```text
/api/friend
```

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/search`        | Search user by email  |
| POST   | `/request`       | Send friend request   |
| POST   | `/accept`        | Accept friend request |
| POST   | `/reject`        | Reject friend request |
| POST   | `/cancel`        | Cancel sent request   |
| GET    | `/requests`      | Get received requests |
| GET    | `/sent-requests` | Get sent requests     |
| GET    | `/list`          | Get friends list      |

---

## Message Routes

Base URL:

```text
/api/message
```

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| GET    | `/contacts`     | Get friends              |
| GET    | `/chats`        | Get chat partners        |
| GET    | `/:userId`      | Get messages with a user |
| POST   | `/send/:userId` | Send a message           |

---

# 🗄️ Database Models

## User

The User model stores:

* Name
* Email
* Password
* Profile picture
* Email verification status
* Verification token
* Verification token expiration
* Friends
* Received friend requests
* Sent friend requests

## Message

The Message model stores:

* Sender
* Receiver
* Text
* Image URL
* Seen status
* Seen timestamp
* Creation timestamp

---

# 🚀 Deployment Architecture

The production application is deployed using separate services.

```text
                 ┌─────────────────────┐
                 │       Vercel        │
                 │      Frontend       │
                 └──────────┬──────────┘
                            │
                            │ HTTPS / REST API
                            │ Socket.IO
                            ▼
                 ┌─────────────────────┐
                 │       Render        │
                 │       Backend       │
                 └──────┬───────┬──────┘
                        │       │
                        │       │
                        ▼       ▼
                ┌──────────┐  ┌──────────┐
                │ MongoDB  │  │Cloudinary│
                │  Atlas   │  │  Images  │
                └──────────┘  └──────────┘
                        │
                        ▼
                   ┌────────┐
                   │ Resend │
                   │ Emails │
                   └────────┘
```

---

# 🧪 Testing the Application

Recommended testing workflow:

### 1. Create Account

Register with a real email address.

### 2. Verify Email

Open the verification email and click the verification link.

### 3. Login

Log in after successful email verification.

### 4. Create Another Account

Use a different real email address.

### 5. Send Friend Request

Search for the second user using their email.

### 6. Accept Request

Log into the second account and accept the request.

### 7. Start Chatting

Test:

* Real-time messages
* Online status
* Typing indicator
* Message seen status
* Image sharing

### 8. Test Mobile Experience

Test the deployed application on a mobile device.

---

# 📈 Production Improvements Implemented

This project was improved from a basic chat application into a more production-oriented system by adding:

* Real-time Socket.IO communication
* Email verification
* Friend-request-based communication
* Secure JWT authentication
* HTTP-only cookies
* Password validation
* Environment variable validation
* Centralized error handling
* Winston logging
* Helmet security headers
* CORS configuration
* API rate limiting
* Arcjet bot protection
* Cloudinary image storage
* MongoDB Atlas database
* Responsive mobile-first design
* Message read receipts
* Typing indicators
* Account deletion
* Production deployment

---

# 🔮 Future Improvements

Potential future enhancements include:

* Group conversations
* Message editing
* Message deletion
* Push notifications
* End-to-end encryption
* Message search
* Voice messages
* Video calls
* Message reactions
* User blocking
* Online last-seen timestamps
* Multi-device session management
* Notification preferences

---

# 👨‍💻 Author

**Zain Sajid**

Software Engineering Graduate | Full-Stack Developer

Interested in building scalable, secure, and user-focused software systems.

---

## ⭐ If you found this project interesting

Feel free to explore the project, test the live application, and provide feedback.

Built with modern web technologies and a focus on real-time communication, security, and production-ready development practices.
