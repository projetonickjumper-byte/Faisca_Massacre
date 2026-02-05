"use client"

import Link from "next/link"
import { Bell, LogIn, Search, Command } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const { user, isAuthenticated } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/20 transition-transform group-hover:scale-105">
              <span className="text-lg font-bold text-white">F</span>
            </div>
            <span className="hidden text-xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent sm:inline">
              FitApp
            </span>
          </Link>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-orange-600/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Buscar academias, modalidades..."
                className="w-full h-10 pl-10 pr-20 rounded-xl bg-zinc-900/80 border border-zinc-800/50 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 transition-all"
              />
              <div className="absolute right-3 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-zinc-800/80 border border-zinc-700/50">
                <Command className="h-3 w-3 text-zinc-500" />
                <span className="text-xs text-zinc-500">K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {/* Mobile Search */}
              <Button variant="ghost" size="icon" className="md:hidden text-zinc-400 hover:text-white hover:bg-zinc-800/50">
                <Search className="h-5 w-5" />
              </Button>
              
              {/* Notifications */}
              <Link href="/notificacoes">
                <Button variant="ghost" size="icon" className="relative text-zinc-400 hover:text-white hover:bg-zinc-800/50">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-medium text-white ring-2 ring-zinc-950">
                    3
                  </span>
                </Button>
              </Link>
              
              {/* User Avatar */}
              <Link href="/perfil" className="group">
                <div className="relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full opacity-0 group-hover:opacity-100 blur transition-opacity" />
                  <Avatar className="relative h-9 w-9 border-2 border-zinc-800 group-hover:border-orange-500/50 transition-colors">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Usuário"} />
                    <AvatarFallback className="bg-zinc-800 text-zinc-300">{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </div>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden sm:flex text-zinc-400 hover:text-white hover:bg-zinc-800/50">
                  Entrar
                </Button>
                <Button variant="ghost" size="icon" className="sm:hidden text-zinc-400 hover:text-white hover:bg-zinc-800/50">
                  <LogIn className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/cadastro">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/20">
                  Cadastrar
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
