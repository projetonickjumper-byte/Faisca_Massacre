"use client"

import { useState, useEffect } from "react"
import { Target, Plus, Trash2, Check, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Goal {
  id: string
  title: string
  target: number
  current: number
  unit: string
  category: string
  createdAt: string
}

const CATEGORIES = [
  { value: "treino", label: "Treino", color: "text-green-400" },
  { value: "nutricao", label: "Nutricao", color: "text-orange-400" },
  { value: "peso", label: "Peso", color: "text-blue-400" },
  { value: "outro", label: "Outro", color: "text-purple-400" },
]

const STORAGE_KEY = "fitapp-goals"

export function GoalsTracker() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [expanded, setExpanded] = useState(true)
  const [newGoal, setNewGoal] = useState({
    title: "",
    target: "",
    unit: "",
    category: "treino",
  })

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setGoals(JSON.parse(saved))
    }
  }, [])

  const saveGoals = (updatedGoals: Goal[]) => {
    setGoals(updatedGoals)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedGoals))
  }

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.target) return

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      target: parseFloat(newGoal.target),
      current: 0,
      unit: newGoal.unit || "x",
      category: newGoal.category,
      createdAt: new Date().toISOString(),
    }

    saveGoals([...goals, goal])
    setNewGoal({ title: "", target: "", unit: "", category: "treino" })
    setDialogOpen(false)
  }

  const handleUpdateProgress = (id: string, increment: number) => {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === id) {
        const newCurrent = Math.max(0, Math.min(goal.current + increment, goal.target * 2))
        return { ...goal, current: newCurrent }
      }
      return goal
    })
    saveGoals(updatedGoals)
  }

  const handleDeleteGoal = (id: string) => {
    saveGoals(goals.filter((goal) => goal.id !== id))
  }

  const completedGoals = goals.filter((g) => g.current >= g.target).length
  const totalGoals = goals.length

  return (
    <Card className="bg-gradient-to-br from-yellow-500/10 via-amber-500/5 to-background border-yellow-500/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-yellow-500/20 p-2">
              <Target className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <CardTitle className="text-base">Minhas Metas</CardTitle>
              <CardDescription className="text-xs">
                {completedGoals}/{totalGoals} concluidas
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Nova Meta</DialogTitle>
                  <DialogDescription>
                    Defina um objetivo para acompanhar seu progresso.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal-title">Titulo da meta</Label>
                    <Input
                      id="goal-title"
                      placeholder="Ex: Treinar 4x por semana"
                      value={newGoal.title}
                      onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="goal-target">Meta</Label>
                      <Input
                        id="goal-target"
                        type="number"
                        placeholder="4"
                        value={newGoal.target}
                        onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="goal-unit">Unidade</Label>
                      <Input
                        id="goal-unit"
                        placeholder="treinos"
                        value={newGoal.unit}
                        onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select
                      value={newGoal.category}
                      onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddGoal} className="w-full bg-yellow-500 hover:bg-yellow-600">
                    Criar Meta
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {expanded && (
        <CardContent className="space-y-3">
          {goals.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <Target className="h-10 w-10 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Nenhuma meta definida</p>
              <p className="text-xs">Clique no + para criar sua primeira meta</p>
            </div>
          ) : (
            goals.map((goal) => {
              const progress = Math.min((goal.current / goal.target) * 100, 100)
              const isCompleted = goal.current >= goal.target
              const category = CATEGORIES.find((c) => c.value === goal.category)
              
              return (
                <div
                  key={goal.id}
                  className={cn(
                    "rounded-lg bg-card p-3 space-y-2",
                    isCompleted && "border border-green-500/30"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {isCompleted && (
                          <Check className="h-4 w-4 text-green-400 shrink-0" />
                        )}
                        <p className={cn(
                          "text-sm font-medium truncate",
                          isCompleted && "text-green-400"
                        )}>
                          {goal.title}
                        </p>
                      </div>
                      <p className={cn("text-xs mt-0.5", category?.color)}>
                        {category?.label}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0"
                      onClick={() => handleDeleteGoal(goal.id)}
                    >
                      <Trash2 className="h-3 w-3 text-muted-foreground" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {goal.current} / {goal.target} {goal.unit}
                      </span>
                      <span className={cn(
                        "font-medium",
                        isCompleted ? "text-green-400" : "text-foreground"
                      )}>
                        {progress.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                  
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 text-xs bg-transparent"
                      onClick={() => handleUpdateProgress(goal.id, -1)}
                    >
                      -1
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 text-xs bg-transparent"
                      onClick={() => handleUpdateProgress(goal.id, 1)}
                    >
                      +1
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </CardContent>
      )}
    </Card>
  )
}
