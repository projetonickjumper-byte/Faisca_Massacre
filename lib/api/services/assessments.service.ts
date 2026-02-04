// Assessments Service - Serviço de avaliações físicas
// TODO: Substituir dados mockados por chamadas reais à API

import { httpClient, isMockMode, simulateNetworkDelay, type ApiResponse } from "../http-client"
import { API_CONFIG } from "../config"
import type { PhysicalAssessment, BodyMeasurements, VitalSigns } from "@/lib/types"

// Dados mockados para desenvolvimento
let MOCK_ASSESSMENTS: PhysicalAssessment[] = [
  {
    id: "a1",
    trainerId: "p1",
    studentId: "s1",
    studentName: "João Silva",
    date: "2026-02-01",
    measurements: {
      weight: 75.5,
      height: 175,
      imc: 24.65,
      bodyFat: 18,
      leanMass: 61.9,
      neck: 38,
      shoulders: 115,
      chest: 98,
      waist: 82,
      hips: 96,
      leftArm: 34,
      rightArm: 35,
      leftForearm: 28,
      rightForearm: 29,
      leftThigh: 56,
      rightThigh: 57,
      leftCalf: 38,
      rightCalf: 38,
    },
    vitalSigns: {
      heartRate: 72,
      bloodPressureSystolic: 120,
      bloodPressureDiastolic: 80,
    },
    observations: "Aluno apresenta boa evolução. Manter treino atual.",
    objectives: ["Hipertrofia", "Definição"],
    createdAt: "2026-02-01T09:00:00Z",
    updatedAt: "2026-02-01T09:30:00Z",
  },
  {
    id: "a2",
    trainerId: "p1",
    studentId: "s1",
    studentName: "João Silva",
    date: "2026-01-01",
    measurements: {
      weight: 78,
      height: 175,
      imc: 25.47,
      bodyFat: 22,
      leanMass: 60.8,
      neck: 39,
      shoulders: 113,
      chest: 100,
      waist: 88,
      hips: 98,
      leftArm: 33,
      rightArm: 34,
      leftForearm: 27,
      rightForearm: 28,
      leftThigh: 58,
      rightThigh: 58,
      leftCalf: 38,
      rightCalf: 38,
    },
    vitalSigns: {
      heartRate: 78,
      bloodPressureSystolic: 125,
      bloodPressureDiastolic: 85,
    },
    observations: "Primeira avaliação. Foco em redução de gordura corporal.",
    objectives: ["Emagrecimento", "Hipertrofia"],
    createdAt: "2026-01-01T10:00:00Z",
    updatedAt: "2026-01-01T10:45:00Z",
  },
  {
    id: "a3",
    trainerId: "p1",
    studentId: "s2",
    studentName: "Maria Santos",
    date: "2026-01-20",
    measurements: {
      weight: 62,
      height: 165,
      imc: 22.77,
      bodyFat: 24,
      leanMass: 47.1,
      neck: 32,
      shoulders: 95,
      chest: 88,
      waist: 70,
      hips: 96,
      leftArm: 26,
      rightArm: 26,
      leftForearm: 22,
      rightForearm: 22,
      leftThigh: 52,
      rightThigh: 52,
      leftCalf: 35,
      rightCalf: 35,
    },
    vitalSigns: {
      heartRate: 68,
      bloodPressureSystolic: 115,
      bloodPressureDiastolic: 75,
    },
    observations: "Excelente condição física. Manter rotina de treinos.",
    objectives: ["Condicionamento", "Tonificação"],
    createdAt: "2026-01-20T14:00:00Z",
    updatedAt: "2026-01-20T14:30:00Z",
  },
]

// Helper para calcular IMC
function calculateIMC(weight: number, height: number): number {
  const heightInMeters = height / 100
  return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2))
}

export const assessmentsService = {
  // Listar avaliações por treinador
  async getByTrainer(trainerId: string): Promise<ApiResponse<PhysicalAssessment[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const assessments = MOCK_ASSESSMENTS.filter(a => a.trainerId === trainerId)
      return {
        data: assessments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.ASSESSMENTS.BY_TRAINER(trainerId))
  },
  
  // Listar avaliações por aluno
  async getByStudent(studentId: string): Promise<ApiResponse<PhysicalAssessment[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const assessments = MOCK_ASSESSMENTS.filter(a => a.studentId === studentId)
      return {
        data: assessments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.ASSESSMENTS.BY_STUDENT(studentId))
  },
  
  // Histórico de avaliações do aluno (para gráficos de evolução)
  async getHistory(studentId: string): Promise<ApiResponse<PhysicalAssessment[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const assessments = MOCK_ASSESSMENTS.filter(a => a.studentId === studentId)
      return {
        data: assessments.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.ASSESSMENTS.HISTORY(studentId))
  },
  
  // Obter avaliação por ID
  async getById(id: string): Promise<ApiResponse<PhysicalAssessment>> {
    if (isMockMode()) {
      await simulateNetworkDelay(300)
      const assessment = MOCK_ASSESSMENTS.find(a => a.id === id)
      if (!assessment) {
        return {
          data: null,
          error: "Avaliação não encontrada",
          status: 404,
          success: false,
        }
      }
      return {
        data: assessment,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.ASSESSMENTS.GET(id))
  },
  
  // Criar avaliação
  async create(assessment: Omit<PhysicalAssessment, "id" | "createdAt" | "updatedAt">): Promise<ApiResponse<PhysicalAssessment>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      
      // Calcular IMC automaticamente
      const measurements = {
        ...assessment.measurements,
        imc: calculateIMC(assessment.measurements.weight, assessment.measurements.height),
      }
      
      const newAssessment: PhysicalAssessment = {
        ...assessment,
        measurements,
        id: "a" + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      MOCK_ASSESSMENTS.push(newAssessment)
      return {
        data: newAssessment,
        error: null,
        status: 201,
        success: true,
      }
    }
    
    return httpClient.post(API_CONFIG.ENDPOINTS.ASSESSMENTS.CREATE, assessment)
  },
  
  // Atualizar avaliação
  async update(id: string, assessment: Partial<PhysicalAssessment>): Promise<ApiResponse<PhysicalAssessment>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const index = MOCK_ASSESSMENTS.findIndex(a => a.id === id)
      if (index === -1) {
        return {
          data: null,
          error: "Avaliação não encontrada",
          status: 404,
          success: false,
        }
      }
      
      // Recalcular IMC se peso ou altura foram alterados
      let measurements = MOCK_ASSESSMENTS[index].measurements
      if (assessment.measurements) {
        measurements = {
          ...measurements,
          ...assessment.measurements,
          imc: calculateIMC(
            assessment.measurements.weight || measurements.weight,
            assessment.measurements.height || measurements.height
          ),
        }
      }
      
      MOCK_ASSESSMENTS[index] = {
        ...MOCK_ASSESSMENTS[index],
        ...assessment,
        measurements,
        updatedAt: new Date().toISOString(),
      }
      return {
        data: MOCK_ASSESSMENTS[index],
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.put(API_CONFIG.ENDPOINTS.ASSESSMENTS.UPDATE(id), assessment)
  },
  
  // Excluir avaliação
  async delete(id: string): Promise<ApiResponse<void>> {
    if (isMockMode()) {
      await simulateNetworkDelay(300)
      const index = MOCK_ASSESSMENTS.findIndex(a => a.id === id)
      if (index === -1) {
        return {
          data: null,
          error: "Avaliação não encontrada",
          status: 404,
          success: false,
        }
      }
      MOCK_ASSESSMENTS.splice(index, 1)
      return {
        data: null,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.delete(API_CONFIG.ENDPOINTS.ASSESSMENTS.DELETE(id))
  },
  
  // Comparar duas avaliações
  async compare(assessmentId1: string, assessmentId2: string): Promise<ApiResponse<{
    assessment1: PhysicalAssessment
    assessment2: PhysicalAssessment
    changes: Record<string, { before: number; after: number; difference: number; percentage: number }>
  }>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      
      const a1 = MOCK_ASSESSMENTS.find(a => a.id === assessmentId1)
      const a2 = MOCK_ASSESSMENTS.find(a => a.id === assessmentId2)
      
      if (!a1 || !a2) {
        return {
          data: null,
          error: "Avaliações não encontradas",
          status: 404,
          success: false,
        }
      }
      
      // Calcular diferenças
      const changes: Record<string, { before: number; after: number; difference: number; percentage: number }> = {}
      const m1 = a1.measurements
      const m2 = a2.measurements
      
      const measurementKeys = ["weight", "bodyFat", "leanMass", "waist", "chest", "leftArm", "rightArm", "leftThigh", "rightThigh"] as const
      
      for (const key of measurementKeys) {
        const before = m1[key] || 0
        const after = m2[key] || 0
        const difference = after - before
        const percentage = before > 0 ? (difference / before) * 100 : 0
        
        changes[key] = { before, after, difference, percentage: parseFloat(percentage.toFixed(2)) }
      }
      
      return {
        data: { assessment1: a1, assessment2: a2, changes },
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(`/assessments/compare?id1=${assessmentId1}&id2=${assessmentId2}`)
  },
}
