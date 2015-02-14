# *vi-io is under development*
# vi-io
*vi-io* is a light-weight frame work for IO services (inspired by koa.io). *vi-io* focuses on the following features
* Light-weight
* Flexiblity

# Install
Install *vi-io* with npm

    npm install vi-io

# Get started
Start a server for any tcp connections:

    var io = require('vi-io');
    var app = io();
    app.use(function*(next){
        //Handle connect event
        yield next;
        //Handle close event
    });
    app.route('data', function*(next){
        var data = this.args[0].toString();
        this.socket.write('Data Got : ' + data);
    });
    app.listen(8300);

Besides tcp, http and websocket connections are also supported. Use `io.io` to switch :

*Http*

    var app = io();
    app.io(io.http); 
    app.use(function*(next){
        //Handle with this.req and this.res
        this.res.write("Hello?");
        yield next;
    });
    //app.route is not supported for the builtin http
    app.listen(8300);

*WebSocket*

    var app = io();
    app.io(io.ws);
    app.use(function*(next){
        //Handle when connect
        yield next;
        //Handle when disconnect
    });
    app.route('message', function*(){
        var message = this.args[0];
        this.client.send("Message Got : " + message);
    });
    io.listen(8300);

*Socket.io*

    var realtime = io()
    realtime.io(io.socketio);
    realtime.use(function*(next){
        //Handle when connect
        yield next;
        //Handle when disconnect
    });
    realtime.route('foo', function*(){
        var message = this.args[0];
        this.client.send("Message [foo] Got : " + message);
    });
    io.listen(8300);

*Websocket & socket.io*
The difference between `websocket` and `socket.io` is :

`websocket` supports the native websocket protocol, which means in the browser side, use

    var ws = new WebSocket('ws://localhost:8300');

 to create a connection;

`socket.io` supports the fully developed realtime system based on websocket. In the browser side you need to use socket.io too, like :

    var socket = io('http://localhost:8300');
    
# Attach
If you have run the example *socket.io*, you may feel need to run a http server on the same port.
*vi-io* provides an easy way to attach one io to another. In the *socket.io* case, we need to attach *socket.io* to *http* :

    var app      = io().io(io.http);
    var realtime = io().io(io.socketio);
    app.attach(realtime);
    //alias
    //realtime.attachTo(app);
    app.listen(8300);

*More features to be developed...*
