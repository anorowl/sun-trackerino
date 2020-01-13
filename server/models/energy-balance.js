const mongoose = require('mongoose');

const EnergyBalanceSchema = new mongoose.Schema({
    production: {
        type: Number,
        required: [true, 'The power production is mandatory'],
    },
    consuption: {
        type: Number,
        required: [true, 'The power consuption is mandatory'],
    },
    ratio: {
        type: Number,
        required: [true, 'The power ratio is mandatory'],
    },
    date: {
        type: Date,
        default: Date.now,
        requied: [true, 'The date is required']
    },
});

module.exports = mongoose.model('EnergyBalance', EnergyBalanceSchema);
