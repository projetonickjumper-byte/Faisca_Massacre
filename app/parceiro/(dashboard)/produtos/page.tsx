"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Package,
  DollarSign,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  stock: number
  image: string
  isActive: boolean
  sales: number
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Whey Protein 900g",
    description: "Whey protein concentrado sabor chocolate",
    price: 149.90,
    originalPrice: 179.90,
    category: "suplementos",
    stock: 25,
    image: "/placeholder.svg?height=200&width=200",
    isActive: true,
    sales: 42,
  },
  {
    id: "2",
    name: "Camiseta Treino",
    description: "Camiseta dry-fit para treino",
    price: 79.90,
    category: "vestuario",
    stock: 50,
    image: "/placeholder.svg?height=200&width=200",
    isActive: true,
    sales: 28,
  },
  {
    id: "3",
    name: "Garrafa Termica 1L",
    description: "Garrafa termica de aco inox",
    price: 59.90,
    category: "acessorios",
    stock: 15,
    image: "/placeholder.svg?height=200&width=200",
    isActive: true,
    sales: 35,
  },
  {
    id: "4",
    name: "Luva de Treino",
    description: "Luva para musculacao com protecao de pulso",
    price: 49.90,
    category: "acessorios",
    stock: 0,
    image: "/placeholder.svg?height=200&width=200",
    isActive: false,
    sales: 18,
  },
]

const productCategories = [
  { id: "suplementos", label: "Suplementos" },
  { id: "vestuario", label: "Vestuario" },
  { id: "acessorios", label: "Acessorios" },
  { id: "equipamentos", label: "Equipamentos" },
  { id: "outros", label: "Outros" },
]

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [search, setSearch] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "suplementos",
    stock: "",
  })

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        originalPrice: product.originalPrice?.toString() || "",
        category: product.category,
        stock: product.stock.toString(),
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: "",
        description: "",
        price: "",
        originalPrice: "",
        category: "suplementos",
        stock: "",
      })
    }
    setIsDialogOpen(true)
  }

  const handleSave = () => {
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { 
              ...p, 
              name: formData.name,
              description: formData.description,
              price: Number(formData.price),
              originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
              category: formData.category,
              stock: Number(formData.stock),
            }
          : p
      ))
    } else {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
        category: formData.category,
        stock: Number(formData.stock),
        image: "/placeholder.svg?height=200&width=200",
        isActive: true,
        sales: 0,
      }
      setProducts([...products, newProduct])
    }
    setIsDialogOpen(false)
  }

  const toggleProductStatus = (id: string) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ))
  }

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Produtos</h1>
          <p className="text-muted-foreground">Gerencie sua loja de produtos</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome do produto</Label>
                <Input
                  id="name"
                  placeholder="Ex: Whey Protein, Camiseta..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descricao</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o produto..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preco (R$)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="originalPrice">Preco original (opcional)</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {productCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Estoque</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="bg-transparent">
                Cancelar
              </Button>
              <Button onClick={handleSave}>
                {editingProduct ? "Salvar" : "Criar Produto"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar produtos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Products Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className={`bg-card border-border ${!product.isActive ? "opacity-60" : ""}`}>
            <CardContent className="p-4">
              <div className="relative aspect-square rounded-lg bg-secondary overflow-hidden mb-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.originalPrice && product.originalPrice > product.price && (
                  <Badge className="absolute top-2 left-2 bg-primary">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </Badge>
                )}
                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Badge variant="destructive">Sem estoque</Badge>
                  </div>
                )}
              </div>

              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{product.name}</h3>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {productCategories.find(c => c.id === product.category)?.label}
                  </Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleOpenDialog(product)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleProductStatus(product.id)}>
                      {product.isActive ? (
                        <>
                          <EyeOff className="mr-2 h-4 w-4" />
                          Desativar
                        </>
                      ) : (
                        <>
                          <Eye className="mr-2 h-4 w-4" />
                          Ativar
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteProduct(product.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">
                  R$ {product.price.toFixed(2)}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    R$ {product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between text-sm border-t border-border pt-3">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Package className="h-4 w-4" />
                  <span>{product.stock} em estoque</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{product.sales} vendas</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum produto encontrado</p>
        </div>
      )}
    </div>
  )
}
