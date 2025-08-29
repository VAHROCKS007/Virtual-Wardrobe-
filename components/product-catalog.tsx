"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCartIcon, Search, Heart, Star, Filter, Eye } from "lucide-react"
import ShoppingCart from "./shopping-cart"
import CheckoutForm from "./checkout-form"
import OrderSuccess from "./order-success"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  category: "casual" | "formal" | "sporty" | "accessories"
  image: string
  rating: number
  reviews: number
  isNew?: boolean
  isSale?: boolean
}

const products: Product[] = [
  {
    id: "1",
    name: "Classic Denim Jacket",
    price: 89.99,
    originalPrice: 119.99,
    category: "casual",
    image: "/denim-jacket-fashion.png",
    rating: 4.5,
    reviews: 128,
    isSale: true,
  },
  {
    id: "2",
    name: "Business Suit Set",
    price: 299.99,
    category: "formal",
    image: "/business-suit-formal-wear.png",
    rating: 4.8,
    reviews: 89,
    isNew: true,
  },
  {
    id: "3",
    name: "Athletic Running Shorts",
    price: 34.99,
    category: "sporty",
    image: "/athletic-running-shorts-sportswear.png",
    rating: 4.3,
    reviews: 156,
  },
  {
    id: "4",
    name: "Elegant Evening Dress",
    price: 189.99,
    category: "formal",
    image: "/elegant-evening-dress-formal.png",
    rating: 4.7,
    reviews: 73,
    isNew: true,
  },
  {
    id: "5",
    name: "Casual Cotton T-Shirt",
    price: 24.99,
    originalPrice: 34.99,
    category: "casual",
    image: "/casual-cotton-t-shirt.png",
    rating: 4.2,
    reviews: 234,
    isSale: true,
  },
  {
  id:"6",
  name:"Calça de Moletom",
  price:110.90,
  originalPrice:150.90,
  category:"Casual",
  image:"/Calça-de-Moletom.png"
  rating:5.5,
  reviews:250,
  isSale:true,

    id: "7",
    name: "Designer Handbag",
    price: 159.99,
    category: "accessories",
    image: "/luxury-designer-handbag.png",
    rating: 4.4,
    reviews: 67,
  },
  {
    id: "8",
    name: "Formal Blazer",
    price: 129.99,
    category: "formal",
    image: "/formal-blazer-business.png",
    rating: 4.5,
    reviews: 91,
  },
]

export default function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [cartItems, setCartItems] = useState<
    Array<{
      id: string
      name: string
      price: number
      image: string
      quantity: number
    }>
  >([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [checkoutStep, setCheckoutStep] = useState<"catalog" | "checkout" | "success">("catalog")
  const [orderId, setOrderId] = useState<string>("")

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId)
    if (!product) return

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === productId)
      if (existingItem) {
        return prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          },
        ]
      }
    })
  }

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id)
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const isInCart = (productId: string) => {
    return cartItems.some((item) => item.id === productId)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "fill-primary text-primary"
            : i < rating
              ? "fill-primary/50 text-primary"
              : "text-muted-foreground"
        }`}
      />
    ))
  }

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId)
      } else {
        return [...prev, productId]
      }
    })
  }

  const handleCheckout = () => {
    setCheckoutStep("checkout")
  }

  const handleOrderComplete = (newOrderId: string) => {
    setOrderId(newOrderId)
    setCheckoutStep("success")
    setCartItems([]) // Clear cart after successful order
  }

  const handleBackToHome = () => {
    setCheckoutStep("catalog")
    setOrderId("")
  }

  const handleBackToCart = () => {
    setCheckoutStep("catalog")
  }

  if (checkoutStep === "checkout") {
    return <CheckoutForm cartItems={cartItems} onBack={handleBackToCart} onOrderComplete={handleOrderComplete} />
  }

  if (checkoutStep === "success") {
    return <OrderSuccess orderId={orderId} cartItems={cartItems} onBackToHome={handleBackToHome} />
  }

  return (
    <div className="space-y-8">
      {/* Header and Search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="font-playfair font-bold text-3xl lg:text-4xl mb-2">Virtual Clothing Catalog</h2>
          <p className="text-muted-foreground">Try on any item with your 3D avatar before you buy</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <ShoppingCart
            cartItems={cartItems}
            onUpdateQuantity={updateCartQuantity}
            onRemoveItem={removeFromCart}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="casual">Casual</TabsTrigger>
          <TabsTrigger value="formal">Formal</TabsTrigger>
          <TabsTrigger value="sporty">Sporty</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-8">
          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <CardHeader className="p-0 relative overflow-hidden">
                  <div className="aspect-[4/5] bg-muted relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
                      {product.isSale && <Badge variant="destructive">Sale</Badge>}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart
                          className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                      <Button size="icon" variant="secondary" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Try On Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button className="bg-primary hover:bg-primary/90">
                        <Eye className="mr-2 h-4 w-4" />
                        Try On Avatar
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2 line-clamp-1">{product.name}</CardTitle>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" onClick={() => addToCart(product.id)} disabled={isInCart(product.id)}>
                    <ShoppingCartIcon className="mr-2 h-4 w-4" />
                    {isInCart(product.id) ? "Adicionado ao Carrinho" : "Adicionar ao Carrinho"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
