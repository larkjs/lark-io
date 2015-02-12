module.exports = netServer;

var net = require('net');

function netServer(app){
    return net.createServer(function(socket){
        app({ socket : socket });
    });
};

netServer.intervene = function(io){
    io.before(try_catch);
    io.before(emitter);
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

function * emitter(next){
    this.emitter = this.socket;
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
