// Made by MKCamara
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const csurf = require('csurf');
const rateLimiter = require('./src/middleware/rateLimiter');
const connectDB = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimiter);

// CORS - allow client
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

// CSRF protection using cookies
const csrfProtection = csurf({ cookie: { httpOnly: true, sameSite: 'lax' } });
app.use(csrfProtection);

// Expose CSRF token to client (GET endpoint)
app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/admin', require('./src/routes/admin'));

app.use((err, req, res, next) => {
  // csurf error handler
  if (err && err.code === 'EBADCSRFTOKEN') return res.status(403).json({ message: 'Invalid CSRF token' });
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
