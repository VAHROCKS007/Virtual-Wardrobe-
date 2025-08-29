"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Pause } from "lucide-react"
import { useLanguage } from "@/components/interactive-features"

export default function DemoVideo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const { t, language } = useLanguage()

  const getDemoSteps = () => {
    if (language === "pt") {
      return [
        {
          title: "O Problema",
          subtitle: "Será que combina?",
          scene: "Cena 1: O Problema",
        },
        {
          title: "A Solução",
          subtitle: "Virtual Wardrobe",
          scene: "Cena 2: A Solução",
        },
        {
          title: "Passo 1",
          subtitle: "Criar o Avatar",
          scene: "Cena 3: Criar Avatar",
        },
        {
          title: "Passo 2",
          subtitle: "Ser o Estilista",
          scene: "Cena 4: Ser Estilista",
        },
        {
          title: "Recursos",
          subtitle: "3D • IA • Medidas Precisas",
          scene: "Cena 5: Recursos",
        },
        {
          title: "Passo 3",
          subtitle: "Comprar o Look",
          scene: "Cena 6: Comprar Look",
        },
        {
          title: "Comece Agora!",
          subtitle: "Virtual Wardrobe",
          scene: "Cena 7: CTA Final",
        },
      ]
    } else if (language === "es") {
      return [
        {
          title: "El Problema",
          subtitle: "¿Me quedará bien?",
          scene: "Escena 1: El Problema",
        },
        {
          title: "La Solución",
          subtitle: "Virtual Wardrobe",
          scene: "Escena 2: La Solución",
        },
        {
          title: "Paso 1",
          subtitle: "Crear el Avatar",
          scene: "Escena 3: Crear Avatar",
        },
        {
          title: "Paso 2",
          subtitle: "Ser el Estilista",
          scene: "Escena 4: Ser Estilista",
        },
        {
          title: "Recursos",
          subtitle: "3D • IA • Medidas Precisas",
          scene: "Escena 5: Recursos",
        },
        {
          title: "Paso 3",
          subtitle: "Comprar el Look",
          scene: "Escena 6: Comprar Look",
        },
        {
          title: "¡Comienza Ahora!",
          subtitle: "Virtual Wardrobe",
          scene: "Escena 7: CTA Final",
        },
      ]
    } else {
      return [
        {
          title: "The Problem",
          subtitle: "Will it match?",
          scene: "Scene 1: The Problem",
        },
        {
          title: "The Solution",
          subtitle: "Virtual Wardrobe",
          scene: "Scene 2: The Solution",
        },
        {
          title: "Step 1",
          subtitle: "Create Avatar",
          scene: "Scene 3: Create Avatar",
        },
        {
          title: "Step 2",
          subtitle: "Be the Stylist",
          scene: "Scene 4: Be Stylist",
        },
        {
          title: "Features",
          subtitle: "3D • AI • Precise Measurements",
          scene: "Scene 5: Features",
        },
        {
          title: "Step 3",
          subtitle: "Buy the Look",
          scene: "Scene 6: Buy Look",
        },
        {
          title: "Start Now!",
          subtitle: "Virtual Wardrobe",
          scene: "Scene 7: Final CTA",
        },
      ]
    }
  }

  const demoSteps = getDemoSteps()
  const totalDuration = 90 // 1:30 in seconds

  const drawCanvas = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#1e3a8a") // Deep blue
      gradient.addColorStop(1, "#06b6d4") // Cyan
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.font = "16px Arial"
      ctx.textAlign = "left"
      ctx.fillText(demoSteps[currentStep].scene, 20, 30)

      ctx.fillStyle = "white"
      ctx.font = "bold 64px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(demoSteps[currentStep].title, centerX, centerY - 20)

      ctx.font = "32px Arial"
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
      ctx.fillText(demoSteps[currentStep].subtitle, centerX, centerY + 30)

      const dotSpacing = 20
      const totalWidth = (demoSteps.length - 1) * dotSpacing
      const startX = centerX - totalWidth / 2
      const dotY = canvas.height - 120

      for (let i = 0; i < demoSteps.length; i++) {
        const x = startX + i * dotSpacing

        ctx.beginPath()
        ctx.arc(x, dotY, 8, 0, Math.PI * 2)

        if (i === currentStep) {
          ctx.fillStyle = "#06b6d4" // Cyan for active dot
        } else if (i < currentStep) {
          ctx.fillStyle = "rgba(6, 182, 212, 0.6)" // Semi-transparent cyan for completed
        } else {
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)" // White transparent for upcoming
        }
        ctx.fill()
      }
    },
    [currentStep, demoSteps],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = 800
    canvas.height = 450

    // Initial draw
    drawCanvas(ctx, canvas)
  }, [drawCanvas])

  useEffect(() => {
    if (!isPlaying || !startTime) return

    const animate = () => {
      const currentTime = Date.now()
      const elapsedSeconds = (currentTime - startTime) / 1000
      const newProgress = Math.min((elapsedSeconds / totalDuration) * 100, 100)

      setProgress(newProgress)

      const stepDuration = totalDuration / demoSteps.length
      const newStep = Math.floor(elapsedSeconds / stepDuration)

      if (newStep !== currentStep && newStep < demoSteps.length) {
        setCurrentStep(newStep)
      }

      if (elapsedSeconds >= totalDuration) {
        setIsPlaying(false)
        setStartTime(null)
        setProgress(100)
        return
      }

      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (canvas && ctx) {
        drawCanvas(ctx, canvas)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, startTime, currentStep, demoSteps.length, totalDuration, drawCanvas])

  const togglePlay = () => {
    if (!isPlaying) {
      setStartTime(Date.now() - (progress / 100) * totalDuration * 1000)
    }
    setIsPlaying(!isPlaying)
  }

  const restart = () => {
    setCurrentStep(0)
    setProgress(0)
    setStartTime(Date.now())
    setIsPlaying(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const currentTime = (progress / 100) * totalDuration

  return (
    <div className="max-w-6xl mx-auto">
      <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-blue-800 to-cyan-500 relative">
        <div className="relative">
          <canvas
            ref={canvasRef}
            className="w-full h-auto max-h-[450px] object-cover cursor-pointer"
            onClick={togglePlay}
          />

          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/40 rounded-lg px-4 py-2 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlay}
                className="bg-transparent hover:bg-white/20 text-white border-0 p-2 rounded"
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </Button>
            </div>

            <div className="flex-1 mx-4 flex items-center space-x-3">
              <div className="flex-1 bg-gray-600 rounded-full h-1 relative">
                <div
                  className="bg-cyan-400 rounded-full h-1 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-white text-sm font-medium min-w-[60px]">{formatTime(currentTime)} / 1:30</span>
            </div>
          </div>

          {!isPlaying && currentStep === 0 && progress === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                onClick={togglePlay}
                className="rounded-full w-16 h-16 bg-white/90 hover:bg-white text-blue-600 shadow-xl"
              >
                <Play className="h-6 w-6 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
