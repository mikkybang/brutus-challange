let express = require('express');
const path = require('path');
let app = express();
let router = require('./router');
let bodyParser = require('body-parser');
//bodyParser 

let mongoose = require("mongoose");

// Connect to our Database and handle an bad connections
// configuration ===============================================================
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};
mongoose.connect("mongodb://ubd:123ubd@ds139775.mlab.com:39775/heroku_hldbs7zv" , options);
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// READY?! Let's go!

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));


//build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
})

//Calling of the router function
app.use(router);


//Port
app.set('port', process.env.PORT || 7000);

//server code
const server = app.listen(app.get('port'), () => {
  console.log(`running → PORT ${server.address().port}`);
});