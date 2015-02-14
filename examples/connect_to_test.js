var net = require('net');

var socket = net.connect(8300);

socket.write("How are you");

setTimeout(function(){
    socket.end();
},2000);
