"use client"

import React from "react"

import Link from "next/link"
import {
  Calendar,
  Heart,
  Award,
  History,
  Users,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuItem {
  icon: React.ElementType
  label: string
  href: string
  badge?: string | number
  destructive?: boolean
}

const menuSections: { title: string; items: MenuItem[] }[] = [
  {
    title: "Atividade",
    items: [
      { icon: History, label: "Historico de Treinos", href: "/perfil/historico" },
      { icon: Calendar, label: "Minhas Reservas", href: "/perfil/reservas", badge: 2 },
      { icon: Heart, label: "Favoritos", href: "/perfil/favoritos" },
      { icon: Award, label: "Conquistas", href: "/perfil/conquistas" },
      { icon: Users, label: "Indicar Amigos", href: "/perfil/indicar", badge: "+100 XP" },
    ],
  },
  {
    title: "Conta",
    items: [
      { icon: CreditCard, label: "Pagamentos", href: "/perfil/pagamentos" },
      { icon: Bell, label: "Notificacoes", href: "/perfil/notificacoes" },
      { icon: Shield, label: "Seguranca", href: "/perfil/seguranca" },
    ],
  },
  {
    title: "Suporte",
    items: [
      { icon: HelpCircle, label: "Ajuda e FAQ", href: "/ajuda" },
      { icon: LogOut, label: "Sair", href: "/sair", destructive: true },
    ],
  },
]

export function ProfileMenu() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {menuSections.map((section) => (
          <div key={section.title}>
            <h2 className="mb-3 text-sm font-medium text-muted-foreground">
              {section.title}
            </h2>
            <div className="space-y-1 rounded-xl bg-card overflow-hidden">
              {section.items.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary",
                    item.destructive && "text-destructive hover:text-destructive",
                    index > 0 && "border-t border-border"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 shrink-0",
                    item.destructive ? "text-destructive" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "flex-1 font-medium",
                    item.destructive ? "text-destructive" : "text-foreground"
                  )}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      typeof item.badge === "number"
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/20 text-primary"
                    )}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
