const assert = require('assert');
const ParamConstraint = require('../../middlewares/param-constraint.js');

function httpMockPass(done) {
    const res  = { 
        status: number => {}, 
        json: data => { assert.fail(); done(); }
    };
    const next = () => { 
        assert(true, 'Next have been called'); done();
    }

    return { res, next }; 
}

function httpMockFail(done) {
    const res = {
        status: function(number) {
            assert(number === 400, 'The HTTP code should be 400');
                return this; 
        },
        json: data => { 
            assert(true, 'Error have been returned');
            done();
        }
    };
    const next = () => {
        assert.fail();
        done();
    };

    return { res, next };
}

describe('Param constraint middleware', () => {
    describe('Required GET params', () => {
        it('should validate when no parameter is missing', (done) => {
            const req  = { query: { test: 1}};
            const {res, next} = httpMockPass(done);
            const fn   = ParamConstraint.requiredGetParams('test');
            fn(req, res, next);    
        }); 
         
        it('should return 400 error if a parameter is missing', (done) => {
            const req = { query: {test: 1}};
            const {res, next} = httpMockFail(done);
            const fn = ParamConstraint.requiredGetParams('test', 'test2');
            fn(req, res, next);
        });
    });

    describe('Check params date', () => {
        it('should validate a date', (done) => {
            const req = {query: {test: new Date().toISOString()}};
            const { res, next } = httpMockPass(done);

            const fn = ParamConstraint.checkParamsDate('test');
            fn(req, res, next);
        });

        it('should not validate if the param is not a date', (done) => {
            const req = {query: {test: 'test'}};
            const { res, next } = httpMockFail(done);

            const fn = ParamConstraint.checkParamsDate('test');
            fn(req, res, next);
        });

        it('should not validate if a parameter is missing', (done) => {
            const req = {query: {test: 'test'}};
            const { res, next } = httpMockFail(done);
            
            const fn = ParamConstraint.checkParamsDate('test2');
            fn(req, res, next);
        });
    });

    describe('Check params int', () => {
        it('should validate when all parameters are ints', (done) => {
            const req = { query : { test: 105, test2: 1000000000000 }};
            const { res, next } = httpMockPass(done);

            const fn = ParamConstraint.checkParamsInt('test', 'test2');
            fn(req, res, next);
        });

        it('should not validate if one of the params is not an int', (done) => {
            const req = { query: { test: 0, test2: 'test' }};
            const { res, next } = httpMockFail(done);

            const fn = ParamConstraint.checkParamsInt('test', 'test2');
            fn(req, res, next);
        });

        it('should not validate if a parameter is missing', (done) => { 
            const req = { query: { }};
            const { res, next } = httpMockFail(done);

            const fn = ParamConstraint.checkParamsInt('test');
            fn(req, res, next);
        });
    });
});
