const ws = new WebSocket("ws://localhost:3000");

const meme = document.getElementById("meme");
const sound = document.getElementById("sound");

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "meme") {
    meme.src = data.gif;
    meme.style.display = "block";

    sound.src = data.sound;
    sound.play();

    setTimeout(() => {
      meme.style.display = "none";
    }, 4000);
  }
};
