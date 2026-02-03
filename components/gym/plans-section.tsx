"use client"

import { Check, Sparkles, Gift, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Gym, DayUse, Plan } from "@/lib/types"

interface PlansSectionProps {
  gym: Gym
}

function DayUseCard({ dayUse, gymName }: { dayUse: DayUse; gymName: string }) {
  return (
    <Card className="border-primary/50 bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Day Use</CardTitle>
          {dayUse.firstExperienceDiscount && (
            <Badge className="bg-primary text-primary-foreground">
              <Gift className="mr-1 h-3 w-3" />
              {dayUse.firstExperienceDiscount}% OFF primeira vez
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">
            R$ {dayUse.price.toFixed(2).replace(".", ",")}
          </span>
          {dayUse.originalPrice && dayUse.originalPrice > dayUse.price && (
            <span className="text-sm text-muted-foreground line-through">
              R$ {dayUse.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Duracao: {dayUse.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Horarios: {dayUse.availableHours}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">{dayUse.cancellationPolicy}</p>

        <Button className="w-full">Comprar Day Use</Button>
      </CardContent>
    </Card>
  )
}

function PlanCard({ plan, isPopular }: { plan: Plan; isPopular?: boolean }) {
  const typeLabels: Record<string, string> = {
    monthly: "Mensal",
    quarterly: "Trimestral",
    annual: "Anual",
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden",
        isPopular && "border-primary ring-2 ring-primary/20"
      )}
    >
      {isPopular && (
        <div className="absolute right-0 top-0 bg-primary px-3 py-1 text-xs font-medium text-primary-foreground rounded-bl-lg">
          Mais popular
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{plan.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{typeLabels[plan.type]}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">
            R$ {plan.price.toFixed(2).replace(".", ",")}
          </span>
          <span className="text-sm text-muted-foreground">/mes</span>
        </div>
        {plan.originalPrice && plan.originalPrice > plan.price && (
          <span className="text-sm text-muted-foreground line-through">
            R$ {plan.originalPrice.toFixed(2).replace(".", ",")}
          </span>
        )}

        {plan.hasFreeTrial && plan.trialDays && (
          <Badge variant="secondary" className="w-fit">
            <Sparkles className="mr-1 h-3 w-3" />
            {plan.trialDays} dias gratis
          </Badge>
        )}

        <ul className="space-y-2">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button className="w-full" variant={isPopular ? "default" : "outline"}>
          Assinar Plano
        </Button>
      </CardContent>
    </Card>
  )
}

export function PlansSection({ gym }: PlansSectionProps) {
  return (
    <section id="planos" className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Planos e Day Use</h2>

      {gym.dayUse && <DayUseCard dayUse={gym.dayUse} gymName={gym.name} />}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gym.plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} isPopular={plan.popular} />
        ))}
      </div>
    </section>
  )
}
