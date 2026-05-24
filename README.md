# Project name
devPulse-bakend-api


# Live URL
https://your-live-url.com


# Features: 
   User authentication (Signup/Login with JWT)
 * Role-based access control (Contributor & Maintainer)
 * Create, update, delete issues
 * View all issues with filtering & sorting
 * Reporter details included in issue response
 * Protected routes using middleware
 * Secure password hashing using bcrypt
 * PostgreSQL raw SQL queries (no ORM)

-----
# Tech Stack
* Node.js (v18+ / LTS)
* TypeScript
* Express.js
* PostgreSQL (pg driver)
* bcrypt
* jsonwebtoken
* dotenv
* cors


##  Setup Instructions

``` bash
 1. Folder create and vs code open

 2. Install dependencies
npm install

 3. Create .env file
PORT=5000
CONNECTIONSTRING="postgresql://neondb_owner:npg_xtWC0vyruK5Z@ep-quiet-bread-aq4u9bqp-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
JWT_SECRET=eiuueiruoe5rfdk,rf4po

 4. Run project
npm run dev


--------------
``` API Endpoints
--------------
Auth Module
POST /api/auth/signup
POST /api/auth/login

Issues Module
POST /api/issues (Authenticated users)
GET /api/issues (Public)
GET /api/issues/:id (Public)
PATCH /api/issues/:id (Maintainer / Owner)
DELETE /api/issues/:id (Maintainer only)


---------------------
Database Schema Summary
---------------------

users table
id (SERIAL PRIMARY KEY)
name (VARCHAR)
email (UNIQUE)
password (VARCHAR)
role (contributor | maintainer)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)

------------
Issue Table:
id (SERIAL PRIMARY KEY)
title (VARCHAR 150)
description (TEXT)
type (bug | feature_request)
status (open | in_progress | resolved)
reporter_id (INTEGER)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)