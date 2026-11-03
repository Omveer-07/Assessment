# SprintBoard – Real-Time Collaborative Issue Tracker

## Project Overview

SprintBoard is a full-stack project and issue management application built using the MERN stack. It allows authenticated users to create projects, manage development issues, track their status and priority, and monitor project statistics through a dashboard.

## Features

- User registration and login
- JWT-based authentication
- Password hashing using bcrypt
- Protected backend APIs
- Project CRUD operations
- Issue CRUD operations
- Project ownership authorization
- Issue status and priority management
- Backend issue filtering
- Search issues by title
- Dashboard statistics
- Activity logging
- Responsive React interface

## Technology Stack

**Frontend**
- React.js
- React Hooks
- React Router
- Axios
- CSS
- Lucide React

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

## Project Structure

```text
sprintboard/
├── client/
├── server/
├── README.md
└── .env.example
```

## Installation

### 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd sprintboard
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file using `.env.example`.

Start backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the server directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## API Base URL

```text
http://localhost:5000/api
```

## Authentication

The application uses JWT-based authentication. Protected APIs require a Bearer token in the Authorization header.

## Issue Filtering Examples

```text
GET /api/issues?status=todo
GET /api/issues?priority=high
GET /api/issues?search=login
GET /api/issues?status=in-progress&priority=high
```

## Database Collections

- Users
- Projects
- Issues
- Activities

## Developer

Omveer Singh

B.Tech – ICFAI University, Jaipur