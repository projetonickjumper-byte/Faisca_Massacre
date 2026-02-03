"use client"

import { Trophy, Flame, Target, Gift } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { FitRankEntry } from "@/lib/types"

interface FitRankSectionProps {
  entries: FitRankEntry[]
  currentUserId?: string
}

const getMedalStyle = (position: number) => {
  if (position === 1) return { bg: "bg-amber-400/20", text: "text-amber-400", icon: "text-amber-400" }
  if (position === 2) return { bg: "bg-zinc-400/20", text: "text-zinc-400", icon: "text-zinc-400" }
  if (position === 3) return { bg: "bg-amber-600/20", text: "text-amber-600", icon: "text-amber-600" }
  return { bg: "bg-muted", text: "text-muted-foreground", icon: "text-muted-foreground" }
}

const pointsInfo = [
  { action: "Check-in", points: 10, icon: Target },
  { action: "Aula coletiva", points: 15, icon: Target },
  { action: "Streak 7 dias", points: 50, icon: Flame },
  { action: "Indicacao", points: 100, icon: Gift },
  { action: "Desafio completo", points: 200, icon: Trophy },
]

export function FitRankSection({ entries, currentUserId = "u1" }: FitRankSectionProps) {
  const currentUser = entries.find((e) => e.userId === currentUserId)

  return (
    <section id="fitrank" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">FitRank</h2>
        </div>
      </div>

      {/* Current User Position */}
      {currentUser && (
        <Card className="border-primary/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full",
              getMedalStyle(currentUser.position).bg
            )}>
              <span className={cn("text-lg font-bold", getMedalStyle(currentUser.position).text)}>
                {currentUser.position}
              </span>
            </div>
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage src={currentUser.userAvatar || "/placeholder.svg"} alt={currentUser.userName} />
              <AvatarFallback>{currentUser.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-foreground">{currentUser.userName}</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>{currentUser.points} pts</span>
                <span className="flex items-center gap-1">
                  <Flame className="h-3.5 w-3.5 text-primary" />
                  {currentUser.streak} dias
                </span>
              </div>
            </div>
            <Badge variant="outline">{currentUser.checkins} check-ins</Badge>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="monthly">Mensal</TabsTrigger>
          <TabsTrigger value="quarterly">Trimestral</TabsTrigger>
          <TabsTrigger value="annual">Anual</TabsTrigger>
          <TabsTrigger value="alltime">Geral</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="mt-4">
          {/* Top 3 Podium */}
          <div className="flex justify-center gap-4 mb-6">
            {entries.slice(0, 3).map((entry, index) => {
              const positions = [1, 0, 2]
              const actualEntry = entries[positions[index]]
              if (!actualEntry) return null
              
              const style = getMedalStyle(actualEntry.position)
              const heights = ["h-24", "h-32", "h-20"]
              
              return (
                <div key={actualEntry.userId} className="flex flex-col items-center gap-2">
                  <Avatar className={cn(
                    "border-2",
                    actualEntry.position === 1 ? "h-16 w-16 border-amber-400" :
                    actualEntry.position === 2 ? "h-14 w-14 border-zinc-400" :
                    "h-12 w-12 border-amber-600"
                  )}>
                    <AvatarImage src={actualEntry.userAvatar || "/placeholder.svg"} alt={actualEntry.userName} />
                    <AvatarFallback>{actualEntry.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium text-foreground text-center max-w-[80px] truncate">
                    {actualEntry.userName}
                  </p>
                  <p className="text-xs text-muted-foreground">{actualEntry.points} pts</p>
                  <div className={cn(
                    "w-20 rounded-t-lg flex items-end justify-center pb-2",
                    style.bg,
                    heights[index]
                  )}>
                    <Trophy className={cn("h-6 w-6", style.icon)} />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Rest of Rankings */}
          <div className="space-y-2">
            {entries.slice(3).map((entry) => {
              const style = getMedalStyle(entry.position)
              const isCurrentUser = entry.userId === currentUserId
              
              return (
                <div
                  key={entry.userId}
                  className={cn(
                    "flex items-center gap-3 rounded-lg p-3",
                    isCurrentUser ? "bg-primary/10 border border-primary/30" : "bg-card"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    style.bg
                  )}>
                    <span className={cn("text-sm font-bold", style.text)}>
                      {entry.position}
                    </span>
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={entry.userAvatar || "/placeholder.svg"} alt={entry.userName} />
                    <AvatarFallback>{entry.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{entry.userName}</p>
                    <p className="text-xs text-muted-foreground">{entry.checkins} check-ins</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">{entry.points}</p>
                    <p className="text-xs text-muted-foreground">pontos</p>
                  </div>
                </div>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="quarterly">
          <p className="text-center text-muted-foreground py-8">Ranking trimestral</p>
        </TabsContent>
        <TabsContent value="annual">
          <p className="text-center text-muted-foreground py-8">Ranking anual</p>
        </TabsContent>
        <TabsContent value="alltime">
          <p className="text-center text-muted-foreground py-8">Ranking geral</p>
        </TabsContent>
      </Tabs>

      {/* Points Info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Como ganhar pontos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {pointsInfo.map((info) => (
              <div
                key={info.action}
                className="flex items-center gap-2 rounded-lg bg-secondary p-3"
              >
                <info.icon className="h-4 w-4 text-primary shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">+{info.points}</p>
                  <p className="text-xs text-muted-foreground">{info.action}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full bg-transparent">
        Ver recompensas disponiveis
      </Button>
    </section>
  )
}
