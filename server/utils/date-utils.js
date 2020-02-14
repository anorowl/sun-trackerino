/**
 * Returns the date representing the first moment of the given date's day.
 * @param {Date} date 
 * @returns {Date} beginning of the day
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
 * @returns {Date} ending of the day
 */
function getDayEnding(date) {
    ret = new Date(date);
    
    ret.setHours(23);
    ret.setMinutes(59);
    ret.setSeconds(59);
    ret.setMilliseconds(0);

    return ret;
}

/**
 * Returns the date representing the very beginning of the given year
 * @param {number} year 
 * @returns {Date} beginning of the year
 */
function getYearBeginning(year) {
    const ret = new Date(year, 0, 1);
    
    ret.setHours(0);
    ret.setMinutes(0);
    ret.setSeconds(0);
    ret.setMilliseconds(0);

    return ret;
}

/*
 * Returns the date representing the very end of the given year
 * @param {number} year
 * @returns {Date} ending of the day
 */
function getYearEnding(year) {
    const ret = new Date(year, 11, 31);
    
    ret.setHours(23);
    ret.setMinutes(59);
    ret.setMinutes(59);
    ret.setMilliseconds(3.6e6);
    
    return ret;
}

module.exports = {
    getDayBeginning,
    getDayEnding,
    getYearBeginning,
    getYearEnding
};
