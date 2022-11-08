const otpGenerator = require('otp-generator');

// OTP generator
module.exports = () => {
  return otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    digits: true,
    lowerCaseAlphabets: false,
  });
};
