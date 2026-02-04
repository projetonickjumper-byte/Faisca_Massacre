"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermosPage() {
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
          <h1 className="text-xl font-bold">Termos de Uso</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground">Última atualização: 30 de Janeiro de 2026</p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Aceitação dos Termos</h2>
          <p className="text-muted-foreground mb-4">
            Ao acessar e usar o FitApp, você concorda com estes Termos de Uso e com nossa Política de Privacidade.
            Se você não concordar com algum destes termos, por favor, não utilize nossos serviços.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Descrição do Serviço</h2>
          <p className="text-muted-foreground mb-4">
            O FitApp é uma plataforma que conecta usuários a academias, studios e espaços fitness, oferecendo:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Busca e descoberta de academias próximas</li>
            <li>Reserva de aulas e serviços</li>
            <li>Compra de day use e planos</li>
            <li>Sistema de gamificação e recompensas</li>
            <li>Avaliações e comentários</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Cadastro e Conta</h2>
          <p className="text-muted-foreground mb-4">
            Para usar determinados recursos do FitApp, você deve criar uma conta fornecendo informações precisas e completas.
            Você é responsável por manter a confidencialidade de suas credenciais e por todas as atividades em sua conta.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Uso Aceitável</h2>
          <p className="text-muted-foreground mb-4">Você concorda em não:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Violar leis ou regulamentos aplicáveis</li>
            <li>Publicar conteúdo falso, enganoso ou ofensivo</li>
            <li>Interferir no funcionamento da plataforma</li>
            <li>Criar contas falsas ou múltiplas</li>
            <li>Usar o serviço para fins comerciais não autorizados</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Pagamentos e Reembolsos</h2>
          <p className="text-muted-foreground mb-4">
            Os pagamentos são processados de forma segura através de nossos parceiros. As políticas de cancelamento
            e reembolso variam de acordo com cada academia parceira. Consulte os termos específicos antes de realizar uma compra.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Propriedade Intelectual</h2>
          <p className="text-muted-foreground mb-4">
            Todo o conteúdo do FitApp, incluindo textos, gráficos, logos e software, é protegido por direitos autorais
            e outras leis de propriedade intelectual.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Limitação de Responsabilidade</h2>
          <p className="text-muted-foreground mb-4">
            O FitApp atua como intermediário entre usuários e academias. Não somos responsáveis pela qualidade dos
            serviços prestados pelas academias parceiras ou por quaisquer danos decorrentes do uso de suas instalações.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Alterações nos Termos</h2>
          <p className="text-muted-foreground mb-4">
            Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão
            comunicadas aos usuários por email ou através do aplicativo.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Contato</h2>
          <p className="text-muted-foreground mb-4">
            Para dúvidas sobre estes Termos de Uso, entre em contato conosco em{" "}
            <a href="mailto:contato@fitapp.com.br" className="text-primary hover:underline">
              contato@fitapp.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
