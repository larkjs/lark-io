# *vi-io is under development*
# vi-io
vi-io is a light-weight frame work for IO services (inspired by koa.io). vi-io focuses on the following features
* Light-weight
* Flexiblity

# Install
Install vi-io with npm

    npm install vi-io

# Get started
Start a server for any tcp connections:

    var io = require('vi-io');
    io.server(oi.net);
    io.use(function*(next){
        //Handle connect event
        yield next;
        //Handle close event
    });
    io.route('data', function*(next){
        var data = this.args[0].toString();
        this.socket.write('Data Got : ' + data);
    });
    io.listen(3000);

Besides tcp, http and websocket connections are also supported, you can switch the server with code like this:

*Http*

    io.server(io.http); 
    io.use(function*(next){
        //Handle with this.req and this.res
        yield next;
    });
    //io.route is not supported for http
    io.listen(8080);

*WebSocket*

    io.server(io.ws);
    io.use(function*(next){
        //Handle when connect
        yield next;
        //Handle when disconnect
    });
    io.route('message', function*(){
        var message = this.args[0];
        this.client.send("Message Got : " + message);
    });
    io.listen(8023);

*More features to developed...*
