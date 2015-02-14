'use strict';

module.exports = workflow;

var handle     = require('vi-misc').handle;

function workflow(){
    !this.config._middlewareHandled &&
    this.config.middleware && this.config.middleware(this);
    this.config._middlewareHandled = true;
    var mw = this.middlewares();
    var me = this;
    return function(context){
        handle(mw, context, function(err){
            me.emit('error', err);
        });
    }
};
