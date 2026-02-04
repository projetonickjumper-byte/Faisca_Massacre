"use client"

import React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Calendar,
  Package,
  ShoppingBag,
  Users,
  Star,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  Building2,
  ChevronDown,
  Dumbbell,
  ClipboardList,
  ShoppingCart,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"

const sidebarItems = [
  { href: "/parceiro/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/parceiro/pedidos", icon: ShoppingCart, label: "Pedidos", badge: true },
  { href: "/parceiro/agenda", icon: Calendar, label: "Agenda" },
  { href: "/parceiro/treinos", icon: Dumbbell, label: "Treinos" },
  { href: "/parceiro/avaliacao-fisica", icon: ClipboardList, label: "Avaliação Física" },
  { href: "/parceiro/servicos", icon: Package, label: "Serviços" },
  { href: "/parceiro/produtos", icon: ShoppingBag, label: "Produtos" },
  { href: "/parceiro/clientes", icon: Users, label: "Clientes" },
  { href: "/parceiro/avaliacoes", icon: Star, label: "Avaliações" },
  { href: "/parceiro/relatorios", icon: BarChart3, label: "Relatórios" },
  { href: "/parceiro/configuracoes", icon: Settings, label: "Configurações" },
]

export default function PartnerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { user, isAuthenticated, isPartner, isLoading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !isPartner)) {
      router.push("/parceiro/login")
    }
  }, [isAuthenticated, isPartner, isLoading, router])

  if (isLoading || !isAuthenticated || !isPartner) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const partnerUser = user as {
    businessName: string
    businessType: string
    isVerified: boolean
    planType: string
    name: string
    avatar: string | null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 transform bg-card border-r border-border transition-transform duration-200 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <Link href="/parceiro/dashboard" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">F</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground">FitApp</span>
                <span className="text-xs text-primary -mt-1">Parceiros</span>
              </div>
            </Link>
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Business Info */}
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{partnerUser.businessName}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground capitalize">{partnerUser.businessType}</span>
                  {partnerUser.isVerified && (
                    <Badge variant="secondary" className="text-[10px] px-1 py-0">Verificado</Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Plan Badge */}
          <div className="border-t border-border p-4">
            <div className="rounded-lg bg-gradient-to-r from-primary/20 to-primary/5 p-3">
              <p className="text-xs text-muted-foreground mb-1">Plano atual</p>
              <p className="font-semibold text-foreground capitalize">{partnerUser.planType}</p>
              {partnerUser.planType !== "premium" && (
                <Button size="sm" className="w-full mt-2 h-8 text-xs">
                  Fazer upgrade
                </Button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 backdrop-blur px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-semibold text-foreground hidden sm:block">
              {sidebarItems.find(item => item.href === pathname)?.label || "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                5
              </span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-secondary transition-colors">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={partnerUser.avatar || undefined} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {partnerUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium text-foreground">
                    {partnerUser.name}
                  </span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{partnerUser.name}</p>
                  <p className="text-xs text-muted-foreground">{partnerUser.businessName}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/parceiro/configuracoes">
                    <Settings className="mr-2 h-4 w-4" />
                    Configuracoes
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
