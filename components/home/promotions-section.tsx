"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Zap, Clock, ArrowRight, ChevronRight, Percent } from "lucide-react"
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
    <div className="flex items-center gap-1.5">
      <Clock className="h-3.5 w-3.5 text-orange-500" />
      <span className="text-sm font-mono text-orange-400">{timeLeft}</span>
    </div>
  )
}

export function PromotionsSection({ promotions }: PromotionsSectionProps) {
  if (promotions.length === 0) return null

  return (
    <section className="relative">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500/20 to-red-600/10">
              <Zap className="h-5 w-5 text-orange-500" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-pulse">
              !
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Promoções Relâmpago</h2>
            <p className="text-sm text-zinc-500">Ofertas por tempo limitado</p>
          </div>
        </div>
        <Link
          href="/promocoes"
          className="flex items-center gap-1 text-sm text-orange-400 hover:text-orange-300 transition-colors group"
        >
          Ver todas
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 lg:overflow-visible">
        {promotions.map((promo) => (
          <Link
            key={promo.id}
            href={`/academia/${promo.gymId}`}
            className="group relative flex min-w-[280px] max-w-[320px] lg:min-w-0 lg:max-w-none flex-col overflow-hidden rounded-2xl bg-zinc-900/50 border border-zinc-800/50 transition-all hover:border-zinc-700/50 hover:shadow-xl hover:shadow-orange-500/5"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={promo.gymImage || "/placeholder.svg"}
                alt={promo.gymName}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <Badge className="absolute left-3 top-3 bg-gradient-to-r from-orange-500 to-red-500 text-white border-none shadow-lg shadow-orange-500/20">
                <Percent className="h-3 w-3 mr-1" />
                {promo.discount}% OFF
              </Badge>
            </div>

            <div className="flex flex-1 flex-col p-4">
              <p className="text-xs text-zinc-500 font-medium">{promo.gymName}</p>
              <h3 className="mt-1 font-bold text-white group-hover:text-orange-400 transition-colors">{promo.title}</h3>
              <p className="mt-1.5 text-sm text-zinc-400 line-clamp-2">
                {promo.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-white">
                    R$ {promo.finalPrice.toFixed(2).replace(".", ",")}
                  </span>
                  <span className="text-sm text-zinc-500 line-through">
                    R$ {promo.originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </div>

              {promo.countdown && (
                <div className="mt-3 flex items-center justify-between p-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                  <span className="text-xs text-zinc-500">Termina em:</span>
                  <CountdownTimer expiresAt={promo.expiresAt} />
                </div>
              )}

              <Button className="mt-4 w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/20" size="sm">
                Aproveitar
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
