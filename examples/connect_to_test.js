var net = require('net');

function connect(timeout){
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

    socket.on('end',function(){
        console.log("disconnected");
    });

    socket.write("How are you");

    setTimeout(function(){
        socket.end();
    },timeout * 1000);
};

connect(8);
connect(4);
