// Gyms Service - Serviço de academias
// TODO: Substituir dados mockados por chamadas reais à API

import { httpClient, isMockMode, simulateNetworkDelay, type ApiResponse, type PaginatedResponse } from "../http-client"
import { API_CONFIG } from "../config"
import type { Gym, Review, Category } from "@/lib/types"
import { gyms as MOCK_GYMS, categories as MOCK_CATEGORIES, reviews as MOCK_REVIEWS } from "@/lib/data"

interface GymFilters {
  category?: string
  city?: string
  modality?: string
  minRating?: number
  maxPrice?: number
  amenities?: string[]
  search?: string
  sortBy?: "distance" | "rating" | "price"
  page?: number
  pageSize?: number
}

export const gymsService = {
  // Listar todas as academias
  async getAll(filters?: GymFilters): Promise<ApiResponse<Gym[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      
      let result = [...MOCK_GYMS]
      
      if (filters) {
        // Filtrar por busca
        if (filters.search) {
          const searchLower = filters.search.toLowerCase()
          result = result.filter(
            g => g.name.toLowerCase().includes(searchLower) || 
            g.address.toLowerCase().includes(searchLower) ||
            g.city.toLowerCase().includes(searchLower)
          )
        }
        
        // Filtrar por cidade
        if (filters.city) {
          result = result.filter(g => g.city.toLowerCase() === filters.city?.toLowerCase())
        }
        
        // Filtrar por modalidade
        if (filters.modality) {
          result = result.filter(g => g.modalities.some(m => m.toLowerCase().includes(filters.modality!.toLowerCase())))
        }
        
        // Filtrar por rating mínimo
        if (filters.minRating) {
          result = result.filter(g => g.rating >= filters.minRating!)
        }
        
        // Filtrar por preço máximo (day use)
        if (filters.maxPrice && filters.maxPrice > 0) {
          result = result.filter(g => g.dayUse && g.dayUse.price <= filters.maxPrice!)
        }
        
        // Ordenar
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case "distance":
              result.sort((a, b) => (a.distance || 0) - (b.distance || 0))
              break
            case "rating":
              result.sort((a, b) => b.rating - a.rating)
              break
            case "price":
              result.sort((a, b) => (a.dayUse?.price || 0) - (b.dayUse?.price || 0))
              break
          }
        }
      }
      
      return {
        data: result,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    // Construir query params
    const params = new URLSearchParams()
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            params.append(key, value.join(","))
          } else {
            params.append(key, String(value))
          }
        }
      })
    }
    
    return httpClient.get(`${API_CONFIG.ENDPOINTS.GYMS.LIST}?${params.toString()}`)
  },
  
  // Buscar academias próximas
  async getNearby(latitude: number, longitude: number, radius?: number): Promise<ApiResponse<Gym[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      // Simular cálculo de distância
      const gymsWithDistance = MOCK_GYMS.map(gym => ({
        ...gym,
        distance: Math.random() * 5, // Distância aleatória até 5km
      })).sort((a, b) => a.distance - b.distance)
      
      return {
        data: gymsWithDistance,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(`${API_CONFIG.ENDPOINTS.GYMS.NEARBY}?lat=${latitude}&lng=${longitude}&radius=${radius || 10}`)
  },
  
  // Obter academia por ID
  async getById(id: string): Promise<ApiResponse<Gym>> {
    if (isMockMode()) {
      await simulateNetworkDelay(300)
      const gym = MOCK_GYMS.find(g => g.id === id)
      if (!gym) {
        return {
          data: null,
          error: "Academia não encontrada",
          status: 404,
          success: false,
        }
      }
      return {
        data: gym,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.GYMS.GET(id))
  },
  
  // Obter academia por slug
  async getBySlug(slug: string): Promise<ApiResponse<Gym>> {
    if (isMockMode()) {
      await simulateNetworkDelay(300)
      const gym = MOCK_GYMS.find(g => g.slug === slug)
      if (!gym) {
        return {
          data: null,
          error: "Academia não encontrada",
          status: 404,
          success: false,
        }
      }
      return {
        data: gym,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.GYMS.GET_BY_SLUG(slug))
  },
  
  // Buscar academias
  async search(query: string): Promise<ApiResponse<Gym[]>> {
    return this.getAll({ search: query })
  },
  
  // Listar categorias
  async getCategories(): Promise<ApiResponse<Category[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(200)
      return {
        data: MOCK_CATEGORIES,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get("/categories")
  },
  
  // Listar avaliações de uma academia
  async getReviews(gymId: string): Promise<ApiResponse<Review[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(400)
      const reviews = MOCK_REVIEWS.filter(r => r.gymId === gymId)
      return {
        data: reviews,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.REVIEWS.BY_GYM(gymId))
  },
  
  // Criar avaliação
  async createReview(review: Omit<Review, "id" | "date" | "helpful">): Promise<ApiResponse<Review>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const newReview: Review = {
        ...review,
        id: "r" + Date.now(),
        date: new Date().toISOString().split("T")[0],
        helpful: 0,
      }
      return {
        data: newReview,
        error: null,
        status: 201,
        success: true,
      }
    }
    
    return httpClient.post(API_CONFIG.ENDPOINTS.REVIEWS.CREATE, review)
  },
}
