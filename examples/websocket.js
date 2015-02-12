var io  = require('..');
var net = require('net');

var app = io();

app.server(io.ws);

app.use(function*(next){
    console.log('Connect');
    yield next;
    console.log('Disconnect');
});

app.route('message', function*(next){
    console.log("Receive : " + this.args[0]);
    this.client.send("You message : [" + this.args[0] + "] received");
    yield next;
});

app.listen(8300,function(){
    console.log("Listening at 8300...");   
});
