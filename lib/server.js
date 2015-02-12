'use strict';

module.exports  = _server;

var Server      = require('./Server');

function _server(server){
    if(!server) return this.server;
    this.server = new Server(server);
    if('function' == typeof server.intervene) server.intervene(this);
    return this;
};
