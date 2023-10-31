const nodemailer = require("nodemailer")
module.exports = {
  secret: "bezkoder-secret-key",
  mailTransport:() => {
    return nodemailer.createTransport({
        host: process.env.smtp || "smtppro.zoho.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.authemail || "support@edusession.live",
          pass: process.env.password || "2S494#6R!zSy",
        },
      });
    }
};
