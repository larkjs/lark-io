'use strict';

module.exports = listen;

var net        = require('net');
var utils      = require('./utils');

function listen(){
    utils.assert(this.config.createServer,'typeof','function');
    this.server = this.config.createServer(this.workflow());
    utils.assert(this.server, 'instanceof', net.Server);
    this.emit('server',this.server);
    this.server.listen.apply(this.server, arguments);
    this.emit('listen',[].slice.call(arguments));
    return this.server;
}
