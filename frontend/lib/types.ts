// // Types for the Linear Programming Solver

// export interface Coefficient {
//   value: number;
//   variable: string;
// }

// export interface Constraint {
//   coefficients: number[];
//   type: ">=" | "<=" | "=";
//   rhs: number;
// }

// export interface ObjectiveFunction {
//   coefficients: number[];
//   type: "min" | "max";
// }

// export interface LinearProgrammingProblem {
//   objective: number[];
//   objectiveType: "min" | "max";
//   constraints: Constraint[];
// }

// export interface SolverResult {
//   status: string;
//   data: {
//     x1: number;
//     x2: number;
//     x3: number;  // Ajout de x3
//     Z: number;
//   };
// }

// // Dans vos types (types.ts)
// export interface SolverStep {
//   phase: string;
//   iteration?: number;
//   message: string;
//   tableau?: number[][];
//   pivot?: {
//     row: number;
//     col: number;
//     value: number;
//   };
// }

// export interface SolverResult {
//   status: string;
//   message?: string;
//   data: {
//     x1: number;
//     x2: number;
//     x3: number;
//     Z: number;
//   };
//   solution: {
//     x1: number | string;
//     x2: number | string;
//     x3: number | string;
//     Z: number | string;
//   };
//   steps: SolverStep[];
// }




























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

export interface SolverStep {
  phase: string;
  iteration?: number;
  message: string;
  tableau?: number[][];
  pivot?: {
    row: number;
    col: number;
    value: number | string;
  };
}

export interface SolverResult {
  status: string;
  message?: string;
  data: {
    x1: string;
    x2: string;
    x3: string;
    Z: string;
  };
  solution: {
    x1: string;
    x2: string;
    x3: string;
    Z: string;
  };
  steps: SolverStep[];
}