var io  = require('..');
var fs  = require('fs');
var redis = require('socket.io-redis');

var realtime = io();
var app      = io();

app.io(io.http);
realtime.io(io.socketio);
app.attach(realtime);

realtime.socketio.init(function(io){
    console.log("Adapting");
    io.adapter(redis({ host: 'localhost', port: 6379 }));
});

realtime.use(function*(next){
    console.log('Connect');
    console.log(process.pid);
    yield next;
    console.log('Disconnect');
});

realtime.route('message', function*(next){
    console.log("Receive : " + this.args[0]);
    this.client.send("You message : [" + this.args[0] + "] received");
    yield next;
});


app.use(function*(next){
    var body  = '<h1>How are you</h1>';
    body += fs.readFileSync('./index.html');
    this.res.write(body);
    this.res.end();
    yield next;
})

module.exports = app;
if(!module.parent){
    app.listen(8300,function(){
        console.log("Listening at 8300...");   
    });
}
