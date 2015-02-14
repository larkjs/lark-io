'use strict';

module.exports = attachTo;

var utils      = require('./utils');

function attachTo(io){
    utils.assert(this.config.attachTo, 'typeof', 'function');
    attach(this, io);
    return this;
};

function attach(from, to){
    to._attached = to._attached || [];
    utils.assert(to._attached, 'array');
    to._attached.push(from);
    if(to._attached_listened) return;
    to.on('server', function(server){
        to._attached.forEach(function(attached){
            attached.config.attachTo.call(attached, attached.workflow(), server);
        });
    });
    to._attached_listend = true;
};
