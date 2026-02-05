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
    <div className="sticky top-0 z-40 -mx-4 bg-zinc-950 border-b border-zinc-800 shadow-lg shadow-black/20">
      <div className="flex overflow-x-auto scrollbar-hide px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleClick(tab.id)}
            className={cn(
              "relative shrink-0 px-4 py-3.5 text-sm font-medium transition-all duration-200",
              activeTab === tab.id
                ? "text-orange-500"
                : "text-zinc-400 hover:text-zinc-200"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
