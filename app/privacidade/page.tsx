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
          <p className="text-muted-foreground">Ultima atualizacao: 30 de Janeiro de 2026</p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Introducao</h2>
          <p className="text-muted-foreground mb-4">
            A sua privacidade e importante para nos. Esta Politica de Privacidade explica como o FitApp coleta,
            usa, divulga e protege suas informacoes pessoais quando voce usa nosso aplicativo e servicos.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Informacoes que Coletamos</h2>
          <p className="text-muted-foreground mb-4">Coletamos os seguintes tipos de informacoes:</p>
          
          <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.1 Informacoes Fornecidas por Voce</h3>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Nome completo e email</li>
            <li>Numero de telefone</li>
            <li>Data de nascimento</li>
            <li>Foto de perfil</li>
            <li>Informacoes de pagamento</li>
            <li>Preferencias de treino e objetivos fitness</li>
          </ul>

          <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2.2 Informacoes Coletadas Automaticamente</h3>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Localizacao geografica (com sua permissao)</li>
            <li>Dados de uso do aplicativo</li>
            <li>Informacoes do dispositivo</li>
            <li>Cookies e tecnologias similares</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Como Usamos suas Informacoes</h2>
          <p className="text-muted-foreground mb-4">Utilizamos suas informacoes para:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Fornecer e melhorar nossos servicos</li>
            <li>Personalizar sua experiencia</li>
            <li>Processar reservas e pagamentos</li>
            <li>Enviar comunicacoes importantes</li>
            <li>Recomendar academias e aulas relevantes</li>
            <li>Garantir seguranca e prevenir fraudes</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Compartilhamento de Informacoes</h2>
          <p className="text-muted-foreground mb-4">Podemos compartilhar suas informacoes com:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Academias parceiras (para processar reservas)</li>
            <li>Processadores de pagamento</li>
            <li>Prestadores de servicos terceirizados</li>
            <li>Autoridades legais (quando exigido por lei)</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Seguranca dos Dados</h2>
          <p className="text-muted-foreground mb-4">
            Implementamos medidas de seguranca tecnicas e organizacionais para proteger suas informacoes,
            incluindo criptografia, controle de acesso e monitoramento de seguranca.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Seus Direitos</h2>
          <p className="text-muted-foreground mb-4">De acordo com a LGPD, voce tem direito a:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Acessar seus dados pessoais</li>
            <li>Corrigir dados incompletos ou desatualizados</li>
            <li>Solicitar a exclusao de seus dados</li>
            <li>Revogar consentimento</li>
            <li>Solicitar portabilidade dos dados</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Retencao de Dados</h2>
          <p className="text-muted-foreground mb-4">
            Mantemos suas informacoes pelo tempo necessario para fornecer nossos servicos ou conforme
            exigido por lei. Apos a exclusao da conta, seus dados serao removidos em ate 30 dias.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Menores de Idade</h2>
          <p className="text-muted-foreground mb-4">
            O FitApp nao se destina a menores de 18 anos. Nao coletamos intencionalmente informacoes
            de menores sem consentimento dos responsaveis legais.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Alteracoes nesta Politica</h2>
          <p className="text-muted-foreground mb-4">
            Podemos atualizar esta Politica periodicamente. Notificaremos voce sobre mudancas significativas
            por email ou atraves do aplicativo.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">10. Contato</h2>
          <p className="text-muted-foreground mb-4">
            Para exercer seus direitos ou esclarecer duvidas sobre esta politica, entre em contato com
            nosso Encarregado de Protecao de Dados em{" "}
            <a href="mailto:privacidade@fitapp.com.br" className="text-primary hover:underline">
              privacidade@fitapp.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
