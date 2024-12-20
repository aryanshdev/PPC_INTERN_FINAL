const nodemailer = require('nodemailer')
const dotenv = require("dotenv")
dotenv.config()

let mailer = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
      clientId: process.env.EMAILER_CLIENT_ID,
      clientSecret: process.env.EMAILER_CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
});
  
module.exports = mailer