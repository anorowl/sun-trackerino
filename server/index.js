const mongoose = require('mongoose');
const express  = require('express');
const EnergyBalance = require('./models/energy-balance');

const app = express();

// app configuration
// picks up the node env values if possible
const APP_PORT = process.env.APP_PORT || 3000;
const DB_PORT  = process.env.DB_PORT  || 27017;
const DB_NAME  = process.env.DB_NAME  || 'sun-trackerino';
const HOST_NAME = process.argv[2]     || 'localhost';

console.log(HOST_NAME)

// mongoose connection
mongoose.connect(`mongodb://${HOST_NAME}:${DB_PORT}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Mongo connected"))
.catch(err => {
    console.error('Mongodb starting error:', err.stack);
    process.exit(1);
});

const db = mongoose.connection;

// TODO remove this line
// the different api routes should be managed by the controllers
app.get('/', (req, res) => res.send('Hello World'));

app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));
