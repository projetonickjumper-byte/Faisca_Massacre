"use client"

import { useState } from "react"
import { Flame, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface TMBResult {
  tmb: number
  tdee: number
  deficit: number
  surplus: number
}

const ACTIVITY_LEVELS = [
  { value: "sedentary", label: "Sedentário", multiplier: 1.2, description: "Pouco ou nenhum exercício" },
  { value: "light", label: "Leve", multiplier: 1.375, description: "Exercício leve 1-3 dias/semana" },
  { value: "moderate", label: "Moderado", multiplier: 1.55, description: "Exercício moderado 3-5 dias/semana" },
  { value: "active", label: "Ativo", multiplier: 1.725, description: "Exercício intenso 6-7 dias/semana" },
  { value: "veryActive", label: "Muito Ativo", multiplier: 1.9, description: "Exercício muito intenso + trabalho físico" },
]

function calculateTMB(
  weight: number,
  height: number,
  age: number,
  gender: string,
  activityLevel: string
): TMBResult | null {
  if (weight <= 0 || height <= 0 || age <= 0) return null

  // Formula de Mifflin-St Jeor (mais precisa)
  let tmb: number
  if (gender === "male") {
    tmb = 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    tmb = 10 * weight + 6.25 * height - 5 * age - 161
  }

  const activity = ACTIVITY_LEVELS.find((a) => a.value === activityLevel)
  const multiplier = activity?.multiplier || 1.2

  const tdee = tmb * multiplier
  const deficit = tdee - 500 // Para perda de peso
  const surplus = tdee + 300 // Para ganho de massa

  return { tmb: Math.round(tmb), tdee: Math.round(tdee), deficit: Math.round(deficit), surplus: Math.round(surplus) }
}

export function TMBCalculator() {
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("male")
  const [activityLevel, setActivityLevel] = useState("moderate")
  const [result, setResult] = useState<TMBResult | null>(null)

  const handleCalculate = () => {
    const w = parseFloat(weight)
    const h = parseFloat(height)
    const a = parseInt(age)
    const tmbResult = calculateTMB(w, h, a, gender, activityLevel)
    setResult(tmbResult)
  }

  const handleReset = () => {
    setWeight("")
    setHeight("")
    setAge("")
    setGender("male")
    setActivityLevel("moderate")
    setResult(null)
  }

  return (
    <Card className="bg-gradient-to-br from-red-500/10 via-pink-500/5 to-background border-red-500/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-red-500/20 p-2">
              <Flame className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <CardTitle className="text-base">Calculadora de TMB</CardTitle>
              <CardDescription className="text-xs">Taxa Metabólica Basal</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1.5">
            <Label htmlFor="tmb-weight" className="text-xs">Peso (kg)</Label>
            <Input
              id="tmb-weight"
              type="number"
              placeholder="70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="h-9 bg-secondary/50"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tmb-height" className="text-xs">Altura (cm)</Label>
            <Input
              id="tmb-height"
              type="number"
              placeholder="170"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="h-9 bg-secondary/50"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="tmb-age" className="text-xs">Idade</Label>
            <Input
              id="tmb-age"
              type="number"
              placeholder="25"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="h-9 bg-secondary/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1.5">
            <Label className="text-xs">Sexo</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="h-9 bg-secondary/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Masculino</SelectItem>
                <SelectItem value="female">Feminino</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Atividade</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger className="h-9 bg-secondary/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ACTIVITY_LEVELS.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={handleCalculate} 
            className="flex-1 bg-red-500 hover:bg-red-600"
            disabled={!weight || !height || !age}
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
          <div className="rounded-lg bg-card p-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground mb-1">TMB (Repouso)</p>
                <p className="text-2xl font-bold text-foreground">{result.tmb}</p>
                <p className="text-xs text-muted-foreground">kcal/dia</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-xs text-muted-foreground mb-1">TDEE (Gasto Total)</p>
                <p className="text-2xl font-bold text-red-400">{result.tdee}</p>
                <p className="text-xs text-muted-foreground">kcal/dia</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 rounded-lg bg-blue-500/10">
                <p className="text-xs text-muted-foreground">Perder peso</p>
                <p className="text-lg font-semibold text-blue-400">{result.deficit} kcal</p>
              </div>
              <div className="text-center p-2 rounded-lg bg-green-500/10">
                <p className="text-xs text-muted-foreground">Ganhar massa</p>
                <p className="text-lg font-semibold text-green-400">{result.surplus} kcal</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
              <p>
                TMB e a energia que seu corpo gasta em repouso. TDEE considera sua atividade fisica.
                Para emagrecer, consuma menos que o TDEE. Para ganhar massa, consuma mais.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
