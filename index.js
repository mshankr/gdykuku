const express = require('express');
const mongoose = require('mongoose');
// to access cookies
const cookieSession = require('cookie-session');
// to ask passport make use of the cookies
const passport = require('passport');
const keys = require('./config/keys')
require('./models/User');
require('./services/passport');


mongoose.connect(keys.mongoURI)

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    // key to encrypt cookie xD so cookie cannot be directly edited by bad guy
    keys: [keys.cookieKey] // array is to allow u to provide multiple keys
  })
)

app.use(passport.initialize());
app.use(passport.session()); // that's it, passport is using our cookies! to manage authentication  xD

require('./routes/authRoutes')(app);

// HEROKU has the ability to inject /set some environment variables
// it is setup right before app is started.
            // production     || dev
const PORT = process.env.PORT || 5000 // fallback
app.listen(PORT);
