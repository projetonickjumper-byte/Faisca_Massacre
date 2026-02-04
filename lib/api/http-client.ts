// HTTP Client - Camada de abstração para requisições
// Quando o backend estiver pronto, essas funções farão chamadas reais

import { API_CONFIG } from "./config"

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: number
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Função para obter o token de autenticação
function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("fitapp_token")
}

// Função para configurar headers
function getHeaders(customHeaders?: Record<string, string>): HeadersInit {
  const headers: Record<string, string> = {
    ...API_CONFIG.DEFAULT_HEADERS,
    ...customHeaders,
  }
  
  const token = getAuthToken()
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }
  
  return headers
}

// Função genérica para fazer requisições
async function request<T>(
  method: string,
  endpoint: string,
  data?: unknown,
  customHeaders?: Record<string, string>
): Promise<ApiResponse<T>> {
  // Se estiver em modo mock, retorna erro (as funções de serviço devem tratar isso)
  if (API_CONFIG.USE_MOCK) {
    return {
      data: null,
      error: "MOCK_MODE",
      status: 0,
      success: false,
    }
  }

  const url = `${API_CONFIG.BASE_URL}${endpoint}`
  
  const options: RequestInit = {
    method,
    headers: getHeaders(customHeaders),
  }
  
  if (data && method !== "GET") {
    options.body = JSON.stringify(data)
  }
  
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT)
    
    options.signal = controller.signal
    
    const response = await fetch(url, options)
    clearTimeout(timeoutId)
    
    const responseData = await response.json().catch(() => null)
    
    if (!response.ok) {
      return {
        data: null,
        error: responseData?.message || `Erro ${response.status}`,
        status: response.status,
        success: false,
      }
    }
    
    return {
      data: responseData,
      error: null,
      status: response.status,
      success: true,
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return {
          data: null,
          error: "Tempo de requisição excedido",
          status: 408,
          success: false,
        }
      }
      return {
        data: null,
        error: error.message,
        status: 500,
        success: false,
      }
    }
    return {
      data: null,
      error: "Erro desconhecido",
      status: 500,
      success: false,
    }
  }
}

// Métodos HTTP exportados
export const httpClient = {
  get: <T>(endpoint: string, headers?: Record<string, string>) => 
    request<T>("GET", endpoint, undefined, headers),
    
  post: <T>(endpoint: string, data?: unknown, headers?: Record<string, string>) => 
    request<T>("POST", endpoint, data, headers),
    
  put: <T>(endpoint: string, data?: unknown, headers?: Record<string, string>) => 
    request<T>("PUT", endpoint, data, headers),
    
  patch: <T>(endpoint: string, data?: unknown, headers?: Record<string, string>) => 
    request<T>("PATCH", endpoint, data, headers),
    
  delete: <T>(endpoint: string, headers?: Record<string, string>) => 
    request<T>("DELETE", endpoint, undefined, headers),
}

// Helper para verificar se está em modo mock
export function isMockMode(): boolean {
  return API_CONFIG.USE_MOCK
}

// Helper para simular delay de rede (para mocks)
export function simulateNetworkDelay(ms: number = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
