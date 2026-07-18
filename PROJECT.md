
# Chatting System - Project Documentation

## Overview
A real-time chatting application with user authentication, one-on-one messaging, and media sharing. Built with React (Vite), Express.js, Node.js, MongoDB, and Socket.IO.

## Tech Stack
### Backend
- **Node.js** + **Express.js**: Server and API
- **MongoDB** + **Mongoose**: Database and ODM
- **Socket.IO**: Real-time communication
- **JWT**: Authentication
- **bcryptjs**: Password hashing
- **Zod**: Environment variable validation
- **Winston**: Logging
- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Express-rate-limit**: Rate limiting
- **Cloudinary**: Image storage
- **Resend**: Email sending
- **Arcjet**: Bot protection & rate limiting

### Frontend
- **React** 19: UI library
- **Vite**: Build tool
- **React Router**: Routing
- **Zustand**: State management
- **Socket.IO-client**: Real-time client
- **Axios**: HTTP client
- **Lucide React**: Icons
- **React Hot Toast**: Notifications
- **Tailwind CSS**: Styling
- **DaisyUI**: Component library

## Project Structure
```
chatting-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── arcjet.controller.js
│   │   │   ├── auth.controller.js
│   │   │   └── message.controller.js
│   │   ├── emails/
│   │   │   ├── emailHandlers.js
│   │   │   └── emailTemplate.js
│   │   ├── lib/
│   │   │   ├── arcjet.js
│   │   │   ├── cloudinary.js
│   │   │   ├── db.js
│   │   │   ├── env.js
│   │   │   ├── logger.js
│   │   │   ├── resend.js
│   │   │   └── utils.js
│   │   ├── middleware/
│   │   │   ├── auth.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── models/
│   │   │   ├── Message.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── auth.route.js
│   │   │   └── message.route.js
│   │   └── server.js
│   ├── .env
│   ├── .env.example
│   ├── package-lock.json
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── lib/
    │   ├── pages/
    │   ├── store/
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── package-lock.json
    └── package.json
```

## Key Features
### Authentication
- User signup with password confirmation and strong validation
- User login
- User logout
- JWT-based authentication with HTTP-only cookies
- Protected routes

### Chat
- One-on-one real-time messaging
- Online status tracking
- Typing indicators
- Message history
- Image sharing via Cloudinary

## Environment Variables
See `backend/.env.example` for all required environment variables.

## Setup Instructions
### Prerequisites
- Node.js installed
- MongoDB URI
- Cloudinary account (optional, for image uploads)
- Resend account (optional, for welcome emails)
- Arcjet account (optional, for bot protection)

### Backend Setup
1. Navigate to `backend/`
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in all variables
4. Start server: `npm run dev` (development) or `npm start` (production)

### Frontend Setup
1. Navigate to `frontend/`
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## API Documentation
### Authentication Routes (`/api/auth`)
- `POST /signup`: Create new user
- `POST /login`: Log in user
- `POST /logout`: Log out user
- `POST /update-profile`: Update user profile picture
- `GET /check`: Check authenticated user (protected)

### Message Routes (`/api/message`)
- `GET /contacts`: Get all users (protected)
- `GET /chats`: Get chat partners (protected)
- `GET /:userId`: Get messages with user (protected)
- `POST /send/:userId`: Send message to user (protected)

## Socket.IO Events
### Server -> Client
- `getOnlineUsers`: Array of online user IDs
- `newMessage`: New message received
- `typing`: User typing status

### Client -> Server
- `typing`: Send typing status to recipient

## Changes Made
### Initial Production Improvements
1. Installed and configured Socket.IO for real-time messaging
2. Added proper environment variable validation with Zod
3. Implemented Winston logging
4. Added error handling middleware
5. Helmet for security headers
6. CORS configuration
7. Express-rate-limit for rate limiting
8. Health check endpoint `/health`
9. Fixed API path mismatches (messages → message)
10. Fixed HTTP method mismatch (updateProfile: PUT → POST)
11. Optimistic UI improvements (removed temp message after actual response)
12. All lib files use env.js instead of process.env directly

### Recent Changes (User Request)
1. Fixed auth middleware to use env.js
2. Added password confirmation field in signup form
3. Added strong password validation (min 8 chars, 1 uppercase, 1 number, 1 special) on both frontend and backend
4. Added visual password requirements checklist on frontend
5. Created .env.example
6. Created comprehensive project documentation (PROJECT.md)
7. Improved error notifications on frontend

## Future Improvements
- Group chats
- Message read receipts
- Message editing/deletion
- End-to-end encryption
- User profile customization
- Push notifications
- Message search
