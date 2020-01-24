const express = require('express')
var bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
app.use(cors());

var MeetingController = require('./controllers/meeting');
app.use('/meeting', MeetingController);

var UserController = require('./controllers/user');
app.use('/user', UserController);

var ServiceController = require('./controllers/service');
app.use('/service', ServiceController);

var SalonController = require('./controllers/salon');
app.use('/salon', SalonController);

var OfferController = require('./controllers/offer');
app.use('/offer', OfferController);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = app;