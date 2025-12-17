// Made by MKCamara
module.exports = function generateOTP(digits = 6) {
  let otp = '';
  for (let i = 0; i < digits; i++) otp += Math.floor(Math.random() * 10).toString();
  return otp;
};
