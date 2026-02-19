# JkpgCity App Project
Web Development – Advanced Concepts 

Project: Web application for managing venues in Jönköping.

Students: [Tereza], [], [], []

---

## Project Description

- Client-side rendering with JavaScript
- REST API built with Node.js + Express
- Database
- Dockerized database setup
- CRUD functionality (Create, Read, Update, Delete)

The frontend communicates with the backend through REST endpoints and dynamically renders content using the DOM API.

---

## Architecture

Frontend:
- HTML
- CSS
- JavaScript (DOM manipulation + Fetch API)

Backend:
- Node.js
- Express
- REST API
- PostgreSQL (via `pg`)

Database:
- PostgreSQL
- Automatically initialized and seeded via `db/init.sql`
- Runs in Docker container

---

## How to Run the Project

### 1. Start Database (Docker)
From the project root:
docker compose up -d

### 2. Start Backend
From backend:

cd backend

npm install

npm start

## Server runs at:
http://localhost:3000

## API endpoint:
http://localhost:3000/api/venues


