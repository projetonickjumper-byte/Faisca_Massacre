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
  Dumbbell,
  ClipboardList,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MenuItem {
  icon: React.ElementType
  label: string
  href: string
  badge?: string | number
  destructive?: boolean
  iconColor?: string
  iconBg?: string
}

const menuSections: { title: string; items: MenuItem[] }[] = [
  {
    title: "Treino e Saúde",
    items: [
      { icon: Dumbbell, label: "Meus Treinos", href: "/perfil/meus-treinos", badge: 3, iconColor: "text-orange-500", iconBg: "from-orange-500/20 to-orange-600/10" },
      { icon: ClipboardList, label: "Minhas Avaliações", href: "/perfil/minhas-avaliacoes", iconColor: "text-blue-500", iconBg: "from-blue-500/20 to-blue-600/10" },
      { icon: History, label: "Histórico de Treinos", href: "/perfil/historico", iconColor: "text-violet-500", iconBg: "from-violet-500/20 to-violet-600/10" },
      { icon: Calendar, label: "Minhas Reservas", href: "/perfil/reservas", badge: 2, iconColor: "text-emerald-500", iconBg: "from-emerald-500/20 to-emerald-600/10" },
    ],
  },
  {
    title: "Atividade",
    items: [
      { icon: Heart, label: "Favoritos", href: "/perfil/favoritos", iconColor: "text-red-500", iconBg: "from-red-500/20 to-red-600/10" },
      { icon: Award, label: "Conquistas", href: "/perfil/conquistas", iconColor: "text-yellow-500", iconBg: "from-yellow-500/20 to-yellow-600/10" },
      { icon: Users, label: "Indicar Amigos", href: "/perfil/indicar", badge: "+100 XP", iconColor: "text-cyan-500", iconBg: "from-cyan-500/20 to-cyan-600/10" },
    ],
  },
  {
    title: "Conta",
    items: [
      { icon: CreditCard, label: "Pagamentos", href: "/perfil/pagamentos", iconColor: "text-green-500", iconBg: "from-green-500/20 to-green-600/10" },
      { icon: Bell, label: "Notificações", href: "/perfil/notificacoes", iconColor: "text-amber-500", iconBg: "from-amber-500/20 to-amber-600/10" },
      { icon: Shield, label: "Segurança", href: "/perfil/seguranca", iconColor: "text-indigo-500", iconBg: "from-indigo-500/20 to-indigo-600/10" },
    ],
  },
  {
    title: "Suporte",
    items: [
      { icon: HelpCircle, label: "Ajuda e FAQ", href: "/ajuda", iconColor: "text-zinc-400", iconBg: "from-zinc-500/20 to-zinc-600/10" },
      { icon: LogOut, label: "Sair", href: "/sair", destructive: true, iconColor: "text-red-500", iconBg: "from-red-500/20 to-red-600/10" },
    ],
  },
]

export function ProfileMenu() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {menuSections.map((section) => (
          <div key={section.title}>
            <h2 className="mb-3 text-sm font-medium text-zinc-500 px-1">
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-center gap-4 px-4 py-3.5 rounded-xl bg-zinc-900/50 border border-zinc-800/50 transition-all hover:bg-zinc-800/50 hover:border-zinc-700/50",
                    item.destructive && "hover:border-red-500/30"
                  )}
                >
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br shrink-0",
                    item.iconBg
                  )}>
                    <item.icon className={cn(
                      "h-5 w-5",
                      item.iconColor
                    )} />
                  </div>
                  <span className={cn(
                    "flex-1 font-medium",
                    item.destructive ? "text-red-400" : "text-white group-hover:text-orange-400 transition-colors"
                  )}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className={cn(
                      "rounded-full px-2.5 py-1 text-xs font-medium",
                      typeof item.badge === "number"
                        ? "bg-orange-500/20 text-orange-400"
                        : "bg-emerald-500/20 text-emerald-400"
                    )}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="h-4 w-4 text-zinc-600 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-400" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
