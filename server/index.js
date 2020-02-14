const mongoose = require('mongoose');
const express  = require('express');
const SerialPort = require('serialport');
const ReadLine = SerialPort.parsers.Readline;
const EnergyBalanceRouter = require('./routes/energy-balance');

const app = express();

// app configuration
// picks up the node env values if possible
const APP_PORT = process.env.APP_PORT || 3000;
const DB_PORT  = process.env.DB_PORT  || 27017;
const DB_NAME  = process.env.DB_NAME  || 'sun-trackerino'; 


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

app.use('/energy-balance', EnergyBalanceRouter);
app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));

const serial = new SerialPort('/dev/ttyACM0', { baudRate: 9600 }, (err) => {
    console.error("CA CONNECTE PAS " + err.message)
});
const parser = serial.pipe(new ReadLine())
parser.on("data", console.log)