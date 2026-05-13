// Middleware for handling non-existent routes (404)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Passes the error to the errorHandler
};

// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  // If the status code is still 200 (default), change it to 500 (Server Error)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  res.status(statusCode).json({
    success: false,
    message: err.message,
    // Only show the stack trace in development, hide it in production for security
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
