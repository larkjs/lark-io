var io = module.exports = {};

var net        = require('net');
var http       = require('http');
var socketio   = require('socket.io');
var utils      = require('../utils');

io.createServer = function(app){
    var httpServer = http.createServer();
    var io         = socketio(httpServer);
    io.on('connection',function(socket){
        app({ socket : socket });
    });
    return httpServer;
};

io.attachTo = function(app, server){
    utils.assert(app,    'typeof',      'function');
    utils.assert(server, 'instanceof',  http.Server, 'Socket.io can only be attached to an HTTP server');
    var io        = socketio(server);
    io.on('connection',function(socket){
        app({ socket : socket });
    });
};

io.middleware = function(io){
    io.before(try_catch);
    io.before(router);
    io.end(close);
}

function * try_catch(next){
    var error;
    try{
        yield next;
    }
    catch(e){
        error = e;
    }
    delete this.error;
    this.error = error;
}

function * router(next){
    this.router = this.socket;
    yield next;
};

function * close(){
    if(!(this.socket instanceof net.Server)) throw new Error("this.socket is required to be a instance of net.Socket");
    yield function(done){
        this.socket.on('close',function(){
            done();
        });
    };
}
