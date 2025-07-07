"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, ArrowRight, CheckCircle, AlertCircle } from "lucide-react"

// Importer les types depuis le fichier types.ts
import type { SolverStep } from "@/lib/types"

// Supprimer l'interface TableauStep locale et utiliser SolverStep à la place
interface SolverStepsProps {
  steps: SolverStep[]
  isVisible: boolean
}

export function SolverSteps({ steps, isVisible }: SolverStepsProps) {
  if (!isVisible || steps.length === 0) {
    return null
  }

  const renderTableau = (data: number[][]) => {
    if (!data || data.length === 0) return null

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-2 py-1 text-center font-medium">Index</th>
              {data[0]?.map((_, colIndex) => (
                <th key={colIndex} className="border border-gray-300 px-2 py-1 text-center font-medium">
                  {colIndex}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="border border-gray-300 px-2 py-1 text-center font-medium">{rowIndex}</td>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="border border-gray-300 px-2 py-1 text-center">
                    {typeof cell === "number" ? cell.toFixed(4) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  const getStepIcon = (type: string) => {
    switch (type) {
      case "phase":
        return <ArrowRight className="h-4 w-4" />
      case "result":
        return <CheckCircle className="h-4 w-4" />
      case "pivot":
        return <Calculator className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStepColor = (type: string) => {
    switch (type) {
      case "phase":
        return "bg-blue-100 text-blue-800"
      case "result":
        return "bg-green-100 text-green-800"
      case "pivot":
        return "bg-orange-100 text-orange-800"
      case "tableau":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Étapes de Résolution - Méthode Simplex
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full">
            <div className="space-y-4">
              <AnimatePresence>
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <Badge className={getStepColor(step.type)}>
                        {getStepIcon(step.type)}
                        <span className="ml-1">{step.type.toUpperCase()}</span>
                      </Badge>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      {step.iteration && <Badge variant="outline">Itération {step.iteration}</Badge>}
                    </div>

                    {step.message && <p className="text-sm text-muted-foreground ml-6">{step.message}</p>}

                    {step.pivotInfo && (
                      <div className="ml-6 p-2 bg-orange-50 rounded-md">
                        <p className="text-sm">
                          🔄 Pivot sur l'élément à la ligne {step.pivotInfo.row + 1}, colonne {step.pivotInfo.col + 1}
                          (valeur: {step.pivotInfo.value.toFixed(4)})
                        </p>
                      </div>
                    )}

                    {step.data && <div className="ml-6">{renderTableau(step.data)}</div>}

                    {index < steps.length - 1 && <Separator className="my-4" />}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  )
}
