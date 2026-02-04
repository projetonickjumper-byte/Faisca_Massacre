// Dados mockados para o Dashboard Administrativo

export const dashboardStats = {
  totalEmpresas: 248,
  novasCadastrosDia: 5,
  novasCadastrosSemana: 23,
  novasCadastrosMes: 87,
  totalUsuarios: 12847,
  faturamentoTotal: 458750.00,
  faturamentoMensal: 42350.00,
}

export const empresasCrescimento = [
  { mes: "Jan", empresas: 45 },
  { mes: "Fev", empresas: 62 },
  { mes: "Mar", empresas: 89 },
  { mes: "Abr", empresas: 115 },
  { mes: "Mai", empresas: 148 },
  { mes: "Jun", empresas: 172 },
  { mes: "Jul", empresas: 195 },
  { mes: "Ago", empresas: 218 },
  { mes: "Set", empresas: 235 },
  { mes: "Out", empresas: 248 },
]

export const faturamentoMensal = [
  { mes: "Jan", valor: 28500 },
  { mes: "Fev", valor: 31200 },
  { mes: "Mar", valor: 35800 },
  { mes: "Abr", valor: 38400 },
  { mes: "Mai", valor: 41200 },
  { mes: "Jun", valor: 39800 },
  { mes: "Jul", valor: 43500 },
  { mes: "Ago", valor: 45200 },
  { mes: "Set", valor: 44800 },
  { mes: "Out", valor: 42350 },
]

export type EmpresaStatus = "ativo" | "pendente" | "bloqueado"

export interface Empresa {
  id: string
  nome: string
  tipo: string
  cidade: string
  estado: string
  dataCadastro: string
  status: EmpresaStatus
  plano: string
  faturamento: number
  usuarios: number
}

export const empresas: Empresa[] = [
  {
    id: "1",
    nome: "SmartFit Paulista",
    tipo: "Academia",
    cidade: "São Paulo",
    estado: "SP",
    dataCadastro: "2026-01-28",
    status: "ativo",
    plano: "Premium",
    faturamento: 12500,
    usuarios: 342,
  },
  {
    id: "2",
    nome: "CrossFit Box Elite",
    tipo: "Box de CrossFit",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    dataCadastro: "2026-01-27",
    status: "ativo",
    plano: "Básico",
    faturamento: 4800,
    usuarios: 89,
  },
  {
    id: "3",
    nome: "Studio Yoga Flow",
    tipo: "Studio",
    cidade: "Belo Horizonte",
    estado: "MG",
    dataCadastro: "2026-01-26",
    status: "pendente",
    plano: "Básico",
    faturamento: 0,
    usuarios: 0,
  },
  {
    id: "4",
    nome: "Iron Gym",
    tipo: "Academia",
    cidade: "Curitiba",
    estado: "PR",
    dataCadastro: "2026-01-25",
    status: "ativo",
    plano: "Premium",
    faturamento: 8900,
    usuarios: 215,
  },
  {
    id: "5",
    nome: "Pilates Center",
    tipo: "Studio de Pilates",
    cidade: "Porto Alegre",
    estado: "RS",
    dataCadastro: "2026-01-24",
    status: "bloqueado",
    plano: "Básico",
    faturamento: 1200,
    usuarios: 45,
  },
  {
    id: "6",
    nome: "FitZone Academia",
    tipo: "Academia",
    cidade: "Salvador",
    estado: "BA",
    dataCadastro: "2026-01-23",
    status: "ativo",
    plano: "Premium",
    faturamento: 7600,
    usuarios: 178,
  },
  {
    id: "7",
    nome: "Dance Studio Move",
    tipo: "Studio de Dança",
    cidade: "Recife",
    estado: "PE",
    dataCadastro: "2026-01-22",
    status: "ativo",
    plano: "Básico",
    faturamento: 3200,
    usuarios: 67,
  },
  {
    id: "8",
    nome: "Personal Trainer João Silva",
    tipo: "Personal Trainer",
    cidade: "Brasília",
    estado: "DF",
    dataCadastro: "2026-01-21",
    status: "pendente",
    plano: "Básico",
    faturamento: 0,
    usuarios: 0,
  },
  {
    id: "9",
    nome: "Academia Força Total",
    tipo: "Academia",
    cidade: "Fortaleza",
    estado: "CE",
    dataCadastro: "2026-01-20",
    status: "ativo",
    plano: "Premium",
    faturamento: 9800,
    usuarios: 234,
  },
  {
    id: "10",
    nome: "Natação Aqua Life",
    tipo: "Academia de Natação",
    cidade: "Manaus",
    estado: "AM",
    dataCadastro: "2026-01-19",
    status: "ativo",
    plano: "Básico",
    faturamento: 5400,
    usuarios: 112,
  },
]

export interface Usuario {
  id: string
  nome: string
  email: string
  cidade: string
  estado: string
  dataCadastro: string
  status: "ativo" | "inativo"
  checkIns: number
  nivel: number
}

export const usuarios: Usuario[] = [
  {
    id: "1",
    nome: "Carlos Silva",
    email: "carlos.silva@email.com",
    cidade: "São Paulo",
    estado: "SP",
    dataCadastro: "2025-08-15",
    status: "ativo",
    checkIns: 145,
    nivel: 12,
  },
  {
    id: "2",
    nome: "Ana Oliveira",
    email: "ana.oliveira@email.com",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    dataCadastro: "2025-09-22",
    status: "ativo",
    checkIns: 89,
    nivel: 8,
  },
  {
    id: "3",
    nome: "Pedro Santos",
    email: "pedro.santos@email.com",
    cidade: "Belo Horizonte",
    estado: "MG",
    dataCadastro: "2025-10-10",
    status: "ativo",
    checkIns: 67,
    nivel: 6,
  },
  {
    id: "4",
    nome: "Maria Costa",
    email: "maria.costa@email.com",
    cidade: "Curitiba",
    estado: "PR",
    dataCadastro: "2025-11-05",
    status: "inativo",
    checkIns: 23,
    nivel: 3,
  },
  {
    id: "5",
    nome: "Lucas Ferreira",
    email: "lucas.ferreira@email.com",
    cidade: "Porto Alegre",
    estado: "RS",
    dataCadastro: "2025-12-01",
    status: "ativo",
    checkIns: 112,
    nivel: 10,
  },
  {
    id: "6",
    nome: "Juliana Lima",
    email: "juliana.lima@email.com",
    cidade: "Salvador",
    estado: "BA",
    dataCadastro: "2026-01-03",
    status: "ativo",
    checkIns: 34,
    nivel: 4,
  },
  {
    id: "7",
    nome: "Rafael Souza",
    email: "rafael.souza@email.com",
    cidade: "Recife",
    estado: "PE",
    dataCadastro: "2026-01-10",
    status: "ativo",
    checkIns: 56,
    nivel: 5,
  },
  {
    id: "8",
    nome: "Fernanda Alves",
    email: "fernanda.alves@email.com",
    cidade: "Brasília",
    estado: "DF",
    dataCadastro: "2026-01-15",
    status: "ativo",
    checkIns: 78,
    nivel: 7,
  },
]

export const faturamentoDetalhado = [
  { id: "1", empresa: "SmartFit Paulista", mes: "Janeiro", valor: 12500, status: "pago", dataPagamento: "2026-01-05" },
  { id: "2", empresa: "CrossFit Box Elite", mes: "Janeiro", valor: 4800, status: "pago", dataPagamento: "2026-01-08" },
  { id: "3", empresa: "Iron Gym", mes: "Janeiro", valor: 8900, status: "pago", dataPagamento: "2026-01-10" },
  { id: "4", empresa: "FitZone Academia", mes: "Janeiro", valor: 7600, status: "pendente", dataPagamento: null },
  { id: "5", empresa: "Dance Studio Move", mes: "Janeiro", valor: 3200, status: "pago", dataPagamento: "2026-01-12" },
  { id: "6", empresa: "Academia Força Total", mes: "Janeiro", valor: 9800, status: "pago", dataPagamento: "2026-01-15" },
  { id: "7", empresa: "Natação Aqua Life", mes: "Janeiro", valor: 5400, status: "atrasado", dataPagamento: null },
]
