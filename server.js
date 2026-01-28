const WebSocket = require("ws");
const express = require("express");

const app = express();
const server = app.listen(3000);
const wss = new WebSocket.Server({ server });

app.use("/assets", express.static("assets"));
app.use(express.static("public"));

const MEMES = {
  "!67": {
    gif: "assets/chat-commands/gif/67.gif",
    sound: "assets/chat-commands/sfx/67.wav"
  },
  "!MEEE": {
    gif: "assets/chat-commands/gif/MEEE.gif",
    sound: "assets/chat-commands/sfx/MEEE.wav"
  },
  "!boom": {
    gif: "assets/chat-commands/gif/boom.gif",
    sound: "assets/chat-commands/sfx/boom.wav"
  },
  "!congrats": {
    gif: "assets/chat-commands/gif/congrats.gif",
    sound: "assets/chat-commands/sfx/congrats.wav"
  },
  "!falling-be": {
    gif: "assets/chat-commands/gif/falling-bee.gif",
    sound: "assets/chat-commands/sfx/falling-bee.wav"
  },
  "!falling-kirby": {
    gif: "assets/chat-commands/gif/falling-kirby.gif",
    sound: "assets/chat-commands/sfx/falling-kirby.wav"
  },
  "!foxy-jumpscare": {
    gif: "assets/chat-commands/gif/foxy-jumpscare.gif",
    sound: "assets/chat-commands/sfx/foxy-jumpscare.wav"
  },
  "!hahahahahah": {
    gif: "assets/chat-commands/gif/hahahahahah.gif",
    sound: "assets/chat-commands/sfx/hahahahahah.wav"
  },
  "!helo": {
    gif: "assets/chat-commands/gif/helo.gif",
    sound: "assets/chat-commands/sfx/helo.wav"
  },
  "!mini-soda": {
    gif: "assets/chat-commands/gif/mini-soda.gif",
    sound: "assets/chat-commands/sfx/mini-soda.wav"
  },
  "!nah-uh": {
    gif: "assets/chat-commands/gif/nah-uh.gif",
    sound: "assets/chat-commands/sfx/nah-uh.wav"
  },
  "!ohhhhhhhhh": {
    gif: "assets/chat-commands/gif/ohhhhhhhhh.gif",
    sound: "assets/chat-commands/sfx/ohhhhhhhhh.wav"
  },
  "!roman-are-you-slepping": {
    gif: "assets/chat-commands/gif/roman-are-you-slepping.gif",
    sound: "assets/chat-commands/sfx/roman-are-you-slepping.wav"
  },
  "!shimmy-ya": {
    gif: "assets/chat-commands/gif/shimmy-ya.gif",
    sound: "assets/chat-commands/sfx/shimmy-ya.wav"
  },
  "!so-sad": {
    gif: "assets/chat-commands/gif/so-sad.gif",
    sound: "assets/chat-commands/sfx/so-sad.wav"
  },
  "!spinning-fish": {
    gif: "assets/chat-commands/gif/spinning-fish.gif",
    sound: "assets/chat-commands/sfx/spinning-fish.wav"
  },
  "!um-excuse-me-what-the-actual-fuck-you-doing-in-my-house": {
    gif: "assets/chat-commands/gif/um-excuse-me-what-the-actual-fuck-you-doing-in-my-house.gif",
    sound: "assets/chat-commands/sfx/um-excuse-me-what-the-actual-fuck-you-doing-in-my-house.wav"
  },
  "!yee": {
    gif: "assets/chat-commands/gif/yee.gif",
    sound: "assets/chat-commands/sfx/yee.wav"
  },
  "!you-stupid": {
    gif: "assets/chat-commands/gif/you-stupid.gif",
    sound: "assets/chat-commands/sfx/you-stupid.wav"
  }
};

// CONNECT TO RESTREAM CHAT
const restream = new WebSocket(
  "wss://chat.restream.io/socket.io/?EIO=3&transport=websocket"
);

restream.on("open", () => {
  console.log("Connected to Restream");

  // Auth packet (required)
  restream.send(
    '40{"token":"998264a0-0376-4a7c-9639-75da74e213e6"}'
  );
});


// Receive messages
restream.on("message", (data) => {
  const msg = data.toString();

  // Chat messages always contain "message"
  if (!msg.includes("message")) return;

  for (const cmd in MEMES) {
    if (msg.toLowerCase().includes(cmd)) {
      const payload = JSON.stringify({
        type: "meme",
        gif: MEMES[cmd].gif,
        sound: MEMES[cmd].sound
      });

      wss.clients.forEach(ws => ws.send(payload));
    }
  }
});
