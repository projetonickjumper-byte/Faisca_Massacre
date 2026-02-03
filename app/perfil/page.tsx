"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { AppShell } from "@/components/app-shell"
import { ProfileHeader } from "@/components/profile/profile-header"
import { ProfileMenu } from "@/components/profile/profile-menu"
import { AchievementsPreview } from "@/components/profile/achievements-preview"
import { achievements } from "@/lib/data"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  // Adaptar user do auth para o formato esperado pelo ProfileHeader
  const profileUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    bio: "Entusiasta fitness",
    level: user.level,
    xp: user.xp,
    totalCheckins: 42,
    totalFavorites: 8,
    totalAchievements: 12,
    memberSince: "2024-01-15",
    favoriteGyms: [],
    preferences: {
      notifications: true,
      newsletter: true,
      language: "pt-BR",
      theme: "dark" as const,
    },
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        <Header />

        <main className="mx-auto max-w-4xl">
          <ProfileHeader user={profileUser} />

          <div className="space-y-6 py-6 px-4 lg:px-0">
            <AchievementsPreview achievements={achievements} />

            <ProfileMenu />
          </div>
        </main>
      </div>
    </AppShell>
  )
}
