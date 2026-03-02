"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authService } from "@/lib/api/services/auth.service"

type UserType = "client" | "partner"

interface BaseUser {
  id: string
  email: string
  name: string
  avatar: string | null
  type: UserType
}

interface ClientUser extends BaseUser {
  type: "client"
  level: number
  xp: number
}

interface PartnerUser extends BaseUser {
  type: "partner"
  businessName: string
  businessType: "gym" | "personal" | "studio" | "instructor"
  phone: string
  address?: string
  city?: string
  state?: string
  isVerified: boolean
  planType: "free" | "basic" | "premium"
}

type User = ClientUser | PartnerUser

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  isPartner: boolean
  login: (email: string, password: string, type?: UserType) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
}

export interface RegisterData {
  name: string
  email: string
  password: string
  type: UserType
  businessName?: string
  businessType?: "gym" | "personal" | "studio" | "instructor"
  phone?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedUser = localStorage.getItem("fitapp_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem("fitapp_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, type: UserType = "client"): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    try {
      const result = await authService.login({ email, password, type })

      if (result.success && result.data) {
        const userData = result.data.user as User
        setUser(userData)
        localStorage.setItem("fitapp_user", JSON.stringify(userData))
        localStorage.setItem("fitapp_token", result.data.token)
        setIsLoading(false)
        return { success: true }
      }

      setIsLoading(false)
      return { success: false, error: result.error || "Email ou senha incorretos" }
    } catch {
      setIsLoading(false)
      return { success: false, error: "Erro ao conectar com o servidor" }
    }
  }

  const logout = () => {
    const wasPartner = user?.type === "partner"
    setUser(null)
    localStorage.removeItem("fitapp_user")
    localStorage.removeItem("fitapp_token")
    authService.logout().catch(() => { })
    router.push(wasPartner ? "/parceiro/login" : "/login")
  }

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)

    try {
      const result = await authService.register({
        name: data.name,
        email: data.email,
        password: data.password,
        type: data.type,
        businessName: data.businessName,
        businessType: data.businessType,
        phone: data.phone,
      })

      if (result.success && result.data) {
        const userData = result.data.user as User
        setUser(userData)
        localStorage.setItem("fitapp_user", JSON.stringify(userData))
        localStorage.setItem("fitapp_token", result.data.token)
        setIsLoading(false)
        return { success: true }
      }

      setIsLoading(false)
      return { success: false, error: result.error || "Erro ao criar conta" }
    } catch {
      setIsLoading(false)
      return { success: false, error: "Erro ao conectar com o servidor" }
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      isPartner: user?.type === "partner",
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
