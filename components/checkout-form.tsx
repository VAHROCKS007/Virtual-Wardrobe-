"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Building2, QrCode, Wallet, Shield, Lock, CheckCircle, ArrowLeft } from "lucide-react"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CheckoutFormProps {
  cartItems: CartItem[]
  onBack: () => void
  onOrderComplete: (orderId: string) => void
}

export default function CheckoutForm({ cartItems, onBack, onOrderComplete }: CheckoutFormProps) {
  const [selectedPayment, setSelectedPayment] = useState("credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    // Dados pessoais
    fullName: "",
    email: "",
    phone: "",
    // Endereço
    address: "",
    city: "",
    state: "",
    zipCode: "",
    // Cartão de crédito
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    // PIX
    pixKey: "",
    // PayPal
    paypalEmail: "",
  })

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 15.99
  const tax = totalPrice * 0.08
  const finalTotal = totalPrice + shipping + tax

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simular processamento de pagamento
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const orderId = `VW-${Date.now()}`
    onOrderComplete(orderId)
    setIsProcessing(false)
  }

  const paymentMethods = [
    {
      id: "credit-card",
      name: "Cartão de Crédito",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
    },
    {
      id: "pix",
      name: "PIX",
      icon: QrCode,
      description: "Pagamento instantâneo",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: Wallet,
      description: "Pague com sua conta PayPal",
    },
    {
      id: "boleto",
      name: "Boleto Bancário",
      icon: Building2,
      description: "Vencimento em 3 dias úteis",
    },
    {
      id: "apple-pay",
      name: "Apple Pay",
      icon: Smartphone,
      description: "Pagamento rápido e seguro",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Finalizar Compra</h1>
        <div className="flex items-center gap-2 ml-auto">
          <Shield className="h-4 w-4 text-green-600" />
          <span className="text-sm text-green-600">Compra 100% Segura</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Formulário de Checkout */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dados Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="seu@email.com"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </CardContent>
          </Card>

          {/* Endereço de Entrega */}
          <Card>
            <CardHeader>
              <CardTitle>Endereço de Entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Rua, número, complemento"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Sua cidade"
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="SP"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">CEP</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    placeholder="00000-000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formas de Pagamento */}
          <Card>
            <CardHeader>
              <CardTitle>Forma de Pagamento</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedPayment} onValueChange={setSelectedPayment}>
                <TabsList className="grid grid-cols-2 lg:grid-cols-5 mb-6">
                  {paymentMethods.map((method) => (
                    <TabsTrigger key={method.id} value={method.id} className="flex flex-col gap-1 h-16">
                      <method.icon className="h-4 w-4" />
                      <span className="text-xs">{method.name}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Cartão de Crédito */}
                <TabsContent value="credit-card" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input
                        id="cardNumber"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Nome no Cartão</Label>
                      <Input
                        id="cardName"
                        value={formData.cardName}
                        onChange={(e) => handleInputChange("cardName", e.target.value)}
                        placeholder="Nome como no cartão"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="expiryDate">Validade</Label>
                        <Input
                          id="expiryDate"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          placeholder="MM/AA"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          placeholder="123"
                          maxLength={4}
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* PIX */}
                <TabsContent value="pix" className="space-y-4">
                  <div className="text-center py-8">
                    <QrCode className="h-24 w-24 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Pagamento via PIX</h3>
                    <p className="text-muted-foreground mb-4">
                      Após confirmar o pedido, você receberá o código PIX para pagamento
                    </p>
                    <Badge variant="secondary">Aprovação instantânea</Badge>
                  </div>
                </TabsContent>

                {/* PayPal */}
                <TabsContent value="paypal" className="space-y-4">
                  <div className="text-center py-8">
                    <Wallet className="h-24 w-24 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Pagar com PayPal</h3>
                    <p className="text-muted-foreground mb-4">
                      Você será redirecionado para o PayPal para completar o pagamento
                    </p>
                    <Badge variant="secondary">Seguro e rápido</Badge>
                  </div>
                </TabsContent>

                {/* Boleto */}
                <TabsContent value="boleto" className="space-y-4">
                  <div className="text-center py-8">
                    <Building2 className="h-24 w-24 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Boleto Bancário</h3>
                    <p className="text-muted-foreground mb-4">
                      O boleto será enviado por e-mail após a confirmação do pedido
                    </p>
                    <Badge variant="outline">Vencimento em 3 dias úteis</Badge>
                  </div>
                </TabsContent>

                {/* Apple Pay */}
                <TabsContent value="apple-pay" className="space-y-4">
                  <div className="text-center py-8">
                    <Smartphone className="h-24 w-24 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">Apple Pay</h3>
                    <p className="text-muted-foreground mb-4">
                      Use Touch ID ou Face ID para um pagamento rápido e seguro
                    </p>
                    <Badge variant="secondary">Disponível no Safari</Badge>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Resumo do Pedido */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo do Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qtd: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
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
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-5 w-5 text-green-600" />
                <span className="font-medium">Compra Segura</span>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Dados criptografados SSL
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Proteção contra fraudes
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Garantia de entrega
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Botão de Finalizar */}
          <Button className="w-full h-12 text-lg" onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processando...
              </div>
            ) : (
              `Finalizar Compra - $${finalTotal.toFixed(2)}`
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
