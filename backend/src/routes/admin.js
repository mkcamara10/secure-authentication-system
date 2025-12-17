// Made by MKCamara
const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

router.get('/users', requireAuth, requireAdmin, adminController.listUsers);
router.get('/activity', requireAuth, requireAdmin, adminController.loginActivity);

module.exports = router;
