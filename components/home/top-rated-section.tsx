"use client"

import Link from "next/link"
import Image from "next/image"
import { Star, Trophy, TrendingUp } from "lucide-react"
import type { Gym } from "@/lib/types"

interface TopRatedSectionProps {
  gyms: Gym[]
}

export function TopRatedSection({ gyms }: TopRatedSectionProps) {
  const topGyms = [...gyms]
    .sort((a, b) => b.rating - a.rating || b.totalReviews - a.totalReviews)
    .slice(0, 5)

  const getMedalColor = (position: number) => {
    if (position === 0) return "text-amber-400"
    if (position === 1) return "text-zinc-400"
    if (position === 2) return "text-amber-600"
    return "text-muted-foreground"
  }

  const getMedalBg = (position: number) => {
    if (position === 0) return "bg-amber-400/10 border-amber-400/30"
    if (position === 1) return "bg-zinc-400/10 border-zinc-400/30"
    if (position === 2) return "bg-amber-600/10 border-amber-600/30"
    return "bg-muted border-border"
  }

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Top Avaliadas</h2>
        </div>
        <Link
          href="/ranking"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Ver ranking
        </Link>
      </div>

      <div className="space-y-3">
        {topGyms.map((gym, index) => (
          <Link
            key={gym.id}
            href={`/academia/${gym.slug}`}
            className="group flex items-center gap-3 rounded-xl bg-card p-3 transition-all hover:ring-2 hover:ring-primary/50"
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${getMedalBg(index)}`}>
              {index < 3 ? (
                <Trophy className={`h-5 w-5 ${getMedalColor(index)}`} />
              ) : (
                <span className="text-sm font-bold text-muted-foreground">{index + 1}</span>
              )}
            </div>

            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={gym.images[0] || "/placeholder.svg"}
                alt={gym.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">{gym.name}</h3>
              <p className="text-xs text-muted-foreground truncate">{gym.city}</p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-semibold text-foreground">{gym.rating.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3" />
                <span>{gym.totalCheckins.toLocaleString("pt-BR")} check-ins</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
