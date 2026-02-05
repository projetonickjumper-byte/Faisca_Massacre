"use client"

import React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  Eye, 
  EyeOff, 
  Dumbbell, 
  Lock, 
  Mail, 
  ArrowRight,
  User,
  Check,
  MapPin,
  Calendar,
  Trophy,
  Star,
  Shield,
  Zap,
  Users
} from "lucide-react"
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const passwordRequirements = [
    { label: "Mínimo 6 caracteres", valid: password.length >= 6 },
    { label: "Letras e números", valid: /[a-zA-Z]/.test(password) && /[0-9]/.test(password) },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (!acceptTerms) {
      setError("Você precisa aceitar os termos de uso")
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
    <div className="min-h-screen flex bg-zinc-950">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-600/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
             }}
        />
        
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-zinc-100">FitApp</span>
            </div>
          </div>
          
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-zinc-100 leading-tight mb-4">
              Comece sua
              <span className="text-orange-500"> transformação</span>
            </h1>
            <p className="text-zinc-400 text-lg mb-8">
              Junte-se a milhares de pessoas que já transformaram sua rotina de treinos.
            </p>
            
            {/* Benefits Cards */}
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm transition-all hover:bg-zinc-900/70">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-200">Cadastro rápido</h3>
                  <p className="text-sm text-zinc-500">Em menos de 1 minuto você está pronto</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm transition-all hover:bg-zinc-900/70">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-200">100% gratuito</h3>
                  <p className="text-sm text-zinc-500">Sem taxas escondidas ou cobranças</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm transition-all hover:bg-zinc-900/70">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-200">Ganhe XP de boas-vindas</h3>
                  <p className="text-sm text-zinc-500">50 XP para começar sua jornada</p>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="mt-8 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-zinc-100">500+</span>
                <span className="text-xs text-zinc-500">Academias</span>
              </div>
              <div className="w-px h-10 bg-zinc-800" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-zinc-100">50K+</span>
                <span className="text-xs text-zinc-500">Usuários ativos</span>
              </div>
              <div className="w-px h-10 bg-zinc-800" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-zinc-100">4.8</span>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                  <span className="text-xs text-zinc-500">Avaliação</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-zinc-600">
            2026 FitApp. Todos os direitos reservados.
          </div>
        </div>
      </div>
      
      {/* Right Panel - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-zinc-100">FitApp</span>
            </div>
            <p className="text-sm text-zinc-500">Crie sua conta gratuita</p>
          </div>
          
          <div className="mb-8 hidden lg:block">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-2">Criar conta</h2>
            <p className="text-zinc-500">Preencha os dados para começar</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs">!</span>
                </div>
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-zinc-300 text-sm">Nome completo</Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-11 bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300 text-sm">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-zinc-300 text-sm">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Crie uma senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              
              {/* Password Requirements */}
              {password && (
                <div className="mt-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50 space-y-2">
                  {passwordRequirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      <div className={cn(
                        "w-4 h-4 rounded-full flex items-center justify-center transition-all",
                        req.valid 
                          ? "bg-emerald-500/20 text-emerald-500" 
                          : "bg-zinc-800 text-zinc-600"
                      )}>
                        {req.valid && <Check className="w-3 h-3" />}
                      </div>
                      <span className={cn(
                        "transition-colors",
                        req.valid ? "text-emerald-500" : "text-zinc-500"
                      )}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-zinc-300 text-sm">Confirmar senha</Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repita a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-400 mt-1">As senhas não coincidem</p>
              )}
              {confirmPassword && password === confirmPassword && password.length > 0 && (
                <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Senhas coincidem
                </p>
              )}
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/30 border border-zinc-800/50">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                className="mt-0.5 border-zinc-700 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />
              <label
                htmlFor="terms"
                className="text-sm leading-relaxed text-zinc-400 cursor-pointer"
              >
                Concordo com os{" "}
                <Link href="/termos" className="text-orange-500 hover:text-orange-400 underline-offset-2 hover:underline transition-colors">
                  Termos de Uso
                </Link>{" "}
                e{" "}
                <Link href="/privacidade" className="text-orange-500 hover:text-orange-400 underline-offset-2 hover:underline transition-colors">
                  Política de Privacidade
                </Link>
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Criando conta...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Criar conta gratuita
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-950 px-3 text-zinc-600">ou cadastre-se com</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                type="button"
                variant="outline" 
                className="h-11 bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-all"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button 
                type="button"
                variant="outline" 
                className="h-11 bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 transition-all"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Facebook
              </Button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Já tem uma conta?{" "}
            <Link href="/login" className="font-medium text-orange-500 hover:text-orange-400 transition-colors">
              Fazer login
            </Link>
          </p>

          <div className="mt-6 pt-6 border-t border-zinc-800">
            <div className="flex items-center justify-center gap-6">
              <Link 
                href="/parceiro/login" 
                className="text-sm text-zinc-500 hover:text-orange-500 transition-colors inline-flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5" />
                Sou parceiro
              </Link>
              <div className="w-px h-4 bg-zinc-800" />
              <Link 
                href="/" 
                className="text-sm text-zinc-500 hover:text-orange-500 transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                Voltar ao site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
