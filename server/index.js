const consumptionUtils =  require("./utils/consumption-utils");
function clear() {this.length = 0};
Array.prototype.clear = clear;

const mongoose = require('mongoose');
const express  = require('express');

const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;

const EnergyBalanceModel = require('./models/energy-balance');
const EnergyBalanceRouter = require('./routes/energy-balance');
const cors = require("cors");

const app = express();

// app configuration
// picks up the node env values if possible
const APP_PORT = process.env.APP_PORT || 3000;
const DB_PORT  = process.env.DB_PORT  || 27017;
const DB_NAME  = process.env.DB_NAME  || 'sun-trackerino';
const SERIAL_PORT = process.env.SERIAL_PORT || '/dev/ttyACM0';


// mongoose connection
mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.catch(err => {
    console.error('Mongodb starting error:', err.stack);
    process.exit(1);
});

const db = mongoose.connection;
app.use(cors({origin: "http://localhost"}));

app.use('/energy-balance', EnergyBalanceRouter);
app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));

const serial = new SerialPort(SERIAL_PORT, { baudRate: 9600 }, (err) => {
    if(err)
        console.error(`Can't connect to ${SERIAL_PORT} ==> ${err}`);
});


const parser = serial.pipe(new ReadLine({delimiter: '\n', includeDelimiter: false, encoding: "ascii"}))
parser.on("data", chunk => {
    const value = consumptionUtils.rawChunkToProductionValue(chunk);

    if(value)
        productionValues.push(value);
}).on("error", err => {
    console.error(`Erreur survenue => ${err}`);
});

const productionValues = []; // array of values received from the Arduino
const TIME_INTERVAL = 60000; // in ms

async function run() {
    while(1) {
        await wait(TIME_INTERVAL);
        
        if(productionValues.length != 0) {
            const production = productionValues.reduce((prev, curr) => prev + curr, 0);

            const consumption = consumptionUtils.getRandomHardwareEnergyConsumption();
            const newEnergyBalance = {
                production,
                consumption,
                ratio: production / consumption
            };

            const model = new EnergyBalanceModel(newEnergyBalance);

            model.save().catch(err => {
                console.error(err);
            });

            productionValues.clear();
        }
    }
}

function wait(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

run().catch(err => console.error(err));
