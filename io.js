module.exports = IO;

var net    = require('net');
var handle = require('vi-misc').handle;
var Server = require('./lib/server');

function IO(){
    if(!(this instanceof IO)) return new IO();
    this.mw = [];
};

IO.prototype.server = function(server){
    if(!server) return this.server;
    this.server = new Server(server);
};

IO.prototype.use = function(handler){
    if('function' != typeof handler || 'GeneratorFunction' != handler.constructor.name)
        throw new Error("Invalid middleware");
    this.mw.push(handler);
    return this;
};

IO.prototype.listen = function(){
    var me = this;
    this.server.toHandle(function(context){
        var mw = me.mw.concat(function*(next){
            if(!context || !context.socket || !(context.socket instanceof net.Socket))
                throw new Error("Context.socket is required to be an instance of net.Socket");
            yield function(done){
                context.socket.on('close',function(){
                    done();
                });
            }
        });
        handle(mw, context, function(err){
            console.log("ERR:"+err.message);
            me.emit('error', err);
        });
    });
    return this.server.listen.apply(this.server, arguments);
};
