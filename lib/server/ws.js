module.exports = wsServer;

var ws = require('vi-websocket');

function wsServer(app){
    return ws.createServer(function(client, request){
        app({
            client  : client,
            request : request,
        });
    }).acceptHttp(function(){});
};

wsServer.intervene = function(io){
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
    this.emitter = this.client;
    yield next;
};

function * close(){
    if(!(this.client)) throw new Error("this.client is required to be a ws client created by ws.createClient");
    yield function(done){
        this.client.on('close',function(){
            done();
        });
    };
}
