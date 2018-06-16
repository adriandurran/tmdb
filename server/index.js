const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const morgan = require('morgan');

const keys = require('./config/keys');

require('./models/user');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');

// conenct to mongo db
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log('Database connection successful'))
  .catch(err => console.log('Unable to connect to database', err));

const app = express();

// middleware
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: 'tmdb',
    maxAge: 8 * 60 * 60 * 1000, // 8 hours temp may reduce to 1
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));

// routes
app.use('/api/tmdb/auth', authRoutes);
require('./routes/courseRoutes')(app);
require('./routes/compRoutes')(app);
require('./routes/roleRoutes')(app);
require('./routes/userRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

module.exports = app;
