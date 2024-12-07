const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Import API routes
const APIRoutes = require('./routes/routes');

const app = express();

// Configure Morgan for logging HTTP requests in development mode
app.use(morgan('dev'));

// Configure CORS to restrict access to your frontend and specific methods
const corsOptions = {
    origin: 'http://localhost:5173', // Allow only your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow cookies if needed
};
app.use(cors(corsOptions));

// Middleware to parse incoming JSON requests
app.use(express.json());

// API routes
app.use('/', APIRoutes);

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'An unexpected error occurred.',
    });
});

// 404 handler for undefined routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Resource not found.',
    });
});

module.exports = app;