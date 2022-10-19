const otpGenerator = require('otp-generator');

// config file setup
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// twilio settup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_ID;
const client = require('twilio')(accountSid, authToken);

// OTP generator
exports.otpGeneration = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits:true,
    lowerCaseAlphabets:false
  });
};

// Otp Sending
exports.otpSender = (otp, contact) => {
  return new Promise((resolve, reject) => {
    client.messages
      .create({
        body: `Hodophile travel agency verification : ${otp}`,
        messagingServiceSid: serviceId,
        to: `+91${contact}`,
      })
      .then((message) => {
        resolve(message);
      }).catch((err)=>{
        console.log(err);
      })
      .done();
  });
};
