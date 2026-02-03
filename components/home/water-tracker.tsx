"use client"

import { useState, useEffect } from "react"
import { Droplets, Plus, Minus, Target, RotateCcw, TrendingUp, History, Settings, ChevronDown, ChevronUp, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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

interface WaterTrackerProps {
  className?: string
}

interface DayRecord {
  date: string
  intake: number
  goal: number
}

const GLASS_SIZE = 250
const GOAL_OPTIONS = [1500, 2000, 2500, 3000, 3500, 4000]

export function WaterTracker({ className }: WaterTrackerProps) {
  const [waterIntake, setWaterIntake] = useState(0)
  const [dailyGoal, setDailyGoal] = useState(2000)
  const [lastReset, setLastReset] = useState<string>("")
  const [history, setHistory] = useState<DayRecord[]>([])
  const [showHistory, setShowHistory] = useState(false)
  const [goalDialogOpen, setGoalDialogOpen] = useState(false)

  useEffect(() => {
    const today = new Date().toDateString()
    const savedData = localStorage.getItem("fitapp_water_tracker")
    const savedHistory = localStorage.getItem("fitapp_water_history")
    const savedGoal = localStorage.getItem("fitapp_water_goal")
    
    if (savedGoal) {
      setDailyGoal(Number(savedGoal))
    }

    if (savedHistory) {
      try {
        const historyData = JSON.parse(savedHistory) as DayRecord[]
        setHistory(historyData.slice(-30))
      } catch {
        setHistory([])
      }
    }
    
    if (savedData) {
      try {
        const data = JSON.parse(savedData)
        if (data.date !== today) {
          if (data.intake > 0) {
            const newHistory = [...history, { 
              date: data.date, 
              intake: data.intake,
              goal: savedGoal ? Number(savedGoal) : 2000
            }].slice(-30)
            setHistory(newHistory)
            localStorage.setItem("fitapp_water_history", JSON.stringify(newHistory))
          }
          
          setWaterIntake(0)
          setLastReset(today)
          localStorage.setItem("fitapp_water_tracker", JSON.stringify({
            intake: 0,
            date: today
          }))
        } else {
          setWaterIntake(data.intake)
          setLastReset(data.date)
        }
      } catch {
        setWaterIntake(0)
        setLastReset(today)
      }
    } else {
      setLastReset(today)
    }
  }, [])

  useEffect(() => {
    if (lastReset) {
      localStorage.setItem("fitapp_water_tracker", JSON.stringify({
        intake: waterIntake,
        date: lastReset
      }))
    }
  }, [waterIntake, lastReset])

  const addWater = (amount: number = GLASS_SIZE) => {
    setWaterIntake(prev => Math.min(prev + amount, 10000))
  }

  const removeWater = () => {
    setWaterIntake(prev => Math.max(prev - GLASS_SIZE, 0))
  }

  const resetWater = () => {
    setWaterIntake(0)
  }

  const updateGoal = (newGoal: number) => {
    setDailyGoal(newGoal)
    localStorage.setItem("fitapp_water_goal", String(newGoal))
    setGoalDialogOpen(false)
  }

  const progress = Math.min((waterIntake / dailyGoal) * 100, 100)
  const glassesCount = Math.floor(waterIntake / GLASS_SIZE)
  const remaining = Math.max(dailyGoal - waterIntake, 0)
  const goalReached = waterIntake >= dailyGoal

  const totalDrops = 8
  const filledDrops = Math.round((waterIntake / dailyGoal) * totalDrops)

  const last7Days = history.slice(-7)
  const avgIntake = last7Days.length > 0 
    ? Math.round(last7Days.reduce((sum, d) => sum + d.intake, 0) / last7Days.length)
    : 0
  const daysGoalReached = last7Days.filter(d => d.intake >= d.goal).length

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === yesterday.toDateString()) {
      return "Ontem"
    }
    
    return date.toLocaleDateString("pt-BR", { weekday: "short", day: "numeric" })
  }

  return (
    <Card className={cn("bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-background border-blue-500/20", className)}>
      <CardHeader className="pb-2 px-4">
        <CardTitle className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/20">
              <Droplets className="h-3.5 w-3.5 text-blue-400" />
            </div>
            <span>Agua</span>
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
                  <DialogTitle className="text-base">Meta Diaria</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-3 gap-2 py-3">
                  {GOAL_OPTIONS.map((goal) => (
                    <Button
                      key={goal}
                      variant={dailyGoal === goal ? "default" : "outline"}
                      size="sm"
                      className={cn(
                        "h-10 flex-col gap-0 text-xs",
                        dailyGoal === goal && "bg-blue-500 hover:bg-blue-600"
                      )}
                      onClick={() => updateGoal(goal)}
                    >
                      <span className="font-bold">{goal / 1000}L</span>
                    </Button>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={resetWater}
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4">
        {/* Quantidade e gotas */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className={cn(
                "text-2xl font-bold tabular-nums",
                goalReached ? "text-green-400" : "text-blue-400"
              )}>
                {waterIntake}
              </span>
              <span className="text-sm text-muted-foreground">ml</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {glassesCount} copos de {GLASS_SIZE}ml
            </p>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalDrops }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-4 w-2.5 rounded-full transition-all",
                  i < filledDrops ? "bg-blue-400" : "bg-secondary"
                )}
                style={{ clipPath: "polygon(50% 0%, 100% 60%, 80% 100%, 20% 100%, 0% 60%)" }}
              />
            ))}
          </div>
        </div>

        {/* Progresso */}
        <div className="space-y-1.5">
          <Progress value={progress} className="h-2 bg-secondary" />
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Meta: {dailyGoal / 1000}L</span>
            {goalReached ? (
              <span className="flex items-center gap-1 text-green-400 font-medium">
                <TrendingUp className="h-3 w-3" />
                Atingida!
              </span>
            ) : (
              <span className="text-muted-foreground">Faltam {remaining}ml</span>
            )}
          </div>
        </div>

        {/* Botoes */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-border bg-transparent"
            onClick={removeWater}
            disabled={waterIntake === 0}
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <Button
            className="h-9 gap-1.5 rounded-full bg-blue-500 px-4 text-sm text-white hover:bg-blue-600"
            onClick={() => addWater()}
          >
            <Plus className="h-3.5 w-3.5" />
            +250ml
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full border-border bg-transparent"
            onClick={() => addWater()}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>

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
                  <p className="text-lg font-bold">{avgIntake}ml</p>
                  <p className="text-[10px] text-muted-foreground">Media 7 dias</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-2 text-center">
                  <p className="text-lg font-bold">{daysGoalReached}/{last7Days.length}</p>
                  <p className="text-[10px] text-muted-foreground">Metas batidas</p>
                </div>
              </div>
            )}
            {history.length > 0 ? (
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {[...history].reverse().slice(0, 7).map((record, index) => {
                  const dayGoalReached = record.intake >= record.goal
                  return (
                    <div key={index} className="flex items-center justify-between rounded bg-secondary/30 px-2 py-1.5 text-xs">
                      <div className="flex items-center gap-2">
                        {dayGoalReached ? (
                          <Check className="h-3 w-3 text-green-400" />
                        ) : (
                          <Droplets className="h-3 w-3 text-muted-foreground" />
                        )}
                        <span>{formatDate(record.date)}</span>
                      </div>
                      <span className={dayGoalReached ? "text-green-400 font-medium" : "text-muted-foreground"}>
                        {record.intake}ml
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
