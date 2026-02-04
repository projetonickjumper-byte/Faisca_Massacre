"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  ClipboardList,
  Calendar,
  TrendingUp,
  TrendingDown,
  Minus,
  Scale,
  Ruler,
  Activity,
  Heart,
  Eye,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Header } from "@/components/header"
import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

interface PhysicalAssessment {
  id: string
  date: string
  trainerName: string
  measurements: {
    weight: number
    height: number
    bodyFat?: number
    muscleMass?: number
    chest?: number
    waist?: number
    hips?: number
    rightArm?: number
    leftArm?: number
    rightThigh?: number
    leftThigh?: number
    rightCalf?: number
    leftCalf?: number
  }
  vitals?: {
    heartRate?: number
    bloodPressure?: string
  }
  notes: string
  imc: number
  imcClassification: string
}

// Mock data - avaliações do aluno
const mockMyAssessments: PhysicalAssessment[] = [
  {
    id: "a1",
    date: "2024-01-15",
    trainerName: "Carlos Silva",
    measurements: {
      weight: 65,
      height: 165,
      bodyFat: 22,
      muscleMass: 28,
      chest: 92,
      waist: 72,
      hips: 98,
      rightArm: 28,
      leftArm: 27.5,
      rightThigh: 54,
      leftThigh: 53.5,
      rightCalf: 36,
      leftCalf: 35.5,
    },
    vitals: {
      heartRate: 68,
      bloodPressure: "120/80",
    },
    notes: "Excelente evolução! Foco em definição muscular para os próximos meses.",
    imc: 23.88,
    imcClassification: "Peso normal",
  },
  {
    id: "a2",
    date: "2023-12-01",
    trainerName: "Carlos Silva",
    measurements: {
      weight: 68,
      height: 165,
      bodyFat: 25,
      muscleMass: 26,
      chest: 94,
      waist: 76,
      hips: 100,
      rightArm: 29,
      leftArm: 28.5,
      rightThigh: 56,
      leftThigh: 55.5,
      rightCalf: 37,
      leftCalf: 36.5,
    },
    vitals: {
      heartRate: 72,
      bloodPressure: "125/82",
    },
    notes: "Boa evolução comparado à avaliação anterior. Continuar com dieta e treino atual.",
    imc: 24.98,
    imcClassification: "Peso normal",
  },
  {
    id: "a3",
    date: "2023-10-15",
    trainerName: "Carlos Silva",
    measurements: {
      weight: 72,
      height: 165,
      bodyFat: 28,
      muscleMass: 24,
      chest: 96,
      waist: 80,
      hips: 102,
      rightArm: 30,
      leftArm: 29.5,
      rightThigh: 58,
      leftThigh: 57.5,
      rightCalf: 38,
      leftCalf: 37.5,
    },
    vitals: {
      heartRate: 76,
      bloodPressure: "130/85",
    },
    notes: "Primeira avaliação. Objetivo: perda de gordura e ganho de massa muscular.",
    imc: 26.45,
    imcClassification: "Sobrepeso",
  },
]

export default function MinhasAvaliacoesPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [selectedAssessment, setSelectedAssessment] = useState<PhysicalAssessment | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)

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

  const sortedAssessments = [...mockMyAssessments].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const latestAssessment = sortedAssessments[0]
  const previousAssessment = sortedAssessments[1]

  const getIMCBadge = (classification: string) => {
    const colors: Record<string, string> = {
      "Abaixo do peso": "bg-yellow-500/20 text-yellow-500",
      "Peso normal": "bg-green-500/20 text-green-500",
      "Sobrepeso": "bg-orange-500/20 text-orange-500",
      "Obesidade Grau I": "bg-red-500/20 text-red-500",
      "Obesidade Grau II": "bg-red-600/20 text-red-600",
      "Obesidade Grau III": "bg-red-700/20 text-red-700",
    }
    return <Badge className={colors[classification]}>{classification}</Badge>
  }

  const getTrend = (current: number, previous: number, inverted = false) => {
    const diff = current - previous
    if (Math.abs(diff) < 0.1) return { icon: Minus, color: "text-muted-foreground", value: "0" }
    const isPositive = inverted ? diff < 0 : diff > 0
    if (isPositive) return { icon: TrendingUp, color: "text-green-500", value: `${diff > 0 ? "+" : ""}${diff.toFixed(1)}` }
    return { icon: TrendingDown, color: "text-red-500", value: diff.toFixed(1) }
  }

  // Calculate overall progress
  const firstAssessment = sortedAssessments[sortedAssessments.length - 1]
  const weightChange = latestAssessment.measurements.weight - firstAssessment.measurements.weight
  const fatChange = (latestAssessment.measurements.bodyFat || 0) - (firstAssessment.measurements.bodyFat || 0)
  const muscleChange = (latestAssessment.measurements.muscleMass || 0) - (firstAssessment.measurements.muscleMass || 0)

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
              <h1 className="text-2xl font-bold text-foreground">Minhas Avaliações</h1>
              <p className="text-muted-foreground">Acompanhe sua evolução física</p>
            </div>
          </div>

          {/* Evolution Summary */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Sua Evolução</CardTitle>
              <p className="text-sm text-muted-foreground">
                Desde {new Date(firstAssessment.date).toLocaleDateString("pt-BR")}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${weightChange < 0 ? "text-green-500" : weightChange > 0 ? "text-orange-500" : "text-foreground"}`}>
                    {weightChange > 0 ? "+" : ""}{weightChange.toFixed(1)} kg
                  </div>
                  <p className="text-xs text-muted-foreground">Peso</p>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${fatChange < 0 ? "text-green-500" : fatChange > 0 ? "text-red-500" : "text-foreground"}`}>
                    {fatChange > 0 ? "+" : ""}{fatChange.toFixed(1)}%
                  </div>
                  <p className="text-xs text-muted-foreground">Gordura</p>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${muscleChange > 0 ? "text-green-500" : muscleChange < 0 ? "text-red-500" : "text-foreground"}`}>
                    {muscleChange > 0 ? "+" : ""}{muscleChange.toFixed(1)} kg
                  </div>
                  <p className="text-xs text-muted-foreground">Massa Muscular</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <Scale className="h-5 w-5 mx-auto text-primary mb-2" />
                <p className="text-xl font-bold text-foreground">{latestAssessment.measurements.weight} kg</p>
                <p className="text-xs text-muted-foreground">Peso Atual</p>
                {previousAssessment && (
                  <p className={`text-xs mt-1 ${getTrend(latestAssessment.measurements.weight, previousAssessment.measurements.weight, true).color}`}>
                    {getTrend(latestAssessment.measurements.weight, previousAssessment.measurements.weight, true).value} kg
                  </p>
                )}
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <Activity className="h-5 w-5 mx-auto text-primary mb-2" />
                <p className="text-xl font-bold text-foreground">{latestAssessment.imc.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">IMC</p>
                <div className="mt-1">{getIMCBadge(latestAssessment.imcClassification)}</div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <div className="h-5 w-5 mx-auto text-primary mb-2 flex items-center justify-center text-sm font-bold">%</div>
                <p className="text-xl font-bold text-foreground">{latestAssessment.measurements.bodyFat || "-"}%</p>
                <p className="text-xs text-muted-foreground">Gordura</p>
                {previousAssessment?.measurements.bodyFat && latestAssessment.measurements.bodyFat && (
                  <p className={`text-xs mt-1 ${getTrend(latestAssessment.measurements.bodyFat, previousAssessment.measurements.bodyFat, true).color}`}>
                    {getTrend(latestAssessment.measurements.bodyFat, previousAssessment.measurements.bodyFat, true).value}%
                  </p>
                )}
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4 text-center">
                <Heart className="h-5 w-5 mx-auto text-primary mb-2" />
                <p className="text-xl font-bold text-foreground">{latestAssessment.vitals?.heartRate || "-"}</p>
                <p className="text-xs text-muted-foreground">FC (bpm)</p>
              </CardContent>
            </Card>
          </div>

          {/* Assessment History */}
          <h2 className="text-lg font-semibold text-foreground mb-4">Histórico de Avaliações</h2>
          <div className="space-y-4">
            {sortedAssessments.map((assessment, index) => {
              const prev = sortedAssessments[index + 1]
              return (
                <Card key={assessment.id} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                          <ClipboardList className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">
                              {new Date(assessment.date).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              })}
                            </h3>
                            {index === 0 && (
                              <Badge className="bg-primary/20 text-primary">Mais recente</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Avaliador: {assessment.trainerName}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <p className="font-semibold text-foreground">{assessment.measurements.weight} kg</p>
                            <p className="text-xs text-muted-foreground">Peso</p>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{assessment.imc.toFixed(1)}</p>
                            <p className="text-xs text-muted-foreground">IMC</p>
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{assessment.measurements.bodyFat || "-"}%</p>
                            <p className="text-xs text-muted-foreground">Gordura</p>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedAssessment(assessment)
                            setIsViewModalOpen(true)
                          }}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {sortedAssessments.length === 0 && (
            <div className="text-center py-12">
              <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Você ainda não possui avaliações físicas</p>
              <p className="text-sm text-muted-foreground mt-2">
                Solicite uma avaliação ao seu treinador
              </p>
            </div>
          )}
        </main>

        {/* View Details Modal */}
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedAssessment && (
              <>
                <DialogHeader>
                  <DialogTitle>
                    Avaliação de {new Date(selectedAssessment.date).toLocaleDateString("pt-BR")}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  {/* Summary */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Card className="bg-secondary/50">
                      <CardContent className="p-4 text-center">
                        <Scale className="h-5 w-5 mx-auto text-primary mb-1" />
                        <p className="text-xl font-bold text-foreground">{selectedAssessment.measurements.weight} kg</p>
                        <p className="text-xs text-muted-foreground">Peso</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-secondary/50">
                      <CardContent className="p-4 text-center">
                        <Ruler className="h-5 w-5 mx-auto text-primary mb-1" />
                        <p className="text-xl font-bold text-foreground">{selectedAssessment.measurements.height} cm</p>
                        <p className="text-xs text-muted-foreground">Altura</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-secondary/50">
                      <CardContent className="p-4 text-center">
                        <Activity className="h-5 w-5 mx-auto text-primary mb-1" />
                        <p className="text-xl font-bold text-foreground">{selectedAssessment.imc.toFixed(1)}</p>
                        <p className="text-xs text-muted-foreground">IMC</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-secondary/50">
                      <CardContent className="p-4 text-center">
                        <Heart className="h-5 w-5 mx-auto text-primary mb-1" />
                        <p className="text-xl font-bold text-foreground">{selectedAssessment.vitals?.heartRate || "-"}</p>
                        <p className="text-xs text-muted-foreground">FC (bpm)</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Classification */}
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-muted-foreground">Classificação IMC:</span>
                    {getIMCBadge(selectedAssessment.imcClassification)}
                  </div>

                  {/* Measurements */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Medidas Corporais (cm)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {selectedAssessment.measurements.chest && (
                        <div className="flex justify-between p-2 rounded bg-secondary/30">
                          <span className="text-muted-foreground">Peitoral</span>
                          <span className="font-medium text-foreground">{selectedAssessment.measurements.chest}</span>
                        </div>
                      )}
                      {selectedAssessment.measurements.waist && (
                        <div className="flex justify-between p-2 rounded bg-secondary/30">
                          <span className="text-muted-foreground">Cintura</span>
                          <span className="font-medium text-foreground">{selectedAssessment.measurements.waist}</span>
                        </div>
                      )}
                      {selectedAssessment.measurements.hips && (
                        <div className="flex justify-between p-2 rounded bg-secondary/30">
                          <span className="text-muted-foreground">Quadril</span>
                          <span className="font-medium text-foreground">{selectedAssessment.measurements.hips}</span>
                        </div>
                      )}
                      {selectedAssessment.measurements.rightArm && (
                        <div className="flex justify-between p-2 rounded bg-secondary/30">
                          <span className="text-muted-foreground">Braço D</span>
                          <span className="font-medium text-foreground">{selectedAssessment.measurements.rightArm}</span>
                        </div>
                      )}
                      {selectedAssessment.measurements.leftArm && (
                        <div className="flex justify-between p-2 rounded bg-secondary/30">
                          <span className="text-muted-foreground">Braço E</span>
                          <span className="font-medium text-foreground">{selectedAssessment.measurements.leftArm}</span>
                        </div>
                      )}
                      {selectedAssessment.measurements.rightThigh && (
                        <div className="flex justify-between p-2 rounded bg-secondary/30">
                          <span className="text-muted-foreground">Coxa D</span>
                          <span className="font-medium text-foreground">{selectedAssessment.measurements.rightThigh}</span>
                        </div>
                      )}
                      {selectedAssessment.measurements.leftThigh && (
                        <div className="flex justify-between p-2 rounded bg-secondary/30">
                          <span className="text-muted-foreground">Coxa E</span>
                          <span className="font-medium text-foreground">{selectedAssessment.measurements.leftThigh}</span>
                        </div>
                      )}
                      {selectedAssessment.measurements.rightCalf && (
                        <div className="flex justify-between p-2 rounded bg-secondary/30">
                          <span className="text-muted-foreground">Panturrilha D</span>
                          <span className="font-medium text-foreground">{selectedAssessment.measurements.rightCalf}</span>
                        </div>
                      )}
                      {selectedAssessment.measurements.leftCalf && (
                        <div className="flex justify-between p-2 rounded bg-secondary/30">
                          <span className="text-muted-foreground">Panturrilha E</span>
                          <span className="font-medium text-foreground">{selectedAssessment.measurements.leftCalf}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Composition */}
                  {(selectedAssessment.measurements.bodyFat || selectedAssessment.measurements.muscleMass) && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Composição Corporal</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {selectedAssessment.measurements.bodyFat && (
                          <div className="flex justify-between p-3 rounded bg-secondary/30">
                            <span className="text-muted-foreground">Gordura Corporal</span>
                            <span className="font-medium text-foreground">{selectedAssessment.measurements.bodyFat}%</span>
                          </div>
                        )}
                        {selectedAssessment.measurements.muscleMass && (
                          <div className="flex justify-between p-3 rounded bg-secondary/30">
                            <span className="text-muted-foreground">Massa Muscular</span>
                            <span className="font-medium text-foreground">{selectedAssessment.measurements.muscleMass} kg</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {selectedAssessment.notes && (
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Observações do Treinador</h4>
                      <p className="text-muted-foreground bg-secondary/30 p-3 rounded">{selectedAssessment.notes}</p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsViewModalOpen(false)}>Fechar</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppShell>
  )
}
