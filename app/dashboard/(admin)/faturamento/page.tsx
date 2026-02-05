"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Clock,
  AlertCircle,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Download,
  Filter,
  ChevronRight,
} from "lucide-react"
import {
  dashboardStats,
  faturamentoMensal,
  faturamentoDetalhado,
} from "@/lib/admin-data"
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
  Area,
  AreaChart,
} from "recharts"

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pago: { 
    label: "Pago", 
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: CheckCircle
  },
  pendente: { 
    label: "Pendente", 
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: Clock
  },
  atrasado: { 
    label: "Atrasado", 
    color: "bg-red-500/10 text-red-400 border-red-500/20",
    icon: AlertCircle
  },
}

export default function FaturamentoPage() {
  const [period, setPeriod] = useState("month")
  const [statusFilter, setStatusFilter] = useState("all")

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const totalPago = faturamentoDetalhado
    .filter((f) => f.status === "pago")
    .reduce((acc, f) => acc + f.valor, 0)
  
  const totalPendente = faturamentoDetalhado
    .filter((f) => f.status === "pendente")
    .reduce((acc, f) => acc + f.valor, 0)
  
  const totalAtrasado = faturamentoDetalhado
    .filter((f) => f.status === "atrasado")
    .reduce((acc, f) => acc + f.valor, 0)

  const crescimentoData = faturamentoMensal.map((item, index) => {
    const previous = index > 0 ? faturamentoMensal[index - 1].valor : item.valor
    const crescimento = ((item.valor - previous) / previous * 100).toFixed(1)
    return {
      ...item,
      crescimento: parseFloat(crescimento),
    }
  })

  const filteredData = statusFilter === "all" 
    ? faturamentoDetalhado 
    : faturamentoDetalhado.filter(f => f.status === statusFilter)

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 shadow-xl">
          <p className="text-xs text-zinc-400 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm font-medium text-zinc-100">
              {entry.dataKey === "valor" ? formatCurrency(entry.value) : `${entry.value}%`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">Faturamento</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Acompanhe receitas e pagamentos da plataforma
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[140px] bg-zinc-900 border-zinc-800 text-zinc-300 text-sm h-9">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-800">
              <SelectItem value="week">Esta Semana</SelectItem>
              <SelectItem value="month">Este Mês</SelectItem>
              <SelectItem value="quarter">Este Trimestre</SelectItem>
              <SelectItem value="year">Este Ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-800 text-zinc-300 h-9">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-zinc-900/50 border-zinc-800/50 overflow-hidden group hover:border-zinc-700/50 transition-colors">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Total</span>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-zinc-100 tracking-tight">
                    {formatCurrency(dashboardStats.faturamentoTotal)}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs text-emerald-400 font-medium">+15.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800/50 overflow-hidden group hover:border-zinc-700/50 transition-colors">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Recebido</span>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-zinc-100 tracking-tight">
                    {formatCurrency(totalPago)}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {faturamentoDetalhado.filter(f => f.status === "pago").length} pagamentos
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800/50 overflow-hidden group hover:border-zinc-700/50 transition-colors">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Pendente</span>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-zinc-100 tracking-tight">
                    {formatCurrency(totalPendente)}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {faturamentoDetalhado.filter(f => f.status === "pendente").length} aguardando
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900/50 border-zinc-800/50 overflow-hidden group hover:border-zinc-700/50 transition-colors">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Atrasado</span>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-zinc-100 tracking-tight">
                    {formatCurrency(totalAtrasado)}
                  </p>
                  <p className="text-xs text-red-400 mt-1">
                    Requer atenção
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Faturamento Mensal */}
        <Card className="bg-zinc-900/50 border-zinc-800/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-medium text-zinc-100">
                  Faturamento Mensal
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-0.5">Receita ao longo do ano</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-300">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={faturamentoMensal} barSize={24}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis
                    dataKey="mes"
                    stroke="#52525b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#52525b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="valor"
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    className="hover:opacity-80 transition-opacity"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Taxa de Crescimento */}
        <Card className="bg-zinc-900/50 border-zinc-800/50">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base font-medium text-zinc-100">
                  Taxa de Crescimento
                </CardTitle>
                <p className="text-xs text-zinc-500 mt-0.5">Variação percentual mensal</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-zinc-300">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={crescimentoData}>
                  <defs>
                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis
                    dataKey="mes"
                    stroke="#52525b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#52525b"
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="crescimento"
                    stroke="#f97316"
                    strokeWidth={2}
                    fill="url(#growthGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payments Table */}
      <Card className="bg-zinc-900/50 border-zinc-800/50">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base font-medium text-zinc-100">
                Detalhamento de Pagamentos
              </CardTitle>
              <p className="text-xs text-zinc-500 mt-0.5">Pagamentos do mês atual</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[130px] bg-zinc-800/50 border-zinc-700/50 text-zinc-300 text-sm h-8">
                  <Filter className="w-3.5 h-3.5 mr-2 text-zinc-500" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pago">Pago</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="atrasado">Atrasado</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-zinc-100 text-xs h-8">
                Ver todos
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-y border-zinc-800/50">
                  <th className="text-left py-3 px-5 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Empresa
                  </th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-zinc-500 uppercase tracking-wider hidden sm:table-cell">
                    Referência
                  </th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Valor
                  </th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-zinc-500 uppercase tracking-wider hidden md:table-cell">
                    Data Pagamento
                  </th>
                  <th className="text-left py-3 px-5 text-xs font-medium text-zinc-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/30">
                {filteredData.map((item) => {
                  const StatusIcon = statusConfig[item.status].icon
                  return (
                    <tr
                      key={item.id}
                      className="group hover:bg-zinc-800/30 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-sm font-medium text-zinc-300">
                            {item.empresa.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-zinc-200 text-sm group-hover:text-zinc-100 transition-colors">
                              {item.empresa}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 hidden sm:table-cell">
                        <span className="text-sm text-zinc-400">{item.mes}</span>
                      </td>
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-zinc-600" />
                          <span className="text-sm font-medium text-zinc-200">
                            {formatCurrency(item.valor)}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-5 hidden md:table-cell">
                        <span className="text-sm text-zinc-500">
                          {item.dataPagamento 
                            ? new Date(item.dataPagamento).toLocaleDateString("pt-BR")
                            : "-"
                          }
                        </span>
                      </td>
                      <td className="py-3.5 px-5">
                        <Badge
                          variant="outline"
                          className={`text-xs font-medium ${statusConfig[item.status].color}`}
                        >
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[item.status].label}
                        </Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
