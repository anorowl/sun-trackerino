const assert    = require('assert');
const DateUtils = require('../../utils/date-utils');

describe('Date utils', () => {
    describe('Get day beginning', () => {
        it('should give the first moment of the day', () => {
            const date = new Date();
            
            const result = DateUtils.getDayBeginning(date);

            assert.equal(result.getFullYear(), date.getFullYear());
            assert.equal(result.getMonth(), date.getMonth());
            assert.equal(result.getDate(), date.getDate());

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
            assert.equal(result.getDate(), date.getDate());

            assert.equal(result.getHours(), 23);
            assert.equal(result.getMinutes(), 59);
            assert.equal(result.getSeconds(), 59);
            assert.equal(result.getMilliseconds(), 0);
        });
    });

    describe('Get year beginning', () => {
        it('should give the first day of the given year', () => {
            const year = 1985;

            const result = DateUtils.getYearBeginning(year);

            assert.equal(result.getFullYear(), year);
            assert.equal(result.getMonth(), 0);
            assert.equal(result.getDate(), 1);
            
            assert.equal(result.getHours(), 0);
            assert.equal(result.getMinutes(), 0);
            assert.equal(result.getSeconds(), 0);
        });
    });

    describe('Get day ending', () => {
        it('should give the last day of the given year', () => {
            const year = 2017;

            const result = DateUtils.getYearEnding(year);

            assert.equal(result.getFullYear(), year);
            assert.equal(result.getMonth(), 11);
            assert.equal(result.getDate(), 31);

            assert.equal(result.getHours(), 23);
            assert.equal(result.getMinutes(), 59);
            assert.equal(result.getSeconds(), 59);
        });
    });
});
