"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Calendar, Trophy, User, LogIn, Wrench, Dumbbell, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

const publicNavItems = [
  { href: "/", icon: Home, label: "Inicio" },
  { href: "/explorar", icon: Search, label: "Buscar" },
]

const authNavItems = [
  { href: "/ferramentas", icon: Wrench, label: "Ferramentas" },
  { href: "/meus-treinos", icon: Dumbbell, label: "Treinos" },
  { href: "/minhas-avaliacoes", icon: ClipboardList, label: "Avaliacoes" },
  { href: "/reservas", icon: Calendar, label: "Reservas" },
]

export function BottomNav() {
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()

  // Nao mostrar na pagina de login/cadastro
  if (pathname === "/login" || pathname === "/cadastro" || pathname === "/esqueci-senha") {
    return null
  }

  const navItems = isAuthenticated ? [...publicNavItems, ...authNavItems] : publicNavItems

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
              <span>{item.label}</span>
            </Link>
          )
        })}
        
        {/* Ultimo item: Perfil ou Login */}
        {isAuthenticated ? (
          <Link
            href="/perfil"
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-2 text-xs transition-colors",
              pathname.startsWith("/perfil") ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <User className={cn("h-5 w-5", pathname.startsWith("/perfil") && "text-primary")} />
            <span>Perfil</span>
          </Link>
        ) : (
          <Link
            href="/login"
            className="flex flex-col items-center gap-1 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogIn className="h-5 w-5" />
            <span>Entrar</span>
          </Link>
        )}
      </div>
    </nav>
  )
}
