var http = require('http')
  , fs = require('fs')
  , indexHtml = fs.readFileSync('./public/index.html')
  , BinaryServer = require('binaryjs').BinaryServer

    // WebSocket Server listens on port 9000

  , binaryServer = BinaryServer({port: 9000});

// Serv the static page..

var server = http.createServer(function(request, response) {
  response.writeHead(200);
  response.end(indexHtml);
});

// WebServer listens on Port 4000

server.listen(4000);

// Handle Binary WebSockets..

binaryServer.on('connection', function(client) {

  client.on('stream', function(stream) {

      var responseStream = client.createStream('fromserver');

      // pipe didnt work :(
      stream.on('data', function(data) {
        responseStream.write(data);
      });

  });

});