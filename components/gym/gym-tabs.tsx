"use client"

import { cn } from "@/lib/utils"

const tabs = [
  { id: "planos", label: "Planos" },
  { id: "avaliacoes", label: "Avaliacoes" },
  { id: "sobre", label: "Sobre" },
  { id: "fitrank", label: "FitRank" },
  { id: "loja", label: "Loja" },
]

interface GymTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function GymTabs({ activeTab, onTabChange }: GymTabsProps) {
  const handleClick = (tabId: string) => {
    onTabChange(tabId)
    const element = document.getElementById(tabId)
    if (element) {
      const offset = 140
      const top = element.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <div className="sticky top-16 z-40 -mx-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="flex overflow-x-auto scrollbar-hide px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleClick(tab.id)}
            className={cn(
              "relative shrink-0 px-4 py-3 text-sm font-medium transition-colors",
              activeTab === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
