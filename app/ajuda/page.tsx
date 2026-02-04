"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, HelpCircle, MessageCircle, Mail, Phone, ChevronDown, ChevronRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AppShell } from "@/components/app-shell"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  title: string
  icon: React.ElementType
  items: FAQItem[]
}

const faqCategories: FAQCategory[] = [
  {
    title: "Conta e Perfil",
    icon: HelpCircle,
    items: [
      {
        question: "Como altero minha senha?",
        answer: "Vá até Perfil > Segurança > Alterar Senha. Digite sua senha atual e depois a nova senha duas vezes para confirmar.",
      },
      {
        question: "Como atualizo meus dados pessoais?",
        answer: "Acesse Perfil > Editar Perfil. Lá você pode alterar nome, foto, email e outras informações.",
      },
      {
        question: "Como excluo minha conta?",
        answer: "Vá até Perfil > Segurança e role até 'Zona de Perigo'. Clique em 'Excluir Conta'. Atenção: esta ação é irreversível.",
      },
    ],
  },
  {
    title: "Reservas e Check-in",
    icon: HelpCircle,
    items: [
      {
        question: "Como faco uma reserva?",
        answer: "Escolha uma academia, selecione a aula ou serviço desejado e clique em 'Reservar'. Confirme os detalhes e pronto!",
      },
      {
        question: "Como cancelo uma reserva?",
        answer: "Vá até Perfil > Minhas Reservas, encontre a reserva e clique em 'Cancelar'. Cancelamentos devem ser feitos com até 2h de antecedência.",
      },
      {
        question: "O que e Day Use?",
        answer: "Day Use permite que você use uma academia por um dia sem precisar de plano mensal. Ideal para viagens ou para conhecer novos lugares.",
      },
    ],
  },
  {
    title: "Pagamentos",
    icon: HelpCircle,
    items: [
      {
        question: "Quais formas de pagamento sao aceitas?",
        answer: "Aceitamos cartões de crédito (Visa, Mastercard, Elo), débito e PIX para pagamentos instantâneos.",
      },
      {
        question: "Como solicito reembolso?",
        answer: "Entre em contato com nosso suporte através do chat ou email. Reembolsos são processados em até 7 dias úteis.",
      },
      {
        question: "O pagamento e seguro?",
        answer: "Sim! Utilizamos criptografia SSL e não armazenamos dados sensíveis de cartão. Todos os pagamentos são processados por gateways certificados.",
      },
    ],
  },
  {
    title: "FitRank e XP",
    icon: HelpCircle,
    items: [
      {
        question: "Como ganho XP?",
        answer: "Você ganha XP fazendo check-ins, completando treinos, participando de desafios e indicando amigos.",
      },
      {
        question: "O que sao niveis?",
        answer: "Níveis representam seu progresso no app. A cada 200 XP você sobe de nível e desbloqueia novas conquistas e benefícios.",
      },
      {
        question: "Como funciona o ranking?",
        answer: "O ranking mostra os usuários mais ativos de cada academia. Os top 3 ganham badges especiais todo mês!",
      },
    ],
  },
]

export default function AjudaPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  const filteredCategories = searchQuery
    ? faqCategories.map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      })).filter((cat) => cat.items.length > 0)
    : faqCategories

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
            <h1 className="text-xl font-bold">Ajuda e FAQ</h1>
          </div>
        </div>

        <div className="p-4 max-w-4xl mx-auto space-y-6">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar nas perguntas frequentes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Contact Options */}
          <div className="grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              className="flex items-center gap-3 rounded-xl bg-card border border-border p-4 text-left transition-colors hover:bg-secondary"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Chat ao Vivo</p>
                <p className="text-xs text-muted-foreground">Resposta imediata</p>
              </div>
            </button>

            <a
              href="mailto:suporte@fitapp.com"
              className="flex items-center gap-3 rounded-xl bg-card border border-border p-4 text-left transition-colors hover:bg-secondary"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Email</p>
                <p className="text-xs text-muted-foreground">suporte@fitapp.com</p>
              </div>
            </a>

            <a
              href="tel:+5511999999999"
              className="flex items-center gap-3 rounded-xl bg-card border border-border p-4 text-left transition-colors hover:bg-secondary"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Telefone</p>
                <p className="text-xs text-muted-foreground">(11) 99999-9999</p>
              </div>
            </a>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-4">
            <h2 className="font-semibold text-foreground">Perguntas Frequentes</h2>

            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <div
                  key={category.title}
                  className="rounded-xl bg-card border border-border overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === category.title ? null : category.title
                      )
                    }
                    className="flex w-full items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                        <category.icon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground">{category.title}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 text-muted-foreground transition-transform",
                        expandedCategory === category.title && "rotate-180"
                      )}
                    />
                  </button>

                  {expandedCategory === category.title && (
                    <div className="border-t border-border">
                      {category.items.map((item, index) => (
                        <div key={index} className="border-b border-border last:border-b-0">
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedQuestion(
                                expandedQuestion === item.question ? null : item.question
                              )
                            }
                            className="flex w-full items-center justify-between p-4 text-left"
                          >
                            <span className="text-sm font-medium text-foreground pr-4">
                              {item.question}
                            </span>
                            <ChevronRight
                              className={cn(
                                "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                                expandedQuestion === item.question && "rotate-90"
                              )}
                            />
                          </button>
                          {expandedQuestion === item.question && (
                            <div className="px-4 pb-4">
                              <p className="text-sm text-muted-foreground">{item.answer}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="font-medium text-foreground mb-2">Nenhum resultado encontrado</p>
                <p className="text-sm text-muted-foreground">
                  Tente buscar por outras palavras ou entre em contato conosco
                </p>
              </div>
            )}
          </div>

          {/* External Links */}
          <div className="rounded-xl bg-card border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3">Links Úteis</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Termos de Uso</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Política de Privacidade</span>
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Central de Segurança</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
