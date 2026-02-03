"use client"

import React from "react"

import Link from "next/link"
import { Dumbbell, Building2, Swords, Flame, Music, Sparkles } from "lucide-react"
import type { Category } from "@/lib/types"

const iconMap: Record<string, React.ElementType> = {
  dumbbell: Dumbbell,
  building: Building2,
  swords: Swords,
  stretch: Sparkles,
  music: Music,
  flame: Flame,
}

interface CategoryGridProps {
  categories: Category[]
}

export function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Modalidades</h2>
        <Link
          href="/buscar"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Ver todas
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {categories.map((category) => {
          const Icon = iconMap[category.icon] || Dumbbell
          return (
            <Link
              key={category.id}
              href={`/buscar?categoria=${category.slug}`}
              className="group flex flex-col items-center gap-2 rounded-xl bg-card p-4 transition-all hover:bg-secondary"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-center text-sm font-medium text-foreground">
                {category.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {category.count} locais
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
