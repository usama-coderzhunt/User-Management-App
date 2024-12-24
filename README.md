# User-Management-App

Overview

This project is a backend application that provides user authentication, role-based authorization, and CRUD operations for managing posts. The application uses MongoDB for database storage and ensures secure and validated data handling with JWT, bcrypt, and zod.

Features

# Authentication

- Sign Up: Users can register with email, password, and role.

- Login: Users can log in to obtain a JWT token for authentication.

- Role-Based Authorization

- Roles: Admin, Editor, User.

- Admin: Full access to all resources.

- Editor: Create, update, and delete posts.

- User: View posts only.

- Middleware ensures role-based access to endpoints.

# Validation and Security

- Validation: All requests are validated using zod.

- Password Security: Passwords are hashed using bcrypt.

- JWT: JWT tokens include role claims and are securely handled.

# Project Setup

# Prerequisites

- Node.js

- MongoDB

# Installation

run the following command in terminal:

git clone https://github.com/usama-coderzhunt/User-Management-App.git

# Install dependencies:

npm install

# Set up environment variables:

- Create a .env file in the project root.

- Add the following variables:

DATABASE:"Your database url"
JWT_SECRET_KEY="Your Secret key"

# Start the server:

- npm run dev

# Tools and Libraries

- Express.js: Backend framework.

- MongoDB: Database for storing users and posts.

- Mongoose: MongoDB object modeling.

- bcrypt: Password hashing.

- jsonwebtoken: JWT handling.

- zod: Schema validation.
