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
app.use(express.json())

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
require('./routes/billingRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // handle static js / css files
  app.use(express.static('frontend/build'))
  // go find in frontend/build/static

  // handle react-router routes
  const path = require('path')
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

// HEROKU has the ability to inject /set some environment variables
// it is setup right before app is started.
            // production     || dev
const PORT = process.env.PORT || 5000 // fallback
app.listen(PORT);
