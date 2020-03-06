/**
 * Returns a number between 100 and 600 not included 
 * that represents hardware energy consumption
 **/
function getRandomHardwareEnergyConsumption() {
    return 100 + Math.random() * 200;
}

const FLOAT_REGEX = new RegExp(/^\s*\d+\.\d+\s*$/);

function rawChunkToProductionValue(val) {
    const randomProductionRatio = 1 + Math.random();
    return FLOAT_REGEX.test(val) ? (parseFloat(val) * randomProductionRatio) : null;
}

module.exports = {
    getRandomHardwareEnergyConsumption,
    rawChunkToProductionValue
};
