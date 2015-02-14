'use strict';

module.exports  = io;

var assert      = require('vi-misc').assert;
var extend      = require('./extend');
var net         = require('./io/net');

function io(config){
    if(!config)
        config = net;
    assert(config, 'ok');
    if('function' == typeof config)
        config = { createServer : config };
    assert(config, 'typeof', 'object');
    var _config = config;
    config = {};
    extend(config, _config);
    config.intervene    && assert(config.intervene,    'typeof', 'function');
    config.createServer && assert(config.createServer, 'typeof', 'function');
    config.attachTo     && assert(config.attachTo,     'typeof', 'function');
    config.middleware   && assert(config.middleware,   'typeof', 'function');
    this.config = config;
    this.config.intervene && this.config.intervene(this);
    this.emit('io', config);
    return this;
};
