"use client"

import { useState, useRef, useEffect } from "react"
import { MapPin, Search, X, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const brazilianCities = [
  { city: "Sao Paulo", state: "SP" },
  { city: "Rio de Janeiro", state: "RJ" },
  { city: "Belo Horizonte", state: "MG" },
  { city: "Salvador", state: "BA" },
  { city: "Brasilia", state: "DF" },
  { city: "Fortaleza", state: "CE" },
  { city: "Curitiba", state: "PR" },
  { city: "Recife", state: "PE" },
  { city: "Porto Alegre", state: "RS" },
  { city: "Manaus", state: "AM" },
  { city: "Goiania", state: "GO" },
  { city: "Belem", state: "PA" },
  { city: "Guarulhos", state: "SP" },
  { city: "Campinas", state: "SP" },
  { city: "Sao Bernardo do Campo", state: "SP" },
  { city: "Santo Andre", state: "SP" },
  { city: "Osasco", state: "SP" },
  { city: "Santos", state: "SP" },
  { city: "Sao Jose dos Campos", state: "SP" },
  { city: "Ribeirao Preto", state: "SP" },
  { city: "Sorocaba", state: "SP" },
  { city: "Niteroi", state: "RJ" },
  { city: "Nova Iguacu", state: "RJ" },
  { city: "Duque de Caxias", state: "RJ" },
  { city: "Florianopolis", state: "SC" },
  { city: "Joinville", state: "SC" },
  { city: "Uberlandia", state: "MG" },
  { city: "Contagem", state: "MG" },
  { city: "Natal", state: "RN" },
  { city: "Joao Pessoa", state: "PB" },
  { city: "Teresina", state: "PI" },
  { city: "Sao Luis", state: "MA" },
  { city: "Maceio", state: "AL" },
  { city: "Aracaju", state: "SE" },
  { city: "Campo Grande", state: "MS" },
  { city: "Cuiaba", state: "MT" },
  { city: "Vitoria", state: "ES" },
  { city: "Londrina", state: "PR" },
  { city: "Maringa", state: "PR" },
]

export function CitySearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedCity, setSelectedCity] = useState({ city: "Sao Paulo", state: "SP" })
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const filteredCities = brazilianCities.filter(
    (c) =>
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.state.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearch("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSelect = (city: typeof brazilianCities[0]) => {
    setSelectedCity(city)
    setIsOpen(false)
    setSearch("")
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm text-secondary-foreground transition-colors hover:bg-secondary/80"
      >
        <MapPin className="h-4 w-4 text-primary" />
        <span className="max-w-[120px] truncate sm:max-w-none">
          {selectedCity.city}, {selectedCity.state}
        </span>
        <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-lg sm:left-0 sm:translate-x-0">
          {/* Search Input */}
          <div className="border-b border-border p-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar cidade..."
                className="w-full rounded-lg bg-secondary py-2 pl-9 pr-8 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-muted"
                >
                  <X className="h-3 w-3 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          {/* City List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <button
                  key={`${city.city}-${city.state}`}
                  type="button"
                  onClick={() => handleSelect(city)}
                  className={cn(
                    "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-secondary",
                    selectedCity.city === city.city &&
                      selectedCity.state === city.state &&
                      "bg-primary/10"
                  )}
                >
                  <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {city.city}
                    </p>
                    <p className="text-xs text-muted-foreground">{city.state}</p>
                  </div>
                  {selectedCity.city === city.city &&
                    selectedCity.state === city.state && (
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    )}
                </button>
              ))
            ) : (
              <div className="px-3 py-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Nenhuma cidade encontrada
                </p>
              </div>
            )}
          </div>

          {/* Use Location */}
          <div className="border-t border-border p-2">
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
            >
              <MapPin className="h-4 w-4" />
              Usar minha localizacao
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
