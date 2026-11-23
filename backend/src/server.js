require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Initialize Database connection then start HTTP server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`[Server] Pennywise backend running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}).catch((err) => {
  console.error('[Server Error] Failed to initialize server:', err);
});
