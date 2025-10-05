

# 🏐 Volleylog

A full-stack web application that lets volleyball athletes log their training progress.

Track core performance metrics — barbell squat, bench press, shoulder press, vertical jump, and plank — and visualize progress with charts

DISCLAIMER: DO NOT ENTER YOUR REAL EMAIL/PASSWORD WHEN TESTING MY APPLICATION

---

## ✨ Features

- Full CRUD for every entry (create, read, update, delete)
- Auth & sessions (register/login/logout) with server-side sessions
- Charts: Progress visualized with Chart.js
- Responsive UI: React + CSS (Grid/Flexbox)
- PostgreSQL persistence with node-postgres
- .env support for secrets and config

---

## 🚀 Tech Stack

- Frontend: React(Vite), Chart.js, CSS
- Backend: Node.js, Express
- Database: PostgreSQL
---

## 📸 Screenshots
<img width="1512" height="853" alt="Screenshot 2025-10-05 at 12 48 42 AM" src="https://github.com/user-attachments/assets/d18a51f4-c4fb-49f8-84ff-dcb4b357e144" />
<img width="1509" height="849" alt="Screenshot 2025-10-05 at 12 49 35 AM" src="https://github.com/user-attachments/assets/bbeb7520-7403-4604-bc06-ef026c0928c7" />


# ⚙️ Installation & Setup Guide for Volleylog
Instructions for setting up server and client locally so you can log your progress!

---

## 📦 Prerequisites
- Node.js (LTS) + npm
- PostgreSQL
- Git

Git
---

## 🗂️ How to Run
```bash
## 🗂️ 1. Clone the Repository and set up database
git clone https://github.com/BenYang12/volleylog_app.git
cd volleylog_app
createdb -h localhost -p 5432 -U "$(whoami)" volleylog


## 🗂️ 2. Navigate to server folder and run
cd server
npm install

create server/.env
PORT=4000
SESSION_SECRET=<a long random string>
# If you use your mac username without password:
DATABASE_URL=postgresql://<your_username>@localhost:5432/volleylog
# Or with password:
# DATABASE_URL=postgresql://<role>:<password>@localhost:5432/volleylog
CLIENT_ORIGIN=http://localhost:5173


npm run db:init
npm run dev


## 🗂️ 3. Navigate to client folder and run
cd client
npm install
npm run dev





