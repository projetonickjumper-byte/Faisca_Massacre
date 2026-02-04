// Students Service - Serviço de alunos
// TODO: Substituir dados mockados por chamadas reais à API

import { httpClient, isMockMode, simulateNetworkDelay, type ApiResponse } from "../http-client"
import { API_CONFIG } from "../config"
import type { Student } from "@/lib/types"

// Dados mockados para desenvolvimento
let MOCK_STUDENTS: Student[] = [
  {
    id: "s1",
    trainerId: "p1",
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-1111",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    birthDate: "1990-05-15",
    gender: "male",
    objectives: ["Hipertrofia", "Definição"],
    limitations: "Nenhuma",
    startDate: "2025-06-01",
    status: "active",
    lastWorkout: "2026-02-03",
    lastAssessment: "2026-02-01",
  },
  {
    id: "s2",
    trainerId: "p1",
    name: "Maria Santos",
    email: "maria.santos@email.com",
    phone: "(11) 99999-2222",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    birthDate: "1995-08-20",
    gender: "female",
    objectives: ["Condicionamento", "Tonificação"],
    limitations: "Lesão no joelho esquerdo - evitar impacto",
    startDate: "2025-09-15",
    status: "active",
    lastWorkout: "2026-02-02",
    lastAssessment: "2026-01-20",
  },
  {
    id: "s3",
    trainerId: "p1",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    phone: "(11) 99999-3333",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    birthDate: "1988-03-10",
    gender: "male",
    objectives: ["Emagrecimento", "Condicionamento"],
    limitations: "Hérnia de disco - cuidado com exercícios de compressão",
    startDate: "2025-11-01",
    status: "active",
    lastWorkout: "2026-02-01",
    lastAssessment: "2026-01-15",
  },
  {
    id: "s4",
    trainerId: "p1",
    name: "Ana Costa",
    email: "ana.costa@email.com",
    phone: "(11) 99999-4444",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    birthDate: "1992-11-25",
    gender: "female",
    objectives: ["Hipertrofia"],
    startDate: "2026-01-10",
    status: "active",
    lastWorkout: "2026-02-03",
  },
  {
    id: "s5",
    trainerId: "p1",
    name: "Carlos Mendes",
    email: "carlos.mendes@email.com",
    phone: "(11) 99999-5555",
    birthDate: "1985-07-08",
    gender: "male",
    objectives: ["Reabilitação"],
    limitations: "Pós-operatório de ombro",
    startDate: "2025-12-01",
    status: "inactive",
    lastWorkout: "2026-01-15",
    lastAssessment: "2026-01-10",
  },
]

export const studentsService = {
  // Listar alunos do treinador
  async getByTrainer(trainerId: string): Promise<ApiResponse<Student[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const students = MOCK_STUDENTS.filter(s => s.trainerId === trainerId)
      return {
        data: students,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.STUDENTS.BY_TRAINER(trainerId))
  },
  
  // Listar todos os alunos (admin)
  async getAll(): Promise<ApiResponse<Student[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      return {
        data: MOCK_STUDENTS,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.STUDENTS.LIST)
  },
  
  // Obter aluno por ID
  async getById(id: string): Promise<ApiResponse<Student>> {
    if (isMockMode()) {
      await simulateNetworkDelay(300)
      const student = MOCK_STUDENTS.find(s => s.id === id)
      if (!student) {
        return {
          data: null,
          error: "Aluno não encontrado",
          status: 404,
          success: false,
        }
      }
      return {
        data: student,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.STUDENTS.GET(id))
  },
  
  // Criar aluno
  async create(student: Omit<Student, "id">): Promise<ApiResponse<Student>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const newStudent: Student = {
        ...student,
        id: "s" + Date.now(),
      }
      MOCK_STUDENTS.push(newStudent)
      return {
        data: newStudent,
        error: null,
        status: 201,
        success: true,
      }
    }
    
    return httpClient.post(API_CONFIG.ENDPOINTS.STUDENTS.CREATE, student)
  },
  
  // Atualizar aluno
  async update(id: string, student: Partial<Student>): Promise<ApiResponse<Student>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const index = MOCK_STUDENTS.findIndex(s => s.id === id)
      if (index === -1) {
        return {
          data: null,
          error: "Aluno não encontrado",
          status: 404,
          success: false,
        }
      }
      MOCK_STUDENTS[index] = { ...MOCK_STUDENTS[index], ...student }
      return {
        data: MOCK_STUDENTS[index],
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.put(API_CONFIG.ENDPOINTS.STUDENTS.UPDATE(id), student)
  },
  
  // Excluir aluno
  async delete(id: string): Promise<ApiResponse<void>> {
    if (isMockMode()) {
      await simulateNetworkDelay(300)
      const index = MOCK_STUDENTS.findIndex(s => s.id === id)
      if (index === -1) {
        return {
          data: null,
          error: "Aluno não encontrado",
          status: 404,
          success: false,
        }
      }
      MOCK_STUDENTS.splice(index, 1)
      return {
        data: null,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.delete(API_CONFIG.ENDPOINTS.STUDENTS.DELETE(id))
  },
  
  // Alterar status do aluno
  async updateStatus(id: string, status: Student["status"]): Promise<ApiResponse<Student>> {
    return this.update(id, { status })
  },
  
  // Buscar alunos por nome/email
  async search(trainerId: string, query: string): Promise<ApiResponse<Student[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(300)
      const queryLower = query.toLowerCase()
      const students = MOCK_STUDENTS.filter(
        s => s.trainerId === trainerId && 
        (s.name.toLowerCase().includes(queryLower) || s.email.toLowerCase().includes(queryLower))
      )
      return {
        data: students,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(`${API_CONFIG.ENDPOINTS.STUDENTS.BY_TRAINER(trainerId)}?search=${encodeURIComponent(query)}`)
  },
}
