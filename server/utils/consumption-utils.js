/**
 * Returns a number between 100 and 600 not included 
 * that represents hardware energy consumption
 **/
function getRandomHardwareEnergyConsumption() {
    return 100 + Math.random() * 500;
}

module.exports = {
    getRandomHardwareEnergyConsumption
};
