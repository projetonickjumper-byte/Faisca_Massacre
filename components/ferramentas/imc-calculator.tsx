"use client"

import { useState } from "react"
import { Calculator, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface IMCResult {
  value: number
  classification: string
  color: string
  description: string
}

function calculateIMC(weight: number, height: number): IMCResult | null {
  if (weight <= 0 || height <= 0) return null
  
  const heightInMeters = height / 100
  const imc = weight / (heightInMeters * heightInMeters)
  
  let classification: string
  let color: string
  let description: string
  
  if (imc < 18.5) {
    classification = "Abaixo do peso"
    color = "text-blue-400"
    description = "Procure um nutricionista para ganhar peso de forma saudavel."
  } else if (imc < 25) {
    classification = "Peso normal"
    color = "text-green-400"
    description = "Parabens! Mantenha seus habitos saudaveis."
  } else if (imc < 30) {
    classification = "Sobrepeso"
    color = "text-yellow-400"
    description = "Atencao! Considere ajustar dieta e exercicios."
  } else if (imc < 35) {
    classification = "Obesidade Grau I"
    color = "text-orange-400"
    description = "Recomenda-se acompanhamento medico e nutricional."
  } else if (imc < 40) {
    classification = "Obesidade Grau II"
    color = "text-red-400"
    description = "Importante buscar orientacao medica especializada."
  } else {
    classification = "Obesidade Grau III"
    color = "text-red-500"
    description = "Procure ajuda medica urgente para sua saude."
  }
  
  return { value: imc, classification, color, description }
}

export function IMCCalculator() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [result, setResult] = useState<IMCResult | null>(null)

  const handleCalculate = () => {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    const imcResult = calculateIMC(w, h)
    setResult(imcResult)
  }

  const handleReset = () => {
    setWeight("")
    setHeight("")
    setResult(null)
  }

  return (
    <Card className="bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-background border-purple-500/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-purple-500/20 p-2">
              <Calculator className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-base">Calculadora de IMC</CardTitle>
              <CardDescription className="text-xs">Indice de Massa Corporal</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="weight" className="text-xs">Peso (kg)</Label>
            <Input
              id="weight"
              type="number"
              placeholder="70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="h-9 bg-secondary/50"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="height" className="text-xs">Altura (cm)</Label>
            <Input
              id="height"
              type="number"
              placeholder="170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="h-9 bg-secondary/50"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleCalculate} 
            className="flex-1 bg-purple-500 hover:bg-purple-600"
            disabled={!weight || !height}
          >
            Calcular
          </Button>
          {result && (
            <Button variant="outline" onClick={handleReset} className="bg-transparent">
              Limpar
            </Button>
          )}
        </div>

        {result && (
          <div className="rounded-lg bg-card p-4 space-y-3">
            <div className="text-center">
              <span className={cn("text-4xl font-bold", result.color)}>
                {result.value.toFixed(1)}
              </span>
              <p className={cn("text-sm font-medium mt-1", result.color)}>
                {result.classification}
              </p>
            </div>
            
            {/* Barra visual de IMC */}
            <div className="relative h-2 rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 via-orange-400 to-red-500">
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-foreground shadow-lg"
                style={{ 
                  left: `${Math.min(Math.max((result.value - 15) / 30 * 100, 0), 100)}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>15</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>35</span>
              <span>45</span>
            </div>
            
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              <p>{result.description}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
