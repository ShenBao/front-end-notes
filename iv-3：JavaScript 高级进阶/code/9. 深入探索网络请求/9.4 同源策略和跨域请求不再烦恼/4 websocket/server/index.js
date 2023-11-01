const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 18000 });

server.on('open', function open() {
    console.log('connected');
  });
  
  server.on('close', function close() {
    console.log('disconnected');
  });

server.on('connection', function connection(ws, req) {

  // 发送欢迎信息给客户端
  ws.send("服务器欢迎你链接");

  ws.on('message', function incoming(message) {
    
    // 广播消息给所有客户端
    server.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(   "服务器收到客户端消息 -> " + message);
      }
    });

  });

});
