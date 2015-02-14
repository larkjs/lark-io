var io = module.exports = {};

var ws = require('vi-websocket');

io.createServer = function(app){
    return ws.createServer(function(client, request){
        app({
            client  : client,
            request : request,
        });
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
    this.router = this.client;
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
