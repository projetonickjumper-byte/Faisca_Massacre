"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Settings,
  Bell,
  Mail,
  Shield,
  Database,
  Save,
  RefreshCw,
} from "lucide-react"

export default function ConfiguracoesPage() {
  const [settings, setSettings] = useState({
    emailNotificacoes: true,
    pushNotificacoes: false,
    notificacaoNovaCadastro: true,
    notificacaoPagamento: true,
    manutencao: false,
    backupAutomatico: true,
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    // Simular salvamento
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do painel administrativo
        </p>
      </div>

      {/* Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notificações
          </CardTitle>
          <CardDescription>Configure como você recebe alertas e notificações</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações por Email</Label>
              <p className="text-sm text-muted-foreground">Receber alertas importantes por email</p>
            </div>
            <Switch
              checked={settings.emailNotificacoes}
              onCheckedChange={(checked) => setSettings({ ...settings, emailNotificacoes: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificações Push</Label>
              <p className="text-sm text-muted-foreground">Receber notificações no navegador</p>
            </div>
            <Switch
              checked={settings.pushNotificacoes}
              onCheckedChange={(checked) => setSettings({ ...settings, pushNotificacoes: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Novo Cadastro de Empresa</Label>
              <p className="text-sm text-muted-foreground">Ser notificado quando uma nova empresa se cadastrar</p>
            </div>
            <Switch
              checked={settings.notificacaoNovaCadastro}
              onCheckedChange={(checked) => setSettings({ ...settings, notificacaoNovaCadastro: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Alertas de Pagamento</Label>
              <p className="text-sm text-muted-foreground">Receber alertas sobre pagamentos atrasados</p>
            </div>
            <Switch
              checked={settings.notificacaoPagamento}
              onCheckedChange={(checked) => setSettings({ ...settings, notificacaoPagamento: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Email */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Email de Contato
          </CardTitle>
          <CardDescription>Email usado para notificações e contato</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email-admin">Email do Administrador</Label>
            <Input id="email-admin" type="email" defaultValue="admin@mail.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email-suporte">Email de Suporte</Label>
            <Input id="email-suporte" type="email" defaultValue="suporte@fitapp.com.br" />
          </div>
        </CardContent>
      </Card>

      {/* Segurança */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Segurança
          </CardTitle>
          <CardDescription>Configurações de segurança da plataforma</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="senha-atual">Senha Atual</Label>
            <Input id="senha-atual" type="password" placeholder="••••••••" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="nova-senha">Nova Senha</Label>
            <Input id="nova-senha" type="password" placeholder="••••••••" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmar-senha">Confirmar Nova Senha</Label>
            <Input id="confirmar-senha" type="password" placeholder="••••••••" />
          </div>
          <Button variant="outline">Alterar Senha</Button>
        </CardContent>
      </Card>

      {/* Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5" />
            Sistema
          </CardTitle>
          <CardDescription>Configurações do sistema e manutenção</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Modo Manutenção</Label>
              <p className="text-sm text-muted-foreground">Ativar modo de manutenção para o site</p>
            </div>
            <Switch
              checked={settings.manutencao}
              onCheckedChange={(checked) => setSettings({ ...settings, manutencao: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Backup Automático</Label>
              <p className="text-sm text-muted-foreground">Realizar backup diário dos dados</p>
            </div>
            <Switch
              checked={settings.backupAutomatico}
              onCheckedChange={(checked) => setSettings({ ...settings, backupAutomatico: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center gap-4">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Limpar Cache
            </Button>
            <Button variant="outline">
              <Database className="w-4 h-4 mr-2" />
              Backup Manual
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Salvar Configurações
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
