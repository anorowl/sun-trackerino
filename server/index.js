const mongoose = require('mongoose');
const express  = require('express');

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

// TODO remove this line
// the different api routes should be managed by the controllers
app.get('/', (req, res) => res.send('Hello World'));

app.listen(APP_PORT, () => console.log(`Listening on port ${APP_PORT}`));
