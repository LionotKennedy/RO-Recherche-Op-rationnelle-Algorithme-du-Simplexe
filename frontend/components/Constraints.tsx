// "use client";

// import React from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Constraint } from "@/lib/types";
// import { Plus, Trash2 } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Card, CardContent } from "@/components/ui/card";

// interface ConstraintsProps {
//   constraints: Constraint[];
//   onChange: (constraints: Constraint[]) => void;
// }

// export function Constraints({ constraints, onChange }: ConstraintsProps) {
//   const handleAddConstraint = () => {
//     onChange([
//       ...constraints,
//       { coefficients: [0, 0], type: ">=", rhs: 0 },
//     ]);
//   };

//   const handleRemoveConstraint = (index: number) => {
//     const newConstraints = [...constraints];
//     newConstraints.splice(index, 1);
//     onChange(newConstraints);
//   };

//   const handleConstraintChange = (
//     index: number,
//     field: keyof Constraint,
//     value: string | number
//   ) => {
//     const newConstraints = [...constraints];
    
//     if (field === "type") {
//       newConstraints[index].type = value as Constraint["type"];
//     } else if (field === "rhs") {
//       newConstraints[index].rhs = parseFloat(value as string) || 0;
//     }
    
//     onChange(newConstraints);
//   };

//   const handleCoefficientChange = (
//     constraintIndex: number,
//     coefficientIndex: number,
//     value: string
//   ) => {
//     const newConstraints = [...constraints];
//     newConstraints[constraintIndex].coefficients[coefficientIndex] = parseFloat(value) || 0;
//     onChange(newConstraints);
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.2 }}
//       className="space-y-6"
//     >
//       <div>
//         <h3 className="text-lg font-medium">Constraints</h3>
//         <p className="text-sm text-muted-foreground">
//           Add constraints to your linear programming problem.
//         </p>
//       </div>
      
//       <AnimatePresence>
//         {constraints.map((constraint, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 20 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Card className="mb-4">
//               <CardContent className="pt-6">
//                 <div className="flex flex-wrap items-center gap-2">
//                   <Input
//                     type="number"
//                     value={constraint.coefficients[0]}
//                     onChange={(e) => 
//                       handleCoefficientChange(index, 0, e.target.value)
//                     }
//                     className="w-20"
//                     placeholder="0"
//                   />
//                   <span className="text-sm">X₁</span>
//                   <span>+</span>
//                   <Input
//                     type="number"
//                     value={constraint.coefficients[1]}
//                     onChange={(e) =>
//                       handleCoefficientChange(index, 1, e.target.value)
//                     }
//                     className="w-20"
//                     placeholder="0"
//                   />
//                   <span className="text-sm">X₂</span>
                  
//                   <Select
//                     value={constraint.type}
//                     onValueChange={(value) =>
//                       handleConstraintChange(index, "type", value)
//                     }
//                   >
//                     <SelectTrigger className="w-20">
//                       <SelectValue />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value=">=">≥</SelectItem>
//                       <SelectItem value="<=">≤</SelectItem>
//                       <SelectItem value="=">=</SelectItem>
//                     </SelectContent>
//                   </Select>
                  
//                   <Input
//                     type="number"
//                     value={constraint.rhs}
//                     onChange={(e) =>
//                       handleConstraintChange(index, "rhs", e.target.value)
//                     }
//                     className="w-20"
//                     placeholder="0"
//                   />
                  
//                   <Button
//                     variant="ghost"
//                     size="icon"
//                     onClick={() => handleRemoveConstraint(index)}
//                     className="ml-auto text-destructive hover:text-destructive hover:bg-destructive/10"
//                   >
//                     <Trash2 size={16} />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </AnimatePresence>
      
//       <Button
//         variant="outline"
//         onClick={handleAddConstraint}
//         className="w-full"
//       >
//         <Plus size={16} className="mr-2" /> Add Constraint
//       </Button>
//     </motion.div>
//   );
// }














































"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Constraint } from "@/lib/types";
import { Plus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface ConstraintsProps {
  constraints: Constraint[];
  onChange: (constraints: Constraint[]) => void;
}

export function Constraints({ constraints, onChange }: ConstraintsProps) {
  const handleAddConstraint = () => {
    onChange([
      ...constraints,
      { coefficients: [0, 0, 0], type: ">=", rhs: 0 }, // Ajout du 3ème coefficient
    ]);
  };

  const handleRemoveConstraint = (index: number) => {
    const newConstraints = [...constraints];
    newConstraints.splice(index, 1);
    onChange(newConstraints);
  };

  const handleConstraintChange = (
    index: number,
    field: keyof Constraint,
    value: string | number
  ) => {
    const newConstraints = [...constraints];
    
    if (field === "type") {
      newConstraints[index].type = value as Constraint["type"];
    } else if (field === "rhs") {
      newConstraints[index].rhs = parseFloat(value as string) || 0;
    }
    
    onChange(newConstraints);
  };

  const handleCoefficientChange = (
    constraintIndex: number,
    coefficientIndex: number,
    value: string
  ) => {
    const newConstraints = [...constraints];
    // S'assurer que le tableau coefficients a la bonne longueur
    while (newConstraints[constraintIndex].coefficients.length < 3) {
      newConstraints[constraintIndex].coefficients.push(0);
    }
    newConstraints[constraintIndex].coefficients[coefficientIndex] = parseFloat(value) || 0;
    onChange(newConstraints);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-medium">Constraints</h3>
        <p className="text-sm text-muted-foreground">
          Add constraints to your linear programming problem.
        </p>
      </div>
      
      <AnimatePresence>
        {constraints.map((constraint, index) => {
          // S'assurer qu'il y a 3 coefficients
          const coefficients = constraint.coefficients.length >= 3 
            ? constraint.coefficients 
            : [...constraint.coefficients, ...Array(3 - constraint.coefficients.length).fill(0)];
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-4">
                <CardContent className="pt-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Coefficient X₁ */}
                    <Input
                      type="number"
                      value={coefficients[0]}
                      onChange={(e) => 
                        handleCoefficientChange(index, 0, e.target.value)
                      }
                      className="w-20"
                      placeholder="0"
                    />
                    <span className="text-sm">X₁</span>
                    <span>+</span>
                    
                    {/* Coefficient X₂ */}
                    <Input
                      type="number"
                      value={coefficients[1]}
                      onChange={(e) =>
                        handleCoefficientChange(index, 1, e.target.value)
                      }
                      className="w-20"
                      placeholder="0"
                    />
                    <span className="text-sm">X₂</span>
                    <span>+</span>
                    
                    {/* Nouveau coefficient X₃ */}
                    <Input
                      type="number"
                      value={coefficients[2]}
                      onChange={(e) =>
                        handleCoefficientChange(index, 2, e.target.value)
                      }
                      className="w-20"
                      placeholder="0"
                    />
                    <span className="text-sm">X₃</span>
                    
                    {/* Sélecteur d'opérateur */}
                    <Select
                      value={constraint.type}
                      onValueChange={(value) =>
                        handleConstraintChange(index, "type", value)
                      }
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value=">=">≥</SelectItem>
                        <SelectItem value="<=">≤</SelectItem>
                        <SelectItem value="=">=</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {/* Valeur RHS */}
                    <Input
                      type="number"
                      value={constraint.rhs}
                      onChange={(e) =>
                        handleConstraintChange(index, "rhs", e.target.value)
                      }
                      className="w-20"
                      placeholder="0"
                    />
                    
                    {/* Bouton de suppression */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveConstraint(index)}
                      className="ml-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      <Button
        variant="outline"
        onClick={handleAddConstraint}
        className="w-full"
      >
        <Plus size={16} className="mr-2" /> Add Constraint
      </Button>
    </motion.div>
  );
}