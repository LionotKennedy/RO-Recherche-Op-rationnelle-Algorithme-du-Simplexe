"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AnimatedValue } from "@/components/ui/AnimatedValue";
import { SolverResult } from "@/lib/types";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface ResultsProps {
  result: SolverResult | null;
  loading: boolean;
}

export function Results({ result, loading }: ResultsProps) {
  if (loading) {
    return (
      <Card className="w-full mt-8 overflow-hidden">
        <CardHeader className="bg-muted/50">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-primary animate-pulse" />
            Computing Solution...
          </CardTitle>
          <CardDescription>
            Processing your linear programming problem
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4">
            <div className="h-8 bg-muted/60 rounded animate-pulse" />
            <div className="h-8 bg-muted/60 rounded animate-pulse" />
            <div className="h-8 bg-muted/60 rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) return null;

  const isSuccess = result.status === "success";

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="w-full"
    >
      coucou
      <Card className="w-full mt-8 overflow-hidden border-2 border-primary/20">
        <CardHeader
          className={`${
            isSuccess
              ? "bg-emerald-50 dark:bg-emerald-950/20"
              : "bg-destructive/10"
          }`}
        >
          <CardTitle className="text-lg flex items-center gap-2">
            {isSuccess ? (
              <>
                <CheckCircle2
                  className="text-emerald-500 dark:text-emerald-400"
                  size={20}
                />
                <span>Optimal Solution Found</span>
              </>
            ) : (
              <>
                <AlertTriangle className="text-destructive" size={20} />
                <span>Problem Encountered</span>
              </>
            )}
          </CardTitle>
          <CardDescription>
            {isSuccess
              ? "The optimal values for your linear programming problem are:"
              : "Unable to find an optimal solution for your problem."}
          </CardDescription>
        </CardHeader>
        {isSuccess && result.data && (
          <CardContent className="pt-6">
            <div className="grid gap-6 sm:grid-cols-3">
              <motion.div
                variants={itemVariants}
                className="rounded-lg bg-muted/50 p-4 text-center"
              >
                <div className="text-muted-foreground mb-2">Variable X₁</div>
                <div className="text-3xl font-bold">
                  <AnimatedValue value={result.data.x1} prefix="" />
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="rounded-lg bg-muted/50 p-4 text-center"
              >
                <div className="text-muted-foreground mb-2">Variable X₂</div>
                <div className="text-3xl font-bold">
                  <AnimatedValue value={result.data.x2} prefix="" />
                </div>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="rounded-lg bg-muted/50 p-4 text-center"
              >
                <div className="text-muted-foreground mb-2">Variable X₂</div>
                <div className="text-3xl font-bold">
                  <AnimatedValue value={result.data.x3} prefix="" />
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="rounded-lg bg-primary/10 p-4 text-center"
              >
                <div className="text-muted-foreground mb-2">
                  Objective Value Z
                </div>
                <div className="text-3xl font-bold text-primary">
                  <AnimatedValue value={result.data.Z} prefix="" />
                </div>
              </motion.div>
            </div>
          </CardContent>
        )}
      </Card>
    </motion.div>
  );
}
