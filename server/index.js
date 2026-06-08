const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

let grid = Array.from({ length: 400 }, (_, i) => ({
  id: i,
  owner: null,
  color: null,
}));

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.emit("gridData", grid);

  socket.on("captureBlock", ({ blockId, username, color }) => {
    const block = grid.find((b) => b.id === blockId);

    if (!block) return;

    if (block.owner) {
      socket.emit("captureFailed", {
        message: "This block is already claimed!",
      });
      return;
    }

    block.owner = username;
    block.color = color;

    io.emit("blockUpdated", block);
  });

  socket.on("resetGrid", () => {
    grid = grid.map((block) => ({
      ...block,
      owner: null,
      color: null,
    }));

    io.emit("gridData", grid);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Shared Grid Backend Running");
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});