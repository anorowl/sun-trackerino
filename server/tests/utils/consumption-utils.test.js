const assert    = require('assert');
const ConsumptionUtils = require('../../utils/consumption-utils');

describe('Consumption utils', () => {
    describe('Get random hardware energy consumption', () => {
        it('should give a number between a 100 and 600 not included', () => {
            const consumption = ConsumptionUtils.getRandomHardwareEnergyConsumption();          
            assert.ok(consumption >= 100 && consumption < 600, `${consumption} is not between 100 and 600 not included`);
        });
    });
});
