"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Package, Truck, Mail, Download, Share2, Home } from "lucide-react"

interface OrderSuccessProps {
  orderId: string
  cartItems: Array<{
    id: string
    name: string
    price: number
    image: string
    quantity: number
  }>
  onBackToHome: () => void
}

export default function OrderSuccess({ orderId, cartItems, onBackToHome }: OrderSuccessProps) {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 15.99
  const tax = totalPrice * 0.08
  const finalTotal = totalPrice + shipping + tax

  const estimatedDelivery = new Date()
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7)

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header de Sucesso */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-green-600 mb-2">Pedido Confirmado!</h1>
        <p className="text-muted-foreground">Obrigado pela sua compra. Seu pedido foi processado com sucesso.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Detalhes do Pedido */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informações do Pedido */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Detalhes do Pedido
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Número do Pedido</p>
                  <p className="font-mono font-bold">{orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Data do Pedido</p>
                  <p className="font-medium">{new Date().toLocaleDateString("pt-BR")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className="bg-green-100 text-green-800">Confirmado</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Entrega Estimada</p>
                  <p className="font-medium">{estimatedDelivery.toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Itens Comprados */}
          <Card>
            <CardHeader>
              <CardTitle>Itens Comprados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                  </div>
                  <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Impostos</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Pago</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Próximos Passos */}
          <Card>
            <CardHeader>
              <CardTitle>Próximos Passos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Confirmação por E-mail</h4>
                    <p className="text-sm text-muted-foreground">
                      Você receberá um e-mail de confirmação com todos os detalhes do pedido.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Package className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Preparação do Pedido</h4>
                    <p className="text-sm text-muted-foreground">
                      Seu pedido será preparado e embalado em até 2 dias úteis.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Envio e Entrega</h4>
                    <p className="text-sm text-muted-foreground">
                      Você receberá o código de rastreamento para acompanhar a entrega.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-transparent" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Baixar Comprovante
              </Button>

              <Button className="w-full bg-transparent" variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Reenviar E-mail
              </Button>

              <Button className="w-full bg-transparent" variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Compartilhar Pedido
              </Button>

              <Button className="w-full" onClick={onBackToHome}>
                <Home className="mr-2 h-4 w-4" />
                Voltar ao Início
              </Button>
            </CardContent>
          </Card>

          {/* Suporte */}
          <Card>
            <CardHeader>
              <CardTitle>Precisa de Ajuda?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Nossa equipe está pronta para ajudar com qualquer dúvida sobre seu pedido.
              </p>

              <div className="space-y-2 text-sm">
                <p>
                  <strong>WhatsApp:</strong> (11) 99999-9999
                </p>
                <p>
                  <strong>E-mail:</strong> suporte@virtualwardrobe.com
                </p>
                <p>
                  <strong>Horário:</strong> Seg-Sex, 9h às 18h
                </p>
              </div>

              <Button className="w-full bg-transparent" variant="outline">
                Falar com Suporte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
