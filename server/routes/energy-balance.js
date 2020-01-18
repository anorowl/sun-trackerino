const express         = require('express');
const router          = express.Router();
const EnergyBalance   = require('../models/energy-balance');
const ParamConstraint = require('../middlewares/param-constraint');
const wrap            = require('../middlewares/promise-wrapper');

/**
 * Gets all the energybalances of the day
 */
router.get('/', wrap(async (req, res) => {
    // getting the energy balances
    const energyBalances = await EnergyBalance.find();
    // sending the result
    res.json(energyBalances);
}));

/*
 * Gets the energy balances of the given date interval
 */
router.get('/dateinterval',
    ParamConstraint.requiredGetParams('begin_date', 'end_date'),
    wrap(async (req, res) => {
        const beginDate = new Date(req.query.begin_date);
        const endDate   = new Date(req.query.end_date);
    
        if (beginDate >= endDate) {
            res
                .status(400)
                .send('The begin_date must be less than the end_date');
        }

        const energyBalances = await EnergyBalance.find({
            date: { 
                $gt: beginDate,
                $lt: endDate
            }, 
        });

        res.json(energyBalances);
    })
);

module.exports = router;
