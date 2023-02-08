const connection = new WebSocket("ws://localhost:8000");
const button = document.querySelector("#send");

connection.onopen = (e) => {
  console.log("WebSocket is now open");
}

connection.onclose = (e) => {
  console.log("WebSocket is closed now");
}

connection.onerror = (e) => {
  console.error("WebSocket error occurred:", e);
}

connection.onmessage = (e) => {
  const chat = document.querySelector("#chat");
  chat.innerHTML += e.data;
}

button.addEventListener("click", () => {
  const name = document.querySelector("#name");
  const message = document.querySelector("#message");
  const data = `<p>${name.value}: ${message.value}</p>`;

  connection.send(data);
  name.value = "";
  message.value = "";
});