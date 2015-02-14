var io = module.exports = {}

var http          = require('http');
var EventEmitter  = require('events').EventEmitter;

io.createServer = function(app){
    return http.createServer(function(request, response){
        app({
            request  : request,
            response : response,
        });
    });
};

io.middleware = function(io){
    io.before(connection);
    io.before(try_catch);
    io.before(alias);
};

function * connection(next){
    yield next;
    this.response.end();
};

function * try_catch(next){
    try{
        yield next;
    }
    catch(error){
        this.response.writeHead(500,'Internal Server Error');
        console.log(error);
    }
}

function * alias(next){
    this.req = this.request;
    this.url = this.request.url;
    this.res = this.response;
    yield next;
};

