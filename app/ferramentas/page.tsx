"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AppShell } from "@/components/app-shell"
import { Header } from "@/components/header"
import { WaterTracker } from "@/components/home/water-tracker"
import { CalorieTracker } from "@/components/home/calorie-tracker"
import { IMCCalculator } from "@/components/ferramentas/imc-calculator"
import { WorkoutTimer } from "@/components/ferramentas/workout-timer"
import { GoalsTracker } from "@/components/ferramentas/goals-tracker"
import { TMBCalculator } from "@/components/ferramentas/tmb-calculator"
import { useAuth } from "@/lib/auth-context"

export default function FerramentasPage() {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        <Header />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Header da pagina */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <Link href="/" className="lg:hidden">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Ferramentas de Saude</h1>
                <p className="text-sm text-muted-foreground">
                  Acompanhe sua saude e alcance seus objetivos
                </p>
              </div>
            </div>
          </div>

          {/* Grid de ferramentas */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Coluna 1 */}
            <div className="space-y-6">
              <WaterTracker />
              <IMCCalculator />
              <GoalsTracker />
            </div>
            
            {/* Coluna 2 */}
            <div className="space-y-6">
              <CalorieTracker />
              <TMBCalculator />
              <WorkoutTimer />
            </div>
          </div>
        </main>
      </div>
    </AppShell>
  )
}
