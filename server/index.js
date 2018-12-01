const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const helmet = require('helmet');
const sslRedirect = require('heroku-ssl-redirect');

const morgan = require('morgan');

require('./models/user');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');
const compRoutes = require('./routes/compRoutes');
const courseRoutes = require('./routes/courseRoutes');
const roleRoutes = require('./routes/roleRoutes');
const userRoutes = require('./routes/userRoutes');
const deptRoutes = require('./routes/deptRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// connect to mongo db
mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      poolSize: 10,
      useFindAndModify: false,
      useCreateIndex: true,
      reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
      reconnectInterval: 500 // Reconnect every 500ms
    }
  )
  .then(() => console.log('Database connection successful'))
  .catch((err) => console.log('Unable to connect to database', err));

const app = express();

// middleware
app.use(helmet());
app.use(helmet.hsts({ maxAge: 7776000000 }));
app.use(helmet.frameguard('SAMEORIGIN'));
app.use(helmet.xssFilter({ setOnOldIE: true }));
app.use(helmet.noSniff());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       'default-src': ["'self'"],
//       'img-src': ['res.cloudinary.com', 'cloudinary.com'],
//       'style-src': ['fonts.googleapis.com']
//     }
//   })
// );
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: 'tmdb',
    maxAge: 3 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
    // httpOnly: true,
    // secure: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(sslRedirect(['production']));

app.use(morgan('dev'));

// routes
app.use('/api/tmdb/auth', authRoutes);
app.use('/api/tmdb/competencies', compRoutes);
app.use('/api/tmdb/courses', courseRoutes);
app.use('/api/tmdb/roles', roleRoutes);
app.use('/api/tmdb/user', userRoutes);
app.use('/api/tmdb/dept', deptRoutes);
app.use('/api/tmdb/extra', feedbackRoutes);

app.use(express.static('client'));
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

const PORT = process.env.PORT || 3050;

app.listen(PORT, () => {
  console.log(`Server up and connected on PORT: ${PORT}`);
});

module.exports = app;
