# 📚 Book Review Backend App

A simple **Node.js + Express.js** web application built as a **mini-project** for backend revision and practice.  
This project focuses on **REST API development, authentication with JWT & sessions, and CRUD operations** using mock data.  
It’s a great reference for anyone learning backend fundamentals in JavaScript.

---

## 🚀 Features
- User Registration & Authentication (with JWT and sessions)
- Publicly accessible book search by **ISBN, Author, or Title**
- Authenticated users can **add, update, or delete reviews**
- Demonstrates **async/await** and **Promises** for route handling
- Clean folder structure with separate routers for public and auth routes

---

## 🛠️ Tech Stack
- **Node.js** + **Express.js** – Server and routing
- **jsonwebtoken** – Token-based authentication
- **express-session** – Session management
- **Postman / Thunder Client** – API testing

---

## 📂 Project Structure
📁 project-root
┣ 📄 index.js               # Main server entry point
┣ 📁 router
┃ ┣ general.js             # Public routes
┃ ┣ auth_users.js          # Authenticated user routes
┃ ┗ booksdb.js             # Mock book database
┣ 📄 package.json
┣ 📄 tasks.md              # Tasks/Flow
┗ 📄 README.md

-- 
## How to follow it?
Fork it from here - ***https://github.com/ibm-developer-skills-network/expressBookReviews***
And then follow *tasks.md*