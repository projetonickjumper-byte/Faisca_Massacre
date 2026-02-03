"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Heart, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { Gym } from "@/lib/types"

interface GymCardProps {
  gym: Gym
  variant?: "default" | "compact"
}

export function GymCard({ gym, variant = "default" }: GymCardProps) {
  const isCompact = variant === "compact"

  return (
    <Link
      href={`/academia/${gym.slug}`}
      className={cn(
        "group relative flex overflow-hidden rounded-xl bg-card transition-all hover:ring-2 hover:ring-primary/50",
        isCompact ? "flex-row h-28" : "flex-col"
      )}
    >
      <div className={cn("relative overflow-hidden", isCompact ? "w-28 h-full" : "aspect-[4/3]")}>
        <Image
          src={gym.images[0] || "/placeholder.svg"}
          alt={gym.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {gym.verified && (
          <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-primary/90 px-2 py-0.5 text-xs font-medium text-primary-foreground backdrop-blur">
            <CheckCircle className="h-3 w-3" />
            <span>Verificada</span>
          </div>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            // Toggle favorite logic here
          }}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background hover:text-destructive"
          aria-label="Adicionar aos favoritos"
        >
          <Heart className="h-4 w-4" />
        </button>
        {gym.dayUse?.firstExperienceDiscount && (
          <div className="absolute bottom-2 left-2 rounded-md bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground">
            {gym.dayUse.firstExperienceDiscount}% OFF primeira vez
          </div>
        )}
      </div>

      <div className={cn("flex flex-1 flex-col", isCompact ? "p-3 justify-center" : "p-4")}>
        <div className="flex items-start justify-between gap-2">
          <h3 className={cn("font-semibold text-foreground line-clamp-1", isCompact ? "text-sm" : "text-base")}>
            {gym.name}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium text-foreground">{gym.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({gym.totalReviews})</span>
          </div>
        </div>

        <div className="mt-1 flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="text-xs line-clamp-1">{gym.address}, {gym.city}</span>
          {gym.distance !== undefined && (
            <span className="ml-auto shrink-0 text-xs font-medium text-primary">
              {gym.distance < 1 ? `${(gym.distance * 1000).toFixed(0)}m` : `${gym.distance.toFixed(1)}km`}
            </span>
          )}
        </div>

        {!isCompact && (
          <>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {gym.modalities.slice(0, 3).map((mod) => (
                <Badge key={mod} variant="secondary" className="text-xs">
                  {mod}
                </Badge>
              ))}
              {gym.modalities.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{gym.modalities.length - 3}
                </Badge>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
              <div className="flex gap-2">
                {gym.acceptsWellhub && (
                  <span className="text-xs text-muted-foreground">Wellhub</span>
                )}
                {gym.acceptsTotalPass && (
                  <span className="text-xs text-muted-foreground">TotalPass</span>
                )}
              </div>
              {gym.dayUse && (
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">Day Use</span>
                  <p className="text-sm font-semibold text-foreground">
                    R$ {gym.dayUse.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              )}
              {!gym.dayUse && gym.plans[0] && (
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">A partir de</span>
                  <p className="text-sm font-semibold text-foreground">
                    R$ {gym.plans[0].price.toFixed(2).replace(".", ",")}/mes
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {isCompact && gym.dayUse && (
          <p className="mt-1 text-xs font-medium text-primary">
            Day Use R$ {gym.dayUse.price.toFixed(2).replace(".", ",")}
          </p>
        )}
      </div>
    </Link>
  )
}
