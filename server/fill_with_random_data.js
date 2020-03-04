const EnergyBalance   = require('./models/energy-balance');
const mongoose = require('mongoose');

// mongoose connection
mongoose.connect(`mongodb://localhost/sun-trackerino`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.catch(err => {
    console.error('Mongodb starting error:', err.stack);
    process.exit(1);
});

const toInsert = [];

let date = new Date(2019, 12, 1);

for(let i=0; i<90; i++) {
    const production = 40 + Math.random() * 51;
    const consuption = 3.5 + Math.random() * 3;
    const ratio = production / consuption;
    toInsert.push({
        production,
        consuption,
        ratio,
        date,
    });
    
    date = new Date(date.valueOf() + 1000 * 3600 * 24); // 1 day later
}

EnergyBalance.insertMany(toInsert);