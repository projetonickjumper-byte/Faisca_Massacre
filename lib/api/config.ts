// API Configuration
// Quando o backend estiver pronto, basta alterar essas configurações

export const API_CONFIG = {
  // Base URL da API - altere para a URL do seu backend
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "",
  
  // Se true, usa dados mockados. Se false, faz chamadas reais à API
  USE_MOCK: true,
  
  // Timeout para requisições (ms)
  TIMEOUT: 30000,
  
  // Headers padrão
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },
  
  // Endpoints da API
  ENDPOINTS: {
    // Auth
    AUTH: {
      LOGIN: "/auth/login",
      LOGOUT: "/auth/logout",
      REGISTER: "/auth/register",
      REFRESH: "/auth/refresh",
      FORGOT_PASSWORD: "/auth/forgot-password",
      RESET_PASSWORD: "/auth/reset-password",
    },
    
    // Usuários
    USERS: {
      LIST: "/users",
      GET: (id: string) => `/users/${id}`,
      CREATE: "/users",
      UPDATE: (id: string) => `/users/${id}`,
      DELETE: (id: string) => `/users/${id}`,
      PROFILE: "/users/profile",
    },
    
    // Academias/Empresas
    GYMS: {
      LIST: "/gyms",
      GET: (id: string) => `/gyms/${id}`,
      GET_BY_SLUG: (slug: string) => `/gyms/slug/${slug}`,
      CREATE: "/gyms",
      UPDATE: (id: string) => `/gyms/${id}`,
      DELETE: (id: string) => `/gyms/${id}`,
      SEARCH: "/gyms/search",
      NEARBY: "/gyms/nearby",
    },
    
    // Treinos
    WORKOUTS: {
      LIST: "/workouts",
      GET: (id: string) => `/workouts/${id}`,
      CREATE: "/workouts",
      UPDATE: (id: string) => `/workouts/${id}`,
      DELETE: (id: string) => `/workouts/${id}`,
      ASSIGN: (id: string) => `/workouts/${id}/assign`,
      BY_STUDENT: (studentId: string) => `/workouts/student/${studentId}`,
      BY_TRAINER: (trainerId: string) => `/workouts/trainer/${trainerId}`,
    },
    
    // Avaliações Físicas
    ASSESSMENTS: {
      LIST: "/assessments",
      GET: (id: string) => `/assessments/${id}`,
      CREATE: "/assessments",
      UPDATE: (id: string) => `/assessments/${id}`,
      DELETE: (id: string) => `/assessments/${id}`,
      BY_STUDENT: (studentId: string) => `/assessments/student/${studentId}`,
      BY_TRAINER: (trainerId: string) => `/assessments/trainer/${trainerId}`,
      HISTORY: (studentId: string) => `/assessments/student/${studentId}/history`,
    },
    
    // Alunos/Clientes
    STUDENTS: {
      LIST: "/students",
      GET: (id: string) => `/students/${id}`,
      CREATE: "/students",
      UPDATE: (id: string) => `/students/${id}`,
      DELETE: (id: string) => `/students/${id}`,
      BY_TRAINER: (trainerId: string) => `/students/trainer/${trainerId}`,
    },
    
    // Reservas
    RESERVATIONS: {
      LIST: "/reservations",
      GET: (id: string) => `/reservations/${id}`,
      CREATE: "/reservations",
      CANCEL: (id: string) => `/reservations/${id}/cancel`,
      BY_USER: (userId: string) => `/reservations/user/${userId}`,
    },
    
    // Reviews/Avaliações de academias
    REVIEWS: {
      LIST: "/reviews",
      GET: (id: string) => `/reviews/${id}`,
      CREATE: "/reviews",
      UPDATE: (id: string) => `/reviews/${id}`,
      DELETE: (id: string) => `/reviews/${id}`,
      BY_GYM: (gymId: string) => `/reviews/gym/${gymId}`,
    },
    
    // Faturamento
    BILLING: {
      SUMMARY: "/billing/summary",
      TRANSACTIONS: "/billing/transactions",
      INVOICES: "/billing/invoices",
      BY_DATE: (start: string, end: string) => `/billing?start=${start}&end=${end}`,
    },
    
    // Admin
    ADMIN: {
      DASHBOARD: "/admin/dashboard",
      COMPANIES: "/admin/companies",
      USERS: "/admin/users",
      REVENUE: "/admin/revenue",
    },

    // Pedidos/Aquisições (integração entre ecossistemas)
    ORDERS: {
      LIST: "/orders",
      GET: (id: string) => `/orders/${id}`,
      CREATE: "/orders",
      CONFIRM: (id: string) => `/orders/${id}/confirm`,
      START: (id: string) => `/orders/${id}/start`,
      COMPLETE: (id: string) => `/orders/${id}/complete`,
      CANCEL: (id: string) => `/orders/${id}/cancel`,
      STATS: "/orders/stats",
      BY_PARTNER: (partnerId: string) => `/orders/partner/${partnerId}`,
      BY_USER: (userId: string) => `/orders/user/${userId}`,
      LINK_WORKOUT: (id: string) => `/orders/${id}/link-workout`,
      LINK_ASSESSMENT: (id: string) => `/orders/${id}/link-assessment`,
    },
  },
}

// Função helper para construir URLs completas
export function buildUrl(endpoint: string, params?: Record<string, string>): string {
  let url = `${API_CONFIG.BASE_URL}${endpoint}`
  
  if (params) {
    const searchParams = new URLSearchParams(params)
    url += `?${searchParams.toString()}`
  }
  
  return url
}
