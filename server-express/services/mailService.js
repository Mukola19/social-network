const { createTransport } = require('nodemailer')

class MailService {
  constructor() {
    this.transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_EMAIL,
        pass: process.env.MAIL_PASS,
      },
    })
  }

  send(email, linkId) {
    const link = process.env.SERVER_URL + '/api/auth/activateEmail/' + linkId
    this.transporter.sendMail({
      from: process.env.MAIL_EMAIL,
      to: email,
      subject: 'Підвердіть свою електорну пошту',
      text: '',
      html: `<a href='${link}'>${link}</a>`,
    })
  }
}

module.exports = new MailService()
