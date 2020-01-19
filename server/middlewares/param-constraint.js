/*
 * Middleware checking if the required params are contained in the request params.
 * @param {Array} keys Array of required param names
 */
const requiredGetParams = (...keys) => {
    const predicate = val => val !== undefined && val !== null && val !== '';
    return checkParams(keys, '__key__ is required', predicate); 
};

/*
 * Middleware checking if the given params are of date type.
 * @param {Array} keys Array of param names.
 */
const checkParamsDate = (...keys) => {
    const predicate = key => Date.parse(key)
    return checkParams(keys, '__key__ should be a date', predicate);
};

/**
 * Checks the given params with the given predicate.
 * If a param doesn't respect the predicate, the middleware will send a
 * badrequest error. 
 * @param {Array}    keys             Array of param names
 * @param {string}   errorMsgTemplate Error message template
 * @param {function} predicate        Predicate function
 */
function checkParams(keys, errorMsgTemplate, predicate) {
    return async (req, res, next) => {
        let valid = true;
        let errors = [];

        keys.forEach(key => {
            const paramValue = req.query[key];
            const result     = predicate(paramValue);
            
            if (!result) {
                valid         = false;
                const message = errorMsgTemplate.replace('__key__', key); 
                
                errors.push({message : message});
            }
        });

        if (valid) {
            next();
        } else {
            await res.status(400).json(errors);
        }
    }
}

module.exports = {
    requiredGetParams,
    checkParamsDate,
}
