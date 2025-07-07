

import type { LinearProgrammingProblem, SolverResult } from "./types"

export async function solveLinearProgrammingProblem(problem: LinearProgrammingProblem): Promise<SolverResult> {
  try {
    console.log("Sending problem to API:", problem)

    const response = await fetch("http://localhost:3003/api/solve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(problem),
    })

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`)
    }

    const apiResponse = await response.json()
    console.log("Received result from API:", apiResponse)

    // Extraire les données de la réponse API
    const apiData = apiResponse.data || apiResponse

    return {
      status: "success",
      data: {
        x1: apiData.solution?.x1 || 0,
        x2: apiData.solution?.x2 || 0,
        x3: apiData.solution?.x3 || 0,
        Z: apiData.solution?.Z || 0,
      },
      solution: apiData.solution || {
        x1: 0,
        x2: 0,
        x3: 0,
        Z: 0,
      },
      steps: apiData.steps || [],
    }
  } catch (error) {
    console.error("Error solving linear programming problem:", error)
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Une erreur inconnue s'est produite",
      data: { x1: 0, x2: 0, x3: 0, Z: 0 },
      solution: { x1: 0, x2: 0, x3: 0, Z: 0 },
      steps: [],
    }
  }
}
