"use client"

import { useAuth } from "@/lib/auth-context"
import { CalorieTracker } from "./calorie-tracker"

export function CalorieTrackerSection() {
  const { isAuthenticated, user } = useAuth()

  // Mostrar apenas para usuarios logados do tipo cliente
  if (!isAuthenticated || user?.type !== "client") {
    return null
  }

  return <CalorieTracker />
}
