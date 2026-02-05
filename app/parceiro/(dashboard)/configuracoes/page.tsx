"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Globe,
  Clock,
  Camera,
  Save,
  Bell,
  CreditCard,
  Plus,
  X,
  Trash2,
  Upload,
  Dumbbell,
  Wifi,
  Car,
  ShowerHead,
  Lock,
  Droplets,
  Wind,
  Users,
  Sparkles,
  GripVertical,
  Check,
  DollarSign,
  Percent,
  Tag,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth-context"

const availableModalities = [
  "Musculação", "Cardio", "Funcional", "Spinning", "Yoga", "Pilates",
  "Crossfit", "Natação", "Hidroginástica", "Lutas", "Boxe", "Muay Thai",
  "Jiu-Jitsu", "Dança", "Zumba", "Jump", "Step", "Alongamento", "HIIT",
]

const availableAmenities = [
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "parking", label: "Estacionamento", icon: Car },
  { id: "showers", label: "Vestiários", icon: ShowerHead },
  { id: "lockers", label: "Armários", icon: Lock },
  { id: "water", label: "Água gratuita", icon: Droplets },
  { id: "ac", label: "Ar condicionado", icon: Wind },
  { id: "personal", label: "Personal Trainer", icon: Users },
  { id: "nutrition", label: "Nutricionista", icon: Sparkles },
]

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

  // Fotos da academia
  const [images, setImages] = useState<string[]>([
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800",
  ])

  // Informações básicas
  const [businessInfo, setBusinessInfo] = useState({
    name: partnerUser?.businessName || "SmartFit Paulista",
    description: "A SmartFit Paulista oferece estrutura completa para seu treino, com equipamentos de última geração, aulas coletivas variadas e ambiente climatizado. Nossa equipe de profissionais está sempre pronta para ajudar você a alcançar seus objetivos.",
    phone: partnerUser?.phone || "(11) 99999-9999",
    whatsapp: partnerUser?.phone || "(11) 99999-9999",
    email: user?.email || "contato@smartfit.com.br",
    website: "https://www.smartfit.com.br",
    address: partnerUser?.address || "Av. Paulista, 1000",
    city: partnerUser?.city || "São Paulo",
    state: partnerUser?.state || "SP",
    cep: "01310-100",
  })

  // Modalidades selecionadas
  const [selectedModalities, setSelectedModalities] = useState<string[]>([
    "Musculação", "Cardio", "Funcional", "Spinning", "Yoga", "Pilates"
  ])

  // Comodidades selecionadas
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    "wifi", "parking", "showers", "lockers", "water", "ac"
  ])

  // Planos
  const [plans, setPlans] = useState([
    { id: "1", name: "Mensal", type: "monthly", price: 99.90, originalPrice: 129.90, features: ["Acesso ilimitado", "Todas as modalidades", "App exclusivo", "1 avaliação física"], popular: false },
    { id: "2", name: "Trimestral", type: "quarterly", price: 89.90, originalPrice: 99.90, features: ["Acesso ilimitado", "Todas as modalidades", "App exclusivo", "2 avaliações físicas"], popular: true },
    { id: "3", name: "Anual", type: "annual", price: 79.90, originalPrice: 99.90, features: ["Acesso ilimitado", "Todas as modalidades", "App exclusivo", "4 avaliações físicas", "Personal 1x/mês"], popular: false },
  ])

  // Day Use
  const [dayUse, setDayUse] = useState({
    enabled: true,
    price: 39.90,
    originalPrice: 49.90,
    duration: "Acesso por 1 dia",
    availableHours: "06:00 às 22:00",
    firstExperienceDiscount: 50,
    cancellationPolicy: "Cancelamento gratuito até 2h antes",
  })

  // Integrações
  const [integrations, setIntegrations] = useState({
    wellhub: true,
    totalPass: false,
    freeTrial: true,
    trialDays: 7,
  })

  // Horários
  const [openingHours, setOpeningHours] = useState({
    monday: { open: "06:00", close: "22:00", closed: false },
    tuesday: { open: "06:00", close: "22:00", closed: false },
    wednesday: { open: "06:00", close: "22:00", closed: false },
    thursday: { open: "06:00", close: "22:00", closed: false },
    friday: { open: "06:00", close: "22:00", closed: false },
    saturday: { open: "08:00", close: "18:00", closed: false },
    sunday: { open: "08:00", close: "14:00", closed: false },
  })

  // Notificações
  const [notifications, setNotifications] = useState({
    newBooking: true,
    bookingCancellation: true,
    newReview: true,
    newClient: false,
    marketing: false,
  })

  const weekDays = [
    { key: "monday", label: "Segunda-feira" },
    { key: "tuesday", label: "Terça-feira" },
    { key: "wednesday", label: "Quarta-feira" },
    { key: "thursday", label: "Quinta-feira" },
    { key: "friday", label: "Sexta-feira" },
    { key: "saturday", label: "Sábado" },
    { key: "sunday", label: "Domingo" },
  ]

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const handleAddPlan = () => {
    const newPlan = {
      id: `plan-${Date.now()}`,
      name: "Novo Plano",
      type: "monthly" as const,
      price: 0,
      originalPrice: 0,
      features: [],
      popular: false,
    }
    setPlans([...plans, newPlan])
  }

  const handleRemovePlan = (id: string) => {
    setPlans(plans.filter(p => p.id !== id))
  }

  const handleToggleModality = (modality: string) => {
    if (selectedModalities.includes(modality)) {
      setSelectedModalities(selectedModalities.filter(m => m !== modality))
    } else {
      setSelectedModalities([...selectedModalities, modality])
    }
  }

  const handleToggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Configurações da Academia</h1>
          <p className="text-muted-foreground">Gerencie as informações que aparecem no seu perfil público</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Save className="mr-2 h-4 w-4" />
          Salvar todas alterações
        </Button>
      </div>

      <Tabs defaultValue="photos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 lg:w-auto">
          <TabsTrigger value="photos">Fotos</TabsTrigger>
          <TabsTrigger value="business">Informações</TabsTrigger>
          <TabsTrigger value="modalities">Modalidades</TabsTrigger>
          <TabsTrigger value="plans">Planos</TabsTrigger>
          <TabsTrigger value="hours">Horários</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="notifications">Notificações</TabsTrigger>
        </TabsList>

        {/* Fotos da Academia */}
        <TabsContent value="photos">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Fotos da Academia
              </CardTitle>
              <CardDescription>
                Adicione fotos do seu espaço. A primeira foto será a capa do perfil. Recomendamos pelo menos 5 fotos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Grid de fotos */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group aspect-video rounded-lg overflow-hidden border border-border">
                    <Image
                      src={image}
                      alt={`Foto ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {index === 0 && (
                      <Badge className="absolute top-2 left-2 bg-primary">Capa</Badge>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:bg-white/20">
                        <GripVertical className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-white hover:bg-white/20"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Botão adicionar foto */}
                <button className="aspect-video rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary">
                  <Upload className="h-8 w-8" />
                  <span className="text-sm font-medium">Adicionar foto</span>
                </button>
              </div>

              <p className="text-sm text-muted-foreground">
                Arraste para reordenar. JPG, PNG ou WebP. Máximo 5MB por imagem.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Informações do Negócio */}
        <TabsContent value="business">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Informações do Negócio
              </CardTitle>
              <CardDescription>
                Informações que aparecem no seu perfil público
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da academia</Label>
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
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={businessInfo.description}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, description: e.target.value })}
                  rows={4}
                  placeholder="Descreva sua academia, diferenciais, estrutura..."
                />
                <p className="text-xs text-muted-foreground">{businessInfo.description.length}/500 caracteres</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={businessInfo.phone}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={businessInfo.whatsapp}
                    onChange={(e) => setBusinessInfo({ ...businessInfo, whatsapp: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="https://www.suaacademia.com.br"
                  value={businessInfo.website}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, website: e.target.value })}
                />
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Endereço
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço completo</Label>
                    <Input
                      id="address"
                      value={businessInfo.address}
                      onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                      placeholder="Rua, número, complemento"
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
                        placeholder="00000-000"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Comodidades */}
              <div className="border-t border-border pt-6">
                <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Comodidades
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableAmenities.map((amenity) => {
                    const Icon = amenity.icon
                    const isSelected = selectedAmenities.includes(amenity.id)
                    return (
                      <button
                        key={amenity.id}
                        onClick={() => handleToggleAmenity(amenity.id)}
                        className={`flex items-center gap-2 p-3 rounded-lg border transition-colors ${
                          isSelected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{amenity.label}</span>
                        {isSelected && <Check className="h-4 w-4 ml-auto" />}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar informações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Modalidades */}
        <TabsContent value="modalities">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5" />
                Modalidades Oferecidas
              </CardTitle>
              <CardDescription>
                Selecione todas as modalidades que sua academia oferece
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {availableModalities.map((modality) => {
                  const isSelected = selectedModalities.includes(modality)
                  return (
                    <button
                      key={modality}
                      onClick={() => handleToggleModality(modality)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {modality}
                    </button>
                  )
                })}
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>{selectedModalities.length}</strong> modalidades selecionadas
                </p>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar modalidades
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Planos e Preços */}
        <TabsContent value="plans">
          <div className="space-y-6">
            {/* Planos */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Planos de Assinatura
                    </CardTitle>
                    <CardDescription>
                      Configure os planos disponíveis para seus clientes
                    </CardDescription>
                  </div>
                  <Button onClick={handleAddPlan} variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar plano
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {plans.map((plan, index) => (
                  <div key={plan.id} className="border border-border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{plan.name}</h4>
                        {plan.popular && <Badge className="bg-primary">Popular</Badge>}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleRemovePlan(plan.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-4">
                      <div className="space-y-2">
                        <Label>Nome do plano</Label>
                        <Input
                          value={plan.name}
                          onChange={(e) => {
                            const newPlans = [...plans]
                            newPlans[index].name = e.target.value
                            setPlans(newPlans)
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tipo</Label>
                        <Select
                          value={plan.type}
                          onValueChange={(value: "monthly" | "quarterly" | "annual") => {
                            const newPlans = [...plans]
                            newPlans[index].type = value
                            setPlans(newPlans)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Mensal</SelectItem>
                            <SelectItem value="quarterly">Trimestral</SelectItem>
                            <SelectItem value="annual">Anual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Preço (R$)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={plan.price}
                          onChange={(e) => {
                            const newPlans = [...plans]
                            newPlans[index].price = parseFloat(e.target.value)
                            setPlans(newPlans)
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Preço original (R$)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={plan.originalPrice}
                          onChange={(e) => {
                            const newPlans = [...plans]
                            newPlans[index].originalPrice = parseFloat(e.target.value)
                            setPlans(newPlans)
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Benefícios (um por linha)</Label>
                      <Textarea
                        value={plan.features.join("\n")}
                        onChange={(e) => {
                          const newPlans = [...plans]
                          newPlans[index].features = e.target.value.split("\n").filter(f => f.trim())
                          setPlans(newPlans)
                        }}
                        rows={3}
                        placeholder="Acesso ilimitado&#10;Todas as modalidades&#10;App exclusivo"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id={`popular-${plan.id}`}
                        checked={plan.popular}
                        onCheckedChange={(checked) => {
                          const newPlans = [...plans]
                          newPlans[index].popular = checked === true
                          setPlans(newPlans)
                        }}
                      />
                      <Label htmlFor={`popular-${plan.id}`} className="text-sm">
                        Marcar como plano popular (destaque)
                      </Label>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Day Use */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Day Use
                    </CardTitle>
                    <CardDescription>
                      Configure a opção de acesso avulso (diária)
                    </CardDescription>
                  </div>
                  <Switch
                    checked={dayUse.enabled}
                    onCheckedChange={(checked) => setDayUse({ ...dayUse, enabled: checked })}
                  />
                </div>
              </CardHeader>
              {dayUse.enabled && (
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Preço (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={dayUse.price}
                        onChange={(e) => setDayUse({ ...dayUse, price: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Preço original (R$)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        value={dayUse.originalPrice}
                        onChange={(e) => setDayUse({ ...dayUse, originalPrice: parseFloat(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Duração</Label>
                      <Input
                        value={dayUse.duration}
                        onChange={(e) => setDayUse({ ...dayUse, duration: e.target.value })}
                        placeholder="Acesso por 1 dia"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Horário disponível</Label>
                      <Input
                        value={dayUse.availableHours}
                        onChange={(e) => setDayUse({ ...dayUse, availableHours: e.target.value })}
                        placeholder="06:00 às 22:00"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Desconto primeira experiência (%)</Label>
                      <Input
                        type="number"
                        value={dayUse.firstExperienceDiscount}
                        onChange={(e) => setDayUse({ ...dayUse, firstExperienceDiscount: parseInt(e.target.value) })}
                        placeholder="50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Política de cancelamento</Label>
                      <Input
                        value={dayUse.cancellationPolicy}
                        onChange={(e) => setDayUse({ ...dayUse, cancellationPolicy: e.target.value })}
                        placeholder="Cancelamento gratuito até 2h antes"
                      />
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            <div className="flex justify-end">
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Salvar planos e preços
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Horários */}
        <TabsContent value="hours">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Horário de Funcionamento
              </CardTitle>
              <CardDescription>
                Defina os horários de abertura e fechamento
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
                      <span className="text-sm text-muted-foreground min-w-16">
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
                        <span className="text-muted-foreground">até</span>
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
                  Salvar horários
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrações */}
        <TabsContent value="integrations">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Integrações e Parcerias
              </CardTitle>
              <CardDescription>
                Configure integrações com parceiros e opções especiais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <span className="text-green-500 font-bold text-sm">WH</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Wellhub (Gympass)</p>
                    <p className="text-sm text-muted-foreground">Aceite clientes do Wellhub na sua academia</p>
                  </div>
                </div>
                <Switch
                  checked={integrations.wellhub}
                  onCheckedChange={(checked) => setIntegrations({ ...integrations, wellhub: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-500 font-bold text-sm">TP</span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">TotalPass</p>
                    <p className="text-sm text-muted-foreground">Aceite clientes do TotalPass na sua academia</p>
                  </div>
                </div>
                <Switch
                  checked={integrations.totalPass}
                  onCheckedChange={(checked) => setIntegrations({ ...integrations, totalPass: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-4 border-b border-border">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Aula experimental gratuita</p>
                    <p className="text-sm text-muted-foreground">Ofereça uma aula grátis para novos clientes</p>
                  </div>
                </div>
                <Switch
                  checked={integrations.freeTrial}
                  onCheckedChange={(checked) => setIntegrations({ ...integrations, freeTrial: checked })}
                />
              </div>

              {integrations.freeTrial && (
                <div className="ml-16 space-y-2">
                  <Label>Dias de teste gratuito</Label>
                  <Input
                    type="number"
                    value={integrations.trialDays}
                    onChange={(e) => setIntegrations({ ...integrations, trialDays: parseInt(e.target.value) })}
                    className="w-32"
                  />
                </div>
              )}

              <div className="flex justify-end pt-4">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar integrações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notifications">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notificações
              </CardTitle>
              <CardDescription>
                Configure quais notificações deseja receber
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Novas reservas</p>
                  <p className="text-sm text-muted-foreground">Receba uma notificação quando um cliente fizer uma reserva</p>
                </div>
                <Switch
                  checked={notifications.newBooking}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newBooking: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Cancelamentos</p>
                  <p className="text-sm text-muted-foreground">Receba uma notificação quando uma reserva for cancelada</p>
                </div>
                <Switch
                  checked={notifications.bookingCancellation}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, bookingCancellation: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Novas avaliações</p>
                  <p className="text-sm text-muted-foreground">Receba uma notificação quando receber uma nova avaliação</p>
                </div>
                <Switch
                  checked={notifications.newReview}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newReview: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Novos clientes</p>
                  <p className="text-sm text-muted-foreground">Receba uma notificação quando um novo cliente se cadastrar</p>
                </div>
                <Switch
                  checked={notifications.newClient}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, newClient: checked })}
                />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-foreground">Marketing</p>
                  <p className="text-sm text-muted-foreground">Receba novidades e dicas do FitApp</p>
                </div>
                <Switch
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar preferências
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
