"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (!auth) {
      router.push("/dashboard/login")
    } else {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-bounce" />
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <AdminSidebar />
      
      {/* Main Content Area */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        {/* Top Header - Desktop only */}
        <header className="hidden lg:flex sticky top-0 z-30 h-16 items-center justify-between gap-4 border-b border-zinc-800/50 bg-zinc-950/95 backdrop-blur-md px-8">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input
                placeholder="Buscar empresas, usuários..."
                className="pl-9 h-9 bg-zinc-900/50 border-zinc-800 text-zinc-300 placeholder:text-zinc-600 text-sm focus-visible:ring-1 focus-visible:ring-orange-500/50 w-full"
              />
              <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-400">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-zinc-400 hover:text-zinc-200 relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
            </Button>
            
            <div className="h-8 w-px bg-zinc-800" />
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 flex items-center justify-center">
                <span className="text-xs font-medium text-zinc-300">AD</span>
              </div>
              <div className="hidden xl:block">
                <p className="text-sm font-medium text-zinc-200">Administrador</p>
                <p className="text-xs text-zinc-500">admin@fitapp.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
