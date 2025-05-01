"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ObjectiveFunctionInput } from "@/components/ObjectiveFunction";
import { Constraints } from "@/components/Constraints";
import {
  Constraint,
  LinearProgrammingProblem,
  ObjectiveFunction,
  SolverResult,
} from "@/lib/types";
import { solveLinearProgrammingProblem } from "@/lib/solver";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface SolverFormProps {
  onResult: (result: SolverResult) => void;
  onSolving: (solving: boolean) => void;
}

export function SolverForm({ onResult, onSolving }: SolverFormProps) {
  const [objective, setObjective] = useState<ObjectiveFunction>({
    coefficients: [0, 0, 0],  // Ajout d'un coefficient pour x3
    type: "max",
  });

  const [constraints, setConstraints] = useState<Constraint[]>([
    { coefficients: [0, 0, 0], type: ">=", rhs: 0 }, // Ajout de 0 pour x3
    { coefficients: [0, 0, 0], type: ">=", rhs: 0 },
    { coefficients: [0, 0, 0], type: ">=", rhs: 0 }, // Ajout d'un coefficient pour x3
  ]);

  const [solving, setSolving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSolve = async () => {
    setError(null);
    setSolving(true);
    onSolving(true);

    try {
      const problem: LinearProgrammingProblem = {
        // objective: objective.coefficients,
        // objectiveType: objective.type,
        // constraints: constraints,
        objective: objective.coefficients.map(c => isNaN(c) ? 0 : c),
        objectiveType: objective.type,
        constraints: constraints.map(c => ({
          ...c,
          coefficients: c.coefficients.map(c => isNaN(c) ? 0 : c),
          rhs: isNaN(c.rhs) ? 0 : c.rhs
        })),
      };

      const result = await solveLinearProgrammingProblem(problem);
      onResult(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      onResult({
        status: "error",
        data: { x1: 0, x2: 0, x3: 0, Z: 0 },
      });
    } finally {
      setSolving(false);
      onSolving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full overflow-hidden border-2 border-primary/10">
        <CardHeader className="bg-primary/5 outil">
          <CardTitle>Résolution de programmation linéaire.</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-8">
            <ObjectiveFunctionInput
              objective={objective}
              onChange={setObjective}
            />

            <Constraints constraints={constraints} onChange={setConstraints} />

            {error && (
              <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/30 px-6 py-4 containerResult">
          <Button
            onClick={handleSolve}
            disabled={solving}
            className="ml-auto w-full sm:w-auto btnResult"
          >
            {solving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                En cours de résolution...
              </>
            ) : (
              "Résoudre le problème"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
