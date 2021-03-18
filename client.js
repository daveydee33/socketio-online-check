var socket = io();

let intervalId = null;

const green = "lime";
const yellow = "yellow";
const red = "firebrick";
const white = "white";

socket.on("connect", () => {
  setStatus("Connected", null, green);
  console.log("connect", socket.id);
});
socket.on("connect_error", (reason) => {
  setStatus("Connection Error - Trying to Reconnect", reason, yellow);
  console.log("connect_error", reason);
});
socket.on("disconnect", (reason) => {
  setStatus("Disconnected", reason, red);
  console.log("disconnect", reason);
});

socket.on("message", (response) => receiveResponse(response));

const receiveResponse = (response) => {
  const { clientTime, serverTime } = response;
  const now = Date.now();
  const clientToServer = serverTime - clientTime;
  const serverToClient = now - serverTime;
  const totalRoundTrip = now - clientTime;

  document.querySelector(".clientToServer").innerHTML = clientToServer;
  document.querySelector(".serverToClient").innerHTML = serverToClient;
  document.querySelector(".totalRoundTrip").innerHTML = totalRoundTrip;
  console.log(
    `Total RT: ${totalRoundTrip}, Client-to-Server: ${clientToServer}, Server-to-Client: ${serverToClient}.`
  );
};

const sendRequest = () => {
  const payload = {
    clientTime: Date.now(),
  };
  socket.emit("message", payload);
};

const setStatus = (status, note, color = white) => {
  document.querySelector("#status").innerHTML = status;
  document.querySelector("#note").innerHTML = note;
  document.querySelector(".container").style.backgroundColor = color;
};

const startStop = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  } else {
    intervalId = setInterval(sendRequest, 500);
  }
};

document.addEventListener("DOMContentLoaded", startStop); // start on page load
document.querySelector(".button").addEventListener("click", startStop);
