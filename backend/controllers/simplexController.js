// const SimplexModel = require('../models/simplexModel');

// /**
//  * Controller for simplex solver operations
//  */
// const simplexController = {
//   /**
//    * Solve a linear programming problem using the simplex method
//    * @param {Object} req - Express request object
//    * @param {Object} res - Express response object
//    */
//   solveSimplexProblem: async (req, res) => {
//     try {
//       const { objective, objectiveType = 'max', constraints } = req.body;

//       // Validate input
//       if (!objective || !Array.isArray(objective) || objective.length === 0) {
//         return res.status(400).json({
//           status: 'error',
//           message: 'Invalid objective function. Must be an array of coefficients.'
//         });
//       }

//       if (!constraints || !Array.isArray(constraints) || constraints.length === 0) {
//         return res.status(400).json({
//           status: 'error',
//           message: 'Invalid constraints. Must be an array of constraint objects.'
//         });
//       }

//       // Check for constraint structure
//       for (const constraint of constraints) {
//         if (!constraint.coefficients || !Array.isArray(constraint.coefficients) ||
//             constraint.coefficients.length !== objective.length) {
//           return res.status(400).json({
//             status: 'error',
//             message: 'Each constraint must have coefficients matching the objective function length.'
//           });
//         }

//         if (!constraint.type || !['<=', '>=', '='].includes(constraint.type)) {
//           return res.status(400).json({
//             status: 'error',
//             message: 'Each constraint must have a type of "<=", ">=" or "=".'
//           });
//         }

//         if (constraint.rhs === undefined || isNaN(constraint.rhs)) {
//           return res.status(400).json({
//             status: 'error',
//             message: 'Each constraint must have a valid right-hand side (rhs) value.'
//           });
//         }
//       }

//       // Create a new simplex solver instance
//       const simplexSolver = new SimplexModel();
      
//       // Solve the problem
//       const result = simplexSolver.solve({
//         objective,
//         objectiveType,
//         constraints
//       });

//       // Return the result
//       res.json({
//         status: 'success',
//         data: result
//       });
      
//     } catch (error) {
//       console.error('Error in simplex solver:', error);
//       res.status(500).json({
//         status: 'error',
//         message: 'Failed to solve the linear programming problem',
//         details: error.message
//       });
//     }
//   }
// };

// module.exports = simplexController;





















// const SimplexModel = require('../models/simplexModel');

// /**
//  * Controller for simplex solver operations
//  */
// const simplexController = {
//   /**
//    * Solve a linear programming problem using the simplex method
//    * @param {Object} req - Express request object
//    * @param {Object} res - Express response object
//    */
//   solveSimplexProblem: async (req, res) => {
//     try {
//       const { objective, objectiveType = 'max', constraints } = req.body;

//       // Validate input
//       if (!objective || !Array.isArray(objective) || objective.length === 0) {
//         return res.status(400).json({
//           status: 'error',
//           message: 'Invalid objective function. Must be an array of coefficients.'
//         });
//       }

//       if (!constraints || !Array.isArray(constraints) || constraints.length === 0) {
//         return res.status(400).json({
//           status: 'error',
//           message: 'Invalid constraints. Must be an array of constraint objects.'
//         });
//       }

//       // Check for constraint structure
//       for (const constraint of constraints) {
//         if (!constraint.coefficients || !Array.isArray(constraint.coefficients) ||
//             constraint.coefficients.length !== objective.length) {
//           return res.status(400).json({
//             status: 'error',
//             message: 'Each constraint must have coefficients matching the objective function length.'
//           });
//         }

//         if (!constraint.type || !['<=', '>=', '='].includes(constraint.type)) {
//           return res.status(400).json({
//             status: 'error',
//             message: 'Each constraint must have a type of "<=", ">=" or "=".'
//           });
//         }

//         if (constraint.rhs === undefined || isNaN(constraint.rhs)) {
//           return res.status(400).json({
//             status: 'error',
//             message: 'Each constraint must have a valid right-hand side (rhs) value.'
//           });
//         }
//       }

//       // Create a new simplex solver instance
//       const simplexSolver = new SimplexModel();
      
//       // Solve the problem
//       const result = simplexSolver.solve({
//         objective,
//         objectiveType,
//         constraints
//       });

//       // Return the result
//       res.json({
//         status: 'success',
//         data: result
//       });
      
//     } catch (error) {
//       console.error('Error in simplex solver:', error);
//       res.status(500).json({
//         status: 'error',
//         message: 'Failed to solve the linear programming problem',
//         details: error.message
//       });
//     }
//   }
// };

// module.exports = simplexController;























const SimplexModel = require('../models/simplexModel');
const FractionUtils = require('../utils/fractionUtils');

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

      // Format the result for better display
      const formattedResult = {
        ...result,
        solution: result.solution, // Already formatted in the model
        summary: simplexController.createSolutionSummary(result.solution, objectiveType) // Changé ici
      };

      // Return the result
      res.json({
        status: 'success',
        data: formattedResult
      });
      
    } catch (error) {
      console.error('Error in simplex solver:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to solve the linear programming problem',
        details: error.message
      });
    }
  },

  /**
   * Create a solution summary with formatted values
   * @param {Object} solution - The solution object
   * @param {String} objectiveType - 'max' or 'min'
   * @returns {Object} - Formatted summary
   */
  createSolutionSummary(solution, objectiveType) {
    const summary = {
      objectiveType,
      objectiveValue: solution.Z,
      variables: {}
    };

    // Extract variable values
    Object.keys(solution).forEach(key => {
      if (key !== 'Z') {
        summary.variables[key] = solution[key];
      }
    });

    // Add interpretation
    summary.interpretation = simplexController.interpretSolution(solution, objectiveType); // Changé ici

    return summary;
  },

  /**
   * Interpret the solution in human-readable format
   * @param {Object} solution - The solution object
   * @param {String} objectiveType - 'max' or 'min'
   * @returns {String} - Human-readable interpretation
   */
  interpretSolution(solution, objectiveType) {
    const variables = Object.keys(solution).filter(key => key !== 'Z');
    const nonZeroVariables = variables.filter(key => 
      typeof solution[key] === 'string' ? 
        solution[key] !== '0' : 
        Math.abs(solution[key]) > 1e-10
    );

    let interpretation = `Solution optimale trouvée:\n`;
    
    if (nonZeroVariables.length > 0) {
      interpretation += `Variables de base:\n`;
      nonZeroVariables.forEach(variable => {
        interpretation += `  ${variable} = ${solution[variable]}\n`;
      });
    }

    const zeroVariables = variables.filter(key => 
      typeof solution[key] === 'string' ? 
        solution[key] === '0' : 
        Math.abs(solution[key]) <= 1e-10
    );

    if (zeroVariables.length > 0) {
      interpretation += `Variables non basiques (= 0):\n`;
      zeroVariables.forEach(variable => {
        interpretation += `  ${variable} = 0\n`;
      });
    }

    interpretation += `Valeur ${objectiveType === 'max' ? 'maximale' : 'minimale'} de la fonction objectif: Z = ${solution.Z}`;

    return interpretation;
  }
  
};

module.exports = simplexController;