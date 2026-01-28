const WebSocket = require("ws");
const express = require("express");

const app = express();
const server = app.listen(3000);
const wss = new WebSocket.Server({ server });

app.use("/assets", express.static("assets"));
app.use(express.static("public"));

const MEMES = {
  "!67": {
    gif: "assets/chat-commands/gif/67.wav",
    sound: "assets/chat-commands/sfx/67.wav"
  },
  "!MEEE": {
    gif: "assets/chat-commands/gif/MEEE.wav",
    sound: "assets/chat-commands/sfx/MEEE.wav"
  },
  "!boom": {
    gif: "assets/chat-commands/gif/boom.wav",
    sound: "assets/chat-commands/sfx/boom.wav"
  },
  "!congrats": {
    gif: "assets/chat-commands/gif/congrats.wav",
    sound: "assets/chat-commands/sfx/congrats.wav"
  },
  "!falling-be": {
    gif: "assets/chat-commands/gif/falling-bee.wav",
    sound: "assets/chat-commands/sfx/falling-bee.wav"
  },
  "!falling-kirby": {
    gif: "assets/chat-commands/gif/falling-kirby.wav",
    sound: "assets/chat-commands/sfx/falling-kirby.wav"
  },
  "!foxy-jumpscare": {
    gif: "assets/chat-commands/gif/foxy-jumpscare.wav",
    sound: "assets/chat-commands/sfx/foxy-jumpscare.wav"
  },
  "!hahahahahah": {
    gif: "assets/chat-commands/gif/hahahahahah.wav",
    sound: "assets/chat-commands/sfx/hahahahahah.wav"
  },
  "!helo": {
    gif: "assets/chat-commands/gif/helo.wav",
    sound: "assets/chat-commands/sfx/helo.wav"
  },
  "!mini-soda": {
    gif: "assets/chat-commands/gif/mini-soda.wav",
    sound: "assets/chat-commands/sfx/mini-soda.wav"
  },
  "!nah-uh": {
    gif: "assets/chat-commands/gif/nah-uh.wav",
    sound: "assets/chat-commands/sfx/nah-uh.wav"
  },
  "!ohhhhhhhhh": {
    gif: "assets/chat-commands/gif/ohhhhhhhhh.wav",
    sound: "assets/chat-commands/sfx/ohhhhhhhhh.wav"
  },
  "!roman-are-you-slepping": {
    gif: "assets/chat-commands/gif/roman-are-you-slepping.wav",
    sound: "assets/chat-commands/sfx/roman-are-you-slepping.wav"
  },
  "!shimmy-ya": {
    gif: "assets/chat-commands/gif/shimmy-ya.wav",
    sound: "assets/chat-commands/sfx/shimmy-ya.wav"
  },
  "!so-sad": {
    gif: "assets/chat-commands/gif/so-sad.wav",
    sound: "assets/chat-commands/sfx/so-sad.wav"
  },
  "!spinning-fish": {
    gif: "assets/chat-commands/gif/spinning-fish.wav",
    sound: "assets/chat-commands/sfx/spinning-fish.wav"
  },
  "!um-excuse-me-what-the-actual-fuck-you-doing-in-my-house": {
    gif: "assets/chat-commands/gif/um-excuse-me-what-the-actual-fuck-you-doing-in-my-house.wav",
    sound: "assets/chat-commands/sfx/um-excuse-me-what-the-actual-fuck-you-doing-in-my-house.wav"
  },
  "!yee": {
    gif: "assets/chat-commands/gif/yee.wav",
    sound: "assets/chat-commands/sfx/yee.wav"
  },
  "!you-stupid": {
    gif: "assets/chat-commands/gif/you-stupid.wav",
    sound: "assets/chat-commands/sfx/you-stupid.wav"
  }
};

// 🔥 CONNECT TO RESTREAM CHAT
const restream = new WebSocket(
  "wss://chat.restream.io/socket.io/re_7691830_event313536f6a3144d1b94de41ff123b1436"
);

restream.on("open", () => {
  console.log("Connected to Restream chat");
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
