'use strict';

module.exports = IO;

var net         = require('net');
var handle      = require('vi-misc').handle;
var extend      = require('./lib/extend');
var listen      = require('./lib/listen');
var middleware  = require('./lib/middleware');
var route       = require('./lib/route');
var server      = require('./lib/server');

var httpServer  = require('./lib/server/http');
var netServer   = require('./lib/server/net');
var wsServer    = require('./lib/server/ws');

function IO(){
    if(!(this instanceof IO)) return new IO();
};

IO.net  = netServer;
IO.http = httpServer;
IO.ws   = wsServer;

extend(IO, middleware);

IO.prototype.server = server;

IO.prototype.listen = listen;

IO.prototype.route  = route;
