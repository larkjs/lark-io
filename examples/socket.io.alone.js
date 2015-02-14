var io  = require('..');
var fs  = require('fs');

var realtime = io();

realtime.io(io.socketio);

realtime.use(function*(next){
    console.log('Connect');
    yield next;
    console.log('Disconnect');
});

realtime.route('message', function*(next){
    console.log("Receive : " + this.args[0]);
    this.client.send("You message : [" + this.args[0] + "] received");
    yield next;
});

realtime.listen(8300,function(){
    console.log("Listening at 8300...");   
});
