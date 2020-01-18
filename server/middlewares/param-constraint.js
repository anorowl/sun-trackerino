/*
 * 
 * Middleware checking if the required params are contained in the request params.
 * @param keys {Array} Array of required param names
 */
const requiredGetParams = (...keys) => {
    return async (req, res, next) => {
        let valid = true;
        let errorMessages = '';
        
        keys.forEach(key => {
            // checking if the key exists in the request query parameters
            if (!req.query.hasOwnProperty(key)) {
                valid = false;
                errorMessages += `${key} is required.\n`;
            }
        });
        
        // checking if the parameters are valid
        if (valid) {
            next();
        } else {
            await res.status(400).send(errorMessages);
        }
    } 
}

module.exports = {
    requiredGetParams,
}
