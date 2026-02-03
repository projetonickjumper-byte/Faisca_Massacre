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
          <p className="text-muted-foreground">Ultima atualizacao: 30 de Janeiro de 2026</p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">1. Aceitacao dos Termos</h2>
          <p className="text-muted-foreground mb-4">
            Ao acessar e usar o FitApp, voce concorda com estes Termos de Uso e com nossa Politica de Privacidade.
            Se voce nao concordar com algum destes termos, por favor, nao utilize nossos servicos.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">2. Descricao do Servico</h2>
          <p className="text-muted-foreground mb-4">
            O FitApp e uma plataforma que conecta usuarios a academias, studios e espacos fitness, oferecendo:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Busca e descoberta de academias proximas</li>
            <li>Reserva de aulas e servicos</li>
            <li>Compra de day use e planos</li>
            <li>Sistema de gamificacao e recompensas</li>
            <li>Avaliacoes e comentarios</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">3. Cadastro e Conta</h2>
          <p className="text-muted-foreground mb-4">
            Para usar determinados recursos do FitApp, voce deve criar uma conta fornecendo informacoes precisas e completas.
            Voce e responsavel por manter a confidencialidade de suas credenciais e por todas as atividades em sua conta.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">4. Uso Aceitavel</h2>
          <p className="text-muted-foreground mb-4">Voce concorda em nao:</p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
            <li>Violar leis ou regulamentos aplicaveis</li>
            <li>Publicar conteudo falso, enganoso ou ofensivo</li>
            <li>Interferir no funcionamento da plataforma</li>
            <li>Criar contas falsas ou multiplas</li>
            <li>Usar o servico para fins comerciais nao autorizados</li>
          </ul>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">5. Pagamentos e Reembolsos</h2>
          <p className="text-muted-foreground mb-4">
            Os pagamentos sao processados de forma segura atraves de nossos parceiros. As politicas de cancelamento
            e reembolso variam de acordo com cada academia parceira. Consulte os termos especificos antes de realizar uma compra.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">6. Propriedade Intelectual</h2>
          <p className="text-muted-foreground mb-4">
            Todo o conteudo do FitApp, incluindo textos, graficos, logos e software, e protegido por direitos autorais
            e outras leis de propriedade intelectual.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">7. Limitacao de Responsabilidade</h2>
          <p className="text-muted-foreground mb-4">
            O FitApp atua como intermediario entre usuarios e academias. Nao somos responsaveis pela qualidade dos
            servicos prestados pelas academias parceiras ou por quaisquer danos decorrentes do uso de suas instalacoes.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">8. Alteracoes nos Termos</h2>
          <p className="text-muted-foreground mb-4">
            Reservamo-nos o direito de modificar estes termos a qualquer momento. Alteracoes significativas serao
            comunicadas aos usuarios por email ou atraves do aplicativo.
          </p>

          <h2 className="text-xl font-semibold text-foreground mt-8 mb-4">9. Contato</h2>
          <p className="text-muted-foreground mb-4">
            Para duvidas sobre estes Termos de Uso, entre em contato conosco em{" "}
            <a href="mailto:contato@fitapp.com.br" className="text-primary hover:underline">
              contato@fitapp.com.br
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
