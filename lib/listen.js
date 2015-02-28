'use strict';

module.exports = listen;

var net   = require('net');
var assert  = require('vi-misc').assert;

function listen (){
    if( !this.config ) this.io();
    assert(this.config.createServer, 'typeof', 'function' );
    this.server = this.config.createServer.call(this.server, this.workflow(), this);
    assert(this.server, 'instanceof', net.Server);
    this.emit('server', this.server);
    this.server.listen.apply(this.server, arguments);
    this.emit('listen', [].slice.call(arguments));
    return this.server;
}
