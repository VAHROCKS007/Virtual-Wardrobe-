"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { RotateCcw, Palette, Shirt, User, Zap, Scan } from "lucide-react"
import { useLanguage } from "@/components/interactive-features"
import Scanner3D from "./3d-scanner"

interface AvatarCustomization {
  skinTone: number
  hairColor: number
  bodyType: number
  height: number
  clothing: "casual" | "formal" | "sporty"
}

export default function AvatarDemo() {
  const { t } = useLanguage()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [isLoading, setIsLoading] = useState(true)
  const [customization, setCustomization] = useState<AvatarCustomization>({
    skinTone: 50,
    hairColor: 30,
    bodyType: 50,
    height: 170,
    clothing: "casual",
  })
  const [activeTab, setActiveTab] = useState<"customize" | "scan">("customize")

  // Modern holographic avatar rendering using Canvas 2D
  const drawAvatar = (ctx: CanvasRenderingContext2D, time: number) => {
    const { width, height } = ctx.canvas
    ctx.clearRect(0, 0, width, height)

    // Modern holographic background
    const gradient = ctx.createRadialGradient(
      width / 2,
      height / 2,
      0,
      width / 2,
      height / 2,
      Math.max(width, height) / 2,
    )
    gradient.addColorStop(0, "rgba(139, 92, 246, 0.1)")
    gradient.addColorStop(0.5, "rgba(6, 182, 212, 0.05)")
    gradient.addColorStop(1, "rgba(15, 23, 42, 0.9)")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    const centerX = width / 2
    const centerY = height / 2
    const scale = Math.min(width, height) / 400
    const pulse = 1 + Math.sin(time * 0.003) * 0.1

    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.scale(scale * pulse, scale * pulse)

    // Modern wireframe human silhouette
    ctx.strokeStyle = `rgba(139, 92, 246, 0.8)`
    ctx.lineWidth = 2
    ctx.lineCap = "round"

    // Head outline
    ctx.beginPath()
    ctx.arc(0, -120, 35, 0, Math.PI * 2)
    ctx.stroke()

    // Body outline
    ctx.beginPath()
    ctx.moveTo(0, -85)
    ctx.lineTo(0, 50)
    ctx.stroke()

    // Arms
    ctx.beginPath()
    ctx.moveTo(-40, -40)
    ctx.lineTo(0, -20)
    ctx.lineTo(40, -40)
    ctx.stroke()

    // Legs
    ctx.beginPath()
    ctx.moveTo(-25, 50)
    ctx.lineTo(0, 50)
    ctx.lineTo(25, 50)
    ctx.moveTo(-25, 50)
    ctx.lineTo(-25, 120)
    ctx.moveTo(25, 50)
    ctx.lineTo(25, 120)
    ctx.stroke()

    // Clothing overlay based on selection
    let clothingColor = "rgba(79, 70, 229, 0.6)"
    if (customization.clothing === "formal") clothingColor = "rgba(31, 41, 55, 0.6)"
    if (customization.clothing === "sporty") clothingColor = "rgba(220, 38, 38, 0.6)"

    ctx.fillStyle = clothingColor
    ctx.beginPath()
    ctx.roundRect(-30, -20, 60, 70, 10)
    ctx.fill()

    // Holographic scan lines
    for (let i = 0; i < 10; i++) {
      const y = -150 + ((time * 0.1 + i * 20) % 300)
      ctx.strokeStyle = `rgba(6, 182, 212, ${0.3 - Math.abs(y) / 500})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(-50, y)
      ctx.lineTo(50, y)
      ctx.stroke()
    }

    ctx.restore()

    // Floating data points
    for (let i = 0; i < 8; i++) {
      const angle = (time * 0.001 + (i * Math.PI) / 4) % (Math.PI * 2)
      const radius = 120 + Math.sin(time * 0.002 + i) * 20
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      const alpha = 0.4 + Math.sin(time * 0.003 + i) * 0.3

      ctx.fillStyle = `rgba(139, 92, 246, ${alpha})`
      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()

      // Data labels
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`
      ctx.font = "10px monospace"
      ctx.textAlign = "center"
      const measurements = ["H: 170cm", "W: 65kg", "C: 90cm", "W: 75cm", "H: 95cm", "S: M", "F: 95%", "AI: ON"]
      ctx.fillText(measurements[i], x, y - 10)
    }
  }

  const animate = (time: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    drawAvatar(ctx, time)
    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Start animation
    setTimeout(() => setIsLoading(false), 1000)
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [customization])

  const resetAvatar = () => {
    setCustomization({
      skinTone: 50,
      hairColor: 30,
      bodyType: 50,
      height: 170,
      clothing: "casual",
    })
  }

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === "customize" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("customize")}
          className="px-6"
        >
          <Palette className="mr-2 h-4 w-4" />
          {t("avatar.customize")}
        </Button>
        <Button
          variant={activeTab === "scan" ? "default" : "ghost"}
          size="sm"
          onClick={() => setActiveTab("scan")}
          className="px-6"
        >
          <Scan className="mr-2 h-4 w-4" />
          {t("avatar.3dScan")}
        </Button>
      </div>

      {/* Content */}
      {activeTab === "customize" ? (
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* 3D Avatar Display */}
          <Card className="border-0 shadow-xl overflow-hidden">
            <CardContent className="p-0 relative">
              <div className="aspect-square bg-gradient-to-br from-muted/30 to-primary/5 relative">
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                      <div className="w-4 h-4 bg-primary rounded-full animate-pulse delay-100"></div>
                      <div className="w-4 h-4 bg-primary rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                )}
                <canvas
                  ref={canvasRef}
                  className="w-full h-full"
                  style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.5s" }}
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur">
                    <Zap className="mr-1 h-3 w-3" />
                    {t("avatar.livePreview")}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customization Controls */}
          <div className="space-y-6">
            <div>
              <h3 className="font-playfair font-bold text-2xl mb-2">{t("avatar.title")}</h3>
              <p className="text-muted-foreground">{t("avatar.subtitle")}</p>
            </div>

            {/* Appearance Controls */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">{t("avatar.appearance")}</h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("avatar.skinTone")}</label>
                    <Slider
                      value={[customization.skinTone]}
                      onValueChange={(value) => setCustomization((prev) => ({ ...prev, skinTone: value[0] }))}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("avatar.hairColor")}</label>
                    <Slider
                      value={[customization.hairColor]}
                      onValueChange={(value) => setCustomization((prev) => ({ ...prev, hairColor: value[0] }))}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">{t("avatar.bodyType")}</label>
                    <Slider
                      value={[customization.bodyType]}
                      onValueChange={(value) => setCustomization((prev) => ({ ...prev, bodyType: value[0] }))}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      {t("avatar.height")}: {customization.height}cm
                    </label>
                    <Slider
                      value={[customization.height]}
                      onValueChange={(value) => setCustomization((prev) => ({ ...prev, height: value[0] }))}
                      min={150}
                      max={200}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Clothing Controls */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Shirt className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">{t("avatar.clothing")}</h4>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {(["casual", "formal", "sporty"] as const).map((style) => (
                    <Button
                      key={style}
                      variant={customization.clothing === style ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCustomization((prev) => ({ ...prev, clothing: style }))}
                      className="capitalize"
                    >
                      {style}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button onClick={resetAvatar} variant="outline" className="flex-1 bg-transparent">
                <RotateCcw className="mr-2 h-4 w-4" />
                {t("avatar.reset")}
              </Button>
              <Button className="flex-1">
                <Palette className="mr-2 h-4 w-4" />
                {t("avatar.save")}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Scanner3D />
      )}
    </div>
  )
}
