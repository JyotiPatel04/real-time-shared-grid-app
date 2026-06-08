# Real-Time Shared Grid App

A real-time multiplayer grid application where users can claim blocks and see updates instantly.

## Features

- Real-time block claiming using Socket.io
- Live leaderboard
- User color identification
- Connection status indicator
- Reset board functionality
- Responsive modern UI

## Tech Stack

### Frontend
- React.js
- CSS

### Backend
- Node.js
- Express.js

### Real-Time Communication
- Socket.io

## How It Works

Users join the board with a name and claim available blocks.

When a user captures a block:
1. The frontend sends a Socket.io event.
2. The server updates the block ownership.
3. The update is broadcast to all connected users instantly.

## Trade-Offs

Grid data is currently stored in memory to keep the application simple and focused on real-time communication.

The board resets when the server restarts.

## Run Locally

### Backend

```bash
cd server
npm install
node index.js
