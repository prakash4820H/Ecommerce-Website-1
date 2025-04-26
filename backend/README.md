# JPBABA E-commerce Backend

This is the backend API for the JPBABA E-commerce website, built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login, verification)
- Email verification
- Password reset
- User profile management
- JWT-based authentication
- Role-based access control

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/jpbaba_ecommerce

   # JWT Secret for Authentication
   JWT_SECRET=your_super_secure_jwt_secret_key_change_this_in_production
   JWT_EXPIRE=30d

   # Email Configuration (for sending verification emails)
   EMAIL_SERVICE=gmail
   EMAIL_USERNAME=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   EMAIL_FROM=your_email@gmail.com

   # Frontend URL (for CORS)
   CLIENT_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/logout` - Logout user (protected)
- `GET /api/auth/verify-email/:token` - Verify email
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password
- `PUT /api/auth/update-details` - Update user details (protected)
- `PUT /api/auth/update-password` - Update password (protected)

## Security Measures

- Passwords are hashed using bcrypt
- JWT for authentication
- HTTP-only cookies
- CORS configuration
- Email verification
- Input validation and sanitization

## Development

For local development:

```bash
npm run dev
```

This will start the server with nodemon for hot reloading.
