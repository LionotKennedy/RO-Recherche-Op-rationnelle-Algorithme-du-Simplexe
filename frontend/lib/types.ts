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

// Dans vos types (types.ts)
export interface SolverStep {
  phase: string;
  iteration?: number;
  message: string;
  tableau?: number[][];
  pivot?: {
    row: number;
    col: number;
    value: number;
  };
}

export interface SolverResult {
  // status: "success" | "error";
  message?: string; // Ajoutez cette ligne pour rendre la propriété optionnelle
  data: {
    x1: number;
    x2: number;
    x3: number;
    Z: number;
  };
  solution: {
    x1: number;
    x2: number;
    x3: number;
    Z: number;
  };
  steps: SolverStep[];
}