/**
 * Simplex method implementation for solving linear programming problems
 */
class SimplexModel {
  constructor() {
    this.steps = []; // Pour stocker les étapes du calcul
  }

  /**
   * Solve a linear programming problem using the simplex method
   * @param {Object} problem - The linear programming problem
   * @param {Array} problem.objective - Coefficients of the objective function
   * @param {String} problem.objectiveType - Type of objective function ('max' or 'min')
   * @param {Array} problem.constraints - Array of constraint objects
   * @returns {Object} - Solution to the problem with steps
   */
  solve(problem) {
    this.steps = []; // Réinitialiser les étapes
    this.steps.push({
      phase: "Initial",
      message: "Démarrage du solveur Simplex",
    });

    console.log("\n📊 Starting Simplex Solver...");
    console.log("Problem to solve:", JSON.stringify(problem, null, 2));

    const { objective, objectiveType = "max", constraints } = problem;

    // Standard form conversion
    const standardForm = this.convertToStandardForm(
      objective,
      objectiveType,
      constraints
    );

    this.steps.push({
      phase: "Initial",
      message: "Problème converti en forme standard",
      tableau: this.createInitialTableau(standardForm),
    });

    // Use the simplex algorithm to solve the standard form
    const solution = this.simplexAlgorithm(standardForm);

    // Print the solution
    console.log("\n✅ Final Solution:");
    console.table(solution);

    return {
      solution,
      steps: this.steps,
    };
  }

  /**
   * Convert the problem to standard form for simplex method
   * @param {Array} objective - Objective function coefficients
   * @param {String} objectiveType - 'max' or 'min'
   * @param {Array} constraints - Array of constraint objects
   * @returns {Object} - Problem in standard form
   */
  convertToStandardForm(objective, objectiveType, constraints) {
    // Clone objective to avoid mutation
    let standardObjective = [...objective];

    // Handle minimization problems (convert to maximization)
    if (objectiveType === "min") {
      standardObjective = standardObjective.map((c) => -c);
      console.log(
        "📝 Converting MIN problem to MAX by negating objective:",
        standardObjective
      );

      this.steps.push({
        phase: "Initial",
        message:
          "Conversion de problème MIN en MAX par négation de la fonction objective",
      });
    }

    // Process constraints
    const standardConstraints = [];
    let artificialVariablesCount = 0;
    let slackVariablesCount = 0;
    let surplusVariablesCount = 0;

    constraints.forEach((constraint, index) => {
      const { coefficients, type, rhs } = constraint;

      // Handle different constraint types
      switch (type) {
        case "<=":
          // Add slack variable (standard form)
          standardConstraints.push({
            ...constraint,
            originalIndex: index,
            standardCoefficients: [...coefficients],
            slackIndex: slackVariablesCount++,
            standardRhs: rhs,
          });
          break;

        case ">=":
          // Add surplus variable and artificial variable
          standardConstraints.push({
            ...constraint,
            originalIndex: index,
            standardCoefficients: [...coefficients],
            surplusIndex: surplusVariablesCount++,
            artificialIndex: artificialVariablesCount++,
            standardRhs: rhs,
          });
          break;

        case "=":
          // Add artificial variable
          standardConstraints.push({
            ...constraint,
            originalIndex: index,
            standardCoefficients: [...coefficients],
            artificialIndex: artificialVariablesCount++,
            standardRhs: rhs,
          });
          break;
      }
    });

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
    };
  }

  /**
   * Implement the simplex algorithm
   * @param {Object} standardForm - Problem in standard form
   * @returns {Object} - Solution to the problem
   */
  simplexAlgorithm(standardForm) {
    const { objective, constraints, counts, original } = standardForm;
    const numOriginalVars = counts.originalVariables;

    // Create initial tableau
    const tableau = this.createInitialTableau(standardForm);

    this.steps.push({
      phase: "Initial",
      message: "Tableau initial créé",
      tableau: JSON.parse(JSON.stringify(tableau)),
    });

    // Check if artificial variables exist and do Phase 1 if needed
    const hasArtificialVars = counts.artificialVariables > 0;

    if (hasArtificialVars) {
      console.log("\n🔍 Starting Phase 1 (Artificial Variables Present)");
      this.steps.push({
        phase: "Phase I",
        message: "Démarrage de la Phase I (variables artificielles présentes)",
      });

      this.phaseOne(tableau, standardForm);
    }

    // Phase 2: Regular simplex algorithm
    console.log("\n🔍 Starting Phase 2 (Standard Simplex)");
    this.steps.push({
      phase: "Phase II",
      message: "Démarrage de la Phase II (simplex standard)",
    });

    this.phaseTwo(tableau, standardForm);

    // Extract solution
    const solution = {};

    // Get values for original variables
    for (let i = 0; i < numOriginalVars; i++) {
      let value = 0;
      let isBasic = false;

      // Check if this variable is basic
      const column = tableau.map((row) => row[i]);
      const onePositions = column.reduce((positions, val, idx) => {
        if (val === 1) positions.push(idx);
        return positions;
      }, []);

      // If exactly one 1 and rest are 0s, this is a basic variable
      if (
        onePositions.length === 1 &&
        column.filter((v) => v !== 0 && v !== 1).length === 0
      ) {
        const basicRowIndex = onePositions[0];
        value = tableau[basicRowIndex][tableau[0].length - 1];
        isBasic = true;
      }

      solution[`x${i + 1}`] = value;
    }

    // Get objective value (z)
    const objectiveRow = tableau[tableau.length - 1];
    let objectiveValue = objectiveRow[objectiveRow.length - 1];

    // Adjust for minimization problem
    if (original.objectiveType === "min") {
      objectiveValue = -objectiveValue;
    }

    solution.Z = objectiveValue;

    return solution;
  }

  /**
   * Create the initial tableau for the simplex method
   * @param {Object} standardForm - Problem in standard form
   * @returns {Array} - Initial tableau
   */
  createInitialTableau(standardForm) {
    const { objective, constraints, counts } = standardForm;
    const numOriginalVars = counts.originalVariables;
    const numSlackVars = counts.slackVariables;
    const numSurplusVars = counts.surplusVariables;
    const numArtificialVars = counts.artificialVariables;

    // Total number of variables (excluding z)
    const totalVars =
      numOriginalVars + numSlackVars + numSurplusVars + numArtificialVars;

    // Initialize tableau
    const tableau = [];

    // Add constraint rows to tableau
    constraints.forEach((constraint) => {
      const { standardCoefficients, standardRhs, type } = constraint;

      // Start with original coefficients
      const row = [...standardCoefficients];

      // Add slack/surplus/artificial variables
      for (
        let i = 0;
        i < numSlackVars + numSurplusVars + numArtificialVars;
        i++
      ) {
        row.push(0);
      }

      // Set appropriate variable coefficients
      if (type === "<=") {
        // Add slack variable (coefficient 1)
        row[numOriginalVars + constraint.slackIndex] = 1;
      } else if (type === ">=") {
        // Add surplus variable (coefficient -1)
        row[numOriginalVars + constraint.surplusIndex] = -1;
        // Add artificial variable (coefficient 1)
        row[
          numOriginalVars +
            numSlackVars +
            numSurplusVars +
            constraint.artificialIndex
        ] = 1;
      } else if (type === "=") {
        // Add artificial variable (coefficient 1)
        row[
          numOriginalVars +
            numSlackVars +
            numSurplusVars +
            constraint.artificialIndex
        ] = 1;
      }

      // Add RHS
      row.push(standardRhs);

      tableau.push(row);
    });

    // Add objective row
    const objectiveRow = [...objective.map((c) => -c)]; // Negate for standard form

    // Add zeroes for slack/surplus/artificial variables
    for (
      let i = 0;
      i < numSlackVars + numSurplusVars + numArtificialVars;
      i++
    ) {
      objectiveRow.push(0);
    }

    // Add RHS (initially 0)
    objectiveRow.push(0);

    tableau.push(objectiveRow);

    console.log("\n📊 Initial Tableau:");
    this.printTableau(tableau);

    return tableau;
  }

  /**
   * Perform Phase I of the simplex method (handling artificial variables)
   * @param {Array} tableau - Current tableau
   * @param {Object} standardForm - Problem in standard form
   */
  phaseOne(tableau, standardForm) {
    const { counts } = standardForm;
    const numOriginalVars = counts.originalVariables;
    const numSlackVars = counts.slackVariables;
    const numSurplusVars = counts.surplusVariables;
    const numArtificialVars = counts.artificialVariables;

    if (numArtificialVars === 0) {
      return; // No artificial variables, skip Phase I
    }

    // Create auxiliary objective row for Phase I
    const auxiliaryRow = new Array(tableau[0].length).fill(0);

    // Find rows with artificial variables and sum them
    standardForm.constraints.forEach((constraint, rowIndex) => {
      if (constraint.type === ">=" || constraint.type === "=") {
        // Sum the row with a negative sign
        for (let j = 0; j < tableau[rowIndex].length; j++) {
          auxiliaryRow[j] -= tableau[rowIndex][j];
        }
      }
    });

    // Set artificial variable coefficients to zero in auxiliary row
    for (let i = 0; i < numArtificialVars; i++) {
      const colIndex = numOriginalVars + numSlackVars + numSurplusVars + i;
      auxiliaryRow[colIndex] = 0;
    }

    // Replace the objective row with the auxiliary row for Phase I
    const originalObjectiveRow = [...tableau[tableau.length - 1]];
    tableau[tableau.length - 1] = auxiliaryRow;

    console.log("\n📊 Phase I - Initial Auxiliary Tableau:");
    this.printTableau(tableau);

    this.steps.push({
      phase: "Phase I",
      message: "Tableau auxiliaire initial pour la Phase I",
      tableau: JSON.parse(JSON.stringify(tableau)),
    });

    // Perform simplex iterations for Phase I
    let iteration = 0;
    const maxIterations = 100; // Prevent infinite loops

    while (iteration < maxIterations) {
      iteration++;
      console.log(`\n📊 Phase I - Iteration ${iteration}`);

      // Find entering variable (most negative coefficient)
      const objectiveRow = tableau[tableau.length - 1];
      const enteringCol = this.findEnteringColumn(objectiveRow);

      if (enteringCol === -1) {
        console.log("✅ Phase I complete - optimal solution found");
        this.steps.push({
          phase: "Phase I",
          iteration,
          message: "Phase I terminée - solution optimale trouvée",
          tableau: JSON.parse(JSON.stringify(tableau)),
        });
        break;
      }

      // Find leaving variable (minimum ratio test)
      const leavingRow = this.findLeavingRow(tableau, enteringCol);

      if (leavingRow === -1) {
        console.log("⚠️ Phase I - Unbounded solution");
        this.steps.push({
          phase: "Phase I",
          iteration,
          message: "Phase I - Solution non bornée",
          tableau: JSON.parse(JSON.stringify(tableau)),
        });
        break;
      }

      // Pivot
      this.pivot(tableau, leavingRow, enteringCol);

      this.steps.push({
        phase: "Phase I",
        iteration,
        message: `Itération ${iteration} - Pivotage effectué`,
        pivot: {
          row: leavingRow,
          col: enteringCol,
          value: tableau[leavingRow][enteringCol],
        },
        tableau: JSON.parse(JSON.stringify(tableau)),
      });

      this.printTableau(tableau);
    }

    // Check for feasibility
    if (Math.abs(tableau[tableau.length - 1][tableau[0].length - 1]) > 1e-10) {
      console.log(
        "⚠️ The problem is infeasible - artificial variables remain in the basis"
      );
      this.steps.push({
        phase: "Phase I",
        message:
          "Le problème est non réalisable - variables artificielles restent dans la base",
      });
    }

    // Restore original objective row for Phase II
    // Remove artificial variables from the tableau
    const newTableau = [];

    // Copy constraint rows, excluding artificial variable columns
    for (let i = 0; i < tableau.length - 1; i++) {
      const newRow = [];
      for (let j = 0; j < tableau[i].length; j++) {
        // Skip artificial variable columns
        if (
          j >= numOriginalVars + numSlackVars + numSurplusVars &&
          j <
            numOriginalVars + numSlackVars + numSurplusVars + numArtificialVars
        ) {
          continue;
        }
        newRow.push(tableau[i][j]);
      }
      newTableau.push(newRow);
    }

    // Add back the original objective row (excluding artificial variables)
    const newObjectiveRow = [];
    for (let j = 0; j < originalObjectiveRow.length; j++) {
      // Skip artificial variable columns
      if (
        j >= numOriginalVars + numSlackVars + numSurplusVars &&
        j < numOriginalVars + numSlackVars + numSurplusVars + numArtificialVars
      ) {
        continue;
      }
      newObjectiveRow.push(originalObjectiveRow[j]);
    }
    newTableau.push(newObjectiveRow);

    // Update tableau for Phase II
    for (let i = 0; i < newTableau.length; i++) {
      tableau[i] = [...newTableau[i]];
    }

    // Ensure objective row is in proper form before Phase II
    // Express basic variables in the objective function
    this.updateObjectiveRowForPhaseII(tableau);

    console.log("\n📊 Tableau prepared for Phase II:");
    this.printTableau(tableau);

    this.steps.push({
      phase: "Transition",
      message: "Tableau préparé pour la Phase II",
      tableau: JSON.parse(JSON.stringify(tableau)),
    });
  }

  /**
   * Update the objective row for Phase II
   * @param {Array} tableau - Current tableau
   */
  updateObjectiveRowForPhaseII(tableau) {
    const objectiveRowIndex = tableau.length - 1;

    // For each column
    for (let j = 0; j < tableau[0].length - 1; j++) {
      // If this column is a basic variable for some row
      const basicRowIndex = this.findBasicVariableRow(tableau, j);

      if (basicRowIndex !== -1 && tableau[objectiveRowIndex][j] !== 0) {
        // Update objective row
        const coefficientToEliminate = tableau[objectiveRowIndex][j];

        for (let k = 0; k < tableau[0].length; k++) {
          tableau[objectiveRowIndex][k] -=
            coefficientToEliminate * tableau[basicRowIndex][k];
        }
      }
    }
  }

  /**
   * Find the row where the given column is a basic variable
   * @param {Array} tableau - Current tableau
   * @param {Number} col - Column index
   * @returns {Number} - Row index or -1 if not a basic variable
   */
  findBasicVariableRow(tableau, col) {
    let oneCount = 0;
    let oneRowIndex = -1;

    for (let i = 0; i < tableau.length - 1; i++) {
      if (tableau[i][col] === 1) {
        oneCount++;
        oneRowIndex = i;
      } else if (tableau[i][col] !== 0) {
        return -1; // Not a basic variable column
      }
    }

    return oneCount === 1 ? oneRowIndex : -1;
  }

  /**
   * Perform Phase II of the simplex method (standard simplex method)
   * @param {Array} tableau - Current tableau
   * @param {Object} standardForm - Problem in standard form
   */
  phaseTwo(tableau, standardForm) {
    let iteration = 0;
    const maxIterations = 100; // Prevent infinite loops

    while (iteration < maxIterations) {
      iteration++;
      console.log(`\n📊 Phase II - Iteration ${iteration}`);

      // Find entering variable (most negative coefficient)
      const objectiveRow = tableau[tableau.length - 1];
      const enteringCol = this.findEnteringColumn(objectiveRow);

      if (enteringCol === -1) {
        console.log("✅ Phase II complete - optimal solution found");
        this.steps.push({
          phase: "Phase II",
          iteration,
          message: "Phase II terminée - solution optimale trouvée",
          tableau: JSON.parse(JSON.stringify(tableau)),
        });
        break;
      }

      // Find leaving variable (minimum ratio test)
      const leavingRow = this.findLeavingRow(tableau, enteringCol);

      if (leavingRow === -1) {
        console.log("⚠️ Phase II - Unbounded solution");
        this.steps.push({
          phase: "Phase II",
          iteration,
          message: "Phase II - Solution non bornée",
          tableau: JSON.parse(JSON.stringify(tableau)),
        });
        break;
      }

      // Pivot
      this.pivot(tableau, leavingRow, enteringCol);

      this.steps.push({
        phase: "Phase II",
        iteration,
        message: `Itération ${iteration} - Pivotage effectué`,
        pivot: {
          row: leavingRow,
          col: enteringCol,
          value: tableau[leavingRow][enteringCol],
        },
        tableau: JSON.parse(JSON.stringify(tableau)),
      });

      this.printTableau(tableau);
    }

    if (iteration >= maxIterations) {
      console.log(
        "⚠️ Maximum iterations reached - solution may not be optimal"
      );
      this.steps.push({
        phase: "Phase II",
        message:
          "Nombre maximum d'itérations atteint - la solution peut ne pas être optimale",
      });
    }
  }

  /**
   * Find the entering column index for simplex iteration
   * @param {Array} objectiveRow - Objective row of the tableau
   * @returns {Number} - Column index or -1 if no negative coefficients
   */
  findEnteringColumn(objectiveRow) {
    // Find most negative coefficient in objective row (excluding RHS)
    let minCoeff = -1e-10; // Use small epsilon to avoid numerical issues
    let minIndex = -1;

    for (let i = 0; i < objectiveRow.length - 1; i++) {
      if (objectiveRow[i] < minCoeff) {
        minCoeff = objectiveRow[i];
        minIndex = i;
      }
    }

    return minIndex;
  }

  /**
   * Find the leaving row index for simplex iteration
   * @param {Array} tableau - Current tableau
   * @param {Number} enteringCol - Entering column index
   * @returns {Number} - Row index or -1 if unbounded
   */
  findLeavingRow(tableau, enteringCol) {
    // Initialize with large value
    let minRatio = Infinity;
    let minIndex = -1;

    // Last column is RHS
    const rhsCol = tableau[0].length - 1;

    // Check each constraint row
    for (let i = 0; i < tableau.length - 1; i++) {
      // Only consider positive coefficients for entering variable
      if (tableau[i][enteringCol] > 0) {
        const ratio = tableau[i][rhsCol] / tableau[i][enteringCol];

        if (ratio < minRatio) {
          minRatio = ratio;
          minIndex = i;
        }
      }
    }

    return minIndex;
  }

  /**
   * Perform pivot operation on the tableau
   * @param {Array} tableau - Current tableau
   * @param {Number} pivotRow - Pivot row index
   * @param {Number} pivotCol - Pivot column index
   */
  pivot(tableau, pivotRow, pivotCol) {
    const pivotElement = tableau[pivotRow][pivotCol];

    console.log(
      `🔄 Pivoting on element at row ${pivotRow + 1}, column ${
        pivotCol + 1
      } (value: ${pivotElement})`
    );

    // Normalize pivot row
    for (let j = 0; j < tableau[pivotRow].length; j++) {
      tableau[pivotRow][j] /= pivotElement;
    }

    // Update all other rows
    for (let i = 0; i < tableau.length; i++) {
      if (i !== pivotRow) {
        const factor = tableau[i][pivotCol];

        for (let j = 0; j < tableau[i].length; j++) {
          tableau[i][j] -= factor * tableau[pivotRow][j];
        }
      }
    }
  }

  /**
   * Print the tableau in a formatted way
   * @param {Array} tableau - Current tableau
   */
  printTableau(tableau) {
    // Create a copy to avoid modifying the original
    const formattedTableau = tableau.map((row) =>
      row.map((val) =>
        typeof val === "number" ? parseFloat(val.toFixed(4)) : val
      )
    );

    console.table(formattedTableau);
  }
}

module.exports = SimplexModel;
