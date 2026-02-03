"use client"

import { Star, MapPin, Clock, Phone, MessageCircle, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Gym } from "@/lib/types"

interface GymInfoProps {
  gym: Gym
}

export function GymInfo({ gym }: GymInfoProps) {
  return (
    <div className="space-y-4 px-4">
      {/* Name and Rating */}
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-bold text-foreground">{gym.name}</h1>
        <div className="flex items-center gap-1.5 shrink-0">
          <Star className="h-5 w-5 fill-primary text-primary" />
          <span className="text-lg font-bold text-foreground">{gym.rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({gym.totalReviews})</span>
        </div>
      </div>

      {/* Address and Distance */}
      <button
        type="button"
        className="flex items-start gap-2 text-left text-muted-foreground hover:text-foreground transition-colors"
      >
        <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
        <span className="text-sm">
          {gym.address}, {gym.city} - {gym.state}
          {gym.distance !== undefined && (
            <span className="ml-2 font-medium text-primary">
              ({gym.distance < 1 ? `${(gym.distance * 1000).toFixed(0)}m` : `${gym.distance.toFixed(1)}km`})
            </span>
          )}
        </span>
      </button>

      {/* Opening Hours */}
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 text-primary" />
        <span className={`text-sm font-medium ${gym.isOpen ? "text-green-500" : "text-destructive"}`}>
          {gym.isOpen ? "Aberto agora" : "Fechado"}
        </span>
        <span className="text-sm text-muted-foreground">
          - Fecha as 23:00
        </span>
      </div>

      {/* Contact Buttons */}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
          <a href={`tel:${gym.phone}`}>
            <Phone className="mr-2 h-4 w-4" />
            Ligar
          </a>
        </Button>
        <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
          <a
            href={`https://wa.me/${gym.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp
          </a>
        </Button>
        {gym.website && (
          <Button variant="outline" size="sm" asChild>
            <a href={gym.website} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </div>

      {/* Modalities */}
      <div className="flex flex-wrap gap-2">
        {gym.modalities.map((mod) => (
          <Badge key={mod} variant="secondary">
            {mod}
          </Badge>
        ))}
      </div>

      {/* Integrations */}
      {(gym.acceptsWellhub || gym.acceptsTotalPass) && (
        <div className="flex gap-3 pt-2 border-t border-border">
          {gym.acceptsWellhub && (
            <Badge variant="outline" className="text-xs">
              Aceita Wellhub
            </Badge>
          )}
          {gym.acceptsTotalPass && (
            <Badge variant="outline" className="text-xs">
              Aceita TotalPass
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
