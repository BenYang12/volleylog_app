# volleylog_app

# 🏐 Volleylog

A full-stack MERN application that lets volleyball athletes log their training progress.  
Track core metrics like **squat, bench press, hang clean, vertical jump, and bodyweight** to measure improvements, set goals, and stay motivated.

---

## ✨ Features

- **Full CRUD**: Add, edit, and delete training entries.   
- **Responsive UI**: Built with React (Vite), styled with custom CSS.  
- **Data persistence**: Entries stored in MongoDB Atlas via Mongoose models.  
- **REST API**: Express backend with clean routes and error handling.  
- **State management**: React Hooks (`useState`, `useEffect`) keep UI in sync.  
- **.env support**: Securely load MongoDB URI and server port.  

---

## 🚀 Tech Stack

- **Frontend**: React (Vite), JavaScript, CSS  
- **Backend**: Node.js, Express  
- **Database**: MongoDB Atlas, Mongoose  

---

## 📸 Screenshots
<img width="1036" height="747" alt="Screenshot 2025-09-10 at 10 57 29 AM" src="https://github.com/user-attachments/assets/9754c531-999a-43eb-9a33-5c397a207190" />


# ⚙️ Installation & Setup Guide for Volleylog

This guide walks you through setting up both the **server** and **client** for Volleylog locally.

---

## 📦 Prerequisites
- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/)  
- A [MongoDB Atlas](https://www.mongodb.com/atlas/database) account & cluster  

---

## 🗂️ 1. Clone the Repository
```bash
git clone https://github.com/BenYang12/volleylog.git
cd volleylog

## 🗂️ 2. Navigate to server folder and run
cd server
npm install
Inside /server, create a file named .env with the following content:MONGO_URI="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/volleylog?retryWrites=true&w=majority"
PORT=7500(Replace <username>, <password>, and <cluster> with your MongoDB Atlas credentials.)
npm run dev

you should see:
MongoDB Atlas connected
Server running on port 7500

## 🗂️ 3. Navigate to client folder and run
cd client
npm install
npm run dev





