var net = require('net');

var socket = net.connect(8300);

socket.on('error',function(e){
    console.log(e);
});

socket.on('connect',function(){
    console.log("connected");
});

socket.on('data',function(data){
    console.log(data.toString());
});

setTimeout(function(){
    socket.end();
},1000);
