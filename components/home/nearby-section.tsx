"use client"

import Link from "next/link"
import { MapPin, ChevronRight, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { GymCard } from "@/components/gym-card"
import type { Gym } from "@/lib/types"

interface NearbySectionProps {
  gyms: Gym[]
}

export function NearbySection({ gyms }: NearbySectionProps) {
  const sortedGyms = [...gyms].sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999))

  return (
    <section className="relative">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10">
            <MapPin className="h-5 w-5 text-emerald-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Perto de você</h2>
            <p className="text-sm text-zinc-500">Academias na sua região</p>
          </div>
        </div>
        <Link
          href="/buscar?ordenar=distancia"
          className="flex items-center gap-1 text-sm text-orange-400 hover:text-orange-300 transition-colors group"
        >
          <Navigation className="h-4 w-4" />
          Ver mapa
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-3">
        {sortedGyms.slice(0, 3).map((gym) => (
          <GymCard key={gym.id} gym={gym} variant="compact" />
        ))}
      </div>

      <div className="mt-4">
        <Button variant="outline" asChild className="w-full bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-300">
          <Link href="/explorar">
            Ver mais academias
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
