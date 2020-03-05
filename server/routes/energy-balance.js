const express         = require('express');
const router          = express.Router();
const EnergyBalance   = require('../models/energy-balance');
const ParamConstraint = require('../middlewares/param-constraint');
const wrap            = require('../middlewares/promise-wrapper');
const DateUtils       = require('../utils/date-utils');

/**
 * Gets all the energybalances of the day
 */
router.get('/', wrap(async (req, res) => {
    const today = new Date();

    const dayBeginning = DateUtils.getDayBeginning(today);
    const dayEnding    = DateUtils.getDayEnding(today);    
 
    // getting the energy balances of the current day
    const energyBalances = await EnergyBalance.find({
        date: {
            $gte: dayBeginning, // between day beginning and day ending
            $lte: dayEnding
        } 
    });

    // sending the result
    res.json(energyBalances);
}));

/*
 * Gets the energy balances of the given date interval
 */
router.get('/dateinterval',
    ParamConstraint.requiredGetParams('begin_date', 'end_date'),
    ParamConstraint.checkParamsDate('begin_date', 'end_date'),
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
                $gte: beginDate,
                $lte: endDate
            }, 
        });

        res.json(energyBalances);
    })
);

/*
 * Gets the year report
 * -> Production for each day of the year
 */
router.get('/year', 
    ParamConstraint.requiredGetParams('year'),
    ParamConstraint.checkParamsInt('year'),
    wrap(async(req, res) => {
        const year = req.query.year;
        const currentYear = new Date().getFullYear();

        if (year <= 0 || year > currentYear) {          
            res.status(400)
               .send(`The year should be more than 0 and less than ${currentYear}`);
        }

        // TODO select sum(production) between begin date and end date
        // GROUP BY  
        //db.energybalances.aggregate([{ $group: { _id: { month: {$month: "$date"}, day: {$dayOfMonth: "$date"}}, count: { $sum: "$production" } } } ])
        const beginDate = DateUtils.getYearBeginning(year);
        const endDate   = DateUtils.getYearEnding(year); 
     
        const result = await EnergyBalance.aggregate([
            {
                $match: { 
                    date: {
                        $gte: beginDate,
                        $lte: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        month: {
                            $month: "$date",
                        },
                        day: {
                            $dayOfMonth: "$date",
                        },
                        year: {
                            $year: "$date",
                        }
                    },
                    count: {
                        $sum: "$production",
                    },
                },
            }, 
        ]);  
        
        res.json(result);
    })
);

module.exports = router;
