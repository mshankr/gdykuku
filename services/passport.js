const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('../config/keys')
const mongoose = require('mongoose')

const User = mongoose.model('users')

// serializeUser: haha, just use mongodb's created document id xD
// done is a callback that we have to call after mongoose do some work
passport.serializeUser((user, done) => {
  // null = we don't expect any error
  done(null, user.id) // and we return user.id
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch(err => console.log(err))
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // async function!
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if (existingUser) {
            console.log('user exists already');
                // error object
            done(null, existingUser)
          } else {
            new User({ // not yet saved to mongodb!
              googleId: profile.id
            }).save() // now it's saved!
            .then(user => done(null, user)) // always use the returned Model object from the promise
            .catch(err => console.log(err))
          }
        })
        .catch(err => console.log(err))
  }
  )
)
