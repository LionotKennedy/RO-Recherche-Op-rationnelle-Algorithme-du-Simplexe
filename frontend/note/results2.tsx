// "use client"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { SolverSteps } from "./solver-steps"
// import { motion } from "framer-motion"
// import { Calculator, TrendingUp, CheckCircle } from "lucide-react"

// interface SolverStep {
//   type: "tableau" | "pivot" | "phase" | "result" | "info"
//   title: string
//   data?: number[][]
//   message?: string
//   phase?: string
//   iteration?: number
//   pivotInfo?: {
//     row: number
//     col: number
//     value: number
//   }
//   solution?: any
// }

// interface EnhancedSolverResult {
//   solution: Record<string, number>
//   steps: SolverStep[]
//   status?: string
//   message?: string
// }

// interface ResultsProps {
//   result: EnhancedSolverResult | null
//   loading: boolean
// }

// export function Results({ result, loading }: ResultsProps) {
//   if (loading) {
//     return (
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center p-8">
//         <div className="flex items-center gap-2">
//           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
//           <span>Résolution en cours...</span>
//         </div>
//       </motion.div>
//     )
//   }

//   if (!result) {
//     return (
//       <Card>
//         <CardContent className="flex items-center justify-center p-8">
//           <div className="text-center text-muted-foreground">
//             <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
//             <p>Aucun résultat à afficher</p>
//             <p className="text-sm">Configurez et résolvez un problème pour voir les résultats</p>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   const { solution, steps } = result

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <Tabs defaultValue="solution" className="w-full">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="solution" className="flex items-center gap-2">
//             <CheckCircle className="h-4 w-4" />
//             Solution
//           </TabsTrigger>
//           <TabsTrigger value="steps" className="flex items-center gap-2">
//             <TrendingUp className="h-4 w-4" />
//             Étapes de Résolution
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="solution">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <CheckCircle className="h-5 w-5 text-green-600" />
//                 Solution Optimale
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4">
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                   {Object.entries(solution).map(([variable, value]) => (
//                     <div key={variable} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border">
//                       <div className="text-sm font-medium text-muted-foreground mb-1">
//                         {variable === "Z" ? "Valeur Objectif" : `Variable ${variable}`}
//                       </div>
//                       <div className="text-2xl font-bold text-primary">
//                         {typeof value === "number" ? value.toFixed(4) : value}
//                       </div>
//                       {variable === "Z" && (
//                         <Badge variant="secondary" className="mt-2">
//                           Optimal
//                         </Badge>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
//                   <h3 className="font-semibold text-green-800 mb-2">Résumé de la Solution</h3>
//                   <div className="text-sm text-green-700">
//                     <p>
//                       La valeur optimale de la fonction objectif est{" "}
//                       <span className="font-bold">{solution.Z?.toFixed(4)}</span>
//                     </p>
//                     <p className="mt-1">
//                       Variables de décision:{" "}
//                       {Object.entries(solution)
//                         .filter(([key]) => key !== "Z")
//                         .map(([key, value]) => `${key} = ${(value as number).toFixed(4)}`)
//                         .join(", ")}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="steps">
//           <SolverSteps steps={steps || []} isVisible={true} />
//         </TabsContent>
//       </Tabs>
//     </motion.div>
//   )
// }
















// "use client"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { SolverSteps } from "./solver-steps"
// import { motion } from "framer-motion"
// import { Calculator, TrendingUp, CheckCircle } from "lucide-react"

// interface SolverStep {
//   type: "tableau" | "pivot" | "phase" | "result" | "info"
//   title: string
//   data?: number[][]
//   message?: string
//   phase?: string
//   iteration?: number
//   pivotInfo?: {
//     row: number
//     col: number
//     value: number
//   }
//   solution?: any
// }

// interface SolverResult {
//   solution: Record<string, number>
//   steps: SolverStep[]
//   status?: string
//   message?: string
// }

// // Modifier l'interface pour utiliser SolverResult au lieu d'EnhancedSolverResult
// interface ResultsProps {
//   result: SolverResult | null
//   loading: boolean
// }

// // Dans la fonction Results, s'assurer que steps existe avant de l'utiliser
// export function Results({ result, loading }: ResultsProps) {
//   if (loading) {
//     return (
//       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center p-8">
//         <div className="flex items-center gap-2">
//           <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
//           <span>Résolution en cours...</span>
//         </div>
//       </motion.div>
//     )
//   }

//   if (!result) {
//     return (
//       <Card>
//         <CardContent className="flex items-center justify-center p-8">
//           <div className="text-center text-muted-foreground">
//             <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
//             <p>Aucun résultat à afficher</p>
//             <p className="text-sm">Configurez et résolvez un problème pour voir les résultats</p>
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }

//   const { solution, steps = [] } = result // Valeur par défaut pour steps

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="space-y-6"
//     >
//       <Tabs defaultValue="solution" className="w-full">
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger value="solution" className="flex items-center gap-2">
//             <CheckCircle className="h-4 w-4" />
//             Solution
//           </TabsTrigger>
//           <TabsTrigger value="steps" className="flex items-center gap-2">
//             <TrendingUp className="h-4 w-4" />
//             Étapes de Résolution
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="solution">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <CheckCircle className="h-5 w-5 text-green-600" />
//                 Solution Optimale
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4">
//                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                   {Object.entries(solution).map(([variable, value]) => (
//                     <div key={variable} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border">
//                       <div className="text-sm font-medium text-muted-foreground mb-1">
//                         {variable === "Z" ? "Valeur Objectif" : `Variable ${variable}`}
//                       </div>
//                       <div className="text-2xl font-bold text-primary">
//                         {typeof value === "number" ? value.toFixed(4) : value}
//                       </div>
//                       {variable === "Z" && (
//                         <Badge variant="secondary" className="mt-2">
//                           Optimal
//                         </Badge>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
//                   <h3 className="font-semibold text-green-800 mb-2">Résumé de la Solution</h3>
//                   <div className="text-sm text-green-700">
//                     <p>
//                       La valeur optimale de la fonction objectif est{" "}
//                       <span className="font-bold">{solution.Z?.toFixed(4)}</span>
//                     </p>
//                     <p className="mt-1">
//                       Variables de décision:{" "}
//                       {Object.entries(solution)
//                         .filter(([key]) => key !== "Z")
//                         .map(([key, value]) => `${key} = ${(value as number).toFixed(4)}`)
//                         .join(", ")}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="steps">
//           <SolverSteps steps={steps} isVisible={true} />
//         </TabsContent>
//       </Tabs>
//     </motion.div>
//   )
// }





























"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SolverSteps } from "./solver-steps"
import { motion } from "framer-motion"
import { Calculator, TrendingUp, CheckCircle } from "lucide-react"

// Importer les types depuis le fichier types.ts
import type { SolverResult } from "@/lib/types"

// Supprimer les interfaces locales SolverStep et SolverResult qui étaient définies ici

interface ResultsProps {
  result: SolverResult | null
  loading: boolean
}

// Dans la fonction Results, s'assurer que steps existe avant de l'utiliser
export function Results({ result, loading }: ResultsProps) {
  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center p-8">
        <div className="flex items-center gap-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span>Résolution en cours...</span>
        </div>
      </motion.div>
    )
  }

  if (!result) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center text-muted-foreground">
            <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Aucun résultat à afficher</p>
            <p className="text-sm">Configurez et résolvez un problème pour voir les résultats</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { solution, steps = [] } = result // Valeur par défaut pour steps

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Tabs defaultValue="solution" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="solution" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Solution
          </TabsTrigger>
          <TabsTrigger value="steps" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Étapes de Résolution
          </TabsTrigger>
        </TabsList>

        <TabsContent value="solution">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Solution Optimale
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {Object.entries(solution).map(([variable, value]) => (
                    <div key={variable} className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border">
                      <div className="text-sm font-medium text-muted-foreground mb-1">
                        {variable === "Z" ? "Valeur Objectif" : `Variable ${variable}`}
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {typeof value === "number" ? value.toFixed(4) : value}
                      </div>
                      {variable === "Z" && (
                        <Badge variant="secondary" className="mt-2">
                          Optimal
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">Résumé de la Solution</h3>
                  <div className="text-sm text-green-700">
                    <p>
                      La valeur optimale de la fonction objectif est{" "}
                      <span className="font-bold">{solution.Z?.toFixed(4)}</span>
                    </p>
                    <p className="mt-1">
                      Variables de décision:{" "}
                      {Object.entries(solution)
                        .filter(([key]) => key !== "Z")
                        .map(([key, value]) => `${key} = ${(value as number).toFixed(4)}`)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="steps">
          <SolverSteps steps={steps} isVisible={true} />
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
