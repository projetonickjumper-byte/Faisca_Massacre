"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Clock,
  AlertCircle,
  CheckCircle,
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
} from "recharts"

const statusColors: Record<string, string> = {
  pago: "bg-success/20 text-success border-success/30",
  pendente: "bg-warning/20 text-warning border-warning/30",
  atrasado: "bg-destructive/20 text-destructive border-destructive/30",
}

const statusLabels: Record<string, string> = {
  pago: "Pago",
  pendente: "Pendente",
  atrasado: "Atrasado",
}

export default function FaturamentoPage() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
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

  // Calcular crescimento mensal
  const crescimentoData = faturamentoMensal.map((item, index) => {
    const previous = index > 0 ? faturamentoMensal[index - 1].valor : item.valor
    const crescimento = ((item.valor - previous) / previous * 100).toFixed(1)
    return {
      ...item,
      crescimento: parseFloat(crescimento),
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Faturamento</h1>
        <p className="text-muted-foreground">
          Acompanhe o faturamento e receitas da plataforma
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Faturamento Total</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(dashboardStats.faturamentoTotal)}</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Recebido (Mês)</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalPago)}</p>
              </div>
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendente</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalPendente)}</p>
              </div>
              <div className="w-12 h-12 bg-warning/10 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Atrasado</p>
                <p className="text-2xl font-bold mt-1">{formatCurrency(totalAtrasado)}</p>
              </div>
              <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Faturamento Mensal */}
        <Card>
          <CardHeader>
            <CardTitle>Faturamento Mensal</CardTitle>
            <CardDescription>Receita mensal ao longo do ano</CardDescription>
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
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [formatCurrency(value), "Faturamento"]}
                  />
                  <Bar dataKey="valor" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Crescimento */}
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Crescimento</CardTitle>
            <CardDescription>Variação percentual mensal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={crescimentoData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                    formatter={(value: number) => [`${value}%`, "Crescimento"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="crescimento"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detalhamento */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento de Pagamentos</CardTitle>
          <CardDescription>Pagamentos do mês atual por empresa</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Empresa</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Mês</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Valor</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Data Pagamento</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {faturamentoDetalhado.map((item) => (
                  <tr key={item.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium">{item.empresa}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden sm:table-cell">{item.mes}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 font-medium">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        {formatCurrency(item.valor)}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">
                      {item.dataPagamento 
                        ? new Date(item.dataPagamento).toLocaleDateString("pt-BR")
                        : "-"
                      }
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={statusColors[item.status]}>
                        {statusLabels[item.status]}
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
