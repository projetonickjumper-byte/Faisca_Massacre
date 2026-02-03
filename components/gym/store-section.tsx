"use client"

import Image from "next/image"
import { Star, ShoppingBag, Percent } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { GymProduct } from "@/lib/types"

interface StoreSectionProps {
  products: GymProduct[]
}

function ProductCard({ product }: { product: GymProduct }) {
  const hasDiscount = product.originalPrice && product.originalPrice > product.price
  const discountPercentage = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-card">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground">
            -{discountPercentage}%
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <p className="text-xs text-muted-foreground">{product.category}</p>
        <h3 className="mt-1 font-medium text-foreground line-clamp-2 text-sm">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="text-sm font-medium text-foreground">{product.rating.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({product.totalReviews})</span>
        </div>

        <div className="mt-auto pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-foreground">
              R$ {product.price.toFixed(2).replace(".", ",")}
            </span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">
                R$ {product.originalPrice!.toFixed(2).replace(".", ",")}
              </span>
            )}
          </div>
          {product.stock < 10 && (
            <p className="mt-1 text-xs text-amber-500">
              Apenas {product.stock} em estoque
            </p>
          )}
        </div>

        <Button className="mt-3 w-full" size="sm">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </div>
    </div>
  )
}

export function StoreSection({ products }: StoreSectionProps) {
  if (products.length === 0) return null

  const categories = [...new Set(products.map((p) => p.category))]

  return (
    <section id="loja" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Loja</h2>
        </div>
        <Badge variant="secondary">
          <Percent className="mr-1 h-3 w-3" />
          10% off para membros
        </Badge>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        <Button variant="secondary" size="sm">
          Todos
        </Button>
        {categories.map((category) => (
          <Button key={category} variant="outline" size="sm">
            {category}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline">Ver todos os produtos</Button>
      </div>
    </section>
  )
}
