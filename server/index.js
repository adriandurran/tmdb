const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');

const morgan = require('morgan');

const keys = require('./config/keys');

require('./models/user');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const compRoutes = require('./routes/compRoutes');
const courseRoutes = require('./routes/courseRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const deptRoutes = require('./routes/deptRoutes');

// conenct to mongo db
mongoose
  .connect(keys.mongoURI)
  .then(() => console.log('Database connection successful'))
  .catch(err => console.log('Unable to connect to database', err));

const app = express();

// middleware
app.use(helmet());
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
app.use('/api/tmdb/competencies', compRoutes);
app.use('/api/tmdb/courses', courseRoutes);
app.use('/api/tmdb/roles', roleRoutes);
app.use('/api/tmdb/user', userRoutes);
app.use('/api/tmdb/dept', deptRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = app;
