"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Zap, Clock, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Promotion } from "@/lib/types"

interface PromotionsSectionProps {
  promotions: Promotion[]
}

function CountdownTimer({ expiresAt }: { expiresAt: string }) {
  const [timeLeft, setTimeLeft] = useState("")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const diff = new Date(expiresAt).getTime() - Date.now()
      if (diff <= 0) return "Expirado"

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (hours > 24) {
        const days = Math.floor(hours / 24)
        return `${days}d ${hours % 24}h`
      }

      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
    }

    setTimeLeft(calculateTimeLeft())
    const interval = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000)
    return () => clearInterval(interval)
  }, [expiresAt])

  return (
    <div className="flex items-center gap-1.5 text-sm font-mono">
      <Clock className="h-4 w-4 text-primary" />
      <span className="text-foreground">{timeLeft}</span>
    </div>
  )
}

export function PromotionsSection({ promotions }: PromotionsSectionProps) {
  if (promotions.length === 0) return null

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Promocoes Relampago</h2>
        </div>
        <Link
          href="/promocoes"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Ver todas
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
        {promotions.map((promo) => (
          <Link
            key={promo.id}
            href={`/academia/${promo.gymId}`}
            className="group relative flex min-w-[280px] max-w-[320px] lg:min-w-0 lg:max-w-none flex-col overflow-hidden rounded-xl bg-card transition-all hover:ring-2 hover:ring-primary/50"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={promo.gymImage || "/placeholder.svg"}
                alt={promo.gymName}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                {promo.discount}% OFF
              </Badge>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <p className="text-xs text-muted-foreground">{promo.gymName}</p>
              <h3 className="mt-1 font-semibold text-foreground">{promo.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {promo.description}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-foreground">
                    R$ {promo.finalPrice.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    R$ {promo.originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>

              {promo.countdown && (
                <div className="mt-3 rounded-lg bg-secondary p-2">
                  <CountdownTimer expiresAt={promo.expiresAt} />
                </div>
              )}

              <Button className="mt-3 w-full" size="sm">
                Aproveitar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
