const assert = require('assert');
const EnergyBalance = require('../../models/energy-balance');

describe('Energy balance schema', () => {

    // testing the power production field
    describe('Power production validation', () => {
        it('should not validate with an empty power production', () => {
            const eb = new EnergyBalance();
            eb.production = null;
            
            const error = eb.validateSync();
            console.log(eb);
            assert.equal(error.errors['production'].message, "The power production is mandatory");
            assert.equal(error.errors['production'].name,    "ValidatorError");
        });

        it('should validate with an existing power production', () => {
            const eb = new EnergyBalance();
            eb.production = 500;

            const error = eb.validateSync();
            assert.equal(error.errors['production'], null);
        });
    });

    // testing the power consuption field
    describe('Power consuption validation', () => {
        it('should not validate with an empty power consuption', () => {
            const eb = new EnergyBalance();
            eb.consuption = null;

            const error = eb.validateSync();
            assert.equal(error.errors['consuption'].message, "The power consuption is mandatory");
            assert.equal(error.errors['consuption'].name,    "ValidatorError");
        });

        it('should validate with an existing power consuption', () => {
            const eb = new EnergyBalance();
            eb.consuption = 500;

            const error = eb.validateSync();
            assert.equal(error.errors['consuption'], null); 
        });
    });

    // testing the power ratio field
    describe('Ratio validation', () => {
        it('should not validate with an empty power ratio', () => {
            const eb = new EnergyBalance();
            eb.ratio = null;

            const error = eb.validateSync();
            assert.equal(error.errors['ratio'].message, "The power ratio is mandatory");
            assert.equal(error.errors['ratio'].name,    "ValidatorError");

        }); 

        it('should validate with an existing power ratio', () => {
            const eb = new EnergyBalance();
            eb.ratio = 1;

            const error = eb.validateSync(); 
            assert.equal(error.errors['ratio'], null);
        });
    });
    
    // testing the date field
    describe('Date validation', () => {
        it('should set the time of day by default', () => {
            const eb = new EnergyBalance();
            const currentDate = new Date();

            const error = eb.validateSync();
            assert.equal(error.errors['date'], null);
            assert.equal(eb.date.getMinutes(), currentDate.getMinutes());
            assert.equal(eb.date.getHours(), currentDate.getHours());
            assert.equal(eb.date.getDay(), currentDate.getDay());
            assert.equal(eb.date.getMonth(), currentDate.getMonth());
            assert.equal(eb.date.getFullYear(), currentDate.getFullYear());
        });

        it('should validate with an existing date', () => {
            const eb = new EnergyBalance();
            eb.date = new Date();

            const error = eb.validateSync();
            assert.equal(error.errors['date'], null);
        });
    });
});
