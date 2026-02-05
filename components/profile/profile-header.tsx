"use client"

import Link from "next/link"
import { Settings, Edit2, Share2, Trophy, Target, Flame, TrendingUp } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { User } from "@/lib/types"

interface ProfileHeaderProps {
  user: User
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const xpForNextLevel = user.level * 200
  const xpProgress = (user.xp % 200) / 200 * 100

  return (
    <div className="relative">
      {/* Background with gradient and pattern */}
      <div className="h-40 lg:h-56 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-orange-600/5 rounded-full blur-3xl" />
      </div>

      {/* Profile Content */}
      <div className="px-4 pb-6">
        <div className="relative -mt-20 flex flex-col items-center lg:flex-row lg:items-end lg:gap-8 lg:-mt-24">
          {/* Avatar */}
          <div className="relative shrink-0 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full blur opacity-40 group-hover:opacity-60 transition-opacity" />
            <Avatar className="relative h-32 w-32 lg:h-40 lg:w-40 border-4 border-zinc-900 ring-2 ring-orange-500/20">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-3xl lg:text-4xl bg-zinc-800 text-white">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white border-none shadow-lg shadow-orange-500/20 px-3 py-1">
              <Trophy className="h-3 w-3 mr-1" />
              Nível {user.level}
            </Badge>
          </div>

          {/* Info Section */}
          <div className="flex-1 text-center lg:text-left lg:pb-2">
            {/* Name and Bio */}
            <h1 className="mt-6 text-2xl lg:text-3xl font-bold text-white lg:mt-0">{user.name}</h1>
            {user.bio && (
              <p className="mt-1 text-sm text-zinc-400 max-w-xs lg:max-w-md">
                {user.bio}
              </p>
            )}

            {/* XP Progress */}
            <div className="mt-5 w-full max-w-xs lg:max-w-sm mx-auto lg:mx-0">
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                  <span className="text-zinc-400">Progresso XP</span>
                </div>
                <span className="font-bold text-orange-400">
                  {user.xp} / {xpForNextLevel}
                </span>
              </div>
              <div className="relative h-2.5 w-full rounded-full bg-zinc-800 overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-400/50 to-orange-300/50 rounded-full blur-sm transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-zinc-500 lg:text-left">
                {xpForNextLevel - (user.xp % 200)} XP para o nível {user.level + 1}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="absolute right-0 top-24 flex gap-2 lg:relative lg:top-0 lg:self-start lg:mt-0">
            <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600">
              <Link href="/perfil/editar">
                <Edit2 className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600">
              <Link href="/perfil/configuracoes">
                <Settings className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="hidden lg:flex h-10 w-10 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-600">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid w-full grid-cols-3 gap-3 lg:max-w-lg">
          <Link
            href="/perfil/historico"
            className="group flex flex-col items-center rounded-2xl bg-zinc-900/50 border border-zinc-800/50 p-4 lg:p-6 transition-all hover:bg-zinc-800/50 hover:border-zinc-700/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 mb-2">
              <Target className="h-5 w-5 text-emerald-500" />
            </div>
            <span className="text-2xl lg:text-3xl font-bold text-white">{user.totalCheckins}</span>
            <span className="text-xs lg:text-sm text-zinc-500">Check-ins</span>
          </Link>
          <Link
            href="/perfil/favoritos"
            className="group flex flex-col items-center rounded-2xl bg-zinc-900/50 border border-zinc-800/50 p-4 lg:p-6 transition-all hover:bg-zinc-800/50 hover:border-zinc-700/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 mb-2">
              <Flame className="h-5 w-5 text-red-500" />
            </div>
            <span className="text-2xl lg:text-3xl font-bold text-white">{user.totalFavorites}</span>
            <span className="text-xs lg:text-sm text-zinc-500">Favoritos</span>
          </Link>
          <Link
            href="/perfil/conquistas"
            className="group flex flex-col items-center rounded-2xl bg-zinc-900/50 border border-zinc-800/50 p-4 lg:p-6 transition-all hover:bg-zinc-800/50 hover:border-zinc-700/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 mb-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
            </div>
            <span className="text-2xl lg:text-3xl font-bold text-white">{user.totalAchievements}</span>
            <span className="text-xs lg:text-sm text-zinc-500">Conquistas</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
