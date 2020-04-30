const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

require('./routes/authRoutes')(app);

// HEROKU has the ability to inject /set some environment variables
// it is setup right before app is started.
            // production     || dev
const PORT = process.env.PORT || 5000 // fallback
app.listen(PORT);
