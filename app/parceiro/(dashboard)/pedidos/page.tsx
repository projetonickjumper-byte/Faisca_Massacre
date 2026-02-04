"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Filter,
  Eye,
  Check,
  X,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Play,
  DollarSign,
  Calendar,
  User,
  Phone,
  Mail,
  FileText,
  Dumbbell,
  ClipboardList,
  MoreVertical,
  RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ordersService, ServiceOrder } from "@/lib/api"
import Link from "next/link"

const statusConfig: Record<ServiceOrder["status"], { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pendente", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20", icon: Clock },
  confirmed: { label: "Confirmado", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", icon: CheckCircle2 },
  in_progress: { label: "Em Andamento", color: "bg-purple-500/10 text-purple-500 border-purple-500/20", icon: Play },
  completed: { label: "Concluído", color: "bg-green-500/10 text-green-500 border-green-500/20", icon: CheckCircle2 },
  cancelled: { label: "Cancelado", color: "bg-red-500/10 text-red-500 border-red-500/20", icon: XCircle },
}

const paymentStatusConfig: Record<ServiceOrder["paymentStatus"], { label: string; color: string }> = {
  pending: { label: "Aguardando", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  paid: { label: "Pago", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  refunded: { label: "Reembolsado", color: "bg-gray-500/10 text-gray-500 border-gray-500/20" },
}

const serviceTypeConfig: Record<ServiceOrder["serviceType"], { label: string; icon: React.ElementType }> = {
  treino_personalizado: { label: "Treino Personalizado", icon: Dumbbell },
  avaliacao_fisica: { label: "Avaliação Física", icon: ClipboardList },
  plano_mensal: { label: "Plano Mensal", icon: Calendar },
  day_use: { label: "Day Use", icon: Clock },
  aula_avulsa: { label: "Aula Avulsa", icon: User },
  pacote: { label: "Pacote", icon: FileText },
}

export default function PedidosPage() {
  const [orders, setOrders] = useState<ServiceOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    inProgress: 0,
    completed: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    loadOrders()
    loadStats()
  }, [])

  const loadOrders = async () => {
    setLoading(true)
    const response = await ordersService.getOrders()
    if (response.success && response.data) {
      setOrders(response.data)
    }
    setLoading(false)
  }

  const loadStats = async () => {
    const response = await ordersService.getOrderStats()
    if (response.success && response.data) {
      setStats(response.data)
    }
  }

  const handleConfirmOrder = async (orderId: string) => {
    const response = await ordersService.confirmOrder(orderId)
    if (response.success) {
      loadOrders()
      loadStats()
    }
  }

  const handleStartOrder = async (orderId: string) => {
    const response = await ordersService.startOrder(orderId)
    if (response.success) {
      loadOrders()
      loadStats()
    }
  }

  const handleCompleteOrder = async (orderId: string) => {
    const response = await ordersService.completeOrder(orderId)
    if (response.success) {
      loadOrders()
      loadStats()
    }
  }

  const handleCancelOrder = async (orderId: string) => {
    const response = await ordersService.cancelOrder(orderId, "Cancelado pelo parceiro")
    if (response.success) {
      loadOrders()
      loadStats()
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.serviceName.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesType = typeFilter === "all" || order.serviceType === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pedidos</h1>
          <p className="text-muted-foreground">
            Gerencie os serviços adquiridos pelos clientes
          </p>
        </div>
        <Button onClick={loadOrders} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Atualizar
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-500">{stats.pending}</p>
              </div>
              <div className="rounded-full bg-yellow-500/10 p-3">
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmados</p>
                <p className="text-2xl font-bold text-blue-500">{stats.confirmed}</p>
              </div>
              <div className="rounded-full bg-blue-500/10 p-3">
                <CheckCircle2 className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
                <p className="text-2xl font-bold text-purple-500">{stats.inProgress}</p>
              </div>
              <div className="rounded-full bg-purple-500/10 p-3">
                <Play className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Concluídos</p>
                <p className="text-2xl font-bold text-green-500">{stats.completed}</p>
              </div>
              <div className="rounded-full bg-green-500/10 p-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Faturamento</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por cliente, pedido ou serviço..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="pending">Pendentes</SelectItem>
                <SelectItem value="confirmed">Confirmados</SelectItem>
                <SelectItem value="in_progress">Em Andamento</SelectItem>
                <SelectItem value="completed">Concluídos</SelectItem>
                <SelectItem value="cancelled">Cancelados</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Tipo de serviço" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="treino_personalizado">Treino Personalizado</SelectItem>
                <SelectItem value="avaliacao_fisica">Avaliação Física</SelectItem>
                <SelectItem value="plano_mensal">Plano Mensal</SelectItem>
                <SelectItem value="day_use">Day Use</SelectItem>
                <SelectItem value="aula_avulsa">Aula Avulsa</SelectItem>
                <SelectItem value="pacote">Pacote</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos ({orders.length})</TabsTrigger>
          <TabsTrigger value="pending" className="text-yellow-500">
            Pendentes ({orders.filter(o => o.status === "pending").length})
          </TabsTrigger>
          <TabsTrigger value="active">
            Ativos ({orders.filter(o => ["confirmed", "in_progress"].includes(o.status)).length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {loading ? (
            <Card>
              <CardContent className="flex items-center justify-center py-12">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </CardContent>
            </Card>
          ) : filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-medium">Nenhum pedido encontrado</h3>
                <p className="text-sm text-muted-foreground">
                  Não há pedidos que correspondam aos filtros selecionados.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredOrders.map((order) => {
                const status = statusConfig[order.status]
                const payment = paymentStatusConfig[order.paymentStatus]
                const serviceType = serviceTypeConfig[order.serviceType]
                const StatusIcon = status.icon
                const ServiceIcon = serviceType.icon

                return (
                  <Card key={order.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row md:items-center">
                        {/* Order Info */}
                        <div className="flex flex-1 items-start gap-4 p-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={order.userAvatar} />
                            <AvatarFallback>
                              {order.userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{order.userName}</h3>
                              <Badge variant="outline" className="text-xs">
                                {order.orderNumber}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <ServiceIcon className="h-4 w-4" />
                              <span>{order.serviceName}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {formatDate(order.createdAt)}
                              </span>
                              {order.scheduledDate && (
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  Agendado: {formatDate(order.scheduledDate)}
                                  {order.scheduledTime && ` às ${order.scheduledTime}`}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Status & Actions */}
                        <div className="flex items-center gap-3 border-t p-4 md:border-l md:border-t-0">
                          <div className="flex flex-col items-end gap-2">
                            <Badge variant="outline" className={status.color}>
                              <StatusIcon className="mr-1 h-3 w-3" />
                              {status.label}
                            </Badge>
                            <Badge variant="outline" className={payment.color}>
                              {payment.label}
                            </Badge>
                            <span className="text-lg font-bold text-primary">
                              {formatCurrency(order.price)}
                            </span>
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {
                                setSelectedOrder(order)
                                setShowDetailsDialog(true)
                              }}>
                                <Eye className="mr-2 h-4 w-4" />
                                Ver Detalhes
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {order.status === "pending" && (
                                <>
                                  <DropdownMenuItem onClick={() => handleConfirmOrder(order.id)}>
                                    <Check className="mr-2 h-4 w-4 text-green-500" />
                                    Confirmar Pedido
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleCancelOrder(order.id)}
                                    className="text-red-500"
                                  >
                                    <X className="mr-2 h-4 w-4" />
                                    Recusar Pedido
                                  </DropdownMenuItem>
                                </>
                              )}
                              {order.status === "confirmed" && (
                                <DropdownMenuItem onClick={() => handleStartOrder(order.id)}>
                                  <Play className="mr-2 h-4 w-4 text-purple-500" />
                                  Iniciar Atendimento
                                </DropdownMenuItem>
                              )}
                              {order.status === "in_progress" && (
                                <DropdownMenuItem onClick={() => handleCompleteOrder(order.id)}>
                                  <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                  Concluir Pedido
                                </DropdownMenuItem>
                              )}
                              {(order.serviceType === "treino_personalizado" || order.serviceType === "pacote") && 
                               order.status === "in_progress" && (
                                <DropdownMenuItem asChild>
                                  <Link href={`/parceiro/treinos?clientId=${order.userId}&clientName=${encodeURIComponent(order.userName)}&orderId=${order.id}`}>
                                    <Dumbbell className="mr-2 h-4 w-4" />
                                    Criar Treino
                                  </Link>
                                </DropdownMenuItem>
                              )}
                              {order.serviceType === "avaliacao_fisica" && 
                               ["confirmed", "in_progress"].includes(order.status) && (
                                <DropdownMenuItem asChild>
                                  <Link href={`/parceiro/avaliacao-fisica?clientId=${order.userId}&clientName=${encodeURIComponent(order.userName)}&orderId=${order.id}`}>
                                    <ClipboardList className="mr-2 h-4 w-4" />
                                    Realizar Avaliação
                                  </Link>
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {orders.filter(o => o.status === "pending").length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle2 className="mb-4 h-12 w-12 text-green-500" />
                <h3 className="text-lg font-medium">Nenhum pedido pendente</h3>
                <p className="text-sm text-muted-foreground">
                  Todos os pedidos foram processados.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {orders.filter(o => o.status === "pending").map((order) => {
                const serviceType = serviceTypeConfig[order.serviceType]
                const ServiceIcon = serviceType.icon

                return (
                  <Card key={order.id} className="border-yellow-500/20 bg-yellow-500/5">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className="rounded-full bg-yellow-500/10 p-3">
                          <AlertCircle className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold">{order.userName}</h3>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <ServiceIcon className="h-4 w-4" />
                                {order.serviceName}
                              </p>
                            </div>
                            <span className="text-lg font-bold text-primary">
                              {formatCurrency(order.price)}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <Button 
                              size="sm" 
                              onClick={() => handleConfirmOrder(order.id)}
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Confirmar
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => {
                                setSelectedOrder(order)
                                setShowDetailsDialog(true)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Detalhes
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => handleCancelOrder(order.id)}
                            >
                              <X className="mr-2 h-4 w-4" />
                              Recusar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {orders.filter(o => ["confirmed", "in_progress"].includes(o.status)).map((order) => {
            const status = statusConfig[order.status]
            const serviceType = serviceTypeConfig[order.serviceType]
            const StatusIcon = status.icon
            const ServiceIcon = serviceType.icon

            return (
              <Card key={order.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={order.userAvatar} />
                      <AvatarFallback>
                        {order.userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{order.userName}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <ServiceIcon className="h-4 w-4" />
                            {order.serviceName}
                          </p>
                        </div>
                        <Badge variant="outline" className={status.color}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {status.label}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        {order.status === "confirmed" && (
                          <Button size="sm" onClick={() => handleStartOrder(order.id)}>
                            <Play className="mr-2 h-4 w-4" />
                            Iniciar Atendimento
                          </Button>
                        )}
                        {order.status === "in_progress" && (
                          <>
                            {(order.serviceType === "treino_personalizado" || order.serviceType === "pacote") && (
                              <Button size="sm" asChild>
                                <Link href={`/parceiro/treinos?clientId=${order.userId}&clientName=${encodeURIComponent(order.userName)}&orderId=${order.id}`}>
                                  <Dumbbell className="mr-2 h-4 w-4" />
                                  Criar Treino
                                </Link>
                              </Button>
                            )}
                            {order.serviceType === "avaliacao_fisica" && (
                              <Button size="sm" asChild>
                                <Link href={`/parceiro/avaliacao-fisica?clientId=${order.userId}&clientName=${encodeURIComponent(order.userName)}&orderId=${order.id}`}>
                                  <ClipboardList className="mr-2 h-4 w-4" />
                                  Realizar Avaliação
                                </Link>
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCompleteOrder(order.id)}
                            >
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Concluir
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>

      {/* Order Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              {/* Client Info */}
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={selectedOrder.userAvatar} />
                  <AvatarFallback>
                    {selectedOrder.userName.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{selectedOrder.userName}</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {selectedOrder.userEmail}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {selectedOrder.userPhone}
                  </p>
                </div>
              </div>

              {/* Order Info */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Número do Pedido</span>
                  <span className="font-medium">{selectedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Serviço</span>
                  <span className="font-medium">{selectedOrder.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor</span>
                  <span className="font-bold text-primary">{formatCurrency(selectedOrder.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data do Pedido</span>
                  <span>{formatDate(selectedOrder.createdAt)}</span>
                </div>
                {selectedOrder.scheduledDate && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Agendamento</span>
                    <span>
                      {formatDate(selectedOrder.scheduledDate)}
                      {selectedOrder.scheduledTime && ` às ${selectedOrder.scheduledTime}`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="outline" className={statusConfig[selectedOrder.status].color}>
                    {statusConfig[selectedOrder.status].label}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pagamento</span>
                  <Badge variant="outline" className={paymentStatusConfig[selectedOrder.paymentStatus].color}>
                    {paymentStatusConfig[selectedOrder.paymentStatus].label}
                  </Badge>
                </div>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div className="rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Observações do Cliente</h4>
                  <p className="text-sm text-muted-foreground">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Fechar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
