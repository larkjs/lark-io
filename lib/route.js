'use strict';

module.exports = route;

var handle        = require('vi-misc').handle;
var EventEmitter  = require('events').EventEmitter;

function route(event, handler){
    var io = this;
    io.use(function*(next){
        var me = this;
        if(!(me.emitter instanceof EventEmitter)) throw new Error('To route, you must implement this.emitter as an instanceof events.EventEmitter to emit socket/client events');
        me.emitter.on(event, function(){
            me.event = event;
            me.args  = [].slice.call(arguments);
            if(!Array.isArray(handler)) handler = [handler];
            handle(handler, me, function(err){
                if(err) return me.emitter.emit('error', err);
            });
        });
        yield next;
    });
    return this;
};
