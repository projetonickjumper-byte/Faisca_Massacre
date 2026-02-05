"use client"

import { useAuth } from "@/lib/auth-context"
import { Progress } from "@/components/ui/progress"
import { Flame, Trophy, Target, Zap, TrendingUp } from "lucide-react"

export function WelcomeCard() {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated || user?.type !== "client") {
    return null
  }

  const xpForNextLevel = (user.level + 1) * 200
  const xpProgress = ((user.xp % 200) / 200) * 100

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border border-zinc-800/50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-medium">
                <Zap className="h-3 w-3" />
                Ativo hoje
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white truncate">
              Olá, {user.name}!
            </h2>
            <p className="mt-2 text-sm text-zinc-400 max-w-md">
              Continue treinando para subir de nível e desbloquear recompensas exclusivas.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="flex items-center gap-3">
            <div className="group flex flex-col items-center gap-1.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-3 sm:p-4 min-w-[80px] transition-all hover:border-orange-500/30 hover:bg-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-600/10">
                <Trophy className="h-5 w-5 text-yellow-500" />
              </div>
              <span className="text-xs text-zinc-500">Nível</span>
              <span className="text-xl font-bold text-white">{user.level}</span>
            </div>
            <div className="group flex flex-col items-center gap-1.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-3 sm:p-4 min-w-[80px] transition-all hover:border-orange-500/30 hover:bg-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10">
                <Flame className="h-5 w-5 text-orange-500" />
              </div>
              <span className="text-xs text-zinc-500">XP Total</span>
              <span className="text-xl font-bold text-white">{user.xp.toLocaleString()}</span>
            </div>
            <div className="group flex flex-col items-center gap-1.5 rounded-xl bg-zinc-800/50 border border-zinc-700/50 p-3 sm:p-4 min-w-[80px] transition-all hover:border-orange-500/30 hover:bg-zinc-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/20 to-emerald-600/10">
                <Target className="h-5 w-5 text-emerald-500" />
              </div>
              <span className="text-xs text-zinc-500">Check-ins</span>
              <span className="text-xl font-bold text-white">{user.totalCheckins}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 p-4 rounded-xl bg-zinc-800/30 border border-zinc-700/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-zinc-300">Progresso para Nível {user.level + 1}</span>
            </div>
            <span className="text-sm font-bold text-orange-400">{Math.round(xpProgress)}%</span>
          </div>
          <div className="relative h-2 w-full rounded-full bg-zinc-700/50 overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-400/50 to-orange-300/50 rounded-full blur-sm transition-all duration-500"
              style={{ width: `${xpProgress}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            Faltam {200 - (user.xp % 200)} XP para o próximo nível
          </p>
        </div>
      </div>
    </div>
  )
}
