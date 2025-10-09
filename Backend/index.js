const http = require("http");
const app = require("./app");
const { WebSocket, WebSocketServer } = require("ws");
const { json } = require("body-parser");
const { type } = require("os");
const { create } = require("domain");

const server = http.createServer(app);

const wss = new WebSocketServer({ server, host: '0.0.0.0' });

let senderSocket = null; 
let receiverSocket = null;

wss.on('connection', function(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    const message = JSON.parse(data);
    if(message.type === 'sender'){
      console.log("sender added");
      senderSocket = ws;
    } else if (message.type === 'receiver') {
      console.log("receiver added");
      receiverSocket = ws;
    } else if (message.type === 'createOffer') {
      if(ws !== senderSocket){
        return;
      }
      console.log("sending offer");
      receiverSocket?.send(JSON.stringify({type: 'createOffer', sdp: message.sdp}));
    } else if (message.type === 'createAnswer') {
      if(ws !== receiverSocket) {
        return;
      }
      console.log("sending answer");
      senderSocket?.send(JSON.stringify({type: 'createAnswer', sdp: message.sdp}));
    } else if(message.type === 'iceCandidate') {
      console.log("sending ice candidate")
      if(ws === senderSocket) {
        receiverSocket?.send(JSON.stringify({type: 'iceCandidate', candidate: message.candidate}));
      } else if(ws === receiverSocket) {
        senderSocket?.send(JSON.stringify({type: 'iceCandidate', candidate: message.candidate}));
      }
    }
  });
});

let PORT = 4000 || process.env.PORT;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});