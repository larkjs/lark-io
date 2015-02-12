var io  = require('..');
var net = require('net');

var app = io();

app.server(io.net);

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

app.route('data', function*(next){
    console.log("Handling data");
    console.log("Data is " + this.args[0]);
    yield next;
    console.log("Finishing handling data");
});

app.listen(8300,function(){
    console.log("Listening at 8300...");   
});
