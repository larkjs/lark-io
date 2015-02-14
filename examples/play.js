var http = require('http');

var server = http.createServer(function(req, res){
    console.log(res.socket);
    res.end();
});

server.on('connection', function(socket){
});

server.listen(8311);
