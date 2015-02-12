module.exports = httpServer;

var http          = require('http');
var EventEmitter  = require('events').EventEmitter;

function httpServer(app){
    return http.createServer(function(request, response){
        app({
            request  : request,
            response : response,
        });
    });
};

httpServer.intervene = function(io){
    io.before(connection);
    io.before(session);
    io.before(try_catch);
    io.before(alias);
};

function * connection(next){
    yield next;
    this.response.end();
};

function * session(next){
    yield next;
    if(this.error){
        this.response.writeHead(500);
        return yield next;
    }
    this.statusCode     = this.statusCode    || 200;
    this.statusMessage  = this.statusMessage || 'OK';
    this.body           = this.body          || '';
    this.response.writeHead(this.statusCode, this.statusMessage, this.headers);
    this.response.write(this.body);
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

function * alias(next){
    this.req = this.request;
    this.url = this.request.url;
    this.res = this.response;
    yield next;
};

