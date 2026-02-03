"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
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
    <div className="relative overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {banners.map((banner) => (
          <Link
            key={banner.id}
            href={banner.link}
            className="relative min-w-full aspect-[2/1] sm:aspect-[2.5/1]"
          >
            <Image
              src={banner.image || "/placeholder.svg"}
              alt={banner.title}
              fill
              className="object-cover"
              priority={currentIndex === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
              <h2 className="text-xl font-bold text-foreground sm:text-2xl lg:text-3xl text-balance">
                {banner.title}
              </h2>
              {banner.subtitle && (
                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                  {banner.subtitle}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              prevSlide()
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background sm:h-10 sm:w-10"
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
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background sm:h-10 sm:w-10"
            aria-label="Proximo banner"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
            {banners.map((_, index) => (
              <button
                key={`dot-${banners[index].id}`}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  index === currentIndex
                    ? "w-6 bg-primary"
                    : "w-1.5 bg-foreground/40 hover:bg-foreground/60"
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
