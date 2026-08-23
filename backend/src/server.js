'use strict';
/* ============================================================
   E-SHOPIA MAROC — Production Server v2.0
   Express + MongoDB | Modular Architecture
   ============================================================ */

require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');
const helmet     = require('helmet');
const compression = require('compression');
const morgan     = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');

const logger = require('./utils/logger');
const { globalErrorHandler, notFound } = require('./middleware/errorHandler');
const { limiter } = require('./middleware/rateLimiter');
const { scheduledJobs } = require('./services/scheduler');

// ── Route imports ──────────────────────────────────────────
const authRoutes       = require('./routes/auth');
const orderRoutes      = require('./routes/orders');
const productRoutes    = require('./routes/products');
const affiliateRoutes  = require('./routes/affiliate');
const marketplaceRoutes = require('./routes/marketplace');
const agentRoutes      = require('./routes/agents');
const trackingRoutes   = require('./routes/tracking');
const analyticsRoutes  = require('./routes/analytics');
const deliveryRoutes   = require('./routes/delivery');

const app = express();

// ── Security & Middleware ──────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false,
}));

app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
    'http://localhost:5000',
    /https:\/\/.*\.netlify\.app$/,
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(mongoSanitize());
app.use(morgan('combined', { stream: { write: msg => logger.http(msg.trim()) } }));

// ── Global rate limiter ────────────────────────────────────
app.use('/api/', limiter);

// ── Health check ───────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

// ── API Routes ─────────────────────────────────────────────
app.use('/api/auth',        authRoutes);
app.use('/api/orders',      orderRoutes);
app.use('/api/products',    productRoutes);
app.use('/api/affiliate',   affiliateRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/agents',      agentRoutes);
app.use('/api/tracking',    trackingRoutes);
app.use('/api/analytics',   analyticsRoutes);
app.use('/api/delivery',    deliveryRoutes);

// ── 404 & Global Error Handler ─────────────────────────────
app.use(notFound);
app.use(globalErrorHandler);

// ── MongoDB Connection & Server Startup ────────────────────
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 45000,
})
.then(() => {
  logger.info('✅ MongoDB Atlas connected');

  if (typeof scheduledJobs === 'function') {
    scheduledJobs();
  }

  const server = app.listen(PORT, () => {
    logger.info(`🚀 Server successfully running on port ${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      return; // Safely ignore duplicate port binding on nodemon fast restart
    } else {
      console.error(err);
      process.exit(1);
    }
  });
})
.catch((err) => {
  logger.error(`❌ MongoDB connection failed: ${err.message}`);
  process.exit(1);
});

module.exports = app;
