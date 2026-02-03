"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Moon, Sun, Monitor, Globe, Bell, Shield, Eye, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AppShell } from "@/components/app-shell"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    checkin: true,
    reservas: true,
    promocoes: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "friends",
    shareActivity: true,
    approximateLocation: true,
  })

  const [preferences, setPreferences] = useState({
    theme: "system",
    language: "pt-BR",
    units: "metric",
  })

  return (
    <AppShell>
      <div className="min-h-screen bg-background pb-20 lg:pb-8">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
          <div className="mx-auto max-w-4xl flex h-16 items-center gap-4 px-4">
            <Link
              href="/perfil"
              className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary transition-colors lg:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-lg font-semibold text-foreground">Configuracoes</h1>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-primary" />
                  Notificacoes
                </CardTitle>
                <CardDescription>
                  Escolha como deseja receber notificacoes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="push" className="flex flex-col gap-1">
                    <span>Push</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      Notificacoes no celular
                    </span>
                  </Label>
                  <Switch
                    id="push"
                    checked={notifications.push}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, push: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="email" className="flex flex-col gap-1">
                    <span>E-mail</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      Receber por e-mail
                    </span>
                  </Label>
                  <Switch
                    id="email"
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, email: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sms" className="flex flex-col gap-1">
                    <span>SMS</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      Receber por SMS
                    </span>
                  </Label>
                  <Switch
                    id="sms"
                    checked={notifications.sms}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, sms: checked }))
                    }
                  />
                </div>

                <div className="border-t border-border pt-4 space-y-4">
                  <p className="text-sm font-medium text-foreground">Categorias</p>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="checkin">Check-ins e treinos</Label>
                    <Switch
                      id="checkin"
                      checked={notifications.checkin}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, checkin: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="reservas">Reservas e aulas</Label>
                    <Switch
                      id="reservas"
                      checked={notifications.reservas}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, reservas: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label htmlFor="promocoes">Promocoes e ofertas</Label>
                    <Switch
                      id="promocoes"
                      checked={notifications.promocoes}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, promocoes: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Privacidade
                </CardTitle>
                <CardDescription>
                  Controle quem pode ver suas informacoes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="visibility" className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span>Visibilidade do perfil</span>
                  </Label>
                  <Select
                    value={privacy.profileVisibility}
                    onValueChange={(value) =>
                      setPrivacy((prev) => ({ ...prev, profileVisibility: value }))
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Publico</SelectItem>
                      <SelectItem value="friends">Amigos</SelectItem>
                      <SelectItem value="private">Privado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="shareActivity" className="flex flex-col gap-1">
                    <span>Compartilhar atividade</span>
                    <span className="text-xs text-muted-foreground font-normal">
                      Mostrar treinos no feed
                    </span>
                  </Label>
                  <Switch
                    id="shareActivity"
                    checked={privacy.shareActivity}
                    onCheckedChange={(checked) =>
                      setPrivacy((prev) => ({ ...prev, shareActivity: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>Localizacao aproximada</span>
                  </Label>
                  <Switch
                    id="location"
                    checked={privacy.approximateLocation}
                    onCheckedChange={(checked) =>
                      setPrivacy((prev) => ({ ...prev, approximateLocation: checked }))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preferences */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  Preferencias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-2">
                    <Label className="flex items-center gap-2">
                      {preferences.theme === "dark" ? (
                        <Moon className="h-4 w-4 text-muted-foreground" />
                      ) : preferences.theme === "light" ? (
                        <Sun className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span>Tema</span>
                    </Label>
                    <Select
                      value={preferences.theme}
                      onValueChange={(value) =>
                        setPreferences((prev) => ({ ...prev, theme: value }))
                      }
                    >
                      <SelectTrigger className="w-32 sm:w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="system">Sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-2">
                    <Label>Idioma</Label>
                    <Select
                      value={preferences.language}
                      onValueChange={(value) =>
                        setPreferences((prev) => ({ ...prev, language: value }))
                      }
                    >
                      <SelectTrigger className="w-32 sm:w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Portugues</SelectItem>
                        <SelectItem value="en-US">English</SelectItem>
                        <SelectItem value="es">Espanol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-2">
                    <Label>Unidades</Label>
                    <Select
                      value={preferences.units}
                      onValueChange={(value) =>
                        setPreferences((prev) => ({ ...prev, units: value }))
                      }
                    >
                      <SelectTrigger className="w-32 sm:w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Metrico (kg, km)</SelectItem>
                        <SelectItem value="imperial">Imperial (lb, mi)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="lg:col-span-2">
              <Button className="w-full lg:w-auto">Salvar Alteracoes</Button>
            </div>
          </div>
        </main>
      </div>
    </AppShell>
  )
}
