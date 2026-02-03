"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Building2, User, Dumbbell, Heart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useAuth } from "@/lib/auth-context"

const businessTypes = [
  { id: "gym", label: "Academia", icon: Building2, description: "Academia completa ou studio" },
  { id: "personal", label: "Personal Trainer", icon: Dumbbell, description: "Treinador pessoal" },
  { id: "studio", label: "Studio", icon: User, description: "Pilates, Yoga, CrossFit, etc" },
  { id: "instructor", label: "Instrutor", icon: Heart, description: "Natacao, Artes Marciais, etc" },
] as const

export default function PartnerRegisterPage() {
  const [step, setStep] = useState(1)
  const [businessType, setBusinessType] = useState<"gym" | "personal" | "studio" | "instructor">("gym")
  const [businessName, setBusinessName] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, isAuthenticated, isPartner, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated && isPartner) {
      router.push("/parceiro/dashboard")
    }
  }, [isAuthenticated, isPartner, isLoading, router])

  const handleNextStep = () => {
    if (step === 1 && !businessType) {
      setError("Selecione o tipo de negocio")
      return
    }
    if (step === 2) {
      if (!businessName.trim()) {
        setError("Informe o nome do seu negocio")
        return
      }
      if (!name.trim()) {
        setError("Informe seu nome")
        return
      }
    }
    setError("")
    setStep(step + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim()) {
      setError("Informe seu email")
      return
    }

    if (!phone.trim()) {
      setError("Informe seu telefone")
      return
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    if (password !== confirmPassword) {
      setError("As senhas nao coincidem")
      return
    }

    if (!acceptTerms) {
      setError("Voce precisa aceitar os termos de uso")
      return
    }

    setIsSubmitting(true)

    const result = await register({
      name,
      email,
      password,
      type: "partner",
      businessName,
      businessType,
      phone,
    })

    if (result.success) {
      router.push("/parceiro/dashboard")
    } else {
      setError(result.error || "Erro ao criar conta")
    }

    setIsSubmitting(false)
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }
    return value
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
            Faca parte da maior rede fitness do Brasil
          </h1>
          <p className="text-lg text-muted-foreground">
            Milhares de usuarios buscando servicos como o seu todos os dias.
          </p>
          
          <div className="space-y-3 pt-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">Cadastro gratuito</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">Dashboard completo</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">Gestao de agenda e clientes</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                <Check className="h-4 w-4 text-primary" />
              </div>
              <span className="text-foreground">Relatorios e metricas</span>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          2024 FitApp. Todos os direitos reservados.
        </p>
      </div>

      {/* Right Side - Register Form */}
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

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-2 w-16 rounded-full transition-colors",
                  s <= step ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground">
              {step === 1 && "Tipo de negocio"}
              {step === 2 && "Informacoes basicas"}
              {step === 3 && "Dados de acesso"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {step === 1 && "Selecione o que melhor descreve seu negocio"}
              {step === 2 && "Conte-nos mais sobre voce"}
              {step === 3 && "Crie sua conta de acesso"}
            </p>
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Step 1 - Business Type */}
          {step === 1 && (
            <div className="space-y-4">
              {businessTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setBusinessType(type.id)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-all",
                    businessType === type.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <div className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-lg",
                    businessType === type.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  )}>
                    <type.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{type.label}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                  {businessType === type.id && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                      <Check className="h-4 w-4 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}

              <Button onClick={handleNextStep} className="w-full h-12 text-base font-semibold mt-6">
                Continuar
              </Button>
            </div>
          )}

          {/* Step 2 - Basic Info */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Nome do negocio</Label>
                <Input
                  id="businessName"
                  placeholder={businessType === "personal" ? "Seu nome profissional" : "Nome da academia/studio"}
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="h-12 bg-card border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Seu nome completo</Label>
                <Input
                  id="name"
                  placeholder="Nome do responsavel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 bg-card border-border"
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 bg-transparent">
                  Voltar
                </Button>
                <Button onClick={handleNextStep} className="flex-1 h-12">
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {/* Step 3 - Access Data */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-card border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone/WhatsApp</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className="h-12 bg-card border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Minimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar senha</Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite novamente"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 bg-card border-border"
                />
              </div>

              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => setAcceptTerms(!acceptTerms)}
                  className={cn(
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors",
                    acceptTerms ? "border-primary bg-primary" : "border-border bg-card"
                  )}
                >
                  {acceptTerms && <Check className="h-3 w-3 text-primary-foreground" />}
                </button>
                <p className="text-sm text-muted-foreground">
                  Concordo com os{" "}
                  <Link href="/termos" className="text-primary hover:underline">Termos de Uso</Link>
                  {" "}e{" "}
                  <Link href="/privacidade" className="text-primary hover:underline">Politica de Privacidade</Link>
                </p>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 h-12 bg-transparent">
                  Voltar
                </Button>
                <Button type="submit" className="flex-1 h-12" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Criando...
                    </div>
                  ) : (
                    "Criar conta"
                  )}
                </Button>
              </div>
            </form>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Ja tem uma conta?{" "}
            <Link href="/parceiro/login" className="font-medium text-primary hover:underline">
              Faca login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
