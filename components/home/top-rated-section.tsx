"use client"

import Link from "next/link"
import Image from "next/image"
import { Star, Trophy, TrendingUp, ChevronRight, Medal } from "lucide-react"
import type { Gym } from "@/lib/types"

interface TopRatedSectionProps {
  gyms: Gym[]
}

export function TopRatedSection({ gyms }: TopRatedSectionProps) {
  const topGyms = [...gyms]
    .sort((a, b) => b.rating - a.rating || b.totalReviews - a.totalReviews)
    .slice(0, 5)

  const getMedalStyle = (position: number) => {
    if (position === 0) return { 
      bg: "bg-gradient-to-br from-yellow-500/20 to-amber-600/10",
      border: "border-yellow-500/30",
      text: "text-yellow-500",
      glow: "shadow-yellow-500/10"
    }
    if (position === 1) return { 
      bg: "bg-gradient-to-br from-zinc-400/20 to-zinc-500/10",
      border: "border-zinc-400/30",
      text: "text-zinc-400",
      glow: "shadow-zinc-400/10"
    }
    if (position === 2) return { 
      bg: "bg-gradient-to-br from-orange-600/20 to-amber-700/10",
      border: "border-orange-600/30",
      text: "text-orange-600",
      glow: "shadow-orange-600/10"
    }
    return { 
      bg: "bg-zinc-800/50",
      border: "border-zinc-700/50",
      text: "text-zinc-500",
      glow: ""
    }
  }

  return (
    <section className="relative">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/10">
            <Trophy className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Top Avaliadas</h2>
            <p className="text-sm text-zinc-500">Melhores academias</p>
          </div>
        </div>
        <Link
          href="/ranking"
          className="flex items-center gap-1 text-sm text-orange-400 hover:text-orange-300 transition-colors group"
        >
          Ver ranking
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="space-y-2">
        {topGyms.map((gym, index) => {
          const style = getMedalStyle(index)
          return (
            <Link
              key={gym.id}
              href={`/academia/${gym.slug}`}
              className="group flex items-center gap-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 p-3 transition-all hover:bg-zinc-800/50 hover:border-zinc-700/50"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.bg} border ${style.border} shadow-lg ${style.glow}`}>
                {index < 3 ? (
                  <Medal className={`h-5 w-5 ${style.text}`} />
                ) : (
                  <span className={`text-sm font-bold ${style.text}`}>{index + 1}</span>
                )}
              </div>

              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg ring-2 ring-zinc-800">
                <Image
                  src={gym.images[0] || "/placeholder.svg"}
                  alt={gym.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-white truncate group-hover:text-orange-400 transition-colors">{gym.name}</h3>
                <p className="text-xs text-zinc-500 truncate">{gym.city}</p>
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-orange-500/10">
                  <Star className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
                  <span className="font-bold text-orange-400 text-sm">{gym.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-zinc-500">
                  <TrendingUp className="h-3 w-3" />
                  <span>{gym.totalCheckins.toLocaleString("pt-BR")}</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
