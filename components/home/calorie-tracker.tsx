"use client"

import { useState, useEffect } from "react"
import { Flame, Plus, Minus, Target, RotateCcw, TrendingUp, History, Settings, ChevronDown, ChevronUp, Check, Apple, Utensils, Coffee, Cookie } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

interface CalorieTrackerProps {
  className?: string
}

interface DayRecord {
  date: string
  intake: number
  goal: number
}

interface MealEntry {
  id: string
  name: string
  calories: number
  type: "breakfast" | "lunch" | "dinner" | "snack"
  time: string
}

const GOAL_OPTIONS = [1200, 1500, 1800, 2000, 2200, 2500, 2800, 3000]

const QUICK_ADD_OPTIONS = [
  { label: "Cafe", calories: 50, icon: Coffee },
  { label: "Fruta", calories: 80, icon: Apple },
  { label: "Lanche", calories: 150, icon: Cookie },
  { label: "Refeicao", calories: 500, icon: Utensils },
]

const MEAL_TYPES = {
  breakfast: { label: "Cafe", icon: Coffee },
  lunch: { label: "Almoco", icon: Utensils },
  dinner: { label: "Jantar", icon: Utensils },
  snack: { label: "Lanche", icon: Cookie },
}

export function CalorieTracker({ className }: CalorieTrackerProps) {
  const [calorieIntake, setCalorieIntake] = useState(0)
  const [dailyGoal, setDailyGoal] = useState(2000)
  const [lastReset, setLastReset] = useState<string>("")
  const [history, setHistory] = useState<DayRecord[]>([])
  const [meals, setMeals] = useState<MealEntry[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [showMeals, setShowMeals] = useState(false)
  const [goalDialogOpen, setGoalDialogOpen] = useState(false)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [customCalories, setCustomCalories] = useState("")
  const [customName, setCustomName] = useState("")
  const [selectedMealType, setSelectedMealType] = useState<MealEntry["type"]>("snack")

  useEffect(() => {
    const today = new Date().toDateString()
    const savedData = localStorage.getItem("fitapp_calorie_tracker")
    const savedHistory = localStorage.getItem("fitapp_calorie_history")
    const savedGoal = localStorage.getItem("fitapp_calorie_goal")
    const savedMeals = localStorage.getItem("fitapp_calorie_meals")
    
    if (savedGoal) setDailyGoal(Number(savedGoal))
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory).slice(-30))
      } catch {
        setHistory([])
      }
    }
    
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        if (data.date !== today) {
          if (data.intake > 0) {
            const newHistory = [...history, { date: data.date, intake: data.intake, goal: savedGoal ? Number(savedGoal) : 2000 }].slice(-30)
            setHistory(newHistory)
            localStorage.setItem("fitapp_calorie_history", JSON.stringify(newHistory))
          }
          setCalorieIntake(0)
          setMeals([])
          setLastReset(today)
          localStorage.setItem("fitapp_calorie_tracker", JSON.stringify({ intake: 0, date: today }))
          localStorage.setItem("fitapp_calorie_meals", JSON.stringify([]))
        } else {
          setCalorieIntake(data.intake)
          setLastReset(data.date)
          if (savedMeals) {
            try { setMeals(JSON.parse(savedMeals)) } catch { setMeals([]) }
          }
        }
      } catch {
        setCalorieIntake(0)
        setLastReset(today)
      }
    } else {
      setLastReset(today)
    }
  }, [])

  useEffect(() => {
    if (lastReset) {
      localStorage.setItem("fitapp_calorie_tracker", JSON.stringify({ intake: calorieIntake, date: lastReset }))
      localStorage.setItem("fitapp_calorie_meals", JSON.stringify(meals))
    }
  }, [calorieIntake, lastReset, meals])

  const addCalories = (amount: number, name?: string, type?: MealEntry["type"]) => {
    setCalorieIntake(prev => prev + amount)
    const now = new Date()
    const newMeal: MealEntry = {
      id: Date.now().toString(),
      name: name || `${amount} kcal`,
      calories: amount,
      type: type || selectedMealType,
      time: now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    }
    setMeals(prev => [...prev, newMeal])
  }

  const removeMeal = (id: string) => {
    const meal = meals.find(m => m.id === id)
    if (meal) {
      setCalorieIntake(prev => Math.max(prev - meal.calories, 0))
      setMeals(prev => prev.filter(m => m.id !== id))
    }
  }

  const handleQuickAdd = (calories: number, label: string) => addCalories(calories, label)

  const handleCustomAdd = () => {
    const calories = Number(customCalories)
    if (calories > 0) {
      addCalories(calories, customName || `${calories} kcal`, selectedMealType)
      setCustomCalories("")
      setCustomName("")
      setAddDialogOpen(false)
    }
  }

  const resetCalories = () => { setCalorieIntake(0); setMeals([]) }

  const updateGoal = (newGoal: number) => {
    setDailyGoal(newGoal)
    localStorage.setItem("fitapp_calorie_goal", String(newGoal))
    setGoalDialogOpen(false)
  }

  const progress = Math.min((calorieIntake / dailyGoal) * 100, 100)
  const remaining = Math.max(dailyGoal - calorieIntake, 0)
  const isOverGoal = calorieIntake > dailyGoal
  const goalReached = calorieIntake >= dailyGoal * 0.9 && calorieIntake <= dailyGoal

  const last7Days = history.slice(-7)
  const avgIntake = last7Days.length > 0 ? Math.round(last7Days.reduce((sum, d) => sum + d.intake, 0) / last7Days.length) : 0
  const daysOnTarget = last7Days.filter(d => d.intake >= d.goal * 0.9 && d.intake <= d.goal * 1.1).length

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    if (date.toDateString() === yesterday.toDateString()) return "Ontem"
    return date.toLocaleDateString("pt-BR", { weekday: "short", day: "numeric" })
  }

  return (
    <Card className={cn("bg-gradient-to-br from-orange-500/10 via-red-500/5 to-background border-orange-500/20", className)}>
      <CardHeader className="pb-2 px-4">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/20">
              <Flame className="h-3.5 w-3.5 text-orange-400" />
            </div>
            <span>Calorias</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Dialog open={goalDialogOpen} onOpenChange={setGoalDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                  <Settings className="h-3.5 w-3.5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-xs">
                <DialogHeader>
                  <DialogTitle className="text-base">Meta Calorica</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-4 gap-2 py-3">
                  {GOAL_OPTIONS.map((goal) => (
                    <Button
                      key={goal}
                      variant={dailyGoal === goal ? "default" : "outline"}
                      size="sm"
                      className={cn("h-9 text-xs", dailyGoal === goal && "bg-orange-500 hover:bg-orange-600")}
                      onClick={() => updateGoal(goal)}
                    >
                      {goal}
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={resetCalories}>
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4">
        {/* Quantidade */}
        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className={cn(
              "text-2xl font-bold tabular-nums",
              isOverGoal ? "text-red-400" : goalReached ? "text-green-400" : "text-orange-400"
            )}>
              {calorieIntake}
            </span>
            <span className="text-sm text-muted-foreground">kcal</span>
          </div>
          <p className="text-[11px] text-muted-foreground">{meals.length} registros hoje</p>
        </div>

        {/* Progresso */}
        <div className="space-y-1.5">
          <Progress value={progress} className={cn("h-2 bg-secondary", isOverGoal && "[&>div]:bg-red-500")} />
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Meta: {dailyGoal} kcal</span>
            {isOverGoal ? (
              <span className="text-red-400 font-medium">+{calorieIntake - dailyGoal} acima</span>
            ) : goalReached ? (
              <span className="flex items-center gap-1 text-green-400 font-medium">
                <TrendingUp className="h-3 w-3" />Atingida!
              </span>
            ) : (
              <span className="text-muted-foreground">Restam {remaining}</span>
            )}
          </div>
        </div>

        {/* Botoes rapidos */}
        <div className="grid grid-cols-4 gap-1.5">
          {QUICK_ADD_OPTIONS.map((option) => (
            <Button
              key={option.label}
              variant="outline"
              className="h-auto flex-col gap-0 py-1.5 border-border bg-transparent hover:bg-orange-500/10 hover:border-orange-500/50"
              onClick={() => handleQuickAdd(option.calories, option.label)}
            >
              <option.icon className="h-3.5 w-3.5 text-orange-400" />
              <span className="text-[9px]">{option.label}</span>
              <span className="text-[9px] text-muted-foreground">+{option.calories}</span>
            </Button>
          ))}
        </div>

        {/* Botao adicionar */}
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full h-8 gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs">
              <Plus className="h-3.5 w-3.5" />
              Adicionar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xs">
            <DialogHeader>
              <DialogTitle className="text-base">Adicionar Calorias</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-3">
              <div className="grid grid-cols-4 gap-1.5">
                {(Object.entries(MEAL_TYPES) as [MealEntry["type"], typeof MEAL_TYPES.breakfast][]).map(([key, value]) => (
                  <Button
                    key={key}
                    variant={selectedMealType === key ? "default" : "outline"}
                    size="sm"
                    className={cn("h-8 flex-col gap-0 px-1", selectedMealType === key && "bg-orange-500 hover:bg-orange-600")}
                    onClick={() => setSelectedMealType(key)}
                  >
                    <value.icon className="h-3 w-3" />
                    <span className="text-[9px]">{value.label}</span>
                  </Button>
                ))}
              </div>
              <Input placeholder="Descricao (opcional)" value={customName} onChange={(e) => setCustomName(e.target.value)} className="h-9 text-sm" />
              <Input type="number" placeholder="Calorias" value={customCalories} onChange={(e) => setCustomCalories(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleCustomAdd()} className="h-9 text-sm" />
              <Button className="w-full h-9 bg-orange-500 hover:bg-orange-600 text-sm" onClick={handleCustomAdd} disabled={!customCalories || Number(customCalories) <= 0}>
                Adicionar
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Lista de refeicoes colapsavel */}
        {meals.length > 0 && (
          <Collapsible open={showMeals} onOpenChange={setShowMeals}>
            <CollapsibleTrigger asChild>
              <button className="flex w-full items-center justify-between text-xs text-muted-foreground hover:text-foreground transition-colors">
                <span>{meals.length} registros hoje</span>
                {showMeals ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-2">
              <div className="space-y-1 max-h-24 overflow-y-auto">
                {[...meals].reverse().slice(0, 5).map((meal) => {
                  const MealIcon = MEAL_TYPES[meal.type].icon
                  return (
                    <div key={meal.id} className="flex items-center justify-between rounded bg-secondary/30 px-2 py-1 text-xs">
                      <div className="flex items-center gap-1.5 truncate">
                        <MealIcon className="h-3 w-3 text-orange-400 shrink-0" />
                        <span className="truncate">{meal.name}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-medium">{meal.calories}</span>
                        <Button variant="ghost" size="icon" className="h-5 w-5 text-muted-foreground hover:text-red-400" onClick={() => removeMeal(meal.id)}>
                          <Minus className="h-2.5 w-2.5" />
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}

        {/* Historico colapsavel */}
        <Collapsible open={showHistory} onOpenChange={setShowHistory}>
          <CollapsibleTrigger asChild>
            <button className="flex w-full items-center justify-between pt-2 border-t border-border text-xs text-muted-foreground hover:text-foreground transition-colors">
              <div className="flex items-center gap-1.5">
                <History className="h-3.5 w-3.5" />
                <span>Historico</span>
              </div>
              {showHistory ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            {last7Days.length > 0 && (
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="rounded-lg bg-secondary/50 p-2 text-center">
                  <p className="text-lg font-bold">{avgIntake}</p>
                  <p className="text-[10px] text-muted-foreground">Media 7 dias</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-2 text-center">
                  <p className="text-lg font-bold">{daysOnTarget}/{last7Days.length}</p>
                  <p className="text-[10px] text-muted-foreground">Na meta</p>
                </div>
              </div>
            )}
            {history.length > 0 ? (
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {[...history].reverse().slice(0, 7).map((record, index) => {
                  const onTarget = record.intake >= record.goal * 0.9 && record.intake <= record.goal * 1.1
                  const over = record.intake > record.goal * 1.1
                  return (
                    <div key={index} className="flex items-center justify-between rounded bg-secondary/30 px-2 py-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        {onTarget ? <Check className="h-3 w-3 text-green-400" /> : <Flame className={cn("h-3 w-3", over ? "text-red-400" : "text-muted-foreground")} />}
                        <span>{formatDate(record.date)}</span>
                      </div>
                      <span className={cn(onTarget ? "text-green-400 font-medium" : over ? "text-red-400" : "text-muted-foreground")}>
                        {record.intake} kcal
                      </span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-center text-xs text-muted-foreground py-2">Sem historico</p>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
