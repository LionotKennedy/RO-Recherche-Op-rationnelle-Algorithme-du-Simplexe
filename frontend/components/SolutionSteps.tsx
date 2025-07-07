// "use client";

// import React from "react";
// import { SolverResult } from "@/lib/types";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// interface SolutionStepsProps {
//   result: SolverResult | null;
// }

// export const SolutionSteps: React.FC<SolutionStepsProps> = ({ result }) => {
//   if (!result || !result.steps || result.steps.length === 0) {
//     return null;
//   }

//   const formatValue = (value: any) => {
//     if (typeof value === "number") {
//       return value.toFixed(4);
//     }
//     return value;
//   };

//   return (
//     <div className="mt-8">
//       <h2 className="text-xl font-semibold mb-4">Détail des calculs</h2>
//       <Accordion type="single" collapsible className="w-full">
//         {result.steps.map((step, index) => (
//           <AccordionItem key={index} value={`item-${index}`}>
//             <AccordionTrigger>
//               <div className="flex items-center gap-2">
//                 {step.phase === "Initial" && (
//                   <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
//                     {step.phase}
//                   </span>
//                 )}
//                 {step.phase === "Phase I" && (
//                   <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
//                     {step.phase}
//                   </span>
//                 )}
//                 {step.phase === "Phase II" && (
//                   <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
//                     {step.phase}
//                   </span>
//                 )}
//                 {step.iteration && (
//                   <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
//                     Itération {step.iteration}
//                   </span>
//                 )}
//                 <span>{step.message}</span>
//               </div>
//             </AccordionTrigger>
//             <AccordionContent>
//               {step.pivot && (
//                 <div className="mb-4 p-3 bg-yellow-50 rounded">
//                   <p>
//                     Pivot: Ligne {step.pivot.row + 1}, Colonne {step.pivot.col + 1} (Valeur: {step.pivot.value.toFixed(4)})
//                   </p>
//                 </div>
//               )}
              
//               {step.tableau && (
//                 <div className="overflow-auto max-w-full">
//                   <Table className="border">
//                     <TableHeader>
//                       <TableRow>
//                         {step.tableau[0].map((_, colIndex) => (
//                           <TableHead key={colIndex} className="border px-2 py-1">
//                             {colIndex === step.tableau[0].length - 1 ? "RHS" : `Col ${colIndex + 1}`}
//                           </TableHead>
//                         ))}
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {step.tableau.map((row, rowIndex) => (
//                         <TableRow key={rowIndex}>
//                           {row.map((cell, cellIndex) => (
//                             <TableCell 
//                               key={cellIndex} 
//                               className={`border px-2 py-1 ${
//                                 step.pivot?.row === rowIndex && step.pivot?.col === cellIndex
//                                   ? "bg-yellow-100 font-bold"
//                                   : ""
//                               }`}
//                             >
//                               {formatValue(cell)}
//                             </TableCell>
//                           ))}
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               )}
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </div>
//   );
// };
























// "use client";

// import React from "react";
// import { SolverResult } from "@/lib/types";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// interface SolutionStepsProps {
//   result: SolverResult | null;
// }

// export const SolutionSteps: React.FC<SolutionStepsProps> = ({ result }) => {
//   if (!result || !result.steps || result.steps.length === 0) {
//     return null;
//   }

//   const formatValue = (value: any) => {
//     if (typeof value === "number") {
//       return value.toFixed(4);
//     }
//     return value;
//   };

//   return (
//     <div className="mt-8">
//       <h2 className="text-xl font-semibold mb-4">Détail des calculs</h2>
//       <Accordion type="single" collapsible className="w-full">
//         {result.steps.map((step, index) => (
//           <AccordionItem key={index} value={`item-${index}`}>
//             <AccordionTrigger>
//               <div className="flex items-center gap-2">
//                 {/* ... (le reste du code reste inchangé) ... */}
//               </div>
//             </AccordionTrigger>
//             <AccordionContent>
//               {step.pivot && (
//                 <div className="mb-4 p-3 bg-yellow-50 rounded">
//                   <p>
//                     Pivot: Ligne {step.pivot.row + 1}, Colonne {step.pivot.col + 1} (Valeur: {step.pivot.value.toFixed(4)})
//                   </p>
//                 </div>
//               )}
              
//               {step.tableau && step.tableau.length > 0 && step.tableau[0] && (
//                 <div className="overflow-auto max-w-full">
//                   <Table className="border">
//                     <TableHeader>
//                       <TableRow>
//                         {step.tableau[0].map((_, colIndex) => (
//                           <TableHead key={colIndex} className="border px-2 py-1">
//                             {colIndex === step.tableau[0].length - 1 ? "RHS" : `Col ${colIndex + 1}`}
//                           </TableHead>
//                         ))}
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {step.tableau.map((row, rowIndex) => (
//                         <TableRow key={rowIndex}>
//                           {row.map((cell, cellIndex) => (
//                             <TableCell 
//                               key={cellIndex} 
//                               className={`border px-2 py-1 ${
//                                 step.pivot?.row === rowIndex && step.pivot?.col === cellIndex
//                                   ? "bg-yellow-100 font-bold"
//                                   : ""
//                               }`}
//                             >
//                               {formatValue(cell)}
//                             </TableCell>
//                           ))}
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               )}
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </div>
//   );
// };




















// "use client";

// import React from "react";
// import { SolverResult, SolverStep } from "@/lib/types";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// interface SolutionStepsProps {
//   result: SolverResult | null;
// }

// const hasTableau = (step: SolverStep): step is SolverStep & { tableau: number[][] } => {
//   return !!step.tableau && Array.isArray(step.tableau) && step.tableau.length > 0;
// };

// export const SolutionSteps: React.FC<SolutionStepsProps> = ({ result }) => {
//   if (!result?.steps?.length) {
//     return null;
//   }

//   const formatValue = (value: unknown): string => {
//     if (typeof value === "number") {
//       return value.toFixed(4);
//     }
//     return String(value);
//   };

//   return (
//     <div className="mt-8">
//       <h2 className="text-xl font-semibold mb-4">Détail des calculs</h2>
//       <Accordion type="single" collapsible className="w-full">
//         {result.steps.map((step, index) => (
//           <AccordionItem key={index} value={`item-${index}`}>
//             <AccordionTrigger>
//               <div className="flex items-center gap-2">
//                 {step.phase === "Initial" && (
//                   <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
//                     {step.phase}
//                   </span>
//                 )}
//                 {step.phase === "Phase I" && (
//                   <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
//                     {step.phase}
//                   </span>
//                 )}
//                 {step.phase === "Phase II" && (
//                   <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
//                     {step.phase}
//                   </span>
//                 )}
//                 {step.iteration && (
//                   <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
//                     Itération {step.iteration}
//                   </span>
//                 )}
//                 <span>{step.message}</span>
//               </div>
//             </AccordionTrigger>
//             <AccordionContent>
//               {step.pivot && (
//                 <div className="mb-4 p-3 bg-yellow-50 rounded">
//                   <p>
//                     Pivot: Ligne {step.pivot.row + 1}, Colonne {step.pivot.col + 1} (Valeur: {step.pivot.value.toFixed(4)})
//                   </p>
//                 </div>
//               )}
              
//               {hasTableau(step) && (
//                 <div className="overflow-auto max-w-full">
//                   <Table className="border">
//                     <TableHeader>
//                       <TableRow>
//                         {step.tableau[0].map((_, colIndex) => (
//                           <TableHead key={colIndex} className="border px-2 py-1">
//                             {colIndex === step.tableau[0].length - 1 ? "RHS" : `Col ${colIndex + 1}`}
//                           </TableHead>
//                         ))}
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {step.tableau.map((row, rowIndex) => (
//                         <TableRow key={rowIndex}>
//                           {row.map((cell, cellIndex) => (
//                             <TableCell 
//                               key={cellIndex} 
//                               className={`border px-2 py-1 ${
//                                 step.pivot?.row === rowIndex && step.pivot?.col === cellIndex
//                                   ? "bg-yellow-100 font-bold"
//                                   : ""
//                               }`}
//                             >
//                               {formatValue(cell)}
//                             </TableCell>
//                           ))}
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               )}
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>
//     </div>
//   );
// };















"use client";

import React from "react";
import { SolverResult, SolverStep } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface SolutionStepsProps {
  result: SolverResult | null;
}

const hasTableau = (step: SolverStep): step is SolverStep & { tableau: number[][] } => {
  return !!step.tableau && Array.isArray(step.tableau) && step.tableau.length > 0 && Array.isArray(step.tableau[0]);
};

export const SolutionSteps: React.FC<SolutionStepsProps> = ({ result }) => {
  // Debug: Afficher la structure complète du résultat
  console.log("SolutionSteps - result:", result);

  if (!result || !result.steps || !Array.isArray(result.steps)) {
    console.log("No steps to display");
    return null;
  }

  const formatValue = (value: unknown): string => {
    if (typeof value === "number") {
      return value.toFixed(4);
    }
    return String(value);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Détail des calculs</h2>
      <Accordion type="single" collapsible className="w-full">
        {result.steps.map((step, index) => {
          // Debug pour chaque étape
          console.log(`Step ${index}:`, step);
          
          return (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>
                <div className="flex items-center gap-2">
                  {step.phase === "Initial" && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {step.phase}
                    </span>
                  )}
                  {step.phase === "Phase I" && (
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                      {step.phase}
                    </span>
                  )}
                  {step.phase === "Phase II" && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {step.phase}
                    </span>
                  )}
                  {step.iteration && (
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      Itération {step.iteration}
                    </span>
                  )}
                  <span>{step.message}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {step.pivot && (
                  <div className="mb-4 p-3 bg-yellow-50 rounded">
                    <p>
                      Pivot: Ligne {step.pivot.row + 1}, Colonne {step.pivot.col + 1} (Valeur: {step.pivot.value.toFixed(4)})
                    </p>
                  </div>
                )}
                
                {hasTableau(step) && (
                  <div className="overflow-auto max-w-full">
                    <Table className="border">
                      <TableHeader>
                        <TableRow>
                          {step.tableau[0].map((_, colIndex) => (
                            <TableHead key={colIndex} className="border px-2 py-1">
                              {colIndex === step.tableau[0].length - 1 ? "RHS" : `Col ${colIndex + 1}`}
                            </TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {step.tableau.map((row, rowIndex) => (
                          <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <TableCell 
                                key={cellIndex} 
                                className={`border px-2 py-1 ${
                                  step.pivot?.row === rowIndex && step.pivot?.col === cellIndex
                                    ? "bg-yellow-100 font-bold"
                                    : ""
                                }`}
                              >
                                {formatValue(cell)}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};