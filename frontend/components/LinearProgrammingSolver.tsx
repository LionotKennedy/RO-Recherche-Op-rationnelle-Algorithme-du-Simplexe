"use client";

import React, { useState } from "react";
import { SolverForm } from "@/components/SolverForm";
import { Results } from "@/components/Results";
import { InfoCard } from "@/components/InfoCard";
import { SolverResult } from "@/lib/types";
import { motion } from "framer-motion";
import { SolutionSteps } from "@/components/SolutionSteps";

export function LinearProgrammingSolver() {
  const [result, setResult] = useState<SolverResult | null>(null);
  const [solving, setSolving] = useState(false);

  const handleResult = (newResult: SolverResult) => {
    setResult(newResult);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-4 py-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-2">
          Résolution de Programmation Linéaire
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Optimiser des fonctions linéaires sous contraintes
        </p>
      </motion.div>

      <InfoCard />

      <div className="grid gap-8">
        <SolverForm onResult={handleResult} onSolving={setSolving} />
        <Results result={result} loading={solving} />
        <SolutionSteps result={result} />
      </div>
    </motion.div>
  );
}




































// "use client";

// import React, { useState } from "react";
// import { SolverForm } from "@/components/SolverForm";
// import { Results } from "@/components/Results";
// import { InfoCard } from "@/components/InfoCard";
// import { SolverResult } from "@/lib/types";
// import { motion } from "framer-motion";
// import { SolutionSteps } from "@/components/SolutionSteps";

// export function LinearProgrammingSolver() {
//   const [result, setResult] = useState<SolverResult | null>(null);
//   const [solving, setSolving] = useState(false);

//   const handleResult = (newResult: SolverResult) => {
//     setResult(newResult);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="w-full max-w-4xl mx-auto px-4 py-8"
//     >
//       <motion.div
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <h1 className="text-3xl font-bold text-center mb-2">
//           Résolution de Programmation Linéaire
//         </h1>
//         <p className="text-center text-muted-foreground mb-8">
//           Optimiser des fonctions linéaires sous contraintes
//         </p>
//       </motion.div>

//       <InfoCard />

//       <div className="grid gap-8">
//         {/* <SolverForm onResult={handleResult} onSolving={setSolving} />
//         <Results result={result} loading={solving} /> */}
//         <SolverForm onResult={handleResult} onSolving={setSolving} />
//         <Results result={result?.solution} loading={solving} />
//         <SolutionSteps result={result} />
//       </div>
//     </motion.div>
//   );
// }





























// "use client"

// import { useState } from "react"
// import { SolverForm } from "@/components/SolverForm";
// import { Results } from "@/components/results2"
// import { InfoCard } from "@/components/InfoCard";
// import { motion } from "framer-motion"

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

// export function LinearProgrammingSolver() {
//   const [result, setResult] = useState<EnhancedSolverResult | null>(null)
//   const [solving, setSolving] = useState(false)

//   const handleResult = (newResult: EnhancedSolverResult) => {
//     setResult(newResult)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="w-full max-w-6xl mx-auto px-4 py-8"
//     >
//       <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
//         <h1 className="text-3xl font-bold text-center mb-2">Résolution de Programmation Linéaire</h1>
//         <p className="text-center text-muted-foreground mb-8">
//           Optimiser des fonctions linéaires sous contraintes avec visualisation complète des étapes
//         </p>
//       </motion.div>

//       <InfoCard />

//       <div className="grid gap-8">
//        <SolverForm onResult={handleResult} onSolving={setSolving} />
//         <Results result={result} loading={solving} />
//       </div>
//     </motion.div>
//   )
// }



































// "use client"

// import { useState } from "react"
// import { SolverForm } from "@/components/SolverForm";
// import { Results } from "@/components/results2"
// import { InfoCard } from "@/components/InfoCard";
// import { motion } from "framer-motion"

// // Importer les types mis à jour
// import type { SolverResult } from "@/lib/types"

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

// export function LinearProgrammingSolver() {
//   // Modifier le type de state pour utiliser SolverResult
//   const [result, setResult] = useState<SolverResult | null>(null)
//   const [solving, setSolving] = useState(false)

//   // Modifier la fonction handleResult pour utiliser SolverResult au lieu d'EnhancedSolverResult
//   const handleResult = (newResult: SolverResult) => {
//     setResult(newResult)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="w-full max-w-6xl mx-auto px-4 py-8"
//     >
//       <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
//         <h1 className="text-3xl font-bold text-center mb-2">Résolution de Programmation Linéaire</h1>
//         <p className="text-center text-muted-foreground mb-8">
//           Optimiser des fonctions linéaires sous contraintes avec visualisation complète des étapes
//         </p>
//       </motion.div>

//       <InfoCard />

//       <div className="grid gap-8">
//         <SolverForm onResult={handleResult} onSolving={setSolving} />
//         <Results result={result} loading={solving} />
//       </div>
//     </motion.div>
//   )
// }













// "use client"

// import { useState } from "react"
// import { SolverForm } from "@/components/SolverForm";
// import { Results } from "@/components/results2"
// import { InfoCard } from "@/components/InfoCard";
// import { motion } from "framer-motion"

// // Importer uniquement les types depuis le fichier types.ts
// import type { SolverResult } from "@/lib/types"

// // Supprimer les interfaces locales SolverStep et EnhancedSolverResult

// export function LinearProgrammingSolver() {
//   const [result, setResult] = useState<SolverResult | null>(null)
//   const [solving, setSolving] = useState(false)

//   const handleResult = (newResult: SolverResult) => {
//     setResult(newResult)
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="w-full max-w-6xl mx-auto px-4 py-8"
//     >
//       <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
//         <h1 className="text-3xl font-bold text-center mb-2">Résolution de Programmation Linéaire</h1>
//         <p className="text-center text-muted-foreground mb-8">
//           Optimiser des fonctions linéaires sous contraintes avec visualisation complète des étapes
//         </p>
//       </motion.div>

//       <InfoCard />

//       <div className="grid gap-8">
//         <SolverForm onResult={handleResult} onSolving={setSolving} />
//         <Results result={result} loading={solving} />
//       </div>
//     </motion.div>
//   )
// }
