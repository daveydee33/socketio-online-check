const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 8080;
const DEV = (process.env.DEV || "").trim().toLowerCase() === "true"; // to show more logs if in Dev mode.

// Express
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.htm");
});

app.get("/client.js", (req, res) => {
  res.sendFile(__dirname + "/client.js");
});

// SocketIO
io.on("connection", (socket) => {
  const displayNumConnections = () =>
    log(`# There are now ${io.of("/").sockets.size} active connections`);

  log(
    "🔌 New user connected",
    socket.id,
    socket.handshake.headers.host,
    socket.handshake.headers.referer,
    socket.handshake.address,
    socket.handshake.url
  );
  displayNumConnections();

  socket.on("disconnect", (reason) => {
    log("👋 Disconnect", reason);
    displayNumConnections();
  });

  socket.on("disconnecting", (reason) => {
    log("👋 Disconnecting", reason);
  });

  socket.on("message", (msg) => {
    if (DEV) log(`✅ message`, msg);

    socket.emit("message", {
      ...msg,
      serverTime: Date.now(),
    });
  });
});

// Logger
const log = (...args) => {
  console.log("Log>", Date(), ...args);
};

// Listen
http.listen(PORT, () => {
  log(`🚀 Listening on port ${PORT}`);
});
