'use strict';

var util    = require('util');
var extend  = require('extend');

module.exports = function(to, from){
    if('function' == typeof to && 'function' == typeof from){
        util.inherits(to, from);
        return to;
    }
    if('function' == typeof to && 'object'   == typeof from){
        to.prototype = extend(to.prototype, from);
        return to;
    }
    if('object'   == typeof to && 'function' == typeof from){
        to = extend(to, from);
        return to;
    }
}
