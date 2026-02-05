"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  Users,
  DollarSign,
  Settings,
  LogOut,
  Dumbbell,
  Shield,
  Menu,
  X,
  ChevronRight,
  Bell,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const menuItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/empresas", icon: Building2, label: "Empresas", badge: "248" },
  { href: "/dashboard/usuarios", icon: Users, label: "Usuários" },
  { href: "/dashboard/faturamento", icon: DollarSign, label: "Faturamento" },
  { href: "/dashboard/configuracoes", icon: Settings, label: "Configurações" },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/dashboard/login")
  }

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-zinc-800/50">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Dumbbell className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold text-zinc-100 tracking-tight">FitApp</span>
            <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider flex items-center gap-1">
              <Shield className="w-2.5 h-2.5" />
              Admin Panel
            </span>
          </div>
        </Link>
      </div>

      {/* Search */}
      <div className="px-3 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <Input
            placeholder="Buscar..."
            className="pl-9 h-9 bg-zinc-800/50 border-zinc-700/50 text-zinc-300 placeholder:text-zinc-500 text-sm focus-visible:ring-1 focus-visible:ring-orange-500/50"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        <p className="px-3 py-2 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
          Menu Principal
        </p>
        {menuItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                active
                  ? "bg-gradient-to-r from-orange-500/10 to-transparent text-orange-400 border-l-2 border-orange-500 -ml-[2px] pl-[14px]"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              )}
            >
              <item.icon className={cn(
                "w-[18px] h-[18px] flex-shrink-0 transition-colors",
                active ? "text-orange-400" : "text-zinc-500 group-hover:text-zinc-400"
              )} />
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <Badge
                  variant="secondary"
                  className={cn(
                    "text-[10px] px-1.5 py-0 h-5 font-medium",
                    active
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-zinc-800 text-zinc-400"
                  )}
                >
                  {item.badge}
                </Badge>
              )}
              {active && (
                <ChevronRight className="w-4 h-4 text-orange-400/50" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-3 border-t border-zinc-800/50">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-800/30">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center">
            <span className="text-xs font-medium text-zinc-300">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-zinc-200 truncate">Admin</p>
            <p className="text-xs text-zinc-500 truncate">admin@fitapp.com</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 flex-shrink-0"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/50 px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Dumbbell className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-zinc-100">FitApp Admin</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-zinc-400"
          >
            <Bell className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-zinc-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "lg:hidden fixed top-0 left-0 z-50 h-full w-72 bg-zinc-950 border-r border-zinc-800/50 flex flex-col transform transition-transform duration-300 ease-out",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-full w-64 bg-zinc-950 border-r border-zinc-800/50 flex-col">
        <SidebarContent />
      </aside>
    </>
  )
}
