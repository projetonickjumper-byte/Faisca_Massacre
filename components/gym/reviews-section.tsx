"use client"

import Image from "next/image"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Review } from "@/lib/types"

interface ReviewsSectionProps {
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

function RatingDistribution({ reviews, totalReviews }: { reviews: Review[]; totalReviews: number }) {
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length
    return { stars, count, percentage: totalReviews > 0 ? (count / totalReviews) * 100 : 0 }
  })

  return (
    <div className="space-y-2">
      {distribution.map(({ stars, count, percentage }) => (
        <div key={stars} className="flex items-center gap-2">
          <span className="w-3 text-sm text-muted-foreground">{stars}</span>
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <Progress value={percentage} className="h-2 flex-1" />
          <span className="w-8 text-right text-sm text-muted-foreground">{count}</span>
        </div>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-xl bg-card p-4 space-y-3">
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={review.userAvatar || "/placeholder.svg"} alt={review.userName} />
          <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">{review.userName}</span>
            <Badge variant="secondary" className="text-xs">
              Nivel {review.userLevel}
            </Badge>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-3.5 w-3.5",
                    star <= review.rating
                      ? "fill-primary text-primary"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">{review.date}</span>
          </div>
        </div>
      </div>

      {review.modality && (
        <Badge variant="outline" className="text-xs">
          {review.modality}
        </Badge>
      )}

      <p className="text-sm text-muted-foreground">{review.text}</p>

      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {review.images.map((img, index) => (
            <div key={`review-img-${review.id}-${index}`} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
              <Image src={img || "/placeholder.svg"} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 pt-2 border-t border-border">
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ThumbsUp className="h-4 w-4" />
          <span>Util ({review.helpful})</span>
        </button>
      </div>

      {review.gymResponse && (
        <div className="mt-3 rounded-lg bg-secondary p-3">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Resposta da academia</span>
          </div>
          <p className="text-sm text-muted-foreground">{review.gymResponse.text}</p>
          <p className="mt-1 text-xs text-muted-foreground">{review.gymResponse.date}</p>
        </div>
      )}
    </div>
  )
}

export function ReviewsSection({ reviews, averageRating, totalReviews }: ReviewsSectionProps) {
  return (
    <section id="avaliacoes" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">Avaliacoes</h2>
        <Button variant="outline" size="sm">
          Escrever Avaliacao
          <Badge className="ml-2 bg-primary/20 text-primary">+15 XP</Badge>
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Rating Summary */}
        <div className="rounded-xl bg-card p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={cn(
                      "h-4 w-4",
                      star <= Math.round(averageRating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    )}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{totalReviews} avaliacoes</p>
            </div>
            <div className="flex-1">
              <RatingDistribution reviews={reviews} totalReviews={totalReviews} />
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 items-start content-start">
          <Button variant="secondary" size="sm">Recentes</Button>
          <Button variant="outline" size="sm">Mais uteis</Button>
          <Button variant="outline" size="sm">Com fotos</Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {reviews.length > 3 && (
        <div className="text-center">
          <Button variant="outline">Ver todas as avaliacoes</Button>
        </div>
      )}
    </section>
  )
}
