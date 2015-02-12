'use strict';

module.exports = listen;

var handle     = require('vi-misc').handle;

function listen(){
    var me = this;
    var mw = me.middlewares();
    this.server.toHandle(function(context){
        handle(mw, context, function(err){
            if(err){
                me.emit('error', err);
            }
        });
    });
    return this.server.listen.apply(this.server, arguments);
}
