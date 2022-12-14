const nodemailer = require('nodemailer');
const mailgun = require('nodemailer-mailgun-transport');

// config file setup
const dotenv = require('dotenv').config();

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

// Sending mail
module.exports = (sendemail, name, subject, message, phone) => {
  return new Promise((resolve, reject) => {
    // create a node transport
    const transporter = nodemailer.createTransport(mailgun(auth));

    // Sending mail options
    const mailOptions = {
      from: sendemail,
      to: 'salmanulnadakkal2@gmail.com',
      subject: 'Welcome onboard',
      html: `<h4>${subject}</h4><h5>${name},</h5><h5>${message}</h5><h5>Email : ${sendemail}</h5><h5>Contact : ${phone}</h5><h6>Thank you!</h6>`,
    };

    // Send mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};
