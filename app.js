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

    // Just pipe the data back to the client over the same stream.
    // Not sure if it would make more sense to create
    // two separate streams for sending and receiving..

    stream.pipe(stream);

  });

});