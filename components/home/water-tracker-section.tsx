"use client"

import { useAuth } from "@/lib/auth-context"
import { WaterTracker } from "./water-tracker"

export function WaterTrackerSection() {
  const { isAuthenticated, user } = useAuth()

  // Mostrar apenas para usuarios logados do tipo cliente
  if (!isAuthenticated || user?.type !== "client") {
    return null
  }

  return <WaterTracker />
}
