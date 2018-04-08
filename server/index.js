const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const morgan = require('morgan');

const keys = require('./config/keys');

require('./models/user');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // 6 hours temp may reduce to 1
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 3050;

app.listen(PORT);
