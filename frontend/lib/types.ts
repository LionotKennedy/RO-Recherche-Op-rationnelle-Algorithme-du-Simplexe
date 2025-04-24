// Types for the Linear Programming Solver

export interface Coefficient {
  value: number;
  variable: string;
}

export interface Constraint {
  coefficients: number[];
  type: ">=" | "<=" | "=";
  rhs: number;
}

export interface ObjectiveFunction {
  coefficients: number[];
  type: "min" | "max";
}

export interface LinearProgrammingProblem {
  objective: number[];
  objectiveType: "min" | "max";
  constraints: Constraint[];
}

export interface SolverResult {
  status: string;
  data: {
    x1: number;
    x2: number;
    x3: number;  // Ajout de x3
    Z: number;
  };
}