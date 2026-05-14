const express = require('express');
const cors = require('cors');

const app = express();

// Middleware to parse JSON
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Import Routes
const testRoutes = require('./src/routes/testRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Mount Routes
app.use('/api/test', testRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/auth', authRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "ReCircuit AI API Running"
  });
});

// Import Error Middleware
const { notFound, errorHandler } = require('./src/middleware/errorMiddleware');

// 404 Error Handler
app.use(notFound);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
