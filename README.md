## Am I Online?
This is a client and server application to monitor the live connection using Socket.io with WebSockets.  

We can use this to display the live online status as well as check the current latency between the client and server.

The screen color will display based on three main states.
1. Green = Online, and connected to the server.
2. Yellow = Reconnecting (Attempting to reconnec)
3. Red = Disconnected.

On the Server side we can log the messages sent/received with the client as well as the number of active connections, and server status.

On the Client side we can see the latency by comparing the roundtrip timesamps of each message packet sent to the server and back.

## How to Use
1. Install dependencies
```
npm install
```

2. Run locally
```
npm run dev
```


## ToDo
* maybe show the time waiting since last ping (when server is offline, or internet disconnected)
* stop the interval if connection is not connected
  * and set stats back to "..."
  * show amount of time offline (time since last packet received)
* measure kbps/mbps