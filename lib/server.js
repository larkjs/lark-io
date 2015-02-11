module.exports = Server;

var EventEmitter = require('events').EventEmitter;

function Server(s){
    if(!(this instanceof Server))
        return new Server(s);
    if(!s)
        throw new Error('Need at least one param to init server info');
    this._s = s;
    if('function' == typeof s) this.toHandle = toHandleWithProxy;
    else throw new Error('Invalid server handler');
};

Server.prototype.listen = function(){
    if(!this.prepared()) throw new Error("Can not listen before server prepared");
    this.server.listen.apply(this.server, arguments);
    return this;
};

Server.prototype.prepared = function(){
    return !!this.server;
};

for(var func in EventEmitter.prototype){
    if('function' != EventEmitter.prototype[func]) continue;
    Server.prototype[func] = function(){
        if(!this.prepared()) throw new Error("Can not call " + func + " before server prepared");
        this.server[func].apply(this.server, arguments);
        return this;
    }
}

function toHandleWithProxy(app){
    var server = this._s(app);
    if(!server || 'function' != typeof server.listen)
        throw new Error('Invalid server returned from server proxy');
    this.server = server;
    return this;
};
