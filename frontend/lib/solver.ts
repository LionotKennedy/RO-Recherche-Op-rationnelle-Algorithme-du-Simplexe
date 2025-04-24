import { LinearProgrammingProblem, SolverResult } from "./types";

export async function solveLinearProgrammingProblem(
  problem: LinearProgrammingProblem
): Promise<SolverResult> {
  try {
    const response = await fetch("http://localhost:3003/api/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(problem),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error solving linear programming problem:", error);
    throw error;
  }
}