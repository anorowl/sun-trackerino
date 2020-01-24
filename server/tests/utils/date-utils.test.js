const assert    = require('assert');
const DateUtils = require('../../utils/date-utils');

describe('Date utils', () => {
    describe('Get day beginning', () => {
        it('should give the first moment of the day', () => {
            const date = new Date();
            
            const result = DateUtils.getDayBeginning(date);

            assert.equal(result.getFullYear(), date.getFullYear());
            assert.equal(result.getMonth(), date.getMonth());
            assert.equal(result.getDay(), date.getDay());

            assert.equal(result.getHours(), 0);
            assert.equal(result.getMinutes(), 0);
            assert.equal(result.getSeconds(), 0);
            assert.equal(result.getMilliseconds(), 0);
        });
    });

    describe('Get day ending', () => {
        it('should give the last moment of the day', () => {
            const date = new Date();
            
            const result = DateUtils.getDayEnding(date);

            assert.equal(result.getFullYear(), date.getFullYear());
            assert.equal(result.getMonth(), date.getMonth());
            assert.equal(result.getDay(), date.getDay());

            assert.equal(result.getHours(), 23);
            assert.equal(result.getMinutes(), 59);
            assert.equal(result.getSeconds(), 59);
            assert.equal(result.getMilliseconds(), 0);
        });
    });
});
