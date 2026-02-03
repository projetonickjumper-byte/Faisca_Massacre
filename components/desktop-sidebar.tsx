"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Calendar, Trophy, User, MapPin, Heart, Settings, LogOut, LogIn, Wrench, Dumbbell, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

const publicNavItems = [
  { href: "/", icon: Home, label: "Inicio" },
  { href: "/explorar", icon: Search, label: "Explorar" },
  { href: "/mapa", icon: MapPin, label: "Mapa" },
]

const authNavItems = [
  { href: "/reservas", icon: Calendar, label: "Reservas" },
  { href: "/ranking", icon: Trophy, label: "Ranking" },
]

const userNavItems = [
  { href: "/perfil", icon: User, label: "Meu Perfil" },
  { href: "/ferramentas", icon: Wrench, label: "Ferramentas" },
  { href: "/meus-treinos", icon: Dumbbell, label: "Meus Treinos" },
  { href: "/minhas-avaliacoes", icon: ClipboardList, label: "Minhas Avaliacoes" },
  { href: "/perfil/favoritos", icon: Heart, label: "Favoritos" },
  { href: "/perfil/configuracoes", icon: Settings, label: "Configuracoes" },
]

export function DesktopSidebar() {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()

  const mainNavItems = isAuthenticated ? [...publicNavItems, ...authNavItems] : publicNavItems

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
          <span className="text-lg font-bold text-primary-foreground">F</span>
        </div>
        <span className="text-xl font-bold text-foreground">FitApp</span>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Menu
        </p>
        {mainNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          )
        })}

        {isAuthenticated && (
          <>
            <div className="my-4 border-t border-border" />

            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Conta
            </p>
            {userNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </>
        )}
      </nav>

      <div className="border-t border-border p-4">
        {isAuthenticated ? (
          <>
            <Link
              href="/perfil"
              className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
            >
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Usuario"} />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{user?.name}</p>
                <p className="truncate text-xs text-muted-foreground">Nivel {user?.level}</p>
              </div>
            </Link>
            <button
              type="button"
              onClick={logout}
              className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              Sair
            </button>
          </>
        ) : (
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Entrar
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/cadastro">Criar conta</Link>
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}
