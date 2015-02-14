'use strict';

var io = module.exports = {};

var net        = require('net');
var http       = require('http');
var socketio   = require('socket.io');
var Socket     = require('socket.io/lib/socket');
var assert     = require('vi-misc').assert;

io.createServer = function(app){
    var httpServer = http.createServer();
    var io         = socketio(httpServer);
    io.on('connection',function(socket){
        app({ socket : socket });
    });
    return httpServer;
};

io.attachTo = function(app, server){
    assert(app,    'typeof',      'function');
    assert(server, 'instanceof',  http.Server, 'Socket.io can only be attached to an HTTP server');
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
        console.log(e.stack);
    }
}

function * router(next){
    this.router = this.socket;
    yield next;
};

function * close(){
    if(!(this.socket instanceof Socket)) throw new Error("this.socket is required to be a instance of socket.io Socket");
    yield function(done){
        this.socket.on('disconnect',function(){
            done();
        });
    };
}
