const nodemailer = require('nodemailer');

// config file setup
const dotenv = require('dotenv').config();

// Sending mail
exports.emailSender = (email, otp) => {
  // create a node transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  // Sending mail options
  const mailOptions = {
    from: 'hodophile@gmail.com',
    to: email,
    subject: `Email Verification`,
    html: `<h1>Hodophile</h1><br><h4> Your Code :  ${otp}</h4>`,
  };

  // Send mail
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};
