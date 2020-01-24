/**
 * Wraps a handler in order to hold promise rejections.
 * @param {function(object,object,function):any|Promise<any>} handler
 * @returns {function(object,object,function):Promise<any>} 
 */
function wrap(handler) {
    return async function(req, res, next) {
        try {
            return await handler(req, res, next);
        } catch (err) {
            return next(err);
        }
    };
}

module.exports = wrap;

