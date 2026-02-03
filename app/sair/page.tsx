"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogOut, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"

export default function SairPage() {
  const router = useRouter()
  const { logout, isAuthenticated } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Redirecionar se nao estiver autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    setIsLoggingOut(true)
    // Pequeno delay para mostrar animacao
    setTimeout(() => {
      logout()
    }, 1000)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <LogOut className="h-10 w-10 text-destructive" />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-2">
          Sair do FitApp?
        </h1>
        <p className="text-muted-foreground mb-8">
          Voce tera que fazer login novamente para acessar sua conta.
        </p>

        <div className="space-y-3">
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoggingOut ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saindo...
              </>
            ) : (
              <>
                <LogOut className="h-4 w-4 mr-2" />
                Confirmar Saida
              </>
            )}
          </Button>

          <Button variant="outline" asChild className="w-full bg-transparent">
            <Link href="/perfil">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Perfil
            </Link>
          </Button>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          Ate logo! Esperamos ver voce em breve.
        </p>
      </div>
    </div>
  )
}
