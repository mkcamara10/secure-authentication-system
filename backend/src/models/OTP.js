// Made by MKCamara
const mongoose = require('mongoose');

const OTPschema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, required: true },
  purpose: { type: String, enum: ['verify', 'reset'], default: 'verify' },
  expiresAt: { type: Date, required: true },
}, { timestamps: true });

OTPschema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL

module.exports = mongoose.model('OTP', OTPschema);
