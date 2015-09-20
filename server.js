var sockjs = require('sockjs'),
    express = require('express'),
    http = require('http');

var server = http.createServer(express()),
    sock = sockjs.createServer();

var clients = {},
    pulses = {
      'assios': 140,
      'aleksan': 100,
      'stiaje': 40
    };

function broadcast(message) {
  for (var client in clients) {
    clients[client].conn.write(message);
  }
}

sock.on('connection', function(conn) {
  var keepalive = setInterval(function() {
    var data = [];
    for (var username in pulses) {
      data.push({username: username, pulse: pulses[username]});
    }

    conn.write(JSON.stringify(data));
  }, 1000);

  clients[conn.id] = {
    conn: conn,
    keepalive: keepalive
  };

  conn.on('data', function(message) {
    var data = JSON.parse(message);

    if (data.type === 'pulse') {
      pulses[data.username] = data.pulse;
    }
  });

  conn.on('close', function() {
    clearInterval(clients[conn.id].keepalive);
    delete clients[conn.id];
  });
});

sock.installHandlers(server, {prefix: '/socket'});
server.listen(3434, '0.0.0.0');

var frontend = express();
frontend.use(express.static(__dirname));
frontend.listen(3000);
