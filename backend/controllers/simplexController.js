const SimplexModel = require('../models/simplexModel');

/**
 * Controller for simplex solver operations
 */
const simplexController = {
  /**
   * Solve a linear programming problem using the simplex method
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  solveSimplexProblem: async (req, res) => {
    try {
      const { objective, objectiveType = 'max', constraints } = req.body;

      // Validate input
      if (!objective || !Array.isArray(objective) || objective.length === 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid objective function. Must be an array of coefficients.'
        });
      }

      if (!constraints || !Array.isArray(constraints) || constraints.length === 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid constraints. Must be an array of constraint objects.'
        });
      }

      // Check for constraint structure
      for (const constraint of constraints) {
        if (!constraint.coefficients || !Array.isArray(constraint.coefficients) ||
            constraint.coefficients.length !== objective.length) {
          return res.status(400).json({
            status: 'error',
            message: 'Each constraint must have coefficients matching the objective function length.'
          });
        }

        if (!constraint.type || !['<=', '>=', '='].includes(constraint.type)) {
          return res.status(400).json({
            status: 'error',
            message: 'Each constraint must have a type of "<=", ">=" or "=".'
          });
        }

        if (constraint.rhs === undefined || isNaN(constraint.rhs)) {
          return res.status(400).json({
            status: 'error',
            message: 'Each constraint must have a valid right-hand side (rhs) value.'
          });
        }
      }

      // Create a new simplex solver instance
      const simplexSolver = new SimplexModel();
      
      // Solve the problem
      const result = simplexSolver.solve({
        objective,
        objectiveType,
        constraints
      });

      // Return the result
      res.json({
        status: 'success',
        data: result
      });
      
    } catch (error) {
      console.error('Error in simplex solver:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to solve the linear programming problem',
        details: error.message
      });
    }
  }
};

module.exports = simplexController;