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
            Outil de résolution de programmation linéaire
          </CardTitle>
          <CardDescription>
          Résoudre des problèmes de programmation linéaire sous contraintes
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4 text-sm">
            <p>
            Cet outil vous aide à résoudre des problèmes d’optimisation en programmation linéaire à deux ou trois variables.
              (X₁, X₂ et X₃). Saisissez votre fonction objectif et vos contraintes ci-dessous.
            </p>
            
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-center gap-2 font-medium">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                <h4>Mode d'emploi</h4>
              </div>
              <Separator className="my-2" />
              <ol className="ml-5 list-decimal space-y-1 text-muted-foreground">
                <li>Indiquez la fonction objectif à minimiser ou à maximiser.</li>
                <li>Ajoutez des contraintes via le bouton "Ajouter une contrainte".</li>
                <li>Indiquez les coefficients et les types d'inégalités.</li>
                <li>Cliquez sur "Résoudre le problème" afin d'obtenir la solution optimale.</li>
              </ol>
            </div>
            
            <div className="flex items-center gap-2 text-muted-foreground">
              <HelpCircle className="h-4 w-4" />
              <p>Le solveur déterminera les valeurs de X₁, X₂ et X₃ qui maximisent ou minimisent votre fonction objectif Z, tout en respectant toutes les contraintes.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}