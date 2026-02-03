"use client"

import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GymCard } from "@/components/gym-card"
import type { Gym } from "@/lib/types"

interface NearbySectionProps {
  gyms: Gym[]
}

export function NearbySection({ gyms }: NearbySectionProps) {
  const sortedGyms = [...gyms].sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999))

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Perto de voce</h2>
        </div>
        <Link
          href="/buscar?ordenar=distancia"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Ver mapa
        </Link>
      </div>

      <div className="grid gap-4">
        {sortedGyms.slice(0, 3).map((gym) => (
          <GymCard key={gym.id} gym={gym} variant="compact" />
        ))}
      </div>

      <div className="mt-4 text-center lg:text-left">
        <Button variant="outline" asChild className="bg-transparent">
          <Link href="/explorar">Ver mais academias</Link>
        </Button>
      </div>
    </section>
  )
}
