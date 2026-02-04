// Workouts Service - Serviço de treinos
// TODO: Substituir dados mockados por chamadas reais à API

import { httpClient, isMockMode, simulateNetworkDelay, type ApiResponse, type PaginatedResponse } from "../http-client"
import { API_CONFIG } from "../config"
import type { Workout, WorkoutExercise, Exercise } from "@/lib/types"

// Dados mockados para desenvolvimento
let MOCK_WORKOUTS: Workout[] = [
  {
    id: "w1",
    trainerId: "p1",
    name: "Treino A - Peito e Tríceps",
    description: "Treino focado em hipertrofia de peito e tríceps",
    objective: "hipertrofia",
    level: "intermediario",
    exercises: [
      { id: "e1", name: "Supino Reto", category: "Peito", sets: 4, reps: "8-12", rest: "90s", order: 1 },
      { id: "e2", name: "Supino Inclinado", category: "Peito", sets: 4, reps: "10-12", rest: "60s", order: 2 },
      { id: "e3", name: "Crucifixo", category: "Peito", sets: 3, reps: "12-15", rest: "60s", order: 3 },
      { id: "e4", name: "Tríceps Pulley", category: "Tríceps", sets: 4, reps: "10-12", rest: "60s", order: 4 },
      { id: "e5", name: "Tríceps Francês", category: "Tríceps", sets: 3, reps: "10-12", rest: "60s", order: 5 },
    ],
    assignedStudents: ["s1", "s2"],
    createdAt: "2026-01-15T10:00:00Z",
    updatedAt: "2026-01-20T14:30:00Z",
  },
  {
    id: "w2",
    trainerId: "p1",
    name: "Treino B - Costas e Bíceps",
    description: "Treino focado em hipertrofia de costas e bíceps",
    objective: "hipertrofia",
    level: "intermediario",
    exercises: [
      { id: "e6", name: "Puxada Frontal", category: "Costas", sets: 4, reps: "8-12", rest: "90s", order: 1 },
      { id: "e7", name: "Remada Curvada", category: "Costas", sets: 4, reps: "8-10", rest: "90s", order: 2 },
      { id: "e8", name: "Remada Unilateral", category: "Costas", sets: 3, reps: "10-12", rest: "60s", order: 3 },
      { id: "e9", name: "Rosca Direta", category: "Bíceps", sets: 4, reps: "10-12", rest: "60s", order: 4 },
      { id: "e10", name: "Rosca Martelo", category: "Bíceps", sets: 3, reps: "12", rest: "60s", order: 5 },
    ],
    assignedStudents: ["s1"],
    createdAt: "2026-01-16T10:00:00Z",
    updatedAt: "2026-01-21T14:30:00Z",
  },
  {
    id: "w3",
    trainerId: "p1",
    name: "Treino C - Pernas",
    description: "Treino completo de membros inferiores",
    objective: "hipertrofia",
    level: "avancado",
    exercises: [
      { id: "e11", name: "Agachamento Livre", category: "Quadríceps", sets: 4, reps: "8-10", rest: "120s", order: 1 },
      { id: "e12", name: "Leg Press", category: "Quadríceps", sets: 4, reps: "10-12", rest: "90s", order: 2 },
      { id: "e13", name: "Cadeira Extensora", category: "Quadríceps", sets: 3, reps: "12-15", rest: "60s", order: 3 },
      { id: "e14", name: "Mesa Flexora", category: "Posterior", sets: 4, reps: "10-12", rest: "60s", order: 4 },
      { id: "e15", name: "Panturrilha em Pé", category: "Panturrilha", sets: 4, reps: "15-20", rest: "45s", order: 5 },
    ],
    assignedStudents: ["s2", "s3"],
    createdAt: "2026-01-17T10:00:00Z",
    updatedAt: "2026-01-22T14:30:00Z",
  },
]

const MOCK_EXERCISES: Exercise[] = [
  // Peito
  { id: "ex1", name: "Supino Reto", category: "Peito", muscleGroup: "Peitoral Maior", equipment: "Barra" },
  { id: "ex2", name: "Supino Inclinado", category: "Peito", muscleGroup: "Peitoral Superior", equipment: "Halteres" },
  { id: "ex3", name: "Crucifixo", category: "Peito", muscleGroup: "Peitoral", equipment: "Halteres" },
  { id: "ex4", name: "Crossover", category: "Peito", muscleGroup: "Peitoral", equipment: "Cabo" },
  // Costas
  { id: "ex5", name: "Puxada Frontal", category: "Costas", muscleGroup: "Latíssimo", equipment: "Cabo" },
  { id: "ex6", name: "Remada Curvada", category: "Costas", muscleGroup: "Costas Média", equipment: "Barra" },
  { id: "ex7", name: "Remada Unilateral", category: "Costas", muscleGroup: "Latíssimo", equipment: "Halter" },
  // Ombros
  { id: "ex8", name: "Desenvolvimento", category: "Ombros", muscleGroup: "Deltóide", equipment: "Halteres" },
  { id: "ex9", name: "Elevação Lateral", category: "Ombros", muscleGroup: "Deltóide Lateral", equipment: "Halteres" },
  // Bíceps
  { id: "ex10", name: "Rosca Direta", category: "Bíceps", muscleGroup: "Bíceps", equipment: "Barra" },
  { id: "ex11", name: "Rosca Martelo", category: "Bíceps", muscleGroup: "Braquial", equipment: "Halteres" },
  // Tríceps
  { id: "ex12", name: "Tríceps Pulley", category: "Tríceps", muscleGroup: "Tríceps", equipment: "Cabo" },
  { id: "ex13", name: "Tríceps Francês", category: "Tríceps", muscleGroup: "Tríceps", equipment: "Halter" },
  // Pernas
  { id: "ex14", name: "Agachamento Livre", category: "Quadríceps", muscleGroup: "Quadríceps", equipment: "Barra" },
  { id: "ex15", name: "Leg Press", category: "Quadríceps", muscleGroup: "Quadríceps", equipment: "Máquina" },
  { id: "ex16", name: "Cadeira Extensora", category: "Quadríceps", muscleGroup: "Quadríceps", equipment: "Máquina" },
  { id: "ex17", name: "Mesa Flexora", category: "Posterior", muscleGroup: "Isquiotibiais", equipment: "Máquina" },
  { id: "ex18", name: "Stiff", category: "Posterior", muscleGroup: "Isquiotibiais", equipment: "Barra" },
  { id: "ex19", name: "Panturrilha em Pé", category: "Panturrilha", muscleGroup: "Gastrocnêmio", equipment: "Máquina" },
  // Abdômen
  { id: "ex20", name: "Abdominal Crunch", category: "Abdômen", muscleGroup: "Reto Abdominal", equipment: "Nenhum" },
  { id: "ex21", name: "Prancha", category: "Abdômen", muscleGroup: "Core", equipment: "Nenhum" },
]

export const workoutsService = {
  // Listar treinos do treinador
  async getByTrainer(trainerId: string): Promise<ApiResponse<Workout[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const workouts = MOCK_WORKOUTS.filter(w => w.trainerId === trainerId)
      return {
        data: workouts,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.WORKOUTS.BY_TRAINER(trainerId))
  },
  
  // Listar treinos do aluno
  async getByStudent(studentId: string): Promise<ApiResponse<Workout[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const workouts = MOCK_WORKOUTS.filter(w => w.assignedStudents.includes(studentId))
      return {
        data: workouts,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.WORKOUTS.BY_STUDENT(studentId))
  },
  
  // Obter treino por ID
  async getById(id: string): Promise<ApiResponse<Workout>> {
    if (isMockMode()) {
      await simulateNetworkDelay(300)
      const workout = MOCK_WORKOUTS.find(w => w.id === id)
      if (!workout) {
        return {
          data: null,
          error: "Treino não encontrado",
          status: 404,
          success: false,
        }
      }
      return {
        data: workout,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get(API_CONFIG.ENDPOINTS.WORKOUTS.GET(id))
  },
  
  // Criar treino
  async create(workout: Omit<Workout, "id" | "createdAt" | "updatedAt">): Promise<ApiResponse<Workout>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const newWorkout: Workout = {
        ...workout,
        id: "w" + Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      MOCK_WORKOUTS.push(newWorkout)
      return {
        data: newWorkout,
        error: null,
        status: 201,
        success: true,
      }
    }
    
    return httpClient.post(API_CONFIG.ENDPOINTS.WORKOUTS.CREATE, workout)
  },
  
  // Atualizar treino
  async update(id: string, workout: Partial<Workout>): Promise<ApiResponse<Workout>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const index = MOCK_WORKOUTS.findIndex(w => w.id === id)
      if (index === -1) {
        return {
          data: null,
          error: "Treino não encontrado",
          status: 404,
          success: false,
        }
      }
      MOCK_WORKOUTS[index] = {
        ...MOCK_WORKOUTS[index],
        ...workout,
        updatedAt: new Date().toISOString(),
      }
      return {
        data: MOCK_WORKOUTS[index],
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.put(API_CONFIG.ENDPOINTS.WORKOUTS.UPDATE(id), workout)
  },
  
  // Excluir treino
  async delete(id: string): Promise<ApiResponse<void>> {
    if (isMockMode()) {
      await simulateNetworkDelay(300)
      const index = MOCK_WORKOUTS.findIndex(w => w.id === id)
      if (index === -1) {
        return {
          data: null,
          error: "Treino não encontrado",
          status: 404,
          success: false,
        }
      }
      MOCK_WORKOUTS.splice(index, 1)
      return {
        data: null,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.delete(API_CONFIG.ENDPOINTS.WORKOUTS.DELETE(id))
  },
  
  // Atribuir treino a alunos
  async assignToStudents(workoutId: string, studentIds: string[]): Promise<ApiResponse<Workout>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const index = MOCK_WORKOUTS.findIndex(w => w.id === workoutId)
      if (index === -1) {
        return {
          data: null,
          error: "Treino não encontrado",
          status: 404,
          success: false,
        }
      }
      MOCK_WORKOUTS[index].assignedStudents = studentIds
      MOCK_WORKOUTS[index].updatedAt = new Date().toISOString()
      return {
        data: MOCK_WORKOUTS[index],
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.post(API_CONFIG.ENDPOINTS.WORKOUTS.ASSIGN(workoutId), { studentIds })
  },
  
  // Listar exercícios disponíveis
  async getExercises(): Promise<ApiResponse<Exercise[]>> {
    if (isMockMode()) {
      await simulateNetworkDelay(300)
      return {
        data: MOCK_EXERCISES,
        error: null,
        status: 200,
        success: true,
      }
    }
    
    return httpClient.get("/exercises")
  },
  
  // Duplicar treino
  async duplicate(id: string): Promise<ApiResponse<Workout>> {
    if (isMockMode()) {
      await simulateNetworkDelay(500)
      const original = MOCK_WORKOUTS.find(w => w.id === id)
      if (!original) {
        return {
          data: null,
          error: "Treino não encontrado",
          status: 404,
          success: false,
        }
      }
      const duplicate: Workout = {
        ...original,
        id: "w" + Date.now(),
        name: `${original.name} (Cópia)`,
        assignedStudents: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      MOCK_WORKOUTS.push(duplicate)
      return {
        data: duplicate,
        error: null,
        status: 201,
        success: true,
      }
    }
    
    // Para API real, provavelmente seria um POST específico
    return httpClient.post(`/workouts/${id}/duplicate`)
  },
}
