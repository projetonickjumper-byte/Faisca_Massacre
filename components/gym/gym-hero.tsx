"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Share2, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Gym } from "@/lib/types"

interface GymHeroProps {
  gym: Gym
}

export function GymHero({ gym }: GymHeroProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % gym.images.length)
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + gym.images.length) % gym.images.length)

  return (
    <div className="relative">
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[2.5/1]">
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}
        >
          {gym.images.map((image, index) => (
            <div key={`${gym.id}-img-${index}`} className="relative min-w-full h-full">
              <Image
                src={image || "/placeholder.svg"}
                alt={`${gym.name} - Foto ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        {/* Navigation */}
        <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/80 backdrop-blur hover:bg-background"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/80 backdrop-blur hover:bg-background"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Image Navigation */}
        {gym.images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-background"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 gap-1.5">
              {gym.images.map((_, index) => (
                <button
                  key={`dot-${gym.id}-${index}`}
                  type="button"
                  onClick={() => setCurrentImage(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    index === currentImage
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-foreground/40 hover:bg-foreground/60"
                  )}
                />
              ))}
            </div>
          </>
        )}

        {/* Verified Badge */}
        {gym.verified && (
          <div className="absolute bottom-16 left-4 flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground">
            <CheckCircle className="h-4 w-4" />
            <span>Verificada</span>
          </div>
        )}
      </div>
    </div>
  )
}
