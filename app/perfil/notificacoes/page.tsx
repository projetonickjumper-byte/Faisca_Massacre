"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bell, BellOff, Smartphone, Mail, MessageSquare, Zap, Gift, Calendar, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { AppShell } from "@/components/app-shell"

interface NotificationSetting {
  id: string
  icon: React.ElementType
  title: string
  description: string
  enabled: boolean
}

const initialSettings: NotificationSetting[] = [
  { id: "push", icon: Smartphone, title: "Notificacoes Push", description: "Receba alertas no seu dispositivo", enabled: true },
  { id: "email", icon: Mail, title: "Email", description: "Atualizacoes por email", enabled: true },
  { id: "sms", icon: MessageSquare, title: "SMS", description: "Mensagens de texto importantes", enabled: false },
]

const categorySettings = [
  { id: "promos", icon: Zap, title: "Promocoes", description: "Ofertas e descontos especiais", enabled: true },
  { id: "rewards", icon: Gift, title: "Recompensas", description: "Conquistas e XP ganhos", enabled: true },
  { id: "reservas", icon: Calendar, title: "Reservas", description: "Lembretes de aulas e check-ins", enabled: true },
  { id: "social", icon: Users, title: "Social", description: "Atividades de amigos e rankings", enabled: false },
]

export default function NotificacoesPage() {
  const [channelSettings, setChannelSettings] = useState(initialSettings)
  const [categories, setCategories] = useState(categorySettings)
  const [masterEnabled, setMasterEnabled] = useState(true)

  const toggleChannel = (id: string) => {
    setChannelSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    )
  }

  const toggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    )
  }

  const toggleMaster = () => {
    const newValue = !masterEnabled
    setMasterEnabled(newValue)
    if (!newValue) {
      setChannelSettings((prev) => prev.map((s) => ({ ...s, enabled: false })))
      setCategories((prev) => prev.map((s) => ({ ...s, enabled: false })))
    }
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-background pb-20 lg:pb-6">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-4 p-4 max-w-4xl mx-auto">
            <Link href="/perfil" className="lg:hidden">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Notificacoes</h1>
          </div>
        </div>

        <div className="p-4 max-w-4xl mx-auto space-y-6">
          {/* Master Toggle */}
          <div className="rounded-xl bg-card border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${masterEnabled ? "bg-primary/20" : "bg-muted"}`}>
                  {masterEnabled ? (
                    <Bell className="h-5 w-5 text-primary" />
                  ) : (
                    <BellOff className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <Label htmlFor="master" className="text-base font-semibold text-foreground">
                    Todas as Notificacoes
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {masterEnabled ? "Notificacoes ativas" : "Notificacoes desativadas"}
                  </p>
                </div>
              </div>
              <Switch
                id="master"
                checked={masterEnabled}
                onCheckedChange={toggleMaster}
              />
            </div>
          </div>

          {/* Channels */}
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-foreground">Canais de Notificacao</h2>
              <p className="text-sm text-muted-foreground">Como voce quer receber notificacoes</p>
            </div>
            <div className="divide-y divide-border">
              {channelSettings.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${setting.enabled ? "bg-primary/20" : "bg-muted"}`}>
                      <setting.icon className={`h-5 w-5 ${setting.enabled ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <Label htmlFor={setting.id} className="font-medium text-foreground">
                        {setting.title}
                      </Label>
                      <p className="text-sm text-muted-foreground">{setting.description}</p>
                    </div>
                  </div>
                  <Switch
                    id={setting.id}
                    checked={setting.enabled && masterEnabled}
                    onCheckedChange={() => toggleChannel(setting.id)}
                    disabled={!masterEnabled}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-foreground">Tipos de Notificacao</h2>
              <p className="text-sm text-muted-foreground">Escolha o que voce quer receber</p>
            </div>
            <div className="divide-y divide-border">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.enabled ? "bg-primary/20" : "bg-muted"}`}>
                      <category.icon className={`h-5 w-5 ${category.enabled ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <Label htmlFor={category.id} className="font-medium text-foreground">
                        {category.title}
                      </Label>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <Switch
                    id={category.id}
                    checked={category.enabled && masterEnabled}
                    onCheckedChange={() => toggleCategory(category.id)}
                    disabled={!masterEnabled}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <p className="text-center text-xs text-muted-foreground">
            Voce pode alterar essas configuracoes a qualquer momento.
            Algumas notificacoes importantes sobre sua conta sempre serao enviadas.
          </p>
        </div>
      </div>
    </AppShell>
  )
}
