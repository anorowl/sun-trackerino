const assert    = require('assert');
const ConsumptionUtils = require('../../utils/consumption-utils');

describe('Consumption utils', () => {
    describe('Get random hardware energy consumption', () => {
        it('should give a number between a 100 and 600 not included', () => {
            const consumption = ConsumptionUtils.getRandomHardwareEnergyConsumption();          
            assert.ok(consumption >= 100 && consumption < 600, `${consumption} is not between 100 and 600 not included`);
        });
    });

    describe('Get production value based on chunk passed', () => {
        it('should give a number between 1 and 5 times (not included) the chunk passed', () => {
            let consumption;          
            for(let chunk = 0; chunk <= 100 ; chunk++) {
                consumption = ConsumptionUtils.rawChunkToProductionValue(chunk.toString() + ".00");
                assert.ok(consumption >= chunk && consumption <= chunk*5, `${consumption} is not between chunk and chunk*5 not included`);
            }

            assert.ok(!ConsumptionUtils.rawChunkToProductionValue(""), 'function accepts bad arguments (and obviously shouldn\'t');
        });
    });
});
