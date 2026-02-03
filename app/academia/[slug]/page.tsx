import { notFound } from "next/navigation"
import { getGymBySlug, getReviewsByGymId, getProductsByGymId, getClassesByGymId, fitRankEntries } from "@/lib/data"
import { GymPageClient } from "./gym-page-client"

interface GymPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: GymPageProps) {
  const { slug } = await params
  const gym = getGymBySlug(slug)

  if (!gym) {
    return { title: "Academia nao encontrada" }
  }

  return {
    title: `${gym.name} - FitApp`,
    description: gym.description.slice(0, 160),
  }
}

export default async function GymPage({ params }: GymPageProps) {
  const { slug } = await params
  const gym = getGymBySlug(slug)

  if (!gym) {
    notFound()
  }

  const reviews = getReviewsByGymId(gym.id)
  const products = getProductsByGymId(gym.id)
  const classes = getClassesByGymId(gym.id)

  return (
    <GymPageClient
      gym={gym}
      reviews={reviews}
      products={products}
      classes={classes}
      fitRankEntries={fitRankEntries}
    />
  )
}
