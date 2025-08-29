"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Camera, RotateCcw, Download, Zap, Scan } from "lucide-react"
import { useLanguage } from "@/components/interactive-features"
import type * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Text } from "@react-three/drei"

interface ScanningState {
  isScanning: boolean
  progress: number
  stage: "idle" | "recording" | "processing" | "generating" | "complete"
  modelUrl: string | null
}

// 3D Avatar Model Component
function AvatarModel({ modelUrl }: { modelUrl: string | null }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  if (!modelUrl) {
    // Placeholder avatar while scanning
    return (
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 1.8, 8]} />
        <meshStandardMaterial color="#8b5cf6" transparent opacity={0.6} wireframe />
        <Text position={[0, 1.2, 0]} fontSize={0.2} color="#ffffff" anchorX="center" anchorY="middle">
          Scanning...
        </Text>
      </mesh>
    )
  }

  // Render actual GLB model
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1.8, 0.3]} />
      <meshStandardMaterial color="#8b5cf6" />
    </mesh>
  )
}

// Video Recording Component
function VideoRecorder({ onRecordingComplete }: { onRecordingComplete: (videoBlob: Blob) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: Blob[] = []
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const videoBlob = new Blob(chunks, { type: "video/webm" })
        onRecordingComplete(videoBlob)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
    } catch (error) {
      console.error("Error accessing camera:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
        <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
        {isRecording && (
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-white font-mono text-sm">
              {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}
            </span>
          </div>
        )}
        <div className="absolute inset-0 border-2 border-primary/50 rounded-lg pointer-events-none">
          <div className="absolute top-4 right-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
            {t("scanner.rotate360")}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {!isRecording ? (
          <Button onClick={startRecording} size="lg" className="px-8">
            <Camera className="mr-2 h-5 w-5" />
            {t("scanner.startRecording")}
          </Button>
        ) : (
          <Button onClick={stopRecording} size="lg" variant="destructive" className="px-8">
            <Scan className="mr-2 h-5 w-5" />
            {t("scanner.stopRecording")}
          </Button>
        )}
      </div>
    </div>
  )
}

export default function Scanner3D() {
  const { t } = useLanguage()
  const [scanningState, setScanningState] = useState<ScanningState>({
    isScanning: false,
    progress: 0,
    stage: "idle",
    modelUrl: null,
  })

  const handleVideoRecorded = async (videoBlob: Blob) => {
    setScanningState((prev) => ({ ...prev, stage: "processing", progress: 0 }))

    // Simulate AI processing stages
    const stages = [
      { name: "analyzing", duration: 2000, progress: 25 },
      { name: "reconstructing", duration: 3000, progress: 50 },
      { name: "optimizing", duration: 2000, progress: 75 },
      { name: "generating", duration: 1500, progress: 100 },
    ]

    for (const stage of stages) {
      await new Promise((resolve) => setTimeout(resolve, stage.duration))
      setScanningState((prev) => ({
        ...prev,
        progress: stage.progress,
        stage: stage.name as any,
      }))
    }

    // Simulate GLB model generation
    setScanningState((prev) => ({
      ...prev,
      stage: "complete",
      modelUrl: "/placeholder-avatar.glb", // In real implementation, this would be the generated GLB
    }))
  }

  const resetScanner = () => {
    setScanningState({
      isScanning: false,
      progress: 0,
      stage: "idle",
      modelUrl: null,
    })
  }

  const downloadModel = () => {
    if (scanningState.modelUrl) {
      const link = document.createElement("a")
      link.href = scanningState.modelUrl
      link.download = "my-avatar.glb"
      link.click()
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Scanning Interface */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scan className="h-6 w-6 text-primary" />
              <span>{t("scanner.title")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {scanningState.stage === "idle" && (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-lg">{t("scanner.instructions")}</h3>
                  <p className="text-muted-foreground text-sm">{t("scanner.instructionsDetail")}</p>
                </div>
                <VideoRecorder onRecordingComplete={handleVideoRecorded} />
              </div>
            )}

            {(scanningState.stage === "processing" ||
              scanningState.stage === "analyzing" ||
              scanningState.stage === "reconstructing" ||
              scanningState.stage === "optimizing" ||
              scanningState.stage === "generating") && (
              <div className="space-y-4">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-4">
                    <Zap className="mr-1 h-3 w-3" />
                    {t(`scanner.${scanningState.stage}`)}
                  </Badge>
                  <Progress value={scanningState.progress} className="w-full" />
                  <p className="text-sm text-muted-foreground mt-2">
                    {scanningState.progress}% {t("scanner.complete")}
                  </p>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>{t("scanner.aiAnalysis")}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div
                      className={`w-2 h-2 rounded-full ${scanningState.progress >= 50 ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    <span>{t("scanner.3dReconstruction")}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div
                      className={`w-2 h-2 rounded-full ${scanningState.progress >= 75 ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    <span>{t("scanner.meshOptimization")}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div
                      className={`w-2 h-2 rounded-full ${scanningState.progress >= 100 ? "bg-green-500" : "bg-gray-300"}`}
                    ></div>
                    <span>{t("scanner.glbGeneration")}</span>
                  </div>
                </div>
              </div>
            )}

            {scanningState.stage === "complete" && (
              <div className="space-y-4 text-center">
                <Badge variant="default" className="mb-4">
                  <Zap className="mr-1 h-3 w-3" />
                  {t("scanner.complete")}
                </Badge>
                <p className="text-muted-foreground">{t("scanner.modelReady")}</p>
                <div className="flex space-x-3">
                  <Button onClick={downloadModel} className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    {t("scanner.download")}
                  </Button>
                  <Button onClick={resetScanner} variant="outline" className="flex-1 bg-transparent">
                    <RotateCcw className="mr-2 h-4 w-4" />
                    {t("scanner.scanAgain")}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 3D Preview */}
      <Card className="border-0 shadow-xl">
        <CardContent className="p-0">
          <div className="aspect-square bg-gradient-to-br from-background to-muted/30">
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <AvatarModel modelUrl={scanningState.modelUrl} />
              <OrbitControls enablePan={false} enableZoom={false} />
              <Environment preset="studio" />
            </Canvas>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
