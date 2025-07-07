/**
 * Enhanced Simplex method implementation that captures all steps for frontend display
 */
class SimplexModelEnhanced {
  constructor() {
    this.steps = []
  }

  /**
   * Add a step to the steps array for frontend display
   */
  addStep(type, title, data = null, message = null, additionalInfo = {}) {
    this.steps.push({
      type,
      title,
      data: data ? JSON.parse(JSON.stringify(data)) : null,
      message,
      ...additionalInfo,
    })
  }

  /**
   * Solve a linear programming problem using the simplex method
   */
  solve(problem) {
    this.steps = [] // Reset steps for new problem

    this.addStep(
      "info",
      "📊 Démarrage du Solveur Simplex",
      null,
      `Problème à résoudre: ${JSON.stringify(problem, null, 2)}`,
    )

    const { objective, objectiveType = "max", constraints } = problem

    // Standard form conversion
    const standardForm = this.convertToStandardForm(objective, objectiveType, constraints)

    // Use the simplex algorithm to solve the standard form
    const solution = this.simplexAlgorithm(standardForm)

    this.addStep("result", "✅ Solution Finale", null, null, {
      solution: solution,
    })

    return {
      solution,
      steps: this.steps,
    }
  }

  /**
   * Convert the problem to standard form for simplex method
   */
  convertToStandardForm(objective, objectiveType, constraints) {
    let standardObjective = [...objective]

    if (objectiveType === "min") {
      standardObjective = standardObjective.map((c) => -c)
      this.addStep(
        "info",
        "📝 Conversion MIN vers MAX",
        null,
        `Négation de la fonction objectif: [${standardObjective.join(", ")}]`,
      )
    }

    const standardConstraints = []
    let artificialVariablesCount = 0
    let slackVariablesCount = 0
    let surplusVariablesCount = 0

    constraints.forEach((constraint, index) => {
      const { coefficients, type, rhs } = constraint

      switch (type) {
        case "<=":
          standardConstraints.push({
            ...constraint,
            originalIndex: index,
            standardCoefficients: [...coefficients],
            slackIndex: slackVariablesCount++,
            standardRhs: rhs,
          })
          break

        case ">=":
          standardConstraints.push({
            ...constraint,
            originalIndex: index,
            standardCoefficients: [...coefficients],
            surplusIndex: surplusVariablesCount++,
            artificialIndex: artificialVariablesCount++,
            standardRhs: rhs,
          })
          break

        case "=":
          standardConstraints.push({
            ...constraint,
            originalIndex: index,
            standardCoefficients: [...coefficients],
            artificialIndex: artificialVariablesCount++,
            standardRhs: rhs,
          })
          break
      }
    })

    return {
      objective: standardObjective,
      objectiveType,
      constraints: standardConstraints,
      original: {
        objective,
        objectiveType,
        constraints,
      },
      counts: {
        artificialVariables: artificialVariablesCount,
        slackVariables: slackVariablesCount,
        surplusVariables: surplusVariablesCount,
        originalVariables: objective.length,
      },
    }
  }

  /**
   * Implement the simplex algorithm
   */
  simplexAlgorithm(standardForm) {
    const { objective, constraints, counts, original } = standardForm
    const numOriginalVars = counts.originalVariables

    // Create initial tableau
    const tableau = this.createInitialTableau(standardForm)

    // Check if artificial variables exist and do Phase 1 if needed
    const hasArtificialVars = counts.artificialVariables > 0

    if (hasArtificialVars) {
      this.addStep("phase", "🔍 Démarrage Phase 1", null, "Variables artificielles présentes")
      this.phaseOne(tableau, standardForm)
    }

    // Phase 2: Regular simplex algorithm
    this.addStep("phase", "🔍 Démarrage Phase 2", null, "Simplex Standard")
    this.phaseTwo(tableau, standardForm)

    // Extract solution
    const solution = {}

    // Get values for original variables
    for (let i = 0; i < numOriginalVars; i++) {
      let value = 0
      let isBasic = false

      // Check if this variable is basic
      const column = tableau.map((row) => row[i])
      const onePositions = column.reduce((positions, val, idx) => {
        if (val === 1) positions.push(idx)
        return positions
      }, [])

      // If exactly one 1 and rest are 0s, this is a basic variable
      if (onePositions.length === 1 && column.filter((v) => v !== 0 && v !== 1).length === 0) {
        const basicRowIndex = onePositions[0]
        value = tableau[basicRowIndex][tableau[0].length - 1]
        isBasic = true
      }

      solution[`x${i + 1}`] = value
    }

    // Get objective value (z)
    const objectiveRow = tableau[tableau.length - 1]
    let objectiveValue = objectiveRow[objectiveRow.length - 1]

    // Adjust for minimization problem
    if (original.objectiveType === "min") {
      objectiveValue = -objectiveValue
    }

    solution.Z = objectiveValue

    return solution
  }

  /**
   * Create the initial tableau for the simplex method
   */
  createInitialTableau(standardForm) {
    const { objective, constraints, counts } = standardForm
    const numOriginalVars = counts.originalVariables
    const numSlackVars = counts.slackVariables
    const numSurplusVars = counts.surplusVariables
    const numArtificialVars = counts.artificialVariables

    // Total number of variables (excluding z)
    const totalVars = numOriginalVars + numSlackVars + numSurplusVars + numArtificialVars

    // Initialize tableau
    const tableau = []

    // Add constraint rows to tableau
    constraints.forEach((constraint) => {
      const { standardCoefficients, standardRhs, type } = constraint

      // Start with original coefficients
      const row = [...standardCoefficients]

      // Add slack/surplus/artificial variables
      for (let i = 0; i < numSlackVars + numSurplusVars + numArtificialVars; i++) {
        row.push(0)
      }

      // Set appropriate variable coefficients
      if (type === "<=") {
        // Add slack variable (coefficient 1)
        row[numOriginalVars + constraint.slackIndex] = 1
      } else if (type === ">=") {
        // Add surplus variable (coefficient -1)
        row[numOriginalVars + constraint.surplusIndex] = -1
        // Add artificial variable (coefficient 1)
        row[numOriginalVars + numSlackVars + numSurplusVars + constraint.artificialIndex] = 1
      } else if (type === "=") {
        // Add artificial variable (coefficient 1)
        row[numOriginalVars + numSlackVars + numSurplusVars + constraint.artificialIndex] = 1
      }

      // Add RHS
      row.push(standardRhs)

      tableau.push(row)
    })

    // Add objective row
    const objectiveRow = [...objective.map((c) => -c)] // Negate for standard form

    // Add zeroes for slack/surplus/artificial variables
    for (let i = 0; i < numSlackVars + numSurplusVars + numArtificialVars; i++) {
      objectiveRow.push(0)
    }

    // Add RHS (initially 0)
    objectiveRow.push(0)

    tableau.push(objectiveRow)

    this.addStep("tableau", "📊 Tableau Initial", tableau)

    return tableau
  }

  /**
   * Perform Phase I of the simplex method
   */
  phaseOne(tableau, standardForm) {
    const { counts } = standardForm
    const numOriginalVars = counts.originalVariables
    const numSlackVars = counts.slackVariables
    const numSurplusVars = counts.surplusVariables
    const numArtificialVars = counts.artificialVariables

    if (numArtificialVars === 0) {
      return
    }

    // Create auxiliary objective row for Phase I
    const auxiliaryRow = new Array(tableau[0].length).fill(0)

    // Find rows with artificial variables and sum them
    standardForm.constraints.forEach((constraint, rowIndex) => {
      if (constraint.type === ">=" || constraint.type === "=") {
        // Sum the row with a negative sign
        for (let j = 0; j < tableau[rowIndex].length; j++) {
          auxiliaryRow[j] -= tableau[rowIndex][j]
        }
      }
    })

    // Set artificial variable coefficients to zero in auxiliary row
    for (let i = 0; i < numArtificialVars; i++) {
      const colIndex = numOriginalVars + numSlackVars + numSurplusVars + i
      auxiliaryRow[colIndex] = 0
    }

    // Replace the objective row with the auxiliary row for Phase I
    const originalObjectiveRow = [...tableau[tableau.length - 1]]
    tableau[tableau.length - 1] = auxiliaryRow

    this.addStep("tableau", "📊 Phase I - Tableau Auxiliaire Initial", tableau)

    // Perform simplex iterations for Phase I
    let iteration = 0
    const maxIterations = 100

    while (iteration < maxIterations) {
      iteration++

      // Find entering variable
      const objectiveRow = tableau[tableau.length - 1]
      const enteringCol = this.findEnteringColumn(objectiveRow)

      if (enteringCol === -1) {
        this.addStep("info", "✅ Phase I Terminée", null, "Solution optimale trouvée")
        break
      }

      // Find leaving variable
      const leavingRow = this.findLeavingRow(tableau, enteringCol)

      if (leavingRow === -1) {
        this.addStep("info", "⚠️ Phase I - Solution Non Bornée", null)
        break
      }

      // Pivot
      this.addStep("pivot", `📊 Phase I - Itération ${iteration}`, null, null, {
        iteration,
        phase: "Phase I",
        pivotInfo: {
          row: leavingRow,
          col: enteringCol,
          value: tableau[leavingRow][enteringCol],
        },
      })

      this.pivot(tableau, leavingRow, enteringCol)

      this.addStep("tableau", `Tableau après Pivot - Phase I Itération ${iteration}`, tableau)
    }

    // Check for feasibility
    if (Math.abs(tableau[tableau.length - 1][tableau[0].length - 1]) > 1e-10) {
      this.addStep("info", "⚠️ Problème Non Réalisable", null, "Variables artificielles restent dans la base")
    }

    // Restore original objective row for Phase II
    // Remove artificial variables from the tableau
    const newTableau = []

    // Copy constraint rows, excluding artificial variable columns
    for (let i = 0; i < tableau.length - 1; i++) {
      const newRow = []
      for (let j = 0; j < tableau[i].length; j++) {
        // Skip artificial variable columns
        if (
          j >= numOriginalVars + numSlackVars + numSurplusVars &&
          j < numOriginalVars + numSlackVars + numSurplusVars + numArtificialVars
        ) {
          continue
        }
        newRow.push(tableau[i][j])
      }
      newTableau.push(newRow)
    }

    // Add back the original objective row (excluding artificial variables)
    const newObjectiveRow = []
    for (let j = 0; j < originalObjectiveRow.length; j++) {
      // Skip artificial variable columns
      if (
        j >= numOriginalVars + numSlackVars + numSurplusVars &&
        j < numOriginalVars + numSlackVars + numSurplusVars + numArtificialVars
      ) {
        continue
      }
      newObjectiveRow.push(originalObjectiveRow[j])
    }
    newTableau.push(newObjectiveRow)

    // Update tableau for Phase II
    for (let i = 0; i < newTableau.length; i++) {
      tableau[i] = [...newTableau[i]]
    }

    // Ensure objective row is in proper form before Phase II
    this.updateObjectiveRowForPhaseII(tableau)

    this.addStep("tableau", "📊 Tableau Préparé pour Phase II", tableau)
  }

  /**
   * Update the objective row for Phase II
   */
  updateObjectiveRowForPhaseII(tableau) {
    const objectiveRowIndex = tableau.length - 1

    // For each column
    for (let j = 0; j < tableau[0].length - 1; j++) {
      // If this column is a basic variable for some row
      const basicRowIndex = this.findBasicVariableRow(tableau, j)

      if (basicRowIndex !== -1 && tableau[objectiveRowIndex][j] !== 0) {
        // Update objective row
        const coefficientToEliminate = tableau[objectiveRowIndex][j]

        for (let k = 0; k < tableau[0].length; k++) {
          tableau[objectiveRowIndex][k] -= coefficientToEliminate * tableau[basicRowIndex][k]
        }
      }
    }
  }

  /**
   * Find the row where the given column is a basic variable
   */
  findBasicVariableRow(tableau, col) {
    let oneCount = 0
    let oneRowIndex = -1

    for (let i = 0; i < tableau.length - 1; i++) {
      if (tableau[i][col] === 1) {
        oneCount++
        oneRowIndex = i
      } else if (tableau[i][col] !== 0) {
        return -1 // Not a basic variable column
      }
    }

    return oneCount === 1 ? oneRowIndex : -1
  }

  /**
   * Perform Phase II of the simplex method
   */
  phaseTwo(tableau, standardForm) {
    let iteration = 0
    const maxIterations = 100

    while (iteration < maxIterations) {
      iteration++

      // Find entering variable
      const objectiveRow = tableau[tableau.length - 1]
      const enteringCol = this.findEnteringColumn(objectiveRow)

      if (enteringCol === -1) {
        this.addStep("info", "✅ Phase II Terminée", null, "Solution optimale trouvée")
        break
      }

      // Find leaving variable
      const leavingRow = this.findLeavingRow(tableau, enteringCol)

      if (leavingRow === -1) {
        this.addStep("info", "⚠️ Phase II - Solution Non Bornée", null)
        break
      }

      // Pivot
      this.addStep("pivot", `📊 Phase II - Itération ${iteration}`, null, null, {
        iteration,
        phase: "Phase II",
        pivotInfo: {
          row: leavingRow,
          col: enteringCol,
          value: tableau[leavingRow][enteringCol],
        },
      })

      this.pivot(tableau, leavingRow, enteringCol)

      this.addStep("tableau", `Tableau après Pivot - Phase II Itération ${iteration}`, tableau)
    }

    if (iteration >= maxIterations) {
      this.addStep("info", "⚠️ Nombre Maximum d'Itérations Atteint", null, "La solution peut ne pas être optimale")
    }
  }

  /**
   * Find the entering column index for simplex iteration
   */
  findEnteringColumn(objectiveRow) {
    let minCoeff = -1e-10
    let minIndex = -1

    for (let i = 0; i < objectiveRow.length - 1; i++) {
      if (objectiveRow[i] < minCoeff) {
        minCoeff = objectiveRow[i]
        minIndex = i
      }
    }

    return minIndex
  }

  /**
   * Find the leaving row index for simplex iteration
   */
  findLeavingRow(tableau, enteringCol) {
    let minRatio = Number.POSITIVE_INFINITY
    let minIndex = -1

    const rhsCol = tableau[0].length - 1

    for (let i = 0; i < tableau.length - 1; i++) {
      if (tableau[i][enteringCol] > 0) {
        const ratio = tableau[i][rhsCol] / tableau[i][enteringCol]

        if (ratio < minRatio) {
          minRatio = ratio
          minIndex = i
        }
      }
    }

    return minIndex
  }

  /**
   * Perform pivot operation on the tableau
   */
  pivot(tableau, pivotRow, pivotCol) {
    const pivotElement = tableau[pivotRow][pivotCol]

    // Normalize pivot row
    for (let j = 0; j < tableau[pivotRow].length; j++) {
      tableau[pivotRow][j] /= pivotElement
    }

    // Update all other rows
    for (let i = 0; i < tableau.length; i++) {
      if (i !== pivotRow) {
        const factor = tableau[i][pivotCol]

        for (let j = 0; j < tableau[i].length; j++) {
          tableau[i][j] -= factor * tableau[pivotRow][j]
        }
      }
    }
  }
}

// Export for use in Node.js backend
if (typeof module !== "undefined" && module.exports) {
  module.exports = SimplexModelEnhanced
}
