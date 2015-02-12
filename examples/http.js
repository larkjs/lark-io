var io  = require('..');
var net = require('net');

var app = io();

app.server(io.http);

app.use(function*(next){
    this.body = 'How are you';
});

app.listen(8300,function(){
    console.log("Listening at 8300...");   
});
