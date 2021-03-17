var socket = io();

socket.on("connect", () => console.log("connect", socket.id));
socket.on("connect_error", (reason) => console.log("connect_error", reason));
socket.on("disconnect", (reason) => console.log("disconnect", reason));

socket.on("message", (response) => receiveResponse(response));

const receiveResponse = (response) => {
  console.log(`response`, response);
};

const sendRequest = () => {
  const payload = {
    clientTime: Date.now(),
  };
  socket.emit("message", payload);
};

document.querySelector(".button").addEventListener("click", sendRequest);
