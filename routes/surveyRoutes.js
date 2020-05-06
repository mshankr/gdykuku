const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/Mailer')
const Survey = mongoose.model('surveys')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

module.exports = (app) => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
      .select({
        recipients: false
      })
    res.send(surveys)
  })


  app.post('/api/surveys/webhooks', (req, res) => {

    const p = new Path("/api/surveys/:surveyId/:choice")
    _.chain(req.body)
      .map( ({ email, url }) => {
        const pathname = new URL(url).pathname
        // match is either an object or null!
        const match = p.test(pathname)
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice}
        }
      })
      .compact()
    // 'email', 'surveyId' comes as a pair in checks
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email: email, responded: false }
          } // after found 1 record, update these fields!
        }, {
          $inc: { [choice]: 1 },
          $set: { "recipients.$.responded": true },
          lastResponded: new Date()
          // $ comes from $elemMatch! treat it like an index e.g. recipients[500]
        }).exec()
      })
      .value()


    res.send(req.body)
  })

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thank u for voting, we highly regard your vote. Every vote counts. We love u a LOT!')
  })


  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      // for every email return an object { email: email }
      // 123@34.com,24@dslfa.com,dfa@dsf.com
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    })

    console.log(survey);

    // send email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user)
    } catch (err) {
      res.status(422).send(err)
    }
  })
}
