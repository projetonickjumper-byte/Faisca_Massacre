"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Loader2, Dumbbell, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

export default function CadastroPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const passwordRequirements = [
    { label: "Minimo 6 caracteres", valid: password.length >= 6 },
    { label: "Letras e numeros", valid: /[a-zA-Z]/.test(password) && /[0-9]/.test(password) },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("As senhas nao coincidem")
      return
    }

    if (!acceptTerms) {
      setError("Voce precisa aceitar os termos de uso")
      return
    }

    setIsSubmitting(true)

    const result = await register(name, email, password)
    
    if (result.success) {
      router.push("/")
    } else {
      setError(result.error || "Erro ao criar conta")
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header decorativo */}
      <div className="relative h-36 bg-gradient-to-br from-primary/30 via-primary/10 to-background flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
            <Dumbbell className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground">FitApp</h1>
        </div>
      </div>

      {/* Formulario */}
      <div className="flex-1 px-6 py-6">
        <div className="mx-auto max-w-sm">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-foreground">Criar Conta</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Junte-se a milhares de pessoas ativas
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-card border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-card border-border pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-full",
                        req.valid ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"
                      )}>
                        {req.valid && <Check className="h-3 w-3" />}
                      </div>
                      <span className={req.valid ? "text-green-500" : "text-muted-foreground"}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="bg-card border-border"
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                className="mt-0.5"
              />
              <label
                htmlFor="terms"
                className="text-sm leading-tight text-muted-foreground"
              >
                Concordo com os{" "}
                <Link href="/termos" className="text-primary hover:underline">
                  Termos de Uso
                </Link>{" "}
                e{" "}
                <Link href="/privacidade" className="text-primary hover:underline">
                  Politica de Privacidade
                </Link>
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                "Criar Conta"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Ja tem uma conta?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
