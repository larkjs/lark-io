'use strict';

module.exports    = Server;

var BaseServer    = require('net').Server;
var EventEmitter  = require('events').EventEmitter;

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
    if('function' != typeof EventEmitter.prototype[func]) continue;
    if(Server.prototype[func]) throw new Error("Can not bind server with existing method name : " + func);
    Server.prototype[func] = function(){
        if(!this.prepared()) throw new Error("Can not call " + func + " before server prepared");
        this.server[func].apply(this.server, arguments);
        return this;
    }
}

function toHandleWithProxy(app){
    var server = this._s(app);
    if(!(server instanceof BaseServer))
        throw new Error('Server must be an instanceof net.Server');
    this.server = server;
    return this;
};
