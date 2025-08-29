"use client"

import React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Moon,
  Sun,
  MessageCircle,
  X,
  Send,
  Globe,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Bot,
  Minimize2,
  Maximize2,
} from "lucide-react"
import { useTheme } from "next-themes"

// Language Context
const LanguageContext = React.createContext<{
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

const translations = {
  en: {
    "nav.features": "Features",
    "nav.demo": "Demo",
    "nav.catalog": "Catalog",
    "nav.measurements": "Measurements",
    "nav.contact": "Contact",
    "nav.signIn": "Sign In",
    "nav.getStarted": "Get Started",
    "hero.title": "Your Digital Styling Platform",
    "hero.subtitle": "Create your 3D avatar and try on virtual clothing with cutting-edge technology.",
    "hero.createAvatar": "Create Your Avatar",
    "hero.watchDemo": "Watch Demo",
    "features.title": "Revolutionary Features",
    "features.subtitle": "Experience the next generation of virtual styling with our innovative platform",
    "features.avatar.title": "3D Avatar Creation",
    "features.avatar.description":
      "Create realistic 3D avatars with precise body measurements and customizable features",
    "features.tryOn.title": "Virtual Try-On",
    "features.tryOn.description": "Try on thousands of clothing items virtually with realistic fabric simulation",
    "features.ai.title": "AI Styling Assistant",
    "features.ai.description": "Get personalized styling recommendations powered by advanced AI algorithms",
    "demo.videoTitle": "Video Demonstration",
    "demo.videoSubtitle": "Watch how our revolutionary 3D avatar and virtual try-on technology works",
    "demo.title": "See It In Action",
    "demo.subtitle": "Experience our 3D avatar technology and virtual clothing simulation",
    "avatar.title": "Customize Your Avatar",
    "avatar.subtitle": "Adjust the settings below to create your perfect virtual representation",
    "avatar.livePreview": "Live 3D Preview",
    "avatar.appearance": "Appearance",
    "avatar.skinTone": "Skin Tone",
    "avatar.hairColor": "Hair Color",
    "avatar.bodyType": "Body Type",
    "avatar.height": "Height",
    "avatar.clothing": "Clothing Style",
    "avatar.reset": "Reset",
    "avatar.save": "Save Avatar",
    "avatar.customize": "Customize",
    "avatar.3dScan": "3D Scan",
    "scanner.title": "3D Body Scanner",
    "scanner.instructions": "Record a 360° Video",
    "scanner.instructionsDetail": "Stand in good lighting and slowly rotate 360° while recording",
    "scanner.rotate360": "Rotate 360°",
    "scanner.startRecording": "Start Recording",
    "scanner.stopRecording": "Stop Recording",
    "scanner.processing": "Processing",
    "scanner.analyzing": "Analyzing Video",
    "scanner.reconstructing": "3D Reconstruction",
    "scanner.optimizing": "Optimizing Mesh",
    "scanner.generating": "Generating GLB",
    "scanner.complete": "Complete",
    "scanner.modelReady": "Your 3D avatar model is ready!",
    "scanner.download": "Download GLB",
    "scanner.scanAgain": "Scan Again",
    "scanner.aiAnalysis": "AI Video Analysis",
    "scanner.3dReconstruction": "3D Mesh Reconstruction",
    "scanner.meshOptimization": "Mesh Optimization",
    "scanner.glbGeneration": "GLB Model Generation",
    "chatbot.title": "Virtual Styling Assistant",
    "chatbot.placeholder": "Ask me about styling, measurements, or products...",
    "chatbot.send": "Send",
    "share.title": "Share Virtual Wardrobe",
    "share.text": "Check out this amazing virtual styling platform!",
    "footer.copyright": "© 2025 Virtual Wardrobe. All rights reserved.",
  },
  pt: {
    "nav.features": "Recursos",
    "nav.demo": "Demo",
    "nav.catalog": "Catálogo",
    "nav.measurements": "Medidas",
    "nav.contact": "Contato",
    "nav.signIn": "Entrar",
    "nav.getStarted": "Começar",
    "hero.title": "Sua Plataforma de Estilo Digital",
    "hero.subtitle": "Crie seu avatar 3D e experimente roupas virtuais com tecnologia de ponta.",
    "hero.createAvatar": "Criar Seu Avatar",
    "hero.watchDemo": "Assistir Demo",
    "features.title": "Recursos Revolucionários",
    "features.subtitle": "Experimente a próxima geração de estilo virtual com nossa plataforma inovadora",
    "features.avatar.title": "Criação de Avatar 3D",
    "features.avatar.description":
      "Crie avatares 3D realistas com medidas corporais precisas e recursos personalizáveis",
    "features.tryOn.title": "Experimentação Virtual",
    "features.tryOn.description":
      "Experimente milhares de peças de roupa virtualmente com simulação realista de tecidos",
    "features.ai.title": "Assistente de IA para Estilo",
    "features.ai.description": "Obtenha recomendações de estilo personalizadas com algoritmos avançados de IA",
    "demo.videoTitle": "Vídeo Demonstração",
    "demo.videoSubtitle": "Assista como funciona nossa tecnologia revolucionária de avatar 3D e experimentação virtual",
    "demo.title": "Veja em Ação",
    "demo.subtitle": "Experimente nossa tecnologia de avatar 3D e simulação de roupas virtuais",
    "avatar.title": "Personalize Seu Avatar",
    "avatar.subtitle": "Ajuste as configurações abaixo para criar sua representação virtual perfeita",
    "avatar.livePreview": "Visualização 3D ao Vivo",
    "avatar.appearance": "Aparência",
    "avatar.skinTone": "Tom de Pele",
    "avatar.hairColor": "Cor do Cabelo",
    "avatar.bodyType": "Tipo Corporal",
    "avatar.height": "Altura",
    "avatar.clothing": "Estilo de Roupa",
    "avatar.reset": "Resetar",
    "avatar.save": "Salvar Avatar",
    "avatar.customize": "Personalizar",
    "avatar.3dScan": "Escaneamento 3D",
    "scanner.title": "Scanner Corporal 3D",
    "scanner.instructions": "Grave um Vídeo 360°",
    "scanner.instructionsDetail": "Fique em boa iluminação e gire lentamente 360° enquanto grava",
    "scanner.rotate360": "Gire 360°",
    "scanner.startRecording": "Iniciar Gravação",
    "scanner.stopRecording": "Parar Gravação",
    "scanner.processing": "Processando",
    "scanner.analyzing": "Analisando Vídeo",
    "scanner.reconstructing": "Reconstrução 3D",
    "scanner.optimizing": "Otimizando Malha",
    "scanner.generating": "Gerando GLB",
    "scanner.complete": "Completo",
    "scanner.modelReady": "Seu modelo de avatar 3D está pronto!",
    "scanner.download": "Baixar GLB",
    "scanner.scanAgain": "Escanear Novamente",
    "scanner.aiAnalysis": "Análise de Vídeo com IA",
    "scanner.3dReconstruction": "Reconstrução de Malha 3D",
    "scanner.meshOptimization": "Otimização de Malha",
    "scanner.glbGeneration": "Geração de Modelo GLB",
    "chatbot.title": "Assistente de Estilo Virtual",
    "chatbot.placeholder": "Pergunte sobre estilo, medidas ou produtos...",
    "chatbot.send": "Enviar",
    "share.title": "Compartilhar Virtual Wardrobe",
    "share.text": "Confira esta incrível plataforma de estilo virtual!",
    "footer.copyright": "© 2025 Virtual Wardrobe. Todos os direitos reservados.",
  },
  es: {
    "nav.features": "Características",
    "nav.demo": "Demo",
    "nav.catalog": "Catálogo",
    "nav.measurements": "Medidas",
    "nav.contact": "Contacto",
    "nav.signIn": "Iniciar Sesión",
    "nav.getStarted": "Empezar",
    "hero.title": "Tu Plataforma de Estilo Digital",
    "hero.subtitle": "Crea tu avatar 3D y pruébate ropa virtual con tecnología de vanguardia.",
    "hero.createAvatar": "Crear Tu Avatar",
    "hero.watchDemo": "Ver Demo",
    "features.title": "Características Revolucionarias",
    "features.subtitle": "Experimenta la próxima generación de estilo virtual con nuestra plataforma innovadora",
    "features.avatar.title": "Creación de Avatar 3D",
    "features.avatar.description":
      "Crea avatares 3D realistas con medidas corporales precisas y características personalizables",
    "features.tryOn.title": "Prueba Virtual",
    "features.tryOn.description": "Pruébate miles de prendas virtualmente con simulación realista de tejidos",
    "features.ai.title": "Asistente de IA para Estilo",
    "features.ai.description": "Obtén recomendaciones de estilo personalizadas con algoritmos avanzados de IA",
    "demo.videoTitle": "Video Demostración",
    "demo.videoSubtitle": "Mira cómo funciona nuestra tecnología revolucionária de avatar 3D y prueba virtual",
    "demo.title": "Míralo en Acción",
    "demo.subtitle": "Experimenta nuestra tecnología de avatar 3D y simulación de ropa virtual",
    "avatar.title": "Personaliza Tu Avatar",
    "avatar.subtitle": "Ajusta la configuración a continuación para crear tu representación virtual perfecta",
    "avatar.livePreview": "Vista Previa 3D en Vivo",
    "avatar.appearance": "Apariencia",
    "avatar.skinTone": "Tono de Piel",
    "avatar.hairColor": "Color de Cabello",
    "avatar.bodyType": "Tipo de Cuerpo",
    "avatar.height": "Altura",
    "avatar.clothing": "Estilo de Ropa",
    "avatar.reset": "Resetear",
    "avatar.save": "Guardar Avatar",
    "avatar.customize": "Personalizar",
    "avatar.3dScan": "Escaneo 3D",
    "scanner.title": "Escáner Corporal 3D",
    "scanner.instructions": "Graba un Video 360°",
    "scanner.instructionsDetail": "Mantente en buena iluminación y gira lentamente 360° mientras grabas",
    "scanner.rotate360": "Gira 360°",
    "scanner.startRecording": "Iniciar Grabación",
    "scanner.stopRecording": "Detener Grabación",
    "scanner.processing": "Procesando",
    "scanner.analyzing": "Analizando Video",
    "scanner.reconstructing": "Reconstrucción 3D",
    "scanner.optimizing": "Optimizando Malla",
    "scanner.generating": "Generando GLB",
    "scanner.complete": "Completo",
    "scanner.modelReady": "¡Tu modelo de avatar 3D está listo!",
    "scanner.download": "Descargar GLB",
    "scanner.scanAgain": "Escanear de Nuevo",
    "scanner.aiAnalysis": "Análisis de Video con IA",
    "scanner.3dReconstruction": "Reconstrucción de Malla 3D",
    "scanner.meshOptimization": "Optimización de Malla",
    "scanner.glbGeneration": "Generación de Modelo GLB",
    "chatbot.title": "Asistente de Estilo Virtual",
    "chatbot.placeholder": "Pregúntame sobre estilo, medidas o productos...",
    "chatbot.send": "Enviar",
    "share.title": "Compartir Virtual Wardrobe",
    "share.text": "¡Echa un vistazo a esta increíble plataforma de estilo virtual!",
    "footer.copyright": "© 2025 Virtual Wardrobe. Todos los derechos reservados.",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState("en")

  const t = (key: string) => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return React.useContext(LanguageContext)
}

// Theme Toggle Component
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="relative"
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

// Language Selector Component
export function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  return (
    <Select value={language} onValueChange={setLanguage}>
      <SelectTrigger className="w-20">
        <Globe className="h-4 w-4 mr-1" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="pt">PT</SelectItem>
        <SelectItem value="es">ES</SelectItem>
      </SelectContent>
    </Select>
  )
}

// Chatbot Component
export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your virtual styling assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const { t } = useLanguage()

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: "Thanks for your message! I'm here to help with styling advice, measurements, and product recommendations. What would you like to know?",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <Card
      className={`fixed bottom-6 right-6 w-80 shadow-xl z-50 transition-all duration-300 ${
        isMinimized ? "h-16" : "h-96"
      }`}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5 text-primary" />
            <CardTitle className="text-sm">{t("chatbot.title")}</CardTitle>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsMinimized(!isMinimized)}>
              {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-4 pt-0 flex flex-col h-full">
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-48">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-2 rounded-lg text-sm ${
                    message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder={t("chatbot.placeholder")}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1"
            />
            <Button size="icon" onClick={sendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  )
}

// Social Share Component
export function SocialShare() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const shareData = {
    title: t("share.title"),
    text: t("share.text"),
    url: window.location.href,
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      setIsOpen(true)
    }
  }

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`,
    instagram: "#", // Instagram doesn't support direct URL sharing
  }

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={handleNativeShare}>
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>

      {isOpen && (
        <Card className="absolute top-full mt-2 right-0 w-48 shadow-lg z-50">
          <CardContent className="p-4">
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => window.open(shareUrls.facebook, "_blank")}
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => window.open(shareUrls.twitter, "_blank")}
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={() => {
                  navigator.clipboard.writeText(shareData.url)
                  setIsOpen(false)
                }}
              >
                <Instagram className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-2" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Close
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Floating Action Buttons
export function FloatingActions() {
  return (
    <div className="fixed bottom-6 left-6 flex flex-col space-y-3 z-40">
      <SocialShare />
    </div>
  )
}

// Avatar Customization Component
export function AvatarCustomization() {
  const { t } = useLanguage()

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{t("avatar.title")}</CardTitle>
        <p className="text-sm text-muted-foreground">{t("avatar.subtitle")}</p>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{t("avatar.livePreview")}</span>
            <Button variant="default">{t("avatar.reset")}</Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-sm font-medium">{t("avatar.appearance")}</span>
              <Input placeholder={t("avatar.skinTone")} />
              <Input placeholder={t("avatar.hairColor")} />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium">{t("avatar.bodyType")}</span>
              <Input placeholder={t("avatar.height")} />
              <Input placeholder={t("avatar.clothing")} />
            </div>
          </div>
          <Button variant="default">{t("avatar.save")}</Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Features Component
export function Features() {
  const { t } = useLanguage()

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">{t("features.avatar.title")}</CardTitle>
          <p className="text-sm text-muted-foreground">{t("features.avatar.description")}</p>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">{t("features.tryOn.title")}</CardTitle>
          <p className="text-sm text-muted-foreground">{t("features.tryOn.description")}</p>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">{t("features.ai.title")}</CardTitle>
          <p className="text-sm text-muted-foreground">{t("features.ai.description")}</p>
        </CardHeader>
      </Card>
    </div>
  )
}

// Demo Component
export function Demo() {
  const { t } = useLanguage()

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">{t("demo.videoTitle")}</CardTitle>
          <p className="text-sm text-muted-foreground">{t("demo.videoSubtitle")}</p>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">{t("demo.title")}</CardTitle>
          <p className="text-sm text-muted-foreground">{t("demo.subtitle")}</p>
        </CardHeader>
      </Card>
    </div>
  )
}

// Footer Component
export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="w-full max-w-2xl mx-auto mt-8 text-sm text-center text-muted-foreground">
      {t("footer.copyright")}
    </footer>
  )
}

// Scanner Component
export function Scanner() {
  const { t } = useLanguage()
  const [step, setStep] = useState("instructions")
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleStartRecording = () => {
    setIsRecording(true)
    setStep("recording")
    // Simulate recording
    setTimeout(() => {
      setIsRecording(false)
      setIsProcessing(true)
      setStep("processing")
    }, 5000)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setStep("instructions")
  }

  const handleDownload = () => {
    // Simulate download
    alert(t("scanner.modelReady"))
  }

  const handleScanAgain = () => {
    setStep("instructions")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{t("scanner.title")}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {step === "instructions" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{t("scanner.instructions")}</p>
            <p className="text-sm text-muted-foreground">{t("scanner.instructionsDetail")}</p>
            <Button variant="default" onClick={handleStartRecording}>
              {t("scanner.startRecording")}
            </Button>
          </div>
        )}
        {step === "recording" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{t("scanner.rotate360")}</p>
            <Button variant="default" onClick={handleStopRecording}>
              {t("scanner.stopRecording")}
            </Button>
          </div>
        )}
        {step === "processing" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{t("scanner.analyzing")}</p>
            <p className="text-sm text-muted-foreground">{t("scanner.reconstructing")}</p>
            <p className="text-sm text-muted-foreground">{t("scanner.optimizing")}</p>
            <p className="text-sm text-muted-foreground">{t("scanner.generating")}</p>
            <Button variant="default" onClick={handleDownload}>
              {t("scanner.download")}
            </Button>
            <Button variant="default" onClick={handleScanAgain}>
              {t("scanner.scanAgain")}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
