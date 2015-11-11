function promisifyFunction(obj,fn) {
    return function() {
        var args = [].slice.call(arguments);
        return new Promise(function(resolve,reject) {
            args.push(function(err) {
                if (err) {
                    return reject(err);
                }
                if (arguments.length > 2) {
                    resolve([].slice.call(arguments,1));
                } else {
                    resolve(arguments[1]);
                }
            });
            fn.apply(obj,args);
        });
    };
}

module.exports = function(obj,functionMap) {
    if (functionMap) {
        var functions = functionMap(obj);
        if (functions instanceof Array) {
            return functions.map(function(fn) {
                return promisifyFunction(obj,fn);
            });
        } else {
            return promisifyFunction(obj,functions);
        }
    } else {
        for (var key in obj) {
            if (key[0] !== '_' && typeof(obj[key]) === 'function') {
                obj[key + 'Async'] = promisifyFunction(obj,obj[key]);
            }
        }
        return obj;
    }
};
