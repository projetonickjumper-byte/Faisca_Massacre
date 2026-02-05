"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Calendar, User, LogIn, Wrench } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

export function BottomNav() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  // Nao mostrar na pagina de login/cadastro
  if (pathname === "/login" || pathname === "/cadastro" || pathname === "/esqueci-senha") {
    return null
  }

  // Navegacao simplificada - max 5 itens para caber bem em mobile
  const navItems = isAuthenticated 
    ? [
        { href: "/", icon: Home, label: "Inicio" },
        { href: "/explorar", icon: Search, label: "Buscar" },
        { href: "/ferramentas", icon: Wrench, label: "Ferramentas" },
        { href: "/reservas", icon: Calendar, label: "Reservas" },
      ]
    : [
        { href: "/", icon: Home, label: "Inicio" },
        { href: "/explorar", icon: Search, label: "Buscar" },
      ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/90 lg:hidden safe-area-inset-bottom">
      <div className="flex items-center justify-around py-2 pb-[env(safe-area-inset-bottom)]">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-[64px] py-1.5 text-[11px] font-medium transition-colors",
                isActive ? "text-orange-500" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-orange-500")} />
              <span className="truncate">{item.label}</span>
            </Link>
          )
        })}
        
        {/* Ultimo item: Perfil ou Login */}
        {isAuthenticated ? (
          <Link
            href="/perfil"
            className={cn(
              "flex flex-col items-center justify-center gap-0.5 min-w-[64px] py-1.5 text-[11px] font-medium transition-colors",
              pathname.startsWith("/perfil") ? "text-orange-500" : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            <User className={cn("h-5 w-5", pathname.startsWith("/perfil") && "text-orange-500")} />
            <span>Perfil</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex flex-col items-center justify-center gap-0.5 min-w-[64px] py-1.5 text-[11px] font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <LogIn className="h-5 w-5" />
            <span>Entrar</span>
          </Link>
        )}
      </div>
    </nav>
  )
}
