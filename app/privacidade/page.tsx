"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-4 p-4 max-w-3xl mx-auto">
          <Link href="/cadastro">
            <Button variant="ghost" size="icon" className="shrink-0">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Politica de Privacidade</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground">Última atualização: 30 de Janeiro de 2026</p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Introdução</h2>
          <p className="text-muted-foreground mb-4">
            A sua privacidade é importante para nós. Esta Política de Privacidade explica como o FitApp coleta,
            usa, divulga e protege suas informações pessoais quando você usa nosso aplicativo e serviços.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Informações que Coletamos</h2>
          <p className="text-muted-foreground mb-4">Coletamos os seguintes tipos de informações:</p>
          
          <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.1 Informações Fornecidas por Você</h3>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Nome completo e email</li>
            <li>Número de telefone</li>
            <li>Data de nascimento</li>
            <li>Foto de perfil</li>
            <li>Informações de pagamento</li>
            <li>Preferências de treino e objetivos fitness</li>
          </ul>

          <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.2 Informações Coletadas Automaticamente</h3>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Localização geográfica (com sua permissão)</li>
            <li>Dados de uso do aplicativo</li>
            <li>Informações do dispositivo</li>
            <li>Cookies e tecnologias similares</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Como Usamos suas Informações</h2>
          <p className="text-muted-foreground mb-4">Utilizamos suas informações para:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Fornecer e melhorar nossos serviços</li>
            <li>Personalizar sua experiência</li>
            <li>Processar reservas e pagamentos</li>
            <li>Enviar comunicações importantes</li>
            <li>Recomendar academias e aulas relevantes</li>
            <li>Garantir segurança e prevenir fraudes</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Compartilhamento de Informações</h2>
          <p className="text-muted-foreground mb-4">Podemos compartilhar suas informações com:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Academias parceiras (para processar reservas)</li>
            <li>Processadores de pagamento</li>
            <li>Prestadores de serviços terceirizados</li>
            <li>Autoridades legais (quando exigido por lei)</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Segurança dos Dados</h2>
          <p className="text-muted-foreground mb-4">
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações,
            incluindo criptografia, controle de acesso e monitoramento de segurança.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Seus Direitos</h2>
          <p className="text-muted-foreground mb-4">De acordo com a LGPD, você tem direito a:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incompletos ou desatualizados</li>
            <li>Solicitar a exclusão de seus dados</li>
            <li>Revogar consentimento</li>
            <li>Solicitar portabilidade dos dados</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Retenção de Dados</h2>
          <p className="text-muted-foreground mb-4">
            Mantemos suas informações pelo tempo necessário para fornecer nossos serviços ou conforme
            exigido por lei. Após a exclusão da conta, seus dados serão removidos em até 30 dias.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Menores de Idade</h2>
          <p className="text-muted-foreground mb-4">
            O FitApp não se destina a menores de 18 anos. Não coletamos intencionalmente informações
            de menores sem consentimento dos responsáveis legais.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Alterações nesta Política</h2>
          <p className="text-muted-foreground mb-4">
            Podemos atualizar esta Política periodicamente. Notificaremos você sobre mudanças significativas
            por email ou através do aplicativo.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">10. Contato</h2>
          <p className="text-muted-foreground mb-4">
            Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato com
            nosso Encarregado de Proteção de Dados em{" "}
            <a href="mailto:privacidade@fitapp.com.br" className="text-primary hover:underline">
              privacidade@fitapp.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
