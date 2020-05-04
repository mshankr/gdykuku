const passport = require('passport')

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

// after go thru middleware, what to do with (req, res)?
// continue with the logic sister!
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => { // continue with the logic
      res.redirect('/surveys')
      // will redirect to /surveys with user cookie
    }
  );

app.get(
  '/api/logout', (req, res) => {
    req.logout()
    res.redirect('/')
  }
)

  app.get( // req = incoming object, res = outgoing response
    '/api/current_user', (req, res) => {
      res.send(req.user) // so amazing! there is user attached to the req! attached by passport!
    }
  )
}
