"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Building2, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

export default function PartnerLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, isAuthenticated, isPartner, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated && isPartner) {
      router.push("/parceiro/dashboard")
    }
  }, [isAuthenticated, isPartner, isLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    const result = await login(email, password, "partner")
    
    if (result.success) {
      router.push("/parceiro/dashboard")
    } else {
      setError(result.error || "Erro ao fazer login")
    }
    
    setIsSubmitting(false)
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-primary/20 via-primary/10 to-background p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <span className="text-2xl font-bold text-primary-foreground">F</span>
          </div>
          <div>
            <span className="text-2xl font-bold text-foreground">FitApp</span>
            <span className="ml-2 text-sm text-primary font-medium">Parceiros</span>
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-foreground leading-tight">
            Gerencie seu negocio fitness em um so lugar
          </h1>
          <p className="text-lg text-muted-foreground">
            Dashboard completo para academias, personal trainers e profissionais da saude.
          </p>
          
          <div className="grid gap-4 pt-6">
            <div className="flex items-center gap-4 rounded-xl bg-card/50 p-4 backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Academias e Studios</h3>
                <p className="text-sm text-muted-foreground">Gerencie planos, aulas e alunos</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-card/50 p-4 backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <Dumbbell className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Personal Trainers</h3>
                <p className="text-sm text-muted-foreground">Agenda, clientes e pagamentos</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          2024 FitApp. Todos os direitos reservados.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <span className="text-2xl font-bold text-primary-foreground">F</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-foreground">FitApp</span>
              <span className="ml-2 text-sm text-primary font-medium">Parceiros</span>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground">Acesse sua conta</h2>
            <p className="mt-2 text-muted-foreground">
              Entre para gerenciar seu negocio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link
                  href="/parceiro/esqueci-senha"
                  className="text-sm text-primary hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 bg-card border-border pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Entrando...
                </div>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Ainda nao tem uma conta?{" "}
              <Link href="/parceiro/cadastro" className="font-medium text-primary hover:underline">
                Cadastre-se gratuitamente
              </Link>
            </p>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">ou</span>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              E usuario?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Acesse como cliente
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
