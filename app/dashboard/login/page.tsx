"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Dumbbell, Eye, EyeOff, Lock, Mail, Shield, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validação simples do admin
    if (email === "admin@mail.com" && password === "admin123") {
      localStorage.setItem("adminAuth", JSON.stringify({ email, role: "admin" }))
      router.push("/dashboard")
    } else {
      setError("Credenciais inválidas. Verifique seu email e senha.")
    }

    setIsLoading(false)
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
              Painel de
              <span className="text-orange-500"> Administração</span>
            </h1>
            <p className="text-zinc-400 text-lg">
              Gerencie empresas, usuários e acompanhe o crescimento da plataforma em tempo real.
            </p>
            
            <div className="mt-8 flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-zinc-100">248</span>
                <span className="text-sm text-zinc-500">Empresas</span>
              </div>
              <div className="w-px h-12 bg-zinc-800" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-zinc-100">12.8K</span>
                <span className="text-sm text-zinc-500">Usuários</span>
              </div>
              <div className="w-px h-12 bg-zinc-800" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-zinc-100">R$ 458K</span>
                <span className="text-sm text-zinc-500">Faturamento</span>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-zinc-600">
            2026 FitApp. Todos os direitos reservados.
          </div>
        </div>
      </div>
      
      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex flex-col items-center mb-8 lg:hidden">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/25">
                <Dumbbell className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-zinc-100">FitApp</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-500">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Painel Administrativo</span>
            </div>
          </div>
          
          <div className="mb-8 hidden lg:block">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-2">Bem-vindo de volta</h2>
            <p className="text-zinc-500">Entre com suas credenciais de administrador</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-300 text-sm">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-zinc-300 text-sm">Senha</Label>
                <button type="button" className="text-xs text-orange-500 hover:text-orange-400 transition-colors">
                  Esqueceu a senha?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 bg-zinc-900 border-zinc-800 text-zinc-200 placeholder:text-zinc-600 focus-visible:ring-1 focus-visible:ring-orange-500/50 focus-visible:border-orange-500/50"
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
            </div>

            <Button 
              type="submit" 
              className="w-full h-11 bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Entrando...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Acessar Painel
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-800">
            <p className="text-xs text-center text-zinc-500">
              Acesso restrito a administradores da plataforma FitApp.
              <br />
              <span className="text-zinc-600">Todas as atividades são monitoradas.</span>
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-zinc-500 hover:text-orange-500 transition-colors inline-flex items-center gap-1">
              <ArrowRight className="w-3 h-3 rotate-180" />
              Voltar para o site
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
