# Multiverse Portfolio

A microservice-based full-stack portfolio platform with admin CMS, authentication, and dynamic content management.

## Features

- Public portfolio website
- Admin login with JWT authentication
- Dynamic hero, about, skills, and contact sections
- Project CRUD management
- MongoDB Atlas database
- Separate auth-service and portfolio-service
- Multiverse-inspired UI

## Tech Stack

### Frontend
- React
- React Router
- Axios
- Framer Motion

### Backend
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- JWT Authentication

## Services

### portfolio-service
Handles:
- projects
- site content
- protected admin updates

### auth-service
Handles:
- admin login
- JWT token generation

## Local Development

### Frontend
```bash
cd frontend
npm install
npm start