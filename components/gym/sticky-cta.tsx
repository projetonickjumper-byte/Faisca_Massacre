"use client"

import { QrCode, ShoppingCart, CreditCard, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Gym } from "@/lib/types"

interface StickyCTAProps {
  gym: Gym
}

export function StickyCTA({ gym }: StickyCTAProps) {
  const lowestPlanPrice = gym.plans.length > 0
    ? Math.min(...gym.plans.map((p) => p.price))
    : null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:bottom-0">
      <div className="container flex items-center gap-2 px-4 py-3">
        {/* Check-in Button */}
        <Button
          variant="outline"
          size="sm"
          className="shrink-0 bg-transparent"
        >
          <QrCode className="mr-1.5 h-4 w-4" />
          Check-in
        </Button>

        <div className="flex flex-1 gap-2 overflow-x-auto">
          {/* Day Use Button */}
          {gym.dayUse && (
            <Button size="sm" className="shrink-0 flex-1">
              <ShoppingCart className="mr-1.5 h-4 w-4" />
              Day Use R$ {gym.dayUse.price.toFixed(0)}
            </Button>
          )}

          {/* Subscribe Button */}
          {lowestPlanPrice && (
            <Button size="sm" variant="secondary" className="shrink-0 flex-1">
              <CreditCard className="mr-1.5 h-4 w-4" />
              A partir de R$ {lowestPlanPrice.toFixed(0)}/mes
            </Button>
          )}

          {/* Schedule Trial */}
          {gym.hasFreeTrial && (
            <Button size="sm" variant="outline" className="shrink-0 bg-transparent">
              <Calendar className="mr-1.5 h-4 w-4" />
              Agendar Aula
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
