"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Banner } from "@/lib/types"

interface BannerCarouselProps {
  banners: Banner[]
}

export function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }, [banners.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }, [banners.length])

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  if (banners.length === 0) return null

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900/50">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className="relative min-w-full aspect-[2/1] sm:aspect-[2.5/1]"
          >
            <Image
              src={banner.image || "/placeholder.svg"}
              alt={banner.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
            
            {/* Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="px-6 sm:px-8 lg:px-12 max-w-xl">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-balance leading-tight">
                  {banner.title}
                </h2>
                {banner.subtitle && (
                  <p className="mt-3 text-sm sm:text-base text-zinc-300 line-clamp-2">
                    {banner.subtitle}
                  </p>
                )}
                <Link href={banner.link}>
                  <Button 
                    className="mt-5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/20"
                    size="lg"
                  >
                    Saiba mais
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              prevSlide()
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/80 border border-zinc-700/50 text-white backdrop-blur-sm transition-all hover:bg-zinc-800 hover:border-zinc-600"
            aria-label="Banner anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              nextSlide()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/80 border border-zinc-700/50 text-white backdrop-blur-sm transition-all hover:bg-zinc-800 hover:border-zinc-600"
            aria-label="Proximo banner"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {banners.map((_, index) => (
              <button
                key={`dot-${banners[index].id}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "w-8 bg-gradient-to-r from-orange-500 to-orange-400"
                    : "w-2 bg-zinc-600 hover:bg-zinc-500"
                )}
                aria-label={`Ir para banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
