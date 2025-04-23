/**
 * Utility functions for validating simplex solver inputs
 */

/**
 * Validate the objective function
 * @param {Array} objective - Objective function coefficients
 * @returns {Object} - Validation result
 */
const validateObjective = (objective) => {
  if (!objective) {
    return { isValid: false, message: 'Objective function is required' };
  }

  if (!Array.isArray(objective)) {
    return { isValid: false, message: 'Objective function must be an array' };
  }

  if (objective.length === 0) {
    return { isValid: false, message: 'Objective function cannot be empty' };
  }

  if (!objective.every(coef => typeof coef === 'number')) {
    return { isValid: false, message: 'All objective coefficients must be numbers' };
  }

  return { isValid: true };
};

/**
 * Validate the objectiveType
 * @param {String} objectiveType - 'max' or 'min'
 * @returns {Object} - Validation result
 */
const validateObjectiveType = (objectiveType) => {
  if (!objectiveType) {
    return { isValid: true, value: 'max' }; // Default to max
  }

  if (typeof objectiveType !== 'string') {
    return { isValid: false, message: 'Objective type must be a string' };
  }

  const type = objectiveType.toLowerCase();
  if (type !== 'max' && type !== 'min') {
    return { isValid: false, message: 'Objective type must be "max" or "min"' };
  }

  return { isValid: true, value: type };
};

/**
 * Validate constraints
 * @param {Array} constraints - Array of constraint objects
 * @param {Number} numVars - Number of variables in the objective function
 * @returns {Object} - Validation result
 */
const validateConstraints = (constraints, numVars) => {
  if (!constraints) {
    return { isValid: false, message: 'Constraints are required' };
  }

  if (!Array.isArray(constraints)) {
    return { isValid: false, message: 'Constraints must be an array' };
  }

  if (constraints.length === 0) {
    return { isValid: false, message: 'At least one constraint is required' };
  }

  for (let i = 0; i < constraints.length; i++) {
    const constraint = constraints[i];
    
    // Check coefficients
    if (!constraint.coefficients || !Array.isArray(constraint.coefficients)) {
      return { 
        isValid: false, 
        message: `Constraint ${i+1} must have coefficients as an array` 
      };
    }
    
    if (constraint.coefficients.length !== numVars) {
      return { 
        isValid: false, 
        message: `Constraint ${i+1} coefficients length (${constraint.coefficients.length}) must match the number of variables (${numVars})` 
      };
    }
    
    if (!constraint.coefficients.every(coef => typeof coef === 'number')) {
      return { 
        isValid: false, 
        message: `All coefficients in constraint ${i+1} must be numbers` 
      };
    }
    
    // Check type
    if (!constraint.type) {
      return { 
        isValid: false, 
        message: `Constraint ${i+1} must have a type` 
      };
    }
    
    if (!['<=', '>=', '='].includes(constraint.type)) {
      return { 
        isValid: false, 
        message: `Constraint ${i+1} type must be "<=", ">=" or "="` 
      };
    }
    
    // Check RHS
    if (constraint.rhs === undefined || constraint.rhs === null) {
      return { 
        isValid: false, 
        message: `Constraint ${i+1} must have a right-hand side (rhs) value` 
      };
    }
    
    if (typeof constraint.rhs !== 'number') {
      return { 
        isValid: false, 
        message: `Right-hand side value for constraint ${i+1} must be a number` 
      };
    }
  }

  return { isValid: true };
};

module.exports = {
  validateObjective,
  validateObjectiveType,
  validateConstraints
};