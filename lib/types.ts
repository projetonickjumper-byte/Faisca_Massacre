// Core types for the fitness app

export interface Gym {
  id: string
  name: string
  slug: string
  description: string
  address: string
  city: string
  state: string
  distance?: number
  latitude: number
  longitude: number
  phone: string
  whatsapp: string
  email: string
  website?: string
  images: string[]
  verified: boolean
  rating: number
  totalReviews: number
  totalCheckins: number
  modalities: string[]
  amenities: string[]
  openingHours: OpeningHours
  isOpen?: boolean
  plans: Plan[]
  dayUse: DayUse | null
  acceptsWellhub: boolean
  acceptsTotalPass: boolean
  hasFreeTrial: boolean
}

export interface OpeningHours {
  monday: { open: string; close: string } | null
  tuesday: { open: string; close: string } | null
  wednesday: { open: string; close: string } | null
  thursday: { open: string; close: string } | null
  friday: { open: string; close: string } | null
  saturday: { open: string; close: string } | null
  sunday: { open: string; close: string } | null
}

export interface Plan {
  id: string
  name: string
  type: "monthly" | "quarterly" | "annual"
  price: number
  originalPrice?: number
  features: string[]
  popular?: boolean
  hasFreeTrial?: boolean
  trialDays?: number
}

export interface DayUse {
  price: number
  originalPrice?: number
  duration: string
  availableHours: string
  firstExperienceDiscount?: number
  cancellationPolicy: string
}

export interface Review {
  id: string
  gymId: string
  userId: string
  userName: string
  userAvatar: string
  userLevel: number
  rating: number
  text: string
  images?: string[]
  date: string
  helpful: number
  modality?: string
  gymResponse?: {
    text: string
    date: string
  }
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  bio: string
  birthDate: string
  gender: "male" | "female" | "not_specified"
  fitnessGoals: string[]
  totalCheckins: number
  totalFavorites: number
  totalAchievements: number
  xp: number
  level: number
  memberSince: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: string
  xpReward: number
  requirement: string
}

export interface FitRankEntry {
  position: number
  userId: string
  userName: string
  userAvatar: string
  points: number
  checkins: number
  streak: number
}

export interface GymProduct {
  id: string
  gymId: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  stock: number
  rating: number
  totalReviews: number
}

export interface Promotion {
  id: string
  gymId: string
  gymName: string
  gymImage: string
  title: string
  description: string
  discount: number
  originalPrice: number
  finalPrice: number
  type: "day_use" | "first_class" | "plan"
  expiresAt: string
  countdown?: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  count: number
}

export interface Banner {
  id: string
  image: string
  title: string
  subtitle?: string
  link: string
  gymId?: string
}

export interface Reservation {
  id: string
  gymId: string
  gymName: string
  gymImage: string
  date: string
  time: string
  type: "class" | "personal" | "day_use"
  className?: string
  instructorName?: string
  status: "confirmed" | "pending" | "cancelled" | "completed"
  cancellationDeadline: string
}

export interface PersonalTrainer {
  id: string
  gymId: string
  name: string
  avatar: string
  specialties: string[]
  rating: number
  totalReviews: number
  pricePerHour: number
  bio: string
  certifications: string[]
}

export interface GymClass {
  id: string
  gymId: string
  name: string
  instructor: string
  time: string
  duration: number
  spots: number
  spotsAvailable: number
  day: string
}

// Tipos para Treinos
export interface Workout {
  id: string
  trainerId: string
  name: string
  description: string
  objective: "hipertrofia" | "emagrecimento" | "condicionamento" | "forca" | "resistencia" | "flexibilidade"
  level: "iniciante" | "intermediario" | "avancado"
  exercises: WorkoutExercise[]
  assignedStudents: string[]
  createdAt: string
  updatedAt: string
}

export interface WorkoutExercise {
  id: string
  name: string
  category: string
  sets: number
  reps: string
  rest: string
  notes?: string
  order: number
}

export interface Exercise {
  id: string
  name: string
  category: string
  muscleGroup: string
  equipment?: string
  instructions?: string
  videoUrl?: string
}

// Tipos para Avaliação Física
export interface PhysicalAssessment {
  id: string
  trainerId: string
  studentId: string
  studentName: string
  date: string
  measurements: BodyMeasurements
  vitalSigns: VitalSigns
  observations?: string
  objectives?: string[]
  createdAt: string
  updatedAt: string
}

export interface BodyMeasurements {
  weight: number // kg
  height: number // cm
  imc?: number
  bodyFat?: number // %
  leanMass?: number // kg
  neck?: number // cm
  shoulders?: number
  chest?: number
  waist?: number
  hips?: number
  leftArm?: number
  rightArm?: number
  leftForearm?: number
  rightForearm?: number
  leftThigh?: number
  rightThigh?: number
  leftCalf?: number
  rightCalf?: number
}

export interface VitalSigns {
  heartRate?: number // bpm
  bloodPressureSystolic?: number
  bloodPressureDiastolic?: number
  respiratoryRate?: number
}

// Tipos para Alunos
export interface Student {
  id: string
  trainerId: string
  name: string
  email: string
  phone: string
  avatar?: string
  birthDate?: string
  gender?: "male" | "female" | "other"
  objectives?: string[]
  limitations?: string
  startDate: string
  status: "active" | "inactive" | "pending"
  lastWorkout?: string
  lastAssessment?: string
}

// Tipos para Admin Dashboard
export interface AdminDashboardStats {
  totalCompanies: number
  totalUsers: number
  totalRevenue: number
  monthlyRevenue: number
  newCompaniesToday: number
  newCompaniesWeek: number
  newCompaniesMonth: number
  activeCompanies: number
  pendingCompanies: number
  blockedCompanies: number
}

export interface Company {
  id: string
  name: string
  email: string
  phone: string
  type: "gym" | "personal" | "studio" | "instructor"
  status: "active" | "pending" | "blocked"
  planType: "free" | "basic" | "premium"
  createdAt: string
  lastLogin?: string
  monthlyRevenue: number
}

export interface Transaction {
  id: string
  companyId: string
  companyName: string
  amount: number
  type: "subscription" | "commission" | "refund"
  status: "completed" | "pending" | "failed"
  date: string
  description: string
}
