const express = require("express");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve your website
app.use(express.static(__dirname));

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// WebSocket
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("Overlay connected");

  ws.on("message", (msg) => {
    console.log("Command:", msg.toString());
  });
});
