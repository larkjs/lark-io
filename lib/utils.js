'use strict';

var utils = module.exports = {};

utils.assert = function(target, action, result, message){
    switch(action){
        case 'ok' :
            if(target) return;
            message = result;
            throw new Error(message || (target + " should be OK"));
        case '==' :
            if(target == result) return; 
            throw new Error(message || (target + " should equal " + result));
        case '===' :
            if(target === result) return; 
            throw new Error(message || (target + " should === " + result));
        case '>' :
            if(target > result) return; 
            throw new Error(message || (target + " should be greater than  " + result));
        case '>=' :
            if(target >= result) return; 
            throw new Error(message || (target + " should be greater than or equal " + result));
        case '<' :
            if(target < result) return; 
            throw new Error(message || (target + " should be less than  " + result));
        case '<=' :
            if(target >= result) return; 
            throw new Error(message || (target + " should be less than or equal " + result));
        case 'typeof' :
            if(result == typeof target) return; 
            throw new Error(message || ("Type of " + target + " should be " + result));
        case 'instanceof' :
            if('function' != typeof result) throw new Error(result + ' is not a constructor');
            if(target instanceof result) return; 
            throw new Error(message || (target + " should be an instance of " + result.name));
        case 'array' :
            if(Array.isArray(target)) return;
            throw new Error(message || (target + " should be an Array"));
        default : throw new Error('Invalid assert action : ' + action);
    }
};
