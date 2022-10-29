const nodemailer = require('nodemailer');

// config file setup
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// twilio settup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID;
const client = require('twilio')(accountSid, authToken);

// Sending mail
exports.emailSender = (email, category, status) => {
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
    subject: `${category} Booking`,
    html: `<h1>Hodophile</h1><br><h4> Your ${category} Booking is ${status}</h4>`,
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

exports.smsSender = (contact, category, status) => {
  client.messages
    .create({
      body: `Hodophile travel agency: Your ${category} Booking is ${status}`,
      messagingServiceSid: serviceId,
      to: `+91${contact}`,
    })
    .then((message) => {
      return true;
    })
    .catch((err) => {
      return false;
    })
    .done();
};
