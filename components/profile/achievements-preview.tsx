"use client"

import React from "react"

import Link from "next/link"
import {
  CheckCircle,
  Calendar,
  Flame,
  Star,
  Map,
  Users,
  Award,
  Trophy,
  Lock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Achievement } from "@/lib/types"

const iconMap: Record<string, React.ElementType> = {
  "check-circle": CheckCircle,
  calendar: Calendar,
  flame: Flame,
  star: Star,
  map: Map,
  users: Users,
  award: Award,
  trophy: Trophy,
}

interface AchievementsPreviewProps {
  achievements: Achievement[]
}

export function AchievementsPreview({ achievements }: AchievementsPreviewProps) {
  const unlockedCount = achievements.filter((a) => a.unlockedAt).length
  const displayAchievements = achievements.slice(0, 6)

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Conquistas</h2>
          <p className="text-sm text-muted-foreground">
            {unlockedCount} de {achievements.length} desbloqueadas
          </p>
        </div>
        <Link
          href="/perfil/conquistas"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Ver todas
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {displayAchievements.map((achievement) => {
          const Icon = iconMap[achievement.icon] || Award
          const isUnlocked = !!achievement.unlockedAt

          return (
            <div
              key={achievement.id}
              className={cn(
                "flex flex-col items-center gap-2 rounded-xl p-3 transition-all",
                isUnlocked
                  ? "bg-primary/10"
                  : "bg-card opacity-50"
              )}
            >
              <div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-full",
                  isUnlocked
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isUnlocked ? (
                  <Icon className="h-6 w-6" />
                ) : (
                  <Lock className="h-5 w-5" />
                )}
              </div>
              <span className="text-center text-xs font-medium text-foreground line-clamp-2">
                {achievement.name}
              </span>
              <span className="text-[10px] text-primary font-medium">
                +{achievement.xpReward} XP
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
