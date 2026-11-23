const express = require('express');
const authRoutes = require('./authRoutes');
const groupRoutes = require('./groupRoutes');
const expenseRoutes = require('./expenseRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

// Mount individual domain route modules
router.use('/auth', authRoutes);
router.use('/groups', groupRoutes);
router.use('/expenses', expenseRoutes);
router.use('/users', userRoutes);

// Root API health check
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
