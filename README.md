# 🚀 Real-Time Shared Grid App

A real-time multiplayer web application where users can claim blocks on a shared grid and see updates instantly across all connected clients.

## 🌐 Live Demo

**Frontend:** https://real-time-shared-grid-app-nine.vercel.app

**Backend:** https://shared-grid-backend.onrender.com

---

## 📌 Features

* ⚡ Real-time block claiming using Socket.IO
* 👥 Multiplayer support
* 🏆 Live leaderboard
* 🎨 Unique color assignment for each user
* 📡 Connection status indicator
* 🔄 Reset board functionality
* 📱 Responsive modern UI
* ☁️ Fully deployed on Vercel and Render

---

## 🛠️ Tech Stack

### Frontend

* React.js
* CSS3
* Socket.IO Client
* Vite

### Backend

* Node.js
* Express.js
* Socket.IO

### Deployment

* Vercel (Frontend)
* Render (Backend)

---

## ⚙️ How It Works

1. Users enter their name and join the board.
2. An available block can be claimed by clicking on it.
3. The frontend emits a Socket.IO event to the server.
4. The server updates the ownership of that block.
5. The updated board state is instantly broadcast to all connected clients.
6. Every user sees real-time changes without refreshing the page.
7. The leaderboard updates automatically based on claimed blocks.

---

## 📸 Project Preview

### Join Screen

Users enter their name to join the multiplayer board.

### Live Shared Board

Players can claim blocks and compete on the leaderboard in real time.

### Leaderboard

Displays rankings based on the number of claimed blocks.

---

## 📂 Project Structure

```bash
real-time-shared-grid-app/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

## 🚀 Run Locally

### Clone Repository

```bash
git clone https://github.com/JyotiPatel04/real-time-shared-grid-app.git
cd real-time-shared-grid-app
```

### Backend Setup

```bash
cd server
npm install
node index.js
```

Backend runs on:

```bash
http://localhost:5000
```

### Frontend Setup

Open a new terminal:

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 🔄 Real-Time Communication Flow

```text
User Clicks Block
        │
        ▼
Frontend (React)
        │
        ▼
Socket.IO Event
        │
        ▼
Node.js Server
        │
        ▼
Update Block Ownership
        │
        ▼
Broadcast to All Clients
        │
        ▼
Instant UI Update
```

---

## ⚖️ Trade-Offs

To keep the project lightweight and focused on real-time communication:

* Grid data is stored in server memory.
* No database is currently used.
* Board data resets when the server restarts.
* Suitable for demonstration and learning purposes.

Future improvements can include persistent storage using MongoDB or PostgreSQL.

---

## 🔮 Future Enhancements

* User authentication
* Persistent database storage
* Private rooms
* Chat functionality
* Player statistics
* Mobile-first optimization
* Block ownership history
* Spectator mode

---

## 👩‍💻 Author

**Jyoti Patel**

* GitHub: https://github.com/JyotiPatel04
* LinkedIn: https://www.linkedin.com/in/jyoti-patel-489b4733b

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.

⭐ Star this repository to support the project.
