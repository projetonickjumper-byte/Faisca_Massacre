"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Building2,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Ban,
  CheckCircle,
  Users,
  DollarSign,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { empresas, type Empresa, type EmpresaStatus } from "@/lib/admin-data"

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

export default function EmpresasPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("todos")
  const [empresasList, setEmpresasList] = useState<Empresa[]>(empresas)

  const filteredEmpresas = empresasList.filter((empresa) => {
    const matchesSearch = empresa.nome.toLowerCase().includes(search.toLowerCase()) ||
      empresa.cidade.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "todos" || empresa.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = (empresaId: string, newStatus: EmpresaStatus) => {
    setEmpresasList((prev) =>
      prev.map((e) => (e.id === empresaId ? { ...e, status: newStatus } : e))
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const totalAtivas = empresasList.filter((e) => e.status === "ativo").length
  const totalPendentes = empresasList.filter((e) => e.status === "pendente").length
  const totalBloqueadas = empresasList.filter((e) => e.status === "bloqueado").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Empresas</h1>
        <p className="text-muted-foreground">
          Gerencie as empresas e profissionais cadastrados na plataforma
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Ativas</p>
              <p className="text-2xl font-bold">{totalAtivas}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold">{totalPendentes}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <Ban className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bloqueadas</p>
              <p className="text-2xl font-bold">{totalBloqueadas}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar empresa ou cidade..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="bloqueado">Bloqueado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Empresas</CardTitle>
          <CardDescription>{filteredEmpresas.length} empresas encontradas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Empresa</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Localização</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden lg:table-cell">Plano</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Usuários</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Faturamento</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmpresas.map((empresa) => (
                  <tr key={empresa.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium">{empresa.nome}</div>
                      <div className="text-sm text-muted-foreground">{empresa.tipo}</div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground hidden md:table-cell">
                      {empresa.cidade}, {empresa.estado}
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      <Badge variant="outline">{empresa.plano}</Badge>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        {empresa.usuarios}
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <div className="flex items-center gap-1 text-sm">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        {formatCurrency(empresa.faturamento)}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={statusColors[empresa.status]}>
                        {statusLabels[empresa.status]}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver detalhes
                          </DropdownMenuItem>
                          {empresa.status !== "ativo" && (
                            <DropdownMenuItem onClick={() => handleStatusChange(empresa.id, "ativo")}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Ativar
                            </DropdownMenuItem>
                          )}
                          {empresa.status !== "bloqueado" && (
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(empresa.id, "bloqueado")}
                              className="text-destructive"
                            >
                              <Ban className="w-4 h-4 mr-2" />
                              Bloquear
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
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
