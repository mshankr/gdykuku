const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

require('./routes/authRoutes')(app);
