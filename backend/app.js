const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const simplexRoutes = require('./routes/simplexRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', simplexRoutes);

// Basic route for API status
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Simplex Solver API is running',
    version: '1.0.0'
  });
});

// API documentation placeholder
app.get('/api-docs', (req, res) => {
  res.json({
    api: 'Simplex Solver API',
    endpoints: {
      '/api/solve': {
        method: 'POST',
        description: 'Solve a linear programming problem',
        body: {
          objective: 'Array of objective function coefficients',
          objectiveType: '"max" or "min"',
          constraints: 'Array of constraint objects',
        },
        example: {
          objective: [3, 2, 5],
          objectiveType: 'max',
          constraints: [
            { coefficients: [1, 2, 1], type: '<=', rhs: 10 },
            { coefficients: [2, 1, 3], type: '<=', rhs: 15 }
          ]
        }
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message,
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

module.exports = app;