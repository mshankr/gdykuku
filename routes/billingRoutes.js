const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)
const requireLogin = require('../middlewares/requireLogin')


module.exports = (app) => {
  app.post( // req = incoming object, res = outgoing response
              // run thru our middleware first!! xD
    '/api/stripe', requireLogin, async (req, res) => {
      // handle the token
      // reach out to Stripe API
      // finalise the actual charge
      // update the user credits
      // console.log(req.body);

      const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        source: req.body.id,
        description: '$5 for 5 credits'
      })

      req.user.credits += 5;
      // always refer to the latest up-to-date model
      // here, it means the user returned by the promise
      const user = await req.user.save();

      res.send(user)
    }
  )
}
