"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Shirt, Users, Zap, ArrowRight, Play } from "lucide-react"
import AvatarDemo from "@/components/avatar-demo"
import ProductCatalog from "@/components/product-catalog"
import BodyMeasurementsForm from "@/components/body-measurements-form"
import { ThemeToggle, LanguageSelector, Chatbot, FloatingActions, useLanguage } from "@/components/interactive-features"
import { TestimonialsSection, ContactSection, NewsletterSignup } from "@/components/social-proof-contact"
import BackgroundParticles from "@/components/background-particles"
import DemoVideo from "@/components/demo-video"

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen">
      <BackgroundParticles />

      <div className="content-layer">
        {/* Header Navigation */}
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-playfair font-bold text-xl">Virtual Wardrobe</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
                {t("nav.features")}
              </a>
              <a href="#demo" className="text-sm font-medium hover:text-primary transition-colors">
                {t("nav.demo")}
              </a>
              <a href="#catalog" className="text-sm font-medium hover:text-primary transition-colors">
                {t("nav.catalog")}
              </a>
              <a href="#measurements" className="text-sm font-medium hover:text-primary transition-colors">
                {t("nav.measurements")}
              </a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                {t("nav.contact")}
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <ThemeToggle />
              <Button variant="ghost" size="sm">
                {t("nav.signIn")}
              </Button>
              <Button size="sm">{t("nav.getStarted")}</Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-20 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-4">
                <Zap className="mr-1 h-3 w-3" />
                Revolutionary 3D Technology
              </Badge>
              <h1 className="font-playfair font-bold text-4xl lg:text-6xl mb-6 text-balance">{t("hero.title")}</h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">{t("hero.subtitle")}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8">
                  {t("hero.createAvatar")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                  <Play className="mr-2 h-5 w-5" />
                  {t("hero.watchDemo")}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="font-playfair font-bold text-3xl lg:text-4xl mb-4">{t("features.title")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("features.subtitle")}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-playfair">{t("features.avatar.title")}</CardTitle>
                  <CardDescription>{t("features.avatar.description")}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Shirt className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-playfair">{t("features.tryOn.title")}</CardTitle>
                  <CardDescription>{t("features.tryOn.description")}</CardDescription>
                </CardHeader>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-playfair">{t("features.ai.title")}</CardTitle>
                  <CardDescription>{t("features.ai.description")}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Demo Video Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="font-playfair font-bold text-3xl lg:text-4xl mb-4">{t("demo.videoTitle")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("demo.videoSubtitle")}</p>
            </div>
            <DemoVideo />
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="font-playfair font-bold text-3xl lg:text-4xl mb-4">{t("demo.title")}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("demo.subtitle")}</p>
            </div>
            <AvatarDemo />
          </div>
        </section>

        {/* Product Catalog Section */}
        <section id="catalog" className="py-20 bg-muted/30">
          <div className="container">
            <ProductCatalog />
          </div>
        </section>

        {/* Body Measurements Section */}
        <section id="measurements" className="py-20">
          <div className="container">
            <BodyMeasurementsForm />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <TestimonialsSection />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20">
          <div className="container">
            <NewsletterSignup />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-muted/30">
          <div className="container">
            <ContactSection />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t py-12">
          <div className="container">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-2 mb-4 md:mb-0">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="font-playfair font-bold">Virtual Wardrobe</span>
              </div>
              <p className="text-sm text-muted-foreground">{t("footer.copyright")}</p>
            </div>
          </div>
        </footer>

        <FloatingActions />
        <Chatbot />
      </div>
    </div>
  )
}
