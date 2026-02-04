"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  CalendarDays,
  CalendarRange,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import {
  dashboardStats,
  empresasCrescimento,
  faturamentoMensal,
  empresas,
} from "@/lib/admin-data"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const statusColors = {
  ativo: "bg-success/20 text-success border-success/30",
  pendente: "bg-warning/20 text-warning border-warning/30",
  bloqueado: "bg-destructive/20 text-destructive border-destructive/30",
}

const statusLabels = {
  ativo: "Ativo",
  pendente: "Pendente",
  bloqueado: "Bloqueado",
}

export default function AdminDashboardPage() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral da plataforma FitApp
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Empresas */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Empresas</p>
                <p className="text-3xl font-bold mt-1">{dashboardStats.totalEmpresas}</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-success">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+12% este mês</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Usuários */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Usuários</p>
                <p className="text-3xl font-bold mt-1">{dashboardStats.totalUsuarios.toLocaleString("pt-BR")}</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-success">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+8% este mês</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-chart-2/10 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-chart-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Faturamento Total */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Faturamento Total</p>
                <p className="text-3xl font-bold mt-1">{formatCurrency(dashboardStats.faturamentoTotal)}</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-success">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>+15% acumulado</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Faturamento Mensal */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Faturamento Mensal</p>
                <p className="text-3xl font-bold mt-1">{formatCurrency(dashboardStats.faturamentoMensal)}</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-destructive">
                  <ArrowDownRight className="w-4 h-4" />
                  <span>-5% vs mês anterior</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Novos Cadastros Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Novos Hoje</p>
              <p className="text-2xl font-bold">{dashboardStats.novasCadastrosDia}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-chart-2/10 rounded-lg flex items-center justify-center">
              <CalendarDays className="w-5 h-5 text-chart-2" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Esta Semana</p>
              <p className="text-2xl font-bold">{dashboardStats.novasCadastrosSemana}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-chart-3/10 rounded-lg flex items-center justify-center">
              <CalendarRange className="w-5 h-5 text-chart-3" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Este Mês</p>
              <p className="text-2xl font-bold">{dashboardStats.novasCadastrosMes}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crescimento de Empresas */}
        <Card>
          <CardHeader>
            <CardTitle>Crescimento de Empresas</CardTitle>
            <CardDescription>Evolução do número de empresas cadastradas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={empresasCrescimento}>
                  <defs>
                    <linearGradient id="colorEmpresas" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f1f23",
                      border: "1px solid #3f3f46",
                      borderRadius: "8px",
                      color: "#fafafa",
                    }}
                    labelStyle={{ color: "#fafafa" }}
                    itemStyle={{ color: "#fafafa" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="empresas"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorEmpresas)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Faturamento Mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Faturamento Mensal</CardTitle>
            <CardDescription>Evolução do faturamento ao longo do ano</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={faturamentoMensal}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f1f23",
                      border: "1px solid #3f3f46",
                      borderRadius: "8px",
                      color: "#fafafa",
                    }}
                    labelStyle={{ color: "#fafafa" }}
                    itemStyle={{ color: "#fafafa" }}
                    formatter={(value: number) => [formatCurrency(value), "Faturamento"]}
                  />
                  <Bar dataKey="valor" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Últimas Empresas */}
      <Card>
        <CardHeader>
          <CardTitle>Últimas Empresas Cadastradas</CardTitle>
          <CardDescription>Empresas mais recentes na plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Empresa</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Tipo</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Cidade</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Data</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {empresas.slice(0, 5).map((empresa) => (
                  <tr key={empresa.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium">{empresa.nome}</div>
                      <div className="text-sm text-muted-foreground sm:hidden">{empresa.tipo}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{empresa.tipo}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">{empresa.cidade}, {empresa.estado}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden lg:table-cell">
                      {new Date(empresa.dataCadastro).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={statusColors[empresa.status]}>
                        {statusLabels[empresa.status]}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
