// Made by MKCamara
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const OTP = require('../models/OTP');
const LoginActivity = require('../models/LoginActivity');
const generateOTP = require('../utils/generateOtp');
const { sendMail } = require('../utils/mailer');
const { sanitizeObject } = require('../helpers/sanitize');

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '12');

function createAccessToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRES || '15m' });
}
function createRefreshToken(user) {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES || '7d' });
}

exports.register = async (req, res) => {
  try {
    // validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const data = sanitizeObject(req.body);
    const { name, email, password } = data;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({ name, email, password: hash });

    // create OTP
    const code = generateOTP(6);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    await OTP.create({ userId: user._id, code, purpose: 'verify', expiresAt });

    // send email
    await sendMail({ to: email, subject: 'Verify your email', text: `Your verification code is ${code}` });

    res.json({ message: 'Registered. Verify email with OTP sent to your mailbox.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, otp } = sanitizeObject(req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const record = await OTP.findOne({ userId: user._id, code: otp, purpose: 'verify' });
    if (!record) return res.status(400).json({ message: 'Invalid or expired OTP' });

    user.isVerified = true;
    await user.save();
    await OTP.deleteMany({ userId: user._id, purpose: 'verify' });

    res.json({ message: 'Email verified' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = sanitizeObject(req.body);
    const ip = req.ip;
    const ua = req.get('User-Agent') || '';

    const user = await User.findOne({ email });
    if (!user) {
      await LoginActivity.create({ email, ip, userAgent: ua, success: false, reason: 'User not found' });
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // check account lock
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      await LoginActivity.create({ userId: user._id, ip, userAgent: ua, success: false, reason: 'Account locked' });
      return res.status(423).json({ message: 'Account temporarily locked due to multiple failed attempts' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      user.failedLoginAttempts += 1;
      if (user.failedLoginAttempts >= 5) {
        user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes lock
        user.failedLoginAttempts = 0;
      }
      await user.save();
      await LoginActivity.create({ userId: user._id, ip, userAgent: ua, success: false, reason: 'Wrong password' });
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // reset failed attempts
    user.failedLoginAttempts = 0;
    user.lockedUntil = null;
    await user.save();

    // ensure email verified
    if (!user.isVerified) return res.status(403).json({ message: 'Email not verified' });

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    // set httpOnly cookie for refresh token
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 7 * 24 * 3600 * 1000 });
    // optionally send access token in cookie or response
    res.json({ accessToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });

    await LoginActivity.create({ userId: user._id, ip, userAgent: ua, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken || req.body?.refreshToken;
    if (!token) return res.status(401).json({ message: 'No token' });

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'User not found' });

    const accessToken = createAccessToken(user);
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
};
