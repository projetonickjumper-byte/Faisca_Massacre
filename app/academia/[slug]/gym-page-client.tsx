"use client"

import { useState, useEffect } from "react"
import { GymHero } from "@/components/gym/gym-hero"
import { GymInfo } from "@/components/gym/gym-info"
import { GymTabs } from "@/components/gym/gym-tabs"
import { PlansSection } from "@/components/gym/plans-section"
import { ReviewsSection } from "@/components/gym/reviews-section"
import { AboutSection } from "@/components/gym/about-section"
import { FitRankSection } from "@/components/gym/fitrank-section"
import { StoreSection } from "@/components/gym/store-section"
import { StickyCTA } from "@/components/gym/sticky-cta"
import type { Gym, Review, GymProduct, GymClass, FitRankEntry } from "@/lib/types"

interface GymPageClientProps {
  gym: Gym
  reviews: Review[]
  products: GymProduct[]
  classes: GymClass[]
  fitRankEntries: FitRankEntry[]
}

export function GymPageClient({
  gym,
  reviews,
  products,
  classes,
  fitRankEntries,
}: GymPageClientProps) {
  const [activeTab, setActiveTab] = useState("planos")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["planos", "avaliacoes", "sobre", "fitrank", "loja"]
      const scrollPosition = window.scrollY + 160

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-background pb-24">
      <GymHero gym={gym} />

      <div className="relative -mt-8 rounded-t-3xl bg-background pt-6">
        <GymInfo gym={gym} />

        <div className="mt-6 px-4">
          <GymTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="space-y-10 py-6">
            <PlansSection gym={gym} />

            <ReviewsSection
              reviews={reviews}
              averageRating={gym.rating}
              totalReviews={gym.totalReviews}
            />

            <AboutSection gym={gym} classes={classes} />

            <FitRankSection entries={fitRankEntries} />

            {products.length > 0 && <StoreSection products={products} />}
          </div>
        </div>
      </div>

      <StickyCTA gym={gym} />
    </div>
  )
}
