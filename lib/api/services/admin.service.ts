// Admin Service - Serviço do dashboard administrativo
// TODO: Substituir dados mockados por chamadas reais à API

import { httpClient, isMockMode, simulateNetworkDelay, type ApiResponse } from "../http-client"
import { API_CONFIG } from "../config"
import type { AdminDashboardStats, Company, Transaction } from "@/lib/types"

// Dados mockados para desenvolvimento
const MOCK_STATS: AdminDashboardStats = {
  totalCompanies: 156,
  totalUsers: 12847,
  totalRevenue: 1547820.5,
  monthlyRevenue: 89650.0,
  newCompaniesToday: 3,
  newCompaniesWeek: 12,
  newCompaniesMonth: 28,
  activeCompanies: 142,
  pendingCompanies: 8,
  blockedCompanies: 6,
}

const MOCK_COMPANIES: Company[] = [
  {
    id: "c1",
    name: "SmartFit Paulista",
    email: "paulista@smartfit.com.br",
    phone: "(11) 3000-0001",
    type: "gym",
    status: "active",
    planType: "premium",
    createdAt: "2025-06-15",
    lastLogin: "2026-02-04",
    monthlyRevenue: 4520.0,
  },
  {
    id: "c2",
    name: "BlueFit Moema",
    email: "moema@bluefit.com.br",
    phone: "(11) 3000-0002",
    type: "gym",
    status: "active",
    planType: "basic",
    createdAt: "2025-08-20",
    lastLogin: "2026-02-03",
    monthlyRevenue: 2180.0,
  },
  {
    id: "c3",
    name: "Personal Carlos Fitness",
    email: "carlos@personaltrainer.com",
    phone: "(11) 99999-9999",
    type: "personal",
    status: "active",
    planType: "premium",
    createdAt: "2025-09-10",
    lastLogin: "2026-02-04",
    monthlyRevenue: 890.0,
  },
  {
    id: "c4",
    name: "Studio Pilates Life",
    email: "contato@pilateslife.com",
    phone: "(11) 3000-0004",
    type: "studio",
    status: "pending",
    planType: "free",
    createdAt: "2026-02-01",
    monthlyRevenue: 0,
  },
  {
    id: "c5",
    name: "Academia PowerFit",
    email: "contato@powerfit.com.br",
    phone: "(11) 3000-0005",
    type: "gym",
    status: "blocked",
    planType: "basic",
    createdAt: "2025-05-10",
    lastLogin: "2026-01-15",
    monthlyRevenue: 0,
  },
]

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "t1",
    companyId: "c1",
    companyName: "SmartFit Paulista",
    amount: 299.0,
    type: "subscription",
    status: "completed",
    date: "2026-02-01",
    description: "Assinatura Premium - Fevereiro/2026",
  },
  {
    id: "t2",
    companyId: "c2",
    companyName: "BlueFit Moema",
    amount: 149.0,
    type: "subscription",
    status: "completed",
    date: "2026-02-01",
    description: "Assinatura Basic - Fevereiro/2026",
  },
  {
    id: "t3",
    companyId: "c1",
    companyName: "SmartFit Paulista",
    amount: 452.0,
    type: "commission",
    status: "completed",
    date: "2026-02-03",
    description: "Comissão sobre vendas - Janeiro/2026",
  },
  {
    id: "t4",
    companyId: "c3",
    companyName: "Personal Carlos Fitness",
    amount: 299.0,
    type: "subscription",
    status: "pending",
    date: "2026-02-04",
    description: "Assinatura Premium - Fevereiro/2026",
  },
]

// Dados para gráficos
const MOCK_GROWTH_DATA = [
  { month: "Ago", empresas: 98 },
  { month: "Set", empresas: 108 },
  { month: "Out", empresas: 120 },
  { month: "Nov", empresas: 135 },
  { month: "Dez", empresas: 148 },
  { month: "Jan", empresas: 156 },
]

const MOCK_REVENUE_DATA = [
  { month: "Ago", receita: 65000 },
  { month: "Set", receita: 72000 },
  { month: "Out", receita: 78500 },
  { month: "Nov", receita: 82000 },
  { month: "Dez", receita: 95000 },
  { month: "Jan", receita: 89650 },
]

export const adminService = {
  // Obter estatísticas do dashboard
  async getDashboardStats(): Promise<ApiResponse<AdminDashboardStats>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      return {
        data: MOCK_STATS,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.ADMIN.DASHBOARD)
  },
  
  // Listar empresas
  async getCompanies(filters?: {
    status?: Company["status"]
    type?: Company["type"]
    search?: string
    page?: number
    pageSize?: number
  }): Promise<ApiResponse<Company[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      
      let result = [...MOCK_COMPANIES]
      
      if (filters) {
        if (filters.status) {
          result = result.filter(c => c.status === filters.status)
        }
        if (filters.type) {
          result = result.filter(c => c.type === filters.type)
        }
        if (filters.search) {
          const searchLower = filters.search.toLowerCase()
          result = result.filter(
            c => c.name.toLowerCase().includes(searchLower) || 
            c.email.toLowerCase().includes(searchLower)
          )
        }
      }
      
      return {
        data: result,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, String(value))
        }
      })
    }
    
    return httpClient.get(`${API_CONFIG.ENDPOINTS.ADMIN.COMPANIES}?${params.toString()}`)
  },
  
  // Atualizar status da empresa
  async updateCompanyStatus(companyId: string, status: Company["status"]): Promise<ApiResponse<Company>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const company = MOCK_COMPANIES.find(c => c.id === companyId)
      if (!company) {
        return {
          data: null,
          error: "Empresa não encontrada",
          status: 404,
          success: false,
        }
      }
      company.status = status
      return {
        data: company,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.patch(`${API_CONFIG.ENDPOINTS.ADMIN.COMPANIES}/${companyId}`, { status })
  },
  
  // Listar transações/faturamento
  async getTransactions(filters?: {
    type?: Transaction["type"]
    status?: Transaction["status"]
    startDate?: string
    endDate?: string
    page?: number
    pageSize?: number
  }): Promise<ApiResponse<Transaction[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      
      let result = [...MOCK_TRANSACTIONS]
      
      if (filters) {
        if (filters.type) {
          result = result.filter(t => t.type === filters.type)
        }
        if (filters.status) {
          result = result.filter(t => t.status === filters.status)
        }
      }
      
      return {
        data: result,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.BILLING.TRANSACTIONS)
  },
  
  // Dados para gráfico de crescimento
  async getGrowthData(): Promise<ApiResponse<{ month: string; empresas: number }[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(300)
      return {
        data: MOCK_GROWTH_DATA,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get("/admin/analytics/growth")
  },
  
  // Dados para gráfico de receita
  async getRevenueData(): Promise<ApiResponse<{ month: string; receita: number }[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(300)
      return {
        data: MOCK_REVENUE_DATA,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get("/admin/analytics/revenue")
  },
  
  // Listar usuários finais
  async getUsers(filters?: {
    search?: string
    page?: number
    pageSize?: number
  }): Promise<ApiResponse<{
    id: string
    name: string
    email: string
    level: number
    totalCheckins: number
    createdAt: string
    lastActive: string
    status: "active" | "inactive"
  }[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      
      // Mock de usuários finais
      const users = [
        { id: "u1", name: "João Silva", email: "joao@email.com", level: 12, totalCheckins: 45, createdAt: "2025-06-15", lastActive: "2026-02-04", status: "active" as const },
        { id: "u2", name: "Maria Santos", email: "maria@email.com", level: 8, totalCheckins: 28, createdAt: "2025-08-20", lastActive: "2026-02-03", status: "active" as const },
        { id: "u3", name: "Pedro Costa", email: "pedro@email.com", level: 15, totalCheckins: 89, createdAt: "2025-04-10", lastActive: "2026-02-04", status: "active" as const },
        { id: "u4", name: "Ana Oliveira", email: "ana@email.com", level: 5, totalCheckins: 12, createdAt: "2025-12-01", lastActive: "2026-01-28", status: "inactive" as const },
      ]
      
      let result = [...users]
      
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase()
        result = result.filter(
          u => u.name.toLowerCase().includes(searchLower) || 
          u.email.toLowerCase().includes(searchLower)
        )
      }
      
      return {
        data: result,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.ADMIN.USERS)
  },
}
