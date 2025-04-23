/**
 * Example linear programming problems for testing
 */
const exampleProblems = {
  example1: {
    description: "Maximization problem with <= constraints",
    problem: {
      objective: [420, 510, 360],
      objectiveType: "max",
      constraints: [
        { coefficients: [1500, 1800, 1050], type: "<=", rhs: 63000 },
        { coefficients: [18, 27, 15], type: "<=", rhs: 840 },
        { coefficients: [1, 1, 1], type: "<=", rhs: 40 }
      ]
    }
  },
  
  example2: {
    description: "Maximization problem with various constraint types",
    problem: {
      objective: [25, 60, 30],
      objectiveType: "max",
      constraints: [
        { coefficients: [1, 4, 4], type: "<=", rhs: 20 },
        { coefficients: [1, 2, 0], type: "<=", rhs: 6 },
        { coefficients: [2, 5, 4], type: "<=", rhs: 14 }
      ]
    }
  },
  
  example3: {
    description: "Maximization problem with variable bounds",
    problem: {
      objective: [60, 40, 80],
      objectiveType: "max",
      constraints: [
        { coefficients: [35, 45, 20], type: "<=", rhs: 200 },
        { coefficients: [1, 0, 0], type: "<=", rhs: 4900 },
        { coefficients: [0, 1, 0], type: "<=", rhs: 5400 },
        { coefficients: [0, 0, 1], type: "<=", rhs: 2000 }
      ]
    }
  },
  
  example4: {
    description: "Minimization problem with >= constraints",
    problem: {
      objective: [25, 41, 39],
      objectiveType: "min",
      constraints: [
        { coefficients: [0.12, 0.52, 0.42], type: ">=", rhs: 0.22 },
        { coefficients: [0.02, 0.02, 0.10], type: ">=", rhs: 0.036 }
      ]
    }
  },
  
  example5: {
    description: "Mixed constraints problem with equality",
    problem: {
      objective: [12, 36, 10],
      objectiveType: "min",
      constraints: [
        { coefficients: [1, 1, 1], type: "=", rhs: 250 },
        { coefficients: [1000, 2000, 6000], type: ">=", rhs: 2200 },
        { coefficients: [1000, 2000, 6000], type: "<=", rhs: 2600 },
        { coefficients: [7, 0.5, 2], type: "<=", rhs: 3 },
        { coefficients: [0, 0, 1], type: "<=", rhs: 0.28 }
      ]
    }
  },
  
  example6: {
    description: "Problem with negative coefficients",
    problem: {
      objective: [5, -2, 3],
      objectiveType: "max",
      constraints: [
        { coefficients: [2, 2, -1], type: ">=", rhs: 2 },
        { coefficients: [3, -4, 0], type: "<=", rhs: 3 },
        { coefficients: [0, 1, 3], type: "<=", rhs: 5 }
      ]
    }
  }
};

module.exports = exampleProblems;