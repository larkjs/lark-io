'use strict';

module.exports = attachTo;

var assert     = require('vi-misc').assert;
var net        = require('net');

function attachTo(target){
    assert(this.config.attachTo, 'typeof', 'function');
    if(target instanceof this.constructor){
        attachIO(this, target);
    }
    else if(target instanceof net.Server){
        attachServer(this, target);
    }
    return this;
};

function attachIO(me, io){
    io._attached = io._attached || [];
    assert(io._attached, 'array');
    io._attached.push(me);
    if(io._attached_listened) return;
    io.on('server', function(server){
        io._attached.forEach(function(attached){
            attached.config.attachTo.call(attached, attached.workflow(), server, attached, io);
        });
    });
    io._attached_listend = true;
};

function attachServer(me, server){
    me.config.attachTo(me.workflow(), server);
};
