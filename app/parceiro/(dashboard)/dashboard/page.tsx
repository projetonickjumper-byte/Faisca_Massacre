"use client"

import { useState } from "react"
import Link from "next/link"
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  Star,
  ArrowRight,
  Clock,
  MapPin,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Mock data
const stats = [
  {
    title: "Faturamento",
    value: "R$ 12.450",
    change: "+12%",
    trend: "up",
    icon: DollarSign,
    description: "vs. mes anterior",
  },
  {
    title: "Novos Clientes",
    value: "48",
    change: "+8%",
    trend: "up",
    icon: Users,
    description: "vs. mes anterior",
  },
  {
    title: "Reservas",
    value: "156",
    change: "-3%",
    trend: "down",
    icon: Calendar,
    description: "vs. mes anterior",
  },
  {
    title: "Avaliacao",
    value: "4.8",
    change: "+0.2",
    trend: "up",
    icon: Star,
    description: "media geral",
  },
]

const upcomingReservations = [
  {
    id: "1",
    clientName: "Maria Santos",
    clientAvatar: null,
    service: "Musculacao",
    date: "Hoje",
    time: "14:00",
    status: "confirmed",
  },
  {
    id: "2",
    clientName: "Pedro Lima",
    clientAvatar: null,
    service: "Personal Trainer",
    date: "Hoje",
    time: "15:30",
    status: "confirmed",
  },
  {
    id: "3",
    clientName: "Ana Costa",
    clientAvatar: null,
    service: "Yoga",
    date: "Hoje",
    time: "17:00",
    status: "pending",
  },
  {
    id: "4",
    clientName: "Lucas Oliveira",
    clientAvatar: null,
    service: "CrossFit",
    date: "Amanha",
    time: "08:00",
    status: "confirmed",
  },
]

const recentReviews = [
  {
    id: "1",
    userName: "Fernanda Silva",
    userAvatar: null,
    rating: 5,
    text: "Excelente academia! Equipamentos novos e profissionais atenciosos.",
    date: "Hoje",
  },
  {
    id: "2",
    userName: "Roberto Alves",
    userAvatar: null,
    rating: 4,
    text: "Muito bom, so poderia ter mais horarios de aulas.",
    date: "Ontem",
  },
]

const topServices = [
  { name: "Musculacao", bookings: 89, percentage: 45 },
  { name: "Personal Trainer", bookings: 45, percentage: 23 },
  { name: "CrossFit", bookings: 34, percentage: 17 },
  { name: "Yoga", bookings: 28, percentage: 15 },
]

export default function PartnerDashboardPage() {
  const [period, setPeriod] = useState("month")

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bem-vindo de volta!</h1>
          <p className="text-muted-foreground">Aqui esta o resumo do seu negocio</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className={period === "week" ? "bg-secondary" : "bg-transparent"} onClick={() => setPeriod("week")}>
            Semana
          </Button>
          <Button variant="outline" size="sm" className={period === "month" ? "bg-secondary" : "bg-transparent"} onClick={() => setPeriod("month")}>
            Mes
          </Button>
          <Button variant="outline" size="sm" className={period === "year" ? "bg-secondary" : "bg-transparent"} onClick={() => setPeriod("year")}>
            Ano
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming Reservations */}
        <Card className="lg:col-span-2 bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">Proximas Reservas</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/parceiro/agenda" className="text-primary">
                Ver todas <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingReservations.map((reservation) => (
                <div
                  key={reservation.id}
                  className="flex items-center justify-between rounded-lg bg-secondary/50 p-4"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={reservation.clientAvatar || undefined} />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {reservation.clientName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{reservation.clientName}</p>
                      <p className="text-sm text-muted-foreground">{reservation.service}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm text-foreground">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {reservation.date}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {reservation.time}
                      </div>
                    </div>
                    <Badge
                      variant={reservation.status === "confirmed" ? "default" : "secondary"}
                      className={reservation.status === "confirmed" ? "bg-green-500/20 text-green-500" : ""}
                    >
                      {reservation.status === "confirmed" ? "Confirmado" : "Pendente"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Services */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Servicos Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service) => (
                <div key={service.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{service.name}</span>
                    <span className="text-muted-foreground">{service.bookings} reservas</span>
                  </div>
                  <Progress value={service.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Section */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Avaliacoes Recentes</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/parceiro/avaliacoes" className="text-primary">
              Ver todas <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {recentReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-lg bg-secondary/50 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.userAvatar || undefined} />
                      <AvatarFallback className="bg-primary/20 text-primary">
                        {review.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{review.userName}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "fill-primary text-primary" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{review.text}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/parceiro/servicos">
          <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="font-medium text-foreground">Adicionar Servico</p>
                <p className="text-sm text-muted-foreground">Crie novos servicos</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/parceiro/produtos">
          <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="font-medium text-foreground">Adicionar Produto</p>
                <p className="text-sm text-muted-foreground">Gerencie sua loja</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/parceiro/agenda">
          <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="font-medium text-foreground">Gerenciar Agenda</p>
                <p className="text-sm text-muted-foreground">Horarios disponiveis</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
        <Link href="/parceiro/relatorios">
          <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="font-medium text-foreground">Ver Relatorios</p>
                <p className="text-sm text-muted-foreground">Metricas detalhadas</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}
