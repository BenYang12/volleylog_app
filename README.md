# 🏐 VolleyLog

A full-stack CRUD application built for **UNC Club Beach Volleyball** athletes to log and visualize 5+ performance metrics. Deployed via **Docker** with a React frontend and Express + PostgreSQL backend.

Users can track core volleyball training metrics like **squat, bench press, hang clean, vertical jump, and bodyweight** — measure progress over time, set goals, and stay motivated.

---

## ✨ Features

- **Full CRUD** — Add, edit, and delete training entries
- **Data Visualization** — Real-time charts powered by Chart.js
- **Secure Auth** — Session-based authentication for user accounts
- **Responsive UI** — Built with React, styled with CSS
- **REST API** — Express backend with organized routes, middleware, and error handling
- **State Management** — React Hooks (`useState`, `useEffect`) keep UI in sync
- **CI/CD Pipeline** — GitHub Actions automates linting and testing on each pull request, enforcing code quality across all branches
- **Dockerized** — Containerized deployment for consistent environments

---

## 🚀 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React, JavaScript, CSS, Chart.js |
| **Backend** | Node.js, Express, REST API |
| **Database** | PostgreSQL |
| **DevOps** | Docker, GitHub Actions |

---

## 📸 Screenshots

<img width="1036" height="747" alt="VolleyLog Dashboard" src="https://github.com/user-attachments/assets/9754c531-999a-43eb-9a33-5c397a207190" />

---

## 📁 Project Structure

```
volleylog_app/
├── client/                 # React frontend
│   └── src/
│       ├── components/     # Reusable UI components (NavBar, etc.)
│       ├── pages/          # Page views (Home, AuthPage)
│       ├── services/       # API client helpers
│       ├── App.jsx
│       └── main.jsx
├── server/                 # Express backend
│   └── src/
│       ├── middleware/      # Auth middleware
│       ├── routes/          # API routes (auth, metrics)
│       ├── sql/             # Database schema
│       ├── db.js            # Database connection
│       └── index.js         # Server entry point
├── .github/workflows/      # CI/CD pipeline
└── README.md
```

---

## ⚙️ Installation & Setup

### 📦 Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [npm](https://www.npmjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (optional, for containerized setup)

---

### 🗂️ 1. Clone the Repository

```bash
git clone https://github.com/BenYang12/volleylog_app.git
cd volleylog_app
```

### 🗂️ 2. Set Up the Database

Create a PostgreSQL database and run the schema file to set up your tables:

```bash
psql -U your_username -d volleylog -f server/src/sql/schema.sql
```

### 🗂️ 3. Start the Server

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```
DATABASE_URL=postgresql://username:password@localhost:5432/volleylog
PORT=7500
SESSION_SECRET=your_session_secret_here
```

```bash
npm run dev
```

You should see:

```
PostgreSQL connected
Server running on port 7500
```

### 🗂️ 4. Start the Client

```bash
cd client
npm install
npm run dev
```

The app will be running at `http://localhost:5173`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in and start a session |
| POST | `/api/auth/logout` | Log out and end the session |
| GET | `/api/metrics` | Get all metrics for the logged-in user |
| POST | `/api/metrics` | Create a new metric entry |
| PUT | `/api/metrics/:id` | Update an existing entry |
| DELETE | `/api/metrics/:id` | Delete an entry |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).





