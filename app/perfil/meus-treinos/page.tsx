"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Dumbbell,
  Clock,
  Target,
  ChevronDown,
  ChevronUp,
  Calendar,
  Play,
  CheckCircle2,
} from "lucide-react"
import { Header } from "@/components/header"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  rest: string
  notes?: string
  completed?: boolean
}

interface Workout {
  id: string
  name: string
  description: string
  objective: string
  level: string
  duration: string
  exercises: Exercise[]
  assignedDate: string
  trainerName: string
  lastCompleted?: string
  completionCount: number
}

// Mock data - treinos atribuídos ao aluno
const mockMyWorkouts: Workout[] = [
  {
    id: "1",
    name: "Treino A - Peito e Tríceps",
    description: "Treino focado em hipertrofia de peito e tríceps",
    objective: "hipertrofia",
    level: "intermediario",
    duration: "60 min",
    exercises: [
      { id: "e1", name: "Supino Reto", sets: 4, reps: "8-12", rest: "90s", notes: "Controle na descida" },
      { id: "e2", name: "Supino Inclinado Halteres", sets: 3, reps: "10-12", rest: "60s" },
      { id: "e3", name: "Crucifixo", sets: 3, reps: "12-15", rest: "60s" },
      { id: "e4", name: "Tríceps Corda", sets: 3, reps: "12-15", rest: "45s" },
      { id: "e5", name: "Tríceps Francês", sets: 3, reps: "10-12", rest: "45s" },
    ],
    assignedDate: "2024-01-10",
    trainerName: "Carlos Silva",
    lastCompleted: "2024-01-15",
    completionCount: 8,
  },
  {
    id: "2",
    name: "Treino B - Costas e Bíceps",
    description: "Treino focado em desenvolvimento de costas e bíceps",
    objective: "hipertrofia",
    level: "intermediario",
    duration: "55 min",
    exercises: [
      { id: "e6", name: "Puxada Frontal", sets: 4, reps: "8-12", rest: "90s" },
      { id: "e7", name: "Remada Curvada", sets: 4, reps: "8-10", rest: "90s" },
      { id: "e8", name: "Remada Unilateral", sets: 3, reps: "10-12", rest: "60s" },
      { id: "e9", name: "Rosca Direta", sets: 3, reps: "10-12", rest: "45s" },
      { id: "e10", name: "Rosca Martelo", sets: 3, reps: "12-15", rest: "45s" },
    ],
    assignedDate: "2024-01-10",
    trainerName: "Carlos Silva",
    lastCompleted: "2024-01-14",
    completionCount: 7,
  },
  {
    id: "3",
    name: "Treino C - Pernas",
    description: "Treino completo de membros inferiores",
    objective: "hipertrofia",
    level: "intermediario",
    duration: "70 min",
    exercises: [
      { id: "e11", name: "Agachamento Livre", sets: 4, reps: "8-10", rest: "120s", notes: "Atenção à postura" },
      { id: "e12", name: "Leg Press 45°", sets: 4, reps: "10-12", rest: "90s" },
      { id: "e13", name: "Cadeira Extensora", sets: 3, reps: "12-15", rest: "60s" },
      { id: "e14", name: "Mesa Flexora", sets: 3, reps: "12-15", rest: "60s" },
      { id: "e15", name: "Panturrilha em Pé", sets: 4, reps: "15-20", rest: "45s" },
    ],
    assignedDate: "2024-01-10",
    trainerName: "Carlos Silva",
    completionCount: 6,
  },
]

export default function MeusTreinosPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null)
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null)
  const [exerciseProgress, setExerciseProgress] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const getObjectiveBadge = (objective: string) => {
    const colors: Record<string, string> = {
      hipertrofia: "bg-blue-500/20 text-blue-500",
      emagrecimento: "bg-green-500/20 text-green-500",
      resistencia: "bg-orange-500/20 text-orange-500",
      forca: "bg-red-500/20 text-red-500",
      flexibilidade: "bg-purple-500/20 text-purple-500",
    }
    return <Badge className={colors[objective]}>{objective}</Badge>
  }

  const getLevelBadge = (level: string) => {
    const labels: Record<string, string> = {
      iniciante: "Iniciante",
      intermediario: "Intermediário",
      avancado: "Avançado",
    }
    return <Badge variant="outline">{labels[level]}</Badge>
  }

  const startWorkout = (workoutId: string) => {
    setActiveWorkout(workoutId)
    setExerciseProgress({})
  }

  const toggleExercise = (exerciseId: string) => {
    setExerciseProgress(prev => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }))
  }

  const getWorkoutProgress = (workout: Workout) => {
    const completedCount = workout.exercises.filter(e => exerciseProgress[e.id]).length
    return (completedCount / workout.exercises.length) * 100
  }

  const finishWorkout = () => {
    setActiveWorkout(null)
    setExerciseProgress({})
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        <Header />

        <main className="mx-auto max-w-4xl px-4 py-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/perfil">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Meus Treinos</h1>
              <p className="text-muted-foreground">Treinos atribuídos pelo seu treinador</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <Dumbbell className="h-6 w-6 mx-auto text-primary mb-2" />
                <p className="text-2xl font-bold text-foreground">{mockMyWorkouts.length}</p>
                <p className="text-xs text-muted-foreground">Treinos</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <CheckCircle2 className="h-6 w-6 mx-auto text-green-500 mb-2" />
                <p className="text-2xl font-bold text-foreground">
                  {mockMyWorkouts.reduce((acc, w) => acc + w.completionCount, 0)}
                </p>
                <p className="text-xs text-muted-foreground">Concluídos</p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <Calendar className="h-6 w-6 mx-auto text-blue-500 mb-2" />
                <p className="text-2xl font-bold text-foreground">21</p>
                <p className="text-xs text-muted-foreground">Dias seguidos</p>
              </CardContent>
            </Card>
          </div>

          {/* Workouts List */}
          <div className="space-y-4">
            {mockMyWorkouts.map((workout) => (
              <Card key={workout.id} className="bg-card border-border overflow-hidden">
                <CardContent className="p-0">
                  {/* Header */}
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer"
                    onClick={() => setExpandedWorkout(expandedWorkout === workout.id ? null : workout.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Dumbbell className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{workout.name}</h3>
                        <p className="text-sm text-muted-foreground">{workout.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {activeWorkout === workout.id ? (
                        <Badge className="bg-green-500/20 text-green-500">Em andamento</Badge>
                      ) : (
                        <>
                          <div className="hidden sm:flex items-center gap-2">
                            {getObjectiveBadge(workout.objective)}
                            <Badge variant="outline" className="gap-1">
                              <Clock className="h-3 w-3" />
                              {workout.duration}
                            </Badge>
                          </div>
                        </>
                      )}
                      {expandedWorkout === workout.id ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedWorkout === workout.id && (
                    <div className="border-t border-border p-4 bg-secondary/30">
                      {/* Workout Info */}
                      <div className="flex flex-wrap items-center gap-2 mb-4 sm:hidden">
                        {getObjectiveBadge(workout.objective)}
                        {getLevelBadge(workout.level)}
                        <Badge variant="outline" className="gap-1">
                          <Clock className="h-3 w-3" />
                          {workout.duration}
                        </Badge>
                      </div>

                      {/* Progress Bar (when active) */}
                      {activeWorkout === workout.id && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progresso</span>
                            <span className="text-foreground font-medium">
                              {Math.round(getWorkoutProgress(workout))}%
                            </span>
                          </div>
                          <Progress value={getWorkoutProgress(workout)} className="h-2" />
                        </div>
                      )}

                      {/* Exercises */}
                      <h4 className="font-medium text-foreground mb-3">
                        Exercícios ({workout.exercises.length})
                      </h4>
                      <div className="space-y-2">
                        {workout.exercises.map((exercise, index) => (
                          <div
                            key={exercise.id}
                            className={`flex items-center justify-between rounded-lg p-3 transition-colors ${
                              activeWorkout === workout.id
                                ? exerciseProgress[exercise.id]
                                  ? "bg-green-500/10 border border-green-500/30"
                                  : "bg-background cursor-pointer hover:bg-secondary"
                                : "bg-background"
                            }`}
                            onClick={() => activeWorkout === workout.id && toggleExercise(exercise.id)}
                          >
                            <div className="flex items-center gap-3">
                              {activeWorkout === workout.id ? (
                                <div
                                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                                    exerciseProgress[exercise.id]
                                      ? "bg-green-500 border-green-500"
                                      : "border-muted-foreground"
                                  }`}
                                >
                                  {exerciseProgress[exercise.id] && (
                                    <CheckCircle2 className="h-4 w-4 text-white" />
                                  )}
                                </div>
                              ) : (
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                                  {index + 1}
                                </span>
                              )}
                              <div>
                                <p className={`font-medium ${exerciseProgress[exercise.id] ? "text-green-500 line-through" : "text-foreground"}`}>
                                  {exercise.name}
                                </p>
                                {exercise.notes && (
                                  <p className="text-xs text-muted-foreground">{exercise.notes}</p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-foreground">
                                {exercise.sets} x {exercise.reps}
                              </p>
                              <p className="text-xs text-muted-foreground">Descanso: {exercise.rest}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                        <div className="text-sm text-muted-foreground">
                          <p>Treinador: {workout.trainerName}</p>
                          {workout.lastCompleted && (
                            <p>Último treino: {new Date(workout.lastCompleted).toLocaleDateString("pt-BR")}</p>
                          )}
                        </div>
                        {activeWorkout === workout.id ? (
                          <Button onClick={finishWorkout} disabled={getWorkoutProgress(workout) < 100}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Finalizar Treino
                          </Button>
                        ) : (
                          <Button onClick={() => startWorkout(workout.id)}>
                            <Play className="mr-2 h-4 w-4" />
                            Iniciar Treino
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {mockMyWorkouts.length === 0 && (
            <div className="text-center py-12">
              <Dumbbell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Você ainda não tem treinos atribuídos</p>
              <p className="text-sm text-muted-foreground mt-2">
                Entre em contato com seu treinador para receber seus treinos personalizados
              </p>
            </div>
          )}
        </main>
      </div>
    </AppShell>
  )
}
