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
