'use strict';

var io = module.exports = {};

var net    = require('net');
var assert = require('vi-misc').assert;

io.createServer = function(app){
    return net.createServer(function(socket){
        app({ socket : socket });
    });
};

io.middleware = function(io){
    io.before(try_catch);
    io.before(router);
    io.end(close);
};

io.attachTo = function(app, server){
    assert(app,    'typeof',     'function');
    assert(server, 'instanceof', net.Server);
    console.log("Warning! You are attaching one net io to another net io, they will share the EXACTLY SAME socket");
    server.on('connection', function(socket){
        app({ socket : socket });
    });
};

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
    if(!(this.socket instanceof net.Socket)) throw new Error("this.socket is required to be an instanceof net.Socket");
    yield function(done){
        this.socket.on('close',function(){
            done();
        });
    };
}
