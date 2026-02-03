"use client"

import Link from "next/link"
import { Settings, Edit2, Share2 } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { User } from "@/lib/types"

interface ProfileHeaderProps {
  user: User
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const xpForNextLevel = user.level * 200
  const xpProgress = (user.xp % 200) / 200 * 100

  return (
    <div className="relative">
      {/* Background */}
      <div className="h-32 lg:h-48 bg-gradient-to-br from-primary/30 via-primary/10 to-background" />

      {/* Profile Content */}
      <div className="px-4 pb-6">
        <div className="relative -mt-16 flex flex-col items-center lg:flex-row lg:items-end lg:gap-8 lg:-mt-20">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Avatar className="h-28 w-28 lg:h-36 lg:w-36 border-4 border-background">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="text-2xl lg:text-3xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Badge className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground lg:text-sm">
              Nivel {user.level}
            </Badge>
          </div>

          {/* Info Section */}
          <div className="flex-1 text-center lg:text-left lg:pb-2">
            {/* Name and Bio */}
            <h1 className="mt-4 text-2xl lg:text-3xl font-bold text-foreground lg:mt-0">{user.name}</h1>
            {user.bio && (
              <p className="mt-1 text-sm text-muted-foreground max-w-xs lg:max-w-md">
                {user.bio}
              </p>
            )}

            {/* XP Progress */}
            <div className="mt-4 w-full max-w-xs lg:max-w-sm mx-auto lg:mx-0">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">XP</span>
                <span className="font-medium text-foreground">
                  {user.xp} / {xpForNextLevel}
                </span>
              </div>
              <Progress value={xpProgress} className="h-2" />
              <p className="mt-1 text-xs text-muted-foreground lg:text-left">
                {xpForNextLevel - (user.xp % 200)} XP para o nivel {user.level + 1}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="absolute right-0 top-20 flex gap-2 lg:relative lg:top-0 lg:self-start lg:mt-0">
            <Button variant="ghost" size="icon" asChild className="lg:h-10 lg:w-10">
              <Link href="/perfil/editar">
                <Edit2 className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild className="lg:h-10 lg:w-10">
              <Link href="/perfil/configuracoes">
                <Settings className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="hidden lg:flex lg:h-10 lg:w-10">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid w-full grid-cols-3 gap-4 lg:max-w-lg">
          <Link
            href="/perfil/historico"
            className="flex flex-col items-center rounded-xl bg-card p-4 lg:p-6 transition-colors hover:bg-secondary"
          >
            <span className="text-2xl lg:text-3xl font-bold text-foreground">{user.totalCheckins}</span>
            <span className="text-xs lg:text-sm text-muted-foreground">Check-ins</span>
          </Link>
          <Link
            href="/perfil/favoritos"
            className="flex flex-col items-center rounded-xl bg-card p-4 lg:p-6 transition-colors hover:bg-secondary"
          >
            <span className="text-2xl lg:text-3xl font-bold text-foreground">{user.totalFavorites}</span>
            <span className="text-xs lg:text-sm text-muted-foreground">Favoritos</span>
          </Link>
          <Link
            href="/perfil/conquistas"
            className="flex flex-col items-center rounded-xl bg-card p-4 lg:p-6 transition-colors hover:bg-secondary"
          >
            <span className="text-2xl lg:text-3xl font-bold text-foreground">{user.totalAchievements}</span>
            <span className="text-xs lg:text-sm text-muted-foreground">Conquistas</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
