"use client"

import { useAuth } from "@/lib/auth-context"
import { Progress } from "@/components/ui/progress"
import { Flame, Trophy, Target } from "lucide-react"

export function WelcomeCard() {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated || user?.type !== "client") {
    return null
  }

  const xpForNextLevel = (user.level + 1) * 200
  const xpProgress = ((user.xp % 200) / 200) * 100

  return (
    <div className="rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-muted-foreground">Olá,</p>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground truncate">{user.name}!</h2>
          <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2">
            Continue treinando para subir de nível e desbloquear recompensas!
          </p>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex flex-col items-center gap-1 rounded-lg bg-background/50 p-2 sm:p-3 min-w-[60px]">
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
            <span className="text-xs text-muted-foreground">Nível</span>
            <span className="text-sm sm:text-lg font-bold text-foreground">{user.level}</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg bg-background/50 p-2 sm:p-3 min-w-[60px]">
            <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
            <span className="text-xs text-muted-foreground">XP</span>
            <span className="text-sm sm:text-lg font-bold text-foreground">{user.xp}</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg bg-background/50 p-2 sm:p-3 min-w-[60px]">
            <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            <span className="text-xs text-muted-foreground">Check-ins</span>
            <span className="text-sm sm:text-lg font-bold text-foreground">{user.totalCheckins}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-muted-foreground">Progresso para nível {user.level + 1}</span>
          <span className="text-foreground font-medium">{Math.round(xpProgress)}%</span>
        </div>
        <Progress value={xpProgress} className="h-2" />
      </div>
    </div>
  )
}
