// Made by MKCamara
const mongoose = require('mongoose');

const LoginActivitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  email: { type: String },
  ip: { type: String },
  userAgent: { type: String },
  success: { type: Boolean },
  reason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('LoginActivity', LoginActivitySchema);
