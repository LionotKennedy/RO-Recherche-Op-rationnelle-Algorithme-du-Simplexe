"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { TrendingUp, AlertCircle, HelpCircle } from "lucide-react";

export function InfoCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
       <p>Coucou</p>
      <Card className="w-full mb-8 overflow-hidden border-2 border-primary/10">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Linear Programming Solver
          </CardTitle>
          <CardDescription>
            Solve linear programming problems with constraints
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4 text-sm">
            <p>
              This tool helps you solve linear programming optimization problems with two variables
              (X₁ and X₂). Input your objective function and constraints below.
            </p>
            
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center gap-2 font-medium">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <h4>How to use</h4>
              </div>
              <Separator className="my-2" />
              <ol className="ml-5 list-decimal space-y-1 text-muted-foreground">
                <li>Define your objective function (minimize or maximize)</li>
                <li>Add constraints using the "Add Constraint" button</li>
                <li>Specify coefficients and inequality types</li>
                <li>Click "Solve Problem" to get the optimal solution</li>
              </ol>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <HelpCircle className="h-4 w-4" />
              <p>The solver will find values for X₁ and X₂ that optimize your objective function Z while satisfying all constraints.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}