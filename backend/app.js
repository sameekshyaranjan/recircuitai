const express = require('express');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import Routes
const testRoutes = require('./src/routes/testRoutes');
const uploadRoutes = require('./src/routes/uploadRoutes');

// Mount Routes
app.use('/api/test', testRoutes);
app.use('/api/upload', uploadRoutes);

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
