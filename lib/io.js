'use strict';

module.exports  = io;

var utils       = require('./utils');
var extend      = require('./extend');

function io(config){
    if(!config)
        config = this.net;
    utils.assert(config, 'ok');
    if('function' == typeof config)
        config = { createServer : config };
    utils.assert(config, 'typeof', 'object');
    var _config = config;
    config = {};
    extend(config, _config);
    config.intervene    && utils.assert(config.intervene,    'typeof', 'function');
    config.createServer && utils.assert(config.createServer, 'typeof', 'function');
    config.attachTo     && utils.assert(config.attachTo,     'typeof', 'function');
    config.middleware   && utils.assert(config.middleware,   'typeof', 'function');
    this.config = config;
    this.config.intervene && this.config.intervene(this);
    this.emit('io', config);
    return this;
};
