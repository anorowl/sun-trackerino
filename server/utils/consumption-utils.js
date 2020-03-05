/**
 * Returns a number between 100 and 600 not included 
 * that represents hardware energy consumption
 **/
function getRandomHardwareEnergyConsumption() {
    return 100 + Math.random() * 500;
}

const FLOAT_REGEX = new RegExp(/\d+\.\d+/);

function rawChunkToProductionValue(val) {
    return FLOAT_REGEX.test(val) ? parseFloat(val) : null;
}

module.exports = {
    getRandomHardwareEnergyConsumption,
    rawChunkToProductionValue
};
