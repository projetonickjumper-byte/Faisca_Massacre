"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Shield, Key, Smartphone, Eye, EyeOff, LogOut, Monitor, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { AppShell } from "@/components/app-shell"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const activeSessions = [
  { id: "1", device: "iPhone 14 Pro", location: "Sao Paulo, SP", lastActive: "Agora", current: true },
  { id: "2", device: "MacBook Pro", location: "Sao Paulo, SP", lastActive: "Há 2 horas", current: false },
  { id: "3", device: "Windows PC", location: "Rio de Janeiro, RJ", lastActive: "Há 3 dias", current: false },
]

export default function SegurancaPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(true)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)
  const [sessions, setSessions] = useState(activeSessions)

  const handleLogoutSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
  }

  const handleLogoutAllSessions = () => {
    setSessions((prev) => prev.filter((s) => s.current))
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
            <h1 className="text-xl font-bold">Seguranca</h1>
          </div>
        </div>

        <div className="p-4 max-w-4xl mx-auto space-y-6">
          {/* Password Section */}
          <div className="rounded-xl bg-card border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <Key className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Senha</p>
                  <p className="text-sm text-muted-foreground">Ultima alteracao há 30 dias</p>
                </div>
              </div>
              <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Alterar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Alterar Senha</DialogTitle>
                    <DialogDescription>
                      Digite sua senha atual e a nova senha
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Senha Atual</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Digite sua senha atual"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Digite sua nova senha"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirme sua nova senha"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setPasswordDialogOpen(false)} className="bg-transparent">
                      Cancelar
                    </Button>
                    <Button onClick={() => setPasswordDialogOpen(false)}>
                      Salvar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Security Options */}
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold text-foreground">Opcoes de Seguranca</h2>
            </div>
            <div className="divide-y divide-border">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${twoFactorEnabled ? "bg-primary/20" : "bg-muted"}`}>
                    <Shield className={`h-5 w-5 ${twoFactorEnabled ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <Label htmlFor="2fa" className="font-medium text-foreground">
                      Autenticacao em 2 Fatores
                    </Label>
                    <p className="text-sm text-muted-foreground">Adicione uma camada extra de seguranca</p>
                  </div>
                </div>
                <Switch
                  id="2fa"
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>

              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${biometricEnabled ? "bg-primary/20" : "bg-muted"}`}>
                    <Smartphone className={`h-5 w-5 ${biometricEnabled ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <Label htmlFor="biometric" className="font-medium text-foreground">
                      Login Biometrico
                    </Label>
                    <p className="text-sm text-muted-foreground">Use sua digital ou Face ID</p>
                  </div>
                </div>
                <Switch
                  id="biometric"
                  checked={biometricEnabled}
                  onCheckedChange={setBiometricEnabled}
                />
              </div>
            </div>
          </div>

          {/* Active Sessions */}
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-foreground">Sessoes Ativas</h2>
                <p className="text-sm text-muted-foreground">{sessions.length} dispositivo(s) conectado(s)</p>
              </div>
              {sessions.length > 1 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-transparent text-destructive hover:text-destructive">
                      Encerrar Todas
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Encerrar Todas as Sessoes</AlertDialogTitle>
                      <AlertDialogDescription>
                        Isso ira desconectar todos os outros dispositivos. Voce precisara fazer login novamente neles.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogoutAllSessions}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Encerrar Todas
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
            <div className="divide-y divide-border">
              {sessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <Monitor className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{session.device}</p>
                        {session.current && (
                          <span className="text-xs text-primary font-medium">Este dispositivo</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {session.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {session.lastActive}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!session.current && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLogoutSession(session.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-xl border border-destructive/50 p-4">
            <h2 className="font-semibold text-destructive mb-2">Zona de Perigo</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Acoes irreversiveis para sua conta
            </p>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="bg-transparent border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                  Excluir Conta
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Excluir Conta</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acao e permanente e nao pode ser desfeita. Todos os seus dados, historico, conquistas e XP serao perdidos.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Excluir Conta Permanentemente
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
