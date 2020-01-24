/**
 * Returns the date representing the first moment of the given date's day.
* @param {Date} date 
 **/
function getDayBeginning(date) {
    ret = new Date(date);
    
    ret.setHours(0);
    ret.setMinutes(0);
    ret.setSeconds(0);
    ret.setMilliseconds(0);

    return ret;
}

/**
 * Returns the date representing the last moment of the given date's day
 * @param {Date} date
 */
function getDayEnding(date) {
    ret = new Date(date);
    
    ret.setHours(23);
    ret.setMinutes(59);
    ret.setSeconds(59);
    ret.setMilliseconds(0);

    return ret;
}

module.exports = {
    getDayBeginning,
    getDayEnding
};
