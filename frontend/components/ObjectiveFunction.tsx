"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { ObjectiveFunction } from "@/lib/types";
import { motion } from "framer-motion";

interface ObjectiveFunctionProps {
  objective: ObjectiveFunction;
  onChange: (objective: ObjectiveFunction) => void;
}

export function ObjectiveFunctionInput({
  objective,
  onChange,
}: ObjectiveFunctionProps) {
  // S'assurer qu'il y a au moins 3 coefficients (ajoute 0 si nécessaire)
  const coefficients =
    objective.coefficients.length >= 3
      ? objective.coefficients
      : [
          ...objective.coefficients,
          ...Array(3 - objective.coefficients.length).fill(0),
        ];

  const handleCoefficientChange = (index: number, value: string) => {
    const newCoefficients = [...coefficients];
    newCoefficients[index] = parseFloat(value) || 0;
    onChange({ ...objective, coefficients: newCoefficients });
  };

  const handleTypeChange = (value: "min" | "max") => {
    onChange({ ...objective, type: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-medium">Fonction Objectif</h3>
        <p className="text-sm text-muted-foreground">
          Définissez les coefficients de votre fonction objectif et précisez si
          vous souhaitez minimiser ou maximiser.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <RadioGroup
          value={objective.type}
          onValueChange={(value) => handleTypeChange(value as "min" | "max")}
          className="flex flex-row space-x-4 sm:flex-col sm:space-x-0 sm:space-y-1"
        >
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="max" id="max" className="maxmix" />
            <Label htmlFor="max">Maximiser</Label>
          </div>
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="min" id="min" className="maxmix" />
            <Label htmlFor="min">Minimiser</Label>
          </div>
        </RadioGroup>
            <Separator
              className="hidden sm:block h-10"
              orientation="vertical"
            />

        <div className="flex-1 grid gap-4 pt-2 sm:pt-0">
          <div className="flex items-center gap-1 flex-wrap">

            <span className="ml-2 font-semibold">Z</span>
            <span className="ml-2">=</span>

            <Separator
              className="hidden sm:block h-10"
              orientation="vertical"
            />
            <Input
              type="number"
              value={coefficients[0]}
              onChange={(e) => handleCoefficientChange(0, e.target.value)}
              className="w-24 input"
              placeholder="0"
            />
            <span className="text-sm">X₁</span>
            <span className="mx-2">+</span>

            <Input
              type="number"
              value={coefficients[1]}
              onChange={(e) => handleCoefficientChange(1, e.target.value)}
              className="w-24 input"
              placeholder="0"
            />
            <span className="text-sm">X₂</span>
            <span className="mx-2">+</span>

            <Input
              type="number"
              value={coefficients[2]}
              onChange={(e) => handleCoefficientChange(2, e.target.value)}
              className="w-24 input"
              placeholder="0"
            />
            <span className="text-sm">X₃</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
