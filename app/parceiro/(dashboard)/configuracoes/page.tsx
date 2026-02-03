"use client"

import { useState } from "react"
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Camera,
  Save,
  Shield,
  Bell,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"

export default function ConfiguracoesPage() {
  const { user } = useAuth()
  const partnerUser = user as {
    businessName: string
    businessType: string
    phone: string
    address?: string
    city?: string
    state?: string
    planType: string
  }

  const [businessInfo, setBusinessInfo] = useState({
    name: partnerUser?.businessName || "",
    description: "Academia completa com equipamentos modernos e profissionais qualificados.",
    phone: partnerUser?.phone || "",
    whatsapp: partnerUser?.phone || "",
    email: user?.email || "",
    website: "",
    address: partnerUser?.address || "",
    city: partnerUser?.city || "",
    state: partnerUser?.state || "",
    cep: "",
  })

  const [notifications, setNotifications] = useState({
    newBooking: true,
    bookingCancellation: true,
    newReview: true,
    newClient: false,
    marketing: false,
  })

  const [openingHours, setOpeningHours] = useState({
    monday: { open: "06:00", close: "22:00", closed: false },
    tuesday: { open: "06:00", close: "22:00", closed: false },
    wednesday: { open: "06:00", close: "22:00", closed: false },
    thursday: { open: "06:00", close: "22:00", closed: false },
    friday: { open: "06:00", close: "22:00", closed: false },
    saturday: { open: "08:00", close: "18:00", closed: false },
    sunday: { open: "08:00", close: "14:00", closed: false },
  })

  const weekDays = [
    { key: "monday", label: "Segunda-feira" },
    { key: "tuesday", label: "Terca-feira" },
    { key: "wednesday", label: "Quarta-feira" },
    { key: "thursday", label: "Quinta-feira" },
    { key: "friday", label: "Sexta-feira" },
    { key: "saturday", label: "Sabado" },
    { key: "sunday", label: "Domingo" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configuracoes</h1>
        <p className="text-muted-foreground">Gerencie as configuracoes do seu negocio</p>
      </div>

      <Tabs defaultValue="business" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="business">Negocio</TabsTrigger>
          <TabsTrigger value="hours">Horarios</TabsTrigger>
          <TabsTrigger value="notifications">Notificacoes</TabsTrigger>
          <TabsTrigger value="plan">Plano</TabsTrigger>
        </TabsList>

        {/* Business Info */}
        <TabsContent value="business">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informacoes do Negocio
              </CardTitle>
              <CardDescription>
                Informacoes que aparecem no seu perfil publico
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Image */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="h-24 w-24 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Building2 className="h-10 w-10 text-primary" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <p className="font-medium text-foreground">Logo do negocio</p>
                  <p className="text-sm text-muted-foreground">JPG, PNG ou GIF. Max 2MB.</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do negocio</Label>
                  <Input
                    id="name"
                    value={businessInfo.name}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={businessInfo.email}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descricao</Label>
                <Textarea
                  id="description"
                  value={businessInfo.description}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={businessInfo.phone}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={businessInfo.whatsapp}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, whatsapp: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="https://www.seusite.com.br"
                  value={businessInfo.website}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
                />
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Endereco
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereco</Label>
                    <Input
                      id="address"
                      value={businessInfo.address}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="city">Cidade</Label>
                      <Input
                        id="city"
                        value={businessInfo.city}
                        onChange={(e) => setBusinessInfo({ ...businessInfo, city: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">Estado</Label>
                      <Input
                        id="state"
                        value={businessInfo.state}
                        onChange={(e) => setBusinessInfo({ ...businessInfo, state: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        value={businessInfo.cep}
                        onChange={(e) => setBusinessInfo({ ...businessInfo, cep: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar alteracoes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Opening Hours */}
        <TabsContent value="hours">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horario de Funcionamento
              </CardTitle>
              <CardDescription>
                Defina os horarios de abertura e fechamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {weekDays.map((day) => {
                const hours = openingHours[day.key as keyof typeof openingHours]
                return (
                  <div key={day.key} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                    <div className="w-32">
                      <span className="font-medium text-foreground">{day.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={!hours.closed}
                        onCheckedChange={(checked) =>
                          setOpeningHours({
                            ...openingHours,
                            [day.key]: { ...hours, closed: !checked },
                          })
                        }
                      />
                      <span className="text-sm text-muted-foreground">
                        {hours.closed ? "Fechado" : "Aberto"}
                      </span>
                    </div>
                    {!hours.closed && (
                      <div className="flex items-center gap-2 ml-auto">
                        <Input
                          type="time"
                          value={hours.open}
                          onChange={(e) =>
                            setOpeningHours({
                              ...openingHours,
                              [day.key]: { ...hours, open: e.target.value },
                            })
                          }
                          className="w-32"
                        />
                        <span className="text-muted-foreground">ate</span>
                        <Input
                          type="time"
                          value={hours.close}
                          onChange={(e) =>
                            setOpeningHours({
                              ...openingHours,
                              [day.key]: { ...hours, close: e.target.value },
                            })
                          }
                          className="w-32"
                        />
                      </div>
                    )}
                  </div>
                )
              })}

              <div className="flex justify-end pt-4">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar horarios
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificacoes
              </CardTitle>
              <CardDescription>
                Configure quais notificacoes deseja receber
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Novas reservas</p>
                  <p className="text-sm text-muted-foreground">Receba uma notificacao quando um cliente fizer uma reserva</p>
                </div>
                <Switch
                  checked={notifications.newBooking}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, newBooking: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Cancelamentos</p>
                  <p className="text-sm text-muted-foreground">Receba uma notificacao quando uma reserva for cancelada</p>
                </div>
                <Switch
                  checked={notifications.bookingCancellation}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, bookingCancellation: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Novas avaliacoes</p>
                  <p className="text-sm text-muted-foreground">Receba uma notificacao quando receber uma nova avaliacao</p>
                </div>
                <Switch
                  checked={notifications.newReview}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, newReview: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Novos clientes</p>
                  <p className="text-sm text-muted-foreground">Receba uma notificacao quando um novo cliente se cadastrar</p>
                </div>
                <Switch
                  checked={notifications.newClient}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, newClient: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-foreground">Marketing</p>
                  <p className="text-sm text-muted-foreground">Receba novidades e dicas do FitApp</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, marketing: checked })
                  }
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar preferencias
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plan */}
        <TabsContent value="plan">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Seu Plano
              </CardTitle>
              <CardDescription>
                Gerencie sua assinatura
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Badge className="bg-primary mb-2">Plano Atual</Badge>
                    <h3 className="text-2xl font-bold text-foreground capitalize">{partnerUser?.planType || "Free"}</h3>
                    <p className="text-muted-foreground">
                      {partnerUser?.planType === "premium" 
                        ? "Acesso completo a todas as funcionalidades"
                        : "Funcionalidades basicas"}
                    </p>
                  </div>
                  {partnerUser?.planType !== "premium" && (
                    <Button>Fazer upgrade</Button>
                  )}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <Card className={`border-2 ${partnerUser?.planType === "free" ? "border-primary" : "border-border"}`}>
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-foreground">Free</h4>
                    <p className="text-2xl font-bold text-foreground mt-2">R$ 0</p>
                    <p className="text-sm text-muted-foreground">por mes</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li>Ate 50 clientes</li>
                      <li>Dashboard basico</li>
                      <li>Suporte por email</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className={`border-2 ${partnerUser?.planType === "basic" ? "border-primary" : "border-border"}`}>
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-foreground">Basic</h4>
                    <p className="text-2xl font-bold text-foreground mt-2">R$ 99</p>
                    <p className="text-sm text-muted-foreground">por mes</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li>Ate 200 clientes</li>
                      <li>Relatorios completos</li>
                      <li>Suporte prioritario</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className={`border-2 ${partnerUser?.planType === "premium" ? "border-primary" : "border-border"}`}>
                  <CardContent className="p-6">
                    <Badge className="bg-primary mb-2">Popular</Badge>
                    <h4 className="font-semibold text-foreground">Premium</h4>
                    <p className="text-2xl font-bold text-foreground mt-2">R$ 199</p>
                    <p className="text-sm text-muted-foreground">por mes</p>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li>Clientes ilimitados</li>
                      <li>Todas as funcionalidades</li>
                      <li>Suporte 24/7</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
