'use strict';

var middleware = module.exports = {};

middleware.use = function(handler){
    if(!this.mw) this.mw = [];
    this.mw.push(ensureGenerator(handler));
    return this;
};

middleware.before = function(handler){
    if(!this.mw_b) this.mw_b = [];
    this.mw_b.push(ensureGenerator(handler));
    return this;
};

middleware.after = function(handler){
    if(!this.mw_a) this.mw_a = [];
    this.mw_a.push(ensureGenerator(handler));
    return this;
};

middleware.end = function(handler, replace){
    replace = !!replace;
    if(!this.mw_e) this.mw_e = [];
    if(!replace && this.mw_e.length != 0) throw new Error('Can not set start middleware twice!');
    this.mw_e = [ensureGenerator(handler)];
    return this;
};

middleware.middlewares = middleware.callback = function(){
    var mw_b = this.mw_b || [];
    var mw   = this.mw   || [];
    var mw_a = this.mw_a || [];
    var mw_e = this.mw_e || [];
    var mw = [].concat(mw_b, mw, mw_a, mw_e);
    return mw;
};

function ensureGenerator(handler){
    if('function' != typeof handler || 'GeneratorFunction' != handler.constructor.name)
        throw new Error("Invalid middleware");
    return handler;
}

