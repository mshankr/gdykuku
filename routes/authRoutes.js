const passport = require('passport')

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.send('authentication success')
      // res.redirect('/surveys');
      // will redirect to /surveys with user cookie
    }
  );

app.get(
  '/api/logout', (req, res) => {
    req.logout()
    res.send(req.user)
  }
)

  app.get( // req = incoming object, res = outgoing response
    '/api/current_user', (req, res) => {
      res.send(req.session) // so amazing! there is user attached to the req! attached by passport!
    }
  )
}
