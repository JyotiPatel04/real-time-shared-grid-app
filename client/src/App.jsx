import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

const colors = [
  "#facc15",
  "#38bdf8",
  "#fb7185",
  "#34d399",
  "#a78bfa",
  "#fb923c",
  "#22c55e",
];

function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [grid, setGrid] = useState([]);
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(socket.connected);

  const userColor = useMemo(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, []);

  useEffect(() => {
    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("gridData", (data) => {
      setGrid(data);
    });

    socket.on("blockUpdated", (updatedBlock) => {
      setGrid((prevGrid) =>
        prevGrid.map((block) =>
          block.id === updatedBlock.id ? updatedBlock : block
        )
      );
    });

    socket.on("captureFailed", (data) => {
      setMessage(data.message);
      setTimeout(() => setMessage(""), 2000);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("gridData");
      socket.off("blockUpdated");
      socket.off("captureFailed");
    };
  }, []);

  const handleJoin = () => {
    if (username.trim().length < 2) {
      setMessage("Please enter a valid name");
      return;
    }
    setJoined(true);
    setMessage("");
  };

  const captureBlock = (blockId) => {
    if (!joined) return;

    socket.emit("captureBlock", {
      blockId,
      username: username.trim(),
      color: userColor,
    });
  };

  const resetGrid = () => {
    const confirmReset = window.confirm("Are you sure you want to reset the board?");
    if (confirmReset) {
      socket.emit("resetGrid");
    }
  };

  const claimedCount = grid.filter((block) => block.owner).length;
  const availableCount = grid.length - claimedCount;

  const leaderboard = Object.values(
    grid.reduce((acc, block) => {
      if (block.owner) {
        if (!acc[block.owner]) {
          acc[block.owner] = {
            name: block.owner,
            color: block.color,
            count: 0,
          };
        }
        acc[block.owner].count += 1;
      }
      return acc;
    }, {})
  ).sort((a, b) => b.count - a.count);

  return (
    <div className="app">
      <header className="hero">
        <div>
          <span className="tag">Live Multiplayer Board</span>
          <h1>Real-Time Shared Grid</h1>
          <p>
            Click blocks to claim territory. Everyone sees updates instantly.
          </p>
        </div>

        <div className="top-actions">
          <div className={`status ${connected ? "online" : "offline"}`}>
            <span></span>
            {connected ? "Live Connected" : "Disconnected"}
          </div>

          {joined && (
            <div className="profile">
              <span style={{ backgroundColor: userColor }}></span>
              {username}
            </div>
          )}
        </div>
      </header>

      {!joined ? (
        <section className="join-card">
          <h2>Join the Grid</h2>
          <p>Enter your name and start claiming blocks.</p>

          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleJoin()}
          />

          <button onClick={handleJoin}>Start Playing</button>

          {message && <div className="message">{message}</div>}
        </section>
      ) : (
        <main className="main-layout">
          <section className="grid-card">
            <div className="stats">
              <div>
                <span>Total Blocks</span>
                <strong>{grid.length}</strong>
              </div>
              <div>
                <span>Claimed</span>
                <strong>{claimedCount}</strong>
              </div>
              <div>
                <span>Available</span>
                <strong>{availableCount}</strong>
              </div>
              <button className="reset-btn" onClick={resetGrid}>
                Reset Board
              </button>
            </div>

            {message && <div className="message">{message}</div>}

            <div className="grid">
              {grid.map((block) => (
                <button
                  key={block.id}
                  className={`cell ${block.owner ? "claimed" : ""}`}
                  style={{
                    backgroundColor: block.owner ? block.color : undefined,
                  }}
                  onClick={() => captureBlock(block.id)}
                  title={
                    block.owner
                      ? `Owned by ${block.owner}`
                      : "Click to claim"
                  }
                  disabled={Boolean(block.owner)}
                >
                  {block.owner ? block.owner.charAt(0).toUpperCase() : ""}
                </button>
              ))}
            </div>
          </section>

          <aside className="leaderboard">
            <h2>Leaderboard</h2>
            <p className="side-text">Top players by claimed blocks</p>

            {leaderboard.length === 0 ? (
              <div className="empty">No blocks claimed yet.</div>
            ) : (
              leaderboard.map((player, index) => (
                <div className="leaderboard-row" key={player.name}>
                  <span className="rank">#{index + 1}</span>
                  <span
                    className="dot"
                    style={{ backgroundColor: player.color }}
                  ></span>
                  <span className="player-name">{player.name}</span>
                  <strong>{player.count}</strong>
                </div>
              ))
            )}

            <div className="info-box">
              Built with React, Node.js, Express and Socket.io.
            </div>
          </aside>
        </main>
      )}
    </div>
  );
}

export default App;