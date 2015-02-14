'use strict';

module.exports = route;

var handle        = require('vi-misc').handle;
var EventEmitter  = require('events').EventEmitter;
var utils         = require('./utils');

function route(event, handler){
    var io = this;
    io.use(function*(next){
        var me = this;
        utils.assert(me.router, 'instanceof', EventEmitter, 'To route, you must implement config.router as an instanceof events.EventEmitter to emit routing events');
        me.router.on(event, function(){
            me.event = event;
            me.args  = [].slice.call(arguments);
            if(!Array.isArray(handler)) handler = [handler];
            handle(handler, me, function(err){
                if(err) return me.router.emit('error', err);
            });
        });
        yield next;
    });
    return this;
};
