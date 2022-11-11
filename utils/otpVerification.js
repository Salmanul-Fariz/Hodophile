// config file setup
const dotenv = require('dotenv').config()

// twilio settup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const otpService = process.env.TWILIO_SERVICE_OTP_ID;
const client = require('twilio')(accountSid, authToken);

// Otp Sending
exports.otpSender = (contact) => {
  return new Promise((resolve, reject) => {
    client.verify.v2
      .services(otpService)
      .verifications.create({ to: `+91${contact}`, channel: 'sms' })
      .then((verification) => resolve(verification))
      .catch((err) => {
        reject(err);
      });
  });
};

// Otp Checking
exports.otpCheking = (otp, contact) => {
  return new Promise((resolve, reject) => {
    client.verify.v2
      .services(otpService)
      .verificationChecks.create({ to: `+91${contact}`, code: `${otp}` })
      .then((verification_check) => resolve(verification_check))
      .catch((err) => {
        reject(err);
      });
  });
};
