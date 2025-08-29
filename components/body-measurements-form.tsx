"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Ruler, User, Info, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"

interface Measurements {
  height: string
  weight: string
  chest: string
  waist: string
  hips: string
  shoulders: string
  armLength: string
  inseam: string
  neck: string
  wrist: string
}

interface PersonalInfo {
  gender: string
  age: string
  fitPreference: string
  units: "metric" | "imperial"
}

const measurementGuides = {
  chest: "Measure around the fullest part of your chest, keeping the tape horizontal",
  waist: "Measure around your natural waistline, the narrowest part of your torso",
  hips: "Measure around the fullest part of your hips, about 8 inches below your waist",
  shoulders: "Measure from the edge of one shoulder to the edge of the other",
  armLength: "Measure from your shoulder to your wrist with your arm extended",
  inseam: "Measure from your crotch to your ankle along the inside of your leg",
  neck: "Measure around the base of your neck where a collar would sit",
  wrist: "Measure around your wrist bone",
}

export default function BodyMeasurementsForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    gender: "",
    age: "",
    fitPreference: "",
    units: "metric",
  })
  const [measurements, setMeasurements] = useState<Measurements>({
    height: "",
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    shoulders: "",
    armLength: "",
    inseam: "",
    neck: "",
    wrist: "",
  })
  const [showGuide, setShowGuide] = useState<string | null>(null)

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleMeasurementChange = (field: keyof Measurements, value: string) => {
    setMeasurements((prev) => ({ ...prev, [field]: value }))
  }

  const getUnitLabel = (measurement: string) => {
    if (measurement === "height") {
      return personalInfo.units === "metric" ? "cm" : "ft/in"
    }
    if (measurement === "weight") {
      return personalInfo.units === "metric" ? "kg" : "lbs"
    }
    return personalInfo.units === "metric" ? "cm" : "in"
  }

  const isStepComplete = (step: number) => {
    switch (step) {
      case 1:
        return personalInfo.gender && personalInfo.age && personalInfo.fitPreference
      case 2:
        return (
          measurements.height && measurements.weight && measurements.chest && measurements.waist && measurements.hips
        )
      case 3:
        return measurements.shoulders && measurements.armLength && measurements.inseam
      default:
        return false
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Personal Info:", personalInfo)
    console.log("Measurements:", measurements)
    // Here you would typically send the data to your backend or update the avatar
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-playfair font-bold text-3xl lg:text-4xl mb-4">Create Your Perfect Fit</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Enter your body measurements to create an accurate 3D avatar and get perfect clothing recommendations
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card className="border-0 shadow-xl">
        <CardContent className="p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <User className="h-5 w-5 text-primary" />
                <h3 className="font-playfair font-bold text-2xl">Personal Information</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    value={personalInfo.gender}
                    onValueChange={(value) => handlePersonalInfoChange("gender", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age Range</Label>
                  <Select value={personalInfo.age} onValueChange={(value) => handlePersonalInfoChange("age", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select age range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18-25">18-25</SelectItem>
                      <SelectItem value="26-35">26-35</SelectItem>
                      <SelectItem value="36-45">36-45</SelectItem>
                      <SelectItem value="46-55">46-55</SelectItem>
                      <SelectItem value="56+">56+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fitPreference">Fit Preference</Label>
                  <Select
                    value={personalInfo.fitPreference}
                    onValueChange={(value) => handlePersonalInfoChange("fitPreference", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select fit preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slim">Slim Fit</SelectItem>
                      <SelectItem value="regular">Regular Fit</SelectItem>
                      <SelectItem value="relaxed">Relaxed Fit</SelectItem>
                      <SelectItem value="oversized">Oversized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="units">Measurement Units</Label>
                  <Select
                    value={personalInfo.units}
                    onValueChange={(value: "metric" | "imperial") => handlePersonalInfoChange("units", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (cm, kg)</SelectItem>
                      <SelectItem value="imperial">Imperial (in, lbs)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Basic Measurements */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <Ruler className="h-5 w-5 text-primary" />
                <h3 className="font-playfair font-bold text-2xl">Basic Measurements</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="height">Height ({getUnitLabel("height")})</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder={personalInfo.units === "metric" ? "170" : "5.7"}
                    value={measurements.height}
                    onChange={(e) => handleMeasurementChange("height", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight ({getUnitLabel("weight")})</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder={personalInfo.units === "metric" ? "70" : "154"}
                    value={measurements.weight}
                    onChange={(e) => handleMeasurementChange("weight", e.target.value)}
                  />
                </div>

                {(["chest", "waist", "hips"] as const).map((measurement) => (
                  <div key={measurement} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={measurement} className="capitalize">
                        {measurement} ({getUnitLabel(measurement)})
                      </Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowGuide(showGuide === measurement ? null : measurement)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      id={measurement}
                      type="number"
                      placeholder={personalInfo.units === "metric" ? "90" : "35"}
                      value={measurements[measurement]}
                      onChange={(e) => handleMeasurementChange(measurement, e.target.value)}
                    />
                    {showGuide === measurement && (
                      <div className="p-3 bg-muted rounded-lg text-sm">
                        <p>{measurementGuides[measurement]}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Detailed Measurements */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-6">
                <Ruler className="h-5 w-5 text-primary" />
                <h3 className="font-playfair font-bold text-2xl">Detailed Measurements</h3>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {(["shoulders", "armLength", "inseam", "neck", "wrist"] as const).map((measurement) => (
                  <div key={measurement} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={measurement} className="capitalize">
                        {measurement === "armLength" ? "Arm Length" : measurement} ({getUnitLabel(measurement)})
                      </Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowGuide(showGuide === measurement ? null : measurement)}
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      id={measurement}
                      type="number"
                      placeholder={personalInfo.units === "metric" ? "40" : "16"}
                      value={measurements[measurement]}
                      onChange={(e) => handleMeasurementChange(measurement, e.target.value)}
                    />
                    {showGuide === measurement && (
                      <div className="p-3 bg-muted rounded-lg text-sm">
                        <p>{measurementGuides[measurement]}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-primary/5 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Ready to Create Your Avatar</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your measurements will be used to create a precise 3D avatar for virtual try-ons and personalized
                  clothing recommendations.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button onClick={nextStep} disabled={!isStepComplete(currentStep)}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!isStepComplete(currentStep)}>
                Create Avatar
                <CheckCircle className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="mt-8 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-primary" />
            <span>Measurement Tips</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">For Best Results:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Wear form-fitting clothes or underwear</li>
                <li>• Use a flexible measuring tape</li>
                <li>• Ask someone to help you measure</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Measuring Guidelines:</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Keep the tape snug but not tight</li>
                <li>• Stand straight with arms at your sides</li>
                <li>• Measure over your skin, not clothes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
