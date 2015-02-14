'use strict';

module.exports = IO;

var net           = require('net');
var util          = require('util');
var handle        = require('vi-misc').handle;
var EventEmitter  = require('events').EventEmitter;
var attachTo      = require('./lib/attachTo');
var extend        = require('./lib/extend');
var io            = require('./lib/io');
var listen        = require('./lib/listen');
var middleware    = require('./lib/middleware');
var route         = require('./lib/route');
var workflow      = require('./lib/workflow');

var netServer     = require('./lib/io/net');
var httpServer    = require('./lib/io/http');
var wsServer      = require('./lib/io/ws');
var socketioServer= require('./lib/io/socketio');

util.inherits(IO, EventEmitter);
function IO(){
    if(!(this instanceof IO)) return new IO();
};

IO.net  = netServer;
IO.http = httpServer;
IO.ws   = wsServer;
IO.socketio = IO['socket.io'] = socketioServer;

extend(IO, middleware);
IO.prototype.workflow = workflow;

IO.prototype.attachTo = attachTo;
IO.prototype.listen   = listen;
IO.prototype.route  = route;
IO.prototype.io       = io;

IO.prototype.attach = function(io){
    if(!(io instanceof IO)) throw new Error('Can only attach an instance of IO');
    io.attachTo(this);
    return this;
};
