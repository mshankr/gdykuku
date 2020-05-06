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
      callbackURL: keys.googleRedirectURI + "/auth/google/callback"
      // proxy: "true"
    },
    async (accessToken, refreshToken, profile, done) => {
      // async function!
      const existingUser = await User.findOne({ googleId: profile.id })
      if (existingUser) {
        console.log('user exists already');
            // error object
        done(null, existingUser)
      } else {
        const user = await new User({ // not yet saved to mongodb!
          googleId: profile.id
        }).save() // now it's saved!
        done(null, user)
      }

  }
  )
)
