// Ajouter les nouveaux types pour les étapes de résolution

export interface SolverStep {
  type: "tableau" | "pivot" | "phase" | "result" | "info"
  title: string
  data?: number[][]
  message?: string
  phase?: string
  iteration?: number
  pivotInfo?: {
    row: number
    col: number
    value: number
  }
  solution?: any
}

// Modifier SolverResult pour inclure les étapes
export interface SolverResult {
  solution: Record<string, number>
  steps?: SolverStep[] // Rendre optionnel pour la compatibilité
  status?: string
  message?: string
}

// Créer un type étendu si nécessaire
export interface EnhancedSolverResult extends SolverResult {
  steps: SolverStep[] // Obligatoire dans la version étendue
}
