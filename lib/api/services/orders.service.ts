/**
 * Orders Service - Sistema de Pedidos/Aquisições
 * 
 * Este serviço gerencia a comunicação entre os 3 ecossistemas:
 * 1. Usuário Final - Adquire serviços
 * 2. Parceiro/Treinador - Visualiza e confirma serviços adquiridos
 * 3. Admin - Monitora todas as transações
 * 
 * Para integrar com backend real:
 * 1. Configure API_CONFIG.USE_MOCK = false em config.ts
 * 2. Implemente os endpoints no seu backend
 */

import { API_CONFIG, ENDPOINTS } from "../config"
import { httpClient, ApiResponse } from "../http-client"

// Tipos para Pedidos/Aquisições
export interface ServiceOrder {
  id: string
  orderNumber: string
  userId: string
  userName: string
  userEmail: string
  userPhone: string
  userAvatar?: string
  partnerId: string
  partnerName: string
  serviceId: string
  serviceName: string
  serviceType: "treino_personalizado" | "avaliacao_fisica" | "plano_mensal" | "day_use" | "aula_avulsa" | "pacote"
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  paymentStatus: "pending" | "paid" | "refunded"
  price: number
  scheduledDate?: string
  scheduledTime?: string
  notes?: string
  createdAt: string
  updatedAt: string
  confirmedAt?: string
  completedAt?: string
}

export interface CreateOrderDTO {
  userId: string
  userName: string
  userEmail: string
  userPhone: string
  userAvatar?: string
  partnerId: string
  partnerName: string
  serviceId: string
  serviceName: string
  serviceType: ServiceOrder["serviceType"]
  price: number
  scheduledDate?: string
  scheduledTime?: string
  notes?: string
}

export interface OrderFilters {
  status?: ServiceOrder["status"]
  paymentStatus?: ServiceOrder["paymentStatus"]
  serviceType?: ServiceOrder["serviceType"]
  partnerId?: string
  userId?: string
  dateFrom?: string
  dateTo?: string
}

// Dados mockados para desenvolvimento
const mockOrders: ServiceOrder[] = [
  {
    id: "ord_001",
    orderNumber: "PED-2024-001",
    userId: "user_001",
    userName: "Carlos Silva",
    userEmail: "carlos@email.com",
    userPhone: "(11) 99999-1111",
    userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face",
    partnerId: "partner_001",
    partnerName: "SmartFit Paulista",
    serviceId: "svc_001",
    serviceName: "Personal Trainer - Pacote 8 sessões",
    serviceType: "treino_personalizado",
    status: "pending",
    paymentStatus: "paid",
    price: 480.00,
    scheduledDate: "2024-02-10",
    scheduledTime: "14:00",
    notes: "Objetivo: Hipertrofia. Disponibilidade: segunda a sexta.",
    createdAt: "2024-02-05T10:30:00Z",
    updatedAt: "2024-02-05T10:30:00Z",
  },
  {
    id: "ord_002",
    orderNumber: "PED-2024-002",
    userId: "user_002",
    userName: "Maria Santos",
    userEmail: "maria@email.com",
    userPhone: "(11) 99999-2222",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    partnerId: "partner_001",
    partnerName: "SmartFit Paulista",
    serviceId: "svc_002",
    serviceName: "Avaliação Física Completa",
    serviceType: "avaliacao_fisica",
    status: "confirmed",
    paymentStatus: "paid",
    price: 150.00,
    scheduledDate: "2024-02-08",
    scheduledTime: "10:00",
    createdAt: "2024-02-04T14:00:00Z",
    updatedAt: "2024-02-04T16:00:00Z",
    confirmedAt: "2024-02-04T16:00:00Z",
  },
  {
    id: "ord_003",
    orderNumber: "PED-2024-003",
    userId: "user_003",
    userName: "Pedro Lima",
    userEmail: "pedro@email.com",
    userPhone: "(11) 99999-3333",
    partnerId: "partner_001",
    partnerName: "SmartFit Paulista",
    serviceId: "svc_003",
    serviceName: "Day Use",
    serviceType: "day_use",
    status: "completed",
    paymentStatus: "paid",
    price: 49.90,
    scheduledDate: "2024-02-03",
    createdAt: "2024-02-02T09:00:00Z",
    updatedAt: "2024-02-03T18:00:00Z",
    confirmedAt: "2024-02-02T09:30:00Z",
    completedAt: "2024-02-03T18:00:00Z",
  },
  {
    id: "ord_004",
    orderNumber: "PED-2024-004",
    userId: "user_004",
    userName: "Ana Costa",
    userEmail: "ana@email.com",
    userPhone: "(11) 99999-4444",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    partnerId: "partner_001",
    partnerName: "SmartFit Paulista",
    serviceId: "svc_004",
    serviceName: "Treino Personalizado - Emagrecimento",
    serviceType: "treino_personalizado",
    status: "in_progress",
    paymentStatus: "paid",
    price: 320.00,
    notes: "Objetivo: Perder 10kg em 3 meses",
    createdAt: "2024-01-20T11:00:00Z",
    updatedAt: "2024-02-01T14:00:00Z",
    confirmedAt: "2024-01-20T12:00:00Z",
  },
  {
    id: "ord_005",
    orderNumber: "PED-2024-005",
    userId: "user_005",
    userName: "Lucas Oliveira",
    userEmail: "lucas@email.com",
    userPhone: "(11) 99999-5555",
    partnerId: "partner_001",
    partnerName: "SmartFit Paulista",
    serviceId: "svc_005",
    serviceName: "Plano Mensal Premium",
    serviceType: "plano_mensal",
    status: "pending",
    paymentStatus: "pending",
    price: 199.90,
    createdAt: "2024-02-06T08:00:00Z",
    updatedAt: "2024-02-06T08:00:00Z",
  },
]

// Simula delay de rede
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

class OrdersService {
  private orders: ServiceOrder[] = [...mockOrders]

  /**
   * Busca todos os pedidos com filtros opcionais
   */
  async getOrders(filters?: OrderFilters): Promise<ApiResponse<ServiceOrder[]>> {
    if (API_CONFIG.USE_MOCK) {
      await delay(300)
      
      let filtered = [...this.orders]
      
      if (filters?.status) {
        filtered = filtered.filter(o => o.status === filters.status)
      }
      if (filters?.paymentStatus) {
        filtered = filtered.filter(o => o.paymentStatus === filters.paymentStatus)
      }
      if (filters?.serviceType) {
        filtered = filtered.filter(o => o.serviceType === filters.serviceType)
      }
      if (filters?.partnerId) {
        filtered = filtered.filter(o => o.partnerId === filters.partnerId)
      }
      if (filters?.userId) {
        filtered = filtered.filter(o => o.userId === filters.userId)
      }
      
      return { data: filtered, success: true }
    }

    const queryParams = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value)
      })
    }

    return httpClient.get<ServiceOrder[]>(`${ENDPOINTS.ORDERS}?${queryParams}`)
  }

  /**
   * Busca um pedido pelo ID
   */
  async getOrderById(id: string): Promise<ApiResponse<ServiceOrder | null>> {
    if (API_CONFIG.USE_MOCK) {
      await delay(200)
      const order = this.orders.find(o => o.id === id) || null
      return { data: order, success: true }
    }

    return httpClient.get<ServiceOrder>(`${ENDPOINTS.ORDERS}/${id}`)
  }

  /**
   * Busca pedidos de um parceiro específico
   */
  async getPartnerOrders(partnerId: string, filters?: Omit<OrderFilters, "partnerId">): Promise<ApiResponse<ServiceOrder[]>> {
    return this.getOrders({ ...filters, partnerId })
  }

  /**
   * Busca pedidos de um usuário específico
   */
  async getUserOrders(userId: string, filters?: Omit<OrderFilters, "userId">): Promise<ApiResponse<ServiceOrder[]>> {
    return this.getOrders({ ...filters, userId })
  }

  /**
   * Cria um novo pedido (quando usuário adquire um serviço)
   */
  async createOrder(data: CreateOrderDTO): Promise<ApiResponse<ServiceOrder>> {
    if (API_CONFIG.USE_MOCK) {
      await delay(400)
      
      const newOrder: ServiceOrder = {
        id: `ord_${Date.now()}`,
        orderNumber: `PED-${new Date().getFullYear()}-${String(this.orders.length + 1).padStart(3, "0")}`,
        ...data,
        status: "pending",
        paymentStatus: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      this.orders.unshift(newOrder)
      return { data: newOrder, success: true }
    }

    return httpClient.post<ServiceOrder>(ENDPOINTS.ORDERS, data)
  }

  /**
   * Confirma um pedido (parceiro aceita o serviço)
   */
  async confirmOrder(orderId: string): Promise<ApiResponse<ServiceOrder>> {
    if (API_CONFIG.USE_MOCK) {
      await delay(300)
      
      const index = this.orders.findIndex(o => o.id === orderId)
      if (index === -1) {
        return { data: null as any, success: false, error: "Pedido não encontrado" }
      }
      
      this.orders[index] = {
        ...this.orders[index],
        status: "confirmed",
        confirmedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      return { data: this.orders[index], success: true }
    }

    return httpClient.patch<ServiceOrder>(`${ENDPOINTS.ORDERS}/${orderId}/confirm`, {})
  }

  /**
   * Inicia o atendimento de um pedido
   */
  async startOrder(orderId: string): Promise<ApiResponse<ServiceOrder>> {
    if (API_CONFIG.USE_MOCK) {
      await delay(300)
      
      const index = this.orders.findIndex(o => o.id === orderId)
      if (index === -1) {
        return { data: null as any, success: false, error: "Pedido não encontrado" }
      }
      
      this.orders[index] = {
        ...this.orders[index],
        status: "in_progress",
        updatedAt: new Date().toISOString(),
      }
      
      return { data: this.orders[index], success: true }
    }

    return httpClient.patch<ServiceOrder>(`${ENDPOINTS.ORDERS}/${orderId}/start`, {})
  }

  /**
   * Completa um pedido
   */
  async completeOrder(orderId: string): Promise<ApiResponse<ServiceOrder>> {
    if (API_CONFIG.USE_MOCK) {
      await delay(300)
      
      const index = this.orders.findIndex(o => o.id === orderId)
      if (index === -1) {
        return { data: null as any, success: false, error: "Pedido não encontrado" }
      }
      
      this.orders[index] = {
        ...this.orders[index],
        status: "completed",
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      
      return { data: this.orders[index], success: true }
    }

    return httpClient.patch<ServiceOrder>(`${ENDPOINTS.ORDERS}/${orderId}/complete`, {})
  }

  /**
   * Cancela um pedido
   */
  async cancelOrder(orderId: string, reason?: string): Promise<ApiResponse<ServiceOrder>> {
    if (API_CONFIG.USE_MOCK) {
      await delay(300)
      
      const index = this.orders.findIndex(o => o.id === orderId)
      if (index === -1) {
        return { data: null as any, success: false, error: "Pedido não encontrado" }
      }
      
      this.orders[index] = {
        ...this.orders[index],
        status: "cancelled",
        notes: reason ? `${this.orders[index].notes || ""}\n\nMotivo do cancelamento: ${reason}`.trim() : this.orders[index].notes,
        updatedAt: new Date().toISOString(),
      }
      
      return { data: this.orders[index], success: true }
    }

    return httpClient.patch<ServiceOrder>(`${ENDPOINTS.ORDERS}/${orderId}/cancel`, { reason })
  }

  /**
   * Atualiza status de pagamento
   */
  async updatePaymentStatus(orderId: string, paymentStatus: ServiceOrder["paymentStatus"]): Promise<ApiResponse<ServiceOrder>> {
    if (API_CONFIG.USE_MOCK) {
      await delay(300)
      
      const index = this.orders.findIndex(o => o.id === orderId)
      if (index === -1) {
        return { data: null as any, success: false, error: "Pedido não encontrado" }
      }
      
      this.orders[index] = {
        ...this.orders[index],
        paymentStatus,
        updatedAt: new Date().toISOString(),
      }
      
      return { data: this.orders[index], success: true }
    }

    return httpClient.patch<ServiceOrder>(`${ENDPOINTS.ORDERS}/${orderId}/payment`, { paymentStatus })
  }

  /**
   * Busca estatísticas de pedidos para o dashboard
   */
  async getOrderStats(partnerId?: string): Promise<ApiResponse<{
    total: number
    pending: number
    confirmed: number
    inProgress: number
    completed: number
    cancelled: number
    totalRevenue: number
    monthlyRevenue: number
  }>> {
    if (API_CONFIG.USE_MOCK) {
      await delay(200)
      
      const filtered = partnerId 
        ? this.orders.filter(o => o.partnerId === partnerId)
        : this.orders
      
      const now = new Date()
      const thisMonth = filtered.filter(o => {
        const orderDate = new Date(o.createdAt)
        return orderDate.getMonth() === now.getMonth() && 
               orderDate.getFullYear() === now.getFullYear()
      })
      
      return {
        data: {
          total: filtered.length,
          pending: filtered.filter(o => o.status === "pending").length,
          confirmed: filtered.filter(o => o.status === "confirmed").length,
          inProgress: filtered.filter(o => o.status === "in_progress").length,
          completed: filtered.filter(o => o.status === "completed").length,
          cancelled: filtered.filter(o => o.status === "cancelled").length,
          totalRevenue: filtered
            .filter(o => o.paymentStatus === "paid")
            .reduce((sum, o) => sum + o.price, 0),
          monthlyRevenue: thisMonth
            .filter(o => o.paymentStatus === "paid")
            .reduce((sum, o) => sum + o.price, 0),
        },
        success: true,
      }
    }

    const endpoint = partnerId 
      ? `${ENDPOINTS.ORDERS}/stats?partnerId=${partnerId}`
      : `${ENDPOINTS.ORDERS}/stats`
    
    return httpClient.get(endpoint)
  }

  /**
   * Vincula um treino a um pedido (para rastreabilidade)
   */
  async linkWorkoutToOrder(orderId: string, workoutId: string): Promise<ApiResponse<{ success: boolean }>> {
    if (API_CONFIG.USE_MOCK) {
      await delay(200)
      return { data: { success: true }, success: true }
    }

    return httpClient.post(`${ENDPOINTS.ORDERS}/${orderId}/link-workout`, { workoutId })
  }

  /**
   * Vincula uma avaliação a um pedido (para rastreabilidade)
   */
  async linkAssessmentToOrder(orderId: string, assessmentId: string): Promise<ApiResponse<{ success: boolean }>> {
    if (API_CONFIG.USE_MOCK) {
      await delay(200)
      return { data: { success: true }, success: true }
    }

    return httpClient.post(`${ENDPOINTS.ORDERS}/${orderId}/link-assessment`, { assessmentId })
  }
}

export const ordersService = new OrdersService()
