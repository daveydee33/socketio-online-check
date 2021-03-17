const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 8080;

// Express
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.htm");
});

app.get("/client.js", (req, res) => {
  res.sendFile(__dirname + "/client.js");
});

// SocketIO
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("disconnect", reason);
  });

  socket.on("disconnecting", (reason) => {
    console.log("disconnecting", reason);
  });

  socket.on("message", (msg) => {
    // console.log(`message`, msg);
    const { clientTime } = msg;
    socket.emit("message", {
      clientTime,
      serverTime: Date.now(),
    });
  });
});

// Listen
http.listen(PORT, () => {
  console.log(`✅ Listening on port ${PORT}`);
});
