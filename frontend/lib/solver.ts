

// import type { LinearProgrammingProblem, SolverResult } from "./types"

// export async function solveLinearProgrammingProblem(problem: LinearProgrammingProblem): Promise<SolverResult> {
//   try {
//     console.log("Sending problem to API:", problem)

//     const response = await fetch("http://localhost:3003/api/solve", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(problem),
//     })

//     if (!response.ok) {
//       throw new Error(`API request failed with status: ${response.status}`)
//     }

//     const apiResponse = await response.json()
//     console.log("Received result from API:", apiResponse)

//     // Extraire les données de la réponse API
//     const apiData = apiResponse.data || apiResponse

//     return {
//       status: "success",
//       data: {
//         x1: apiData.solution?.x1 || 0,
//         x2: apiData.solution?.x2 || 0,
//         x3: apiData.solution?.x3 || 0,
//         Z: apiData.solution?.Z || 0,
//       },
//       solution: apiData.solution || {
//         x1: 0,
//         x2: 0,
//         x3: 0,
//         Z: 0,
//       },
//       steps: apiData.steps || [],
//     }
//   } catch (error) {
//     console.error("Error solving linear programming problem:", error)
//     return {
//       status: "error",
//       message: error instanceof Error ? error.message : "Une erreur inconnue s'est produite",
//       data: { x1: 0, x2: 0, x3: 0, Z: 0 },
//       solution: { x1: 0, x2: 0, x3: 0, Z: 0 },
//       steps: [],
//     }
//   }
// }

























// import type { LinearProgrammingProblem, SolverResult } from "./types"

// export async function solveLinearProgrammingProblem(problem: LinearProgrammingProblem): Promise<SolverResult> {
//   try {
//     console.log("Sending problem to API:", problem)

//     const response = await fetch("http://localhost:3003/api/solve", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(problem),
//     })

//     if (!response.ok) {
//       throw new Error(`API request failed with status: ${response.status}`)
//     }

//     const apiResponse = await response.json()
//     console.log("Received result from API:", apiResponse)

//     // Fonction pour convertir les valeurs en nombres
//     const parseSolutionValue = (value: any): number => {
//       if (typeof value === 'number') return value;
//       if (typeof value === 'string') {
//         // Gestion des fractions comme "7/5"
//         if (value.includes('/')) {
//           const [numerator, denominator] = value.split('/').map(Number);
//           if (!isNaN(numerator) && !isNaN(denominator)) {  // Parenthèse fermante ajoutée ici
//             return numerator / denominator;
//           }
//         }
//         // Conversion directe
//         const num = Number(value);
//         return isNaN(num) ? 0 : num;
//       }
//       return 0;
//     };

//     // Extraire les données de la réponse API
//     const apiData = apiResponse.data || apiResponse

//     return {
//       status: "success",
//       data: {
//         x1: parseSolutionValue(apiData.solution?.x1),
//         x2: parseSolutionValue(apiData.solution?.x2),
//         x3: parseSolutionValue(apiData.solution?.x3),
//         Z: parseSolutionValue(apiData.solution?.Z),
//       },
//       solution: {
//         x1: parseSolutionValue(apiData.solution?.x1),
//         x2: parseSolutionValue(apiData.solution?.x2),
//         x3: parseSolutionValue(apiData.solution?.x3),
//         Z: parseSolutionValue(apiData.solution?.Z),
//       },
//       steps: apiData.steps || [],
//     }
//   } catch (error) {
//     console.error("Error solving linear programming problem:", error)
//     return {
//       status: "error",
//       message: error instanceof Error ? error.message : "Une erreur inconnue s'est produite",
//       data: { x1: 0, x2: 0, x3: 0, Z: 0 },
//       solution: { x1: 0, x2: 0, x3: 0, Z: 0 },
//       steps: [],
//     }
//   }
// }





















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
        x1: apiData.solution?.x1 || "0",
        x2: apiData.solution?.x2 || "0",
        x3: apiData.solution?.x3 || "0",
        Z: apiData.solution?.Z || "0",
      },
      solution: apiData.solution || {
        x1: "0",
        x2: "0",
        x3: "0",
        Z: "0",
      },
      steps: apiData.steps || [],
    }
  } catch (error) {
    console.error("Error solving linear programming problem:", error)
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Une erreur inconnue s'est produite",
      data: { x1: "0", x2: "0", x3: "0", Z: "0" },
      solution: { x1: "0", x2: "0", x3: "0", Z: "0" },
      steps: [],
    }
  }
}