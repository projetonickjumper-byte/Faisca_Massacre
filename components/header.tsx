"use client"

import Link from "next/link"
import { Bell, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CitySearch } from "@/components/city-search"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const { user, isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">F</span>
            </div>
            <span className="hidden text-xl font-bold text-foreground sm:inline">FitApp</span>
          </Link>
        </div>

        <CitySearch />

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <Link href="/notificacoes">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    3
                  </span>
                </Button>
              </Link>
              <Link href="/perfil">
                <Avatar className="h-9 w-9 border-2 border-primary">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Usuario"} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  Entrar
                </Button>
                <Button variant="ghost" size="icon" className="sm:hidden">
                  <LogIn className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button size="sm">Cadastrar</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
