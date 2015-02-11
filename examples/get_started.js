var io  = require('..');
var net = require('net');

var app = io();

app.server(function(app){
    return net.createServer(function(socket){
        app({
            socket : socket,
        });
    });
});

app.use(function*(next){
    console.log('Connect');
    yield next;
    console.log('Disconnect');
});

app.use(function*(next){
    console.log('Running middleware 1');
    yield next;
    console.log('Finishing middleware 1');
});

app.use(function*(next){
    console.log('Running middleware 2');
    yield next;
    console.log('Finishing middleware 2');
});

/*
app.route('message', function*(next){
    console.log("Handling message");
    yield next;
    console.log("Finishing handling message");
});
*/

app.listen(8300,function(){
    console.log("Listening at 8300...");   
});
