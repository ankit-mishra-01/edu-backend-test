const nodemailer = require("nodemailer")
module.exports = {
  secret: process.env.JWT_SECRET,
  mailTransport:() => {
    return nodemailer.createTransport({
        host: process.env.SMTP,
        port: 465,
        secure: true,
        auth: {
          user: process.env.AUTH_EMAIL,
          pass: process.env.AUTH_EMAIL_PASSWORD,
        },
      });
    }
};
