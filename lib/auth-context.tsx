"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

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

interface RegisterData {
  name: string
  email: string
  password: string
  type: UserType
  businessName?: string
  businessType?: "gym" | "personal" | "studio" | "instructor"
  phone?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Credenciais de teste - Cliente
const TEST_CLIENT = {
  email: "usuario@fitapp.com",
  password: "fitapp123",
  user: {
    id: "1",
    email: "usuario@fitapp.com",
    name: "Joao Silva",
    avatar: null,
    type: "client" as const,
    level: 12,
    xp: 2450,
  }
}

// Credenciais de teste - Parceiro
const TEST_PARTNER = {
  email: "parceiro@fitapp.com",
  password: "parceiro123",
  user: {
    id: "p1",
    email: "parceiro@fitapp.com",
    name: "Carlos Fitness",
    avatar: null,
    type: "partner" as const,
    businessName: "Academia Power Gym",
    businessType: "gym" as const,
    phone: "(11) 99999-9999",
    address: "Rua das Academias, 123",
    city: "Sao Paulo",
    state: "SP",
    isVerified: true,
    planType: "premium" as const,
  }
}

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
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Verificar credenciais de cliente
    if (email === TEST_CLIENT.email && password === TEST_CLIENT.password && type === "client") {
      setUser(TEST_CLIENT.user)
      localStorage.setItem("fitapp_user", JSON.stringify(TEST_CLIENT.user))
      setIsLoading(false)
      return { success: true }
    }
    
    // Verificar credenciais de parceiro
    if (email === TEST_PARTNER.email && password === TEST_PARTNER.password && type === "partner") {
      setUser(TEST_PARTNER.user)
      localStorage.setItem("fitapp_user", JSON.stringify(TEST_PARTNER.user))
      setIsLoading(false)
      return { success: true }
    }
    
    setIsLoading(false)
    return { success: false, error: "Email ou senha incorretos" }
  }

  const logout = () => {
    const wasPartner = user?.type === "partner"
    setUser(null)
    localStorage.removeItem("fitapp_user")
    router.push(wasPartner ? "/parceiro/login" : "/login")
  }

  const register = async (data: RegisterData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (data.email === TEST_CLIENT.email || data.email === TEST_PARTNER.email) {
      setIsLoading(false)
      return { success: false, error: "Este email ja esta cadastrado" }
    }

    if (data.password.length < 6) {
      setIsLoading(false)
      return { success: false, error: "A senha deve ter pelo menos 6 caracteres" }
    }
    
    let newUser: User

    if (data.type === "partner") {
      newUser = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        avatar: null,
        type: "partner",
        businessName: data.businessName || data.name,
        businessType: data.businessType || "gym",
        phone: data.phone || "",
        isVerified: false,
        planType: "free",
      }
    } else {
      newUser = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        avatar: null,
        type: "client",
        level: 1,
        xp: 0,
      }
    }
    
    setUser(newUser)
    localStorage.setItem("fitapp_user", JSON.stringify(newUser))
    setIsLoading(false)
    return { success: true }
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
