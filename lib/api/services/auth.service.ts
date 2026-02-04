// Auth Service - Serviço de autenticação
// TODO: Substituir dados mockados por chamadas reais à API

import { httpClient, isMockMode, simulateNetworkDelay, type ApiResponse } from "../http-client"
import { API_CONFIG } from "../config"

export interface LoginRequest {
  email: string
  password: string
  type: "client" | "partner" | "admin"
}

export interface LoginResponse {
  user: {
    id: string
    email: string
    name: string
    avatar: string | null
    type: "client" | "partner" | "admin"
    [key: string]: unknown
  }
  token: string
  refreshToken?: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  type: "client" | "partner"
  businessName?: string
  businessType?: "gym" | "personal" | "studio" | "instructor"
  phone?: string
}

// Dados mockados para desenvolvimento
const MOCK_USERS = {
  client: {
    email: "usuario@fitapp.com",
    password: "fitapp123",
    user: {
      id: "1",
      email: "usuario@fitapp.com",
      name: "João Silva",
      avatar: null,
      type: "client" as const,
      level: 12,
      xp: 2450,
    },
  },
  partner: {
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
      city: "São Paulo",
      state: "SP",
      isVerified: true,
      planType: "premium" as const,
    },
  },
  admin: {
    email: "admin@mail.com",
    password: "admin123",
    user: {
      id: "admin1",
      email: "admin@mail.com",
      name: "Administrador",
      avatar: null,
      type: "admin" as const,
      role: "super_admin",
    },
  },
}

export const authService = {
  // Login
  async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    if (isMockMode()) {
      await simulateNetworkDelay(1000)
      
      const mockUser = MOCK_USERS[data.type]
      
      if (mockUser && data.email === mockUser.email && data.password === mockUser.password) {
        return {
          data: {
            user: mockUser.user,
            token: "mock_token_" + Date.now(),
          },
          error: null,
          status: 200,
          success: true,
        }
      }
      
      return {
        data: null,
        error: "Email ou senha incorretos",
        status: 401,
        success: false,
      }
    }
    
    return httpClient.post<LoginResponse>(API_CONFIG.ENDPOINTS.AUTH.LOGIN, data)
  },
  
  // Logout
  async logout(): Promise<ApiResponse<void>> {
    if (isMockMode()) {
      await simulateNetworkDelay(300)
      localStorage.removeItem("fitapp_user")
      localStorage.removeItem("fitapp_token")
      return {
        data: null,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.post<void>(API_CONFIG.ENDPOINTS.AUTH.LOGOUT)
  },
  
  // Registro
  async register(data: RegisterRequest): Promise<ApiResponse<LoginResponse>> {
    if (isMockMode()) {
      await simulateNetworkDelay(1000)
      
      // Verificar se email já existe
      if (
        data.email === MOCK_USERS.client.email ||
        data.email === MOCK_USERS.partner.email
      ) {
        return {
          data: null,
          error: "Este email já está cadastrado",
          status: 400,
          success: false,
        }
      }
      
      // Criar novo usuário mockado
      const newUser = data.type === "partner"
        ? {
            id: "new_" + Date.now(),
            email: data.email,
            name: data.name,
            avatar: null,
            type: "partner" as const,
            businessName: data.businessName || data.name,
            businessType: data.businessType || "gym",
            phone: data.phone || "",
            isVerified: false,
            planType: "free" as const,
          }
        : {
            id: "new_" + Date.now(),
            email: data.email,
            name: data.name,
            avatar: null,
            type: "client" as const,
            level: 1,
            xp: 0,
          }
      
      return {
        data: {
          user: newUser,
          token: "mock_token_" + Date.now(),
        },
        error: null,
        status: 201,
        success: true,
      }
    }
    
    return httpClient.post<LoginResponse>(API_CONFIG.ENDPOINTS.AUTH.REGISTER, data)
  },
  
  // Esqueci minha senha
  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    if (isMockMode()) {
      await simulateNetworkDelay(1000)
      return {
        data: { message: "Email de recuperação enviado com sucesso" },
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.post(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
  },
  
  // Resetar senha
  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
    if (isMockMode()) {
      await simulateNetworkDelay(1000)
      return {
        data: { message: "Senha alterada com sucesso" },
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.post(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword })
  },
  
  // Verificar token
  async verifyToken(): Promise<ApiResponse<LoginResponse["user"]>> {
    if (isMockMode()) {
      const savedUser = localStorage.getItem("fitapp_user")
      if (savedUser) {
        return {
          data: JSON.parse(savedUser),
          error: null,
          status: 200,
          success: true,
        }
      }
      return {
        data: null,
        error: "Token inválido",
        status: 401,
        success: false,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.AUTH.REFRESH)
  },
}
