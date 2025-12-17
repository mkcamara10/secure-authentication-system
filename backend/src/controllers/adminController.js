// Made by MKCamara
const User = require('../models/User');
const LoginActivity = require('../models/LoginActivity');

exports.listUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json({ users });
};

exports.loginActivity = async (req, res) => {
  const logs = await LoginActivity.find().sort({ createdAt: -1 }).limit(200);
  res.json({ logs });
};
