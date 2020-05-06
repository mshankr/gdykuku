const sendgrid = require('@sendgrid/mail');
const keys = require('../config/keys')

class Mailer {
  constructor({ subject, recipients }, content) {
    sendgrid.setApiKey(keys.sendGridKey)
    this.from = keys.sendGridEmail;
    this.subject = subject;
    this.html = content
    this.to = recipients.map(({email}) => email)

  }

  async send() {
    let response;
    try {
      response = await sendgrid.send(this, true)
    } catch (err) {
      console.log(err);
      response = err
    }
    return response
  }
}

module.exports = Mailer
