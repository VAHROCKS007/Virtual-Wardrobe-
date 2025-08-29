"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Quote,
  Shield,
  Users,
  Globe,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Award,
  TrendingUp,
} from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Blogger",
    avatar: "/placeholder.svg?height=60&width=60&text=SJ",
    rating: 5,
    text: "Virtual Wardrobe completely transformed how I shop for clothes. The 3D avatar is incredibly accurate, and I haven't had a single sizing issue since I started using it!",
    verified: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Online Shopper",
    avatar: "/placeholder.svg?height=60&width=60&text=MC",
    rating: 5,
    text: "As someone who hates returning clothes, this platform is a game-changer. The virtual try-on feature saved me so much time and money. Highly recommended!",
    verified: true,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Style Consultant",
    avatar: "/placeholder.svg?height=60&width=60&text=ER",
    rating: 5,
    text: "I use Virtual Wardrobe with all my clients now. The precision of the measurements and the realistic clothing simulation make styling sessions so much more effective.",
    verified: true,
  },
]

const trustIndicators = [
  {
    icon: Users,
    value: "500K+",
    label: "Active Users",
  },
  {
    icon: Globe,
    value: "50+",
    label: "Countries",
  },
  {
    icon: Award,
    value: "99.8%",
    label: "Accuracy Rate",
  },
  {
    icon: TrendingUp,
    value: "4.9/5",
    label: "User Rating",
  },
]

export function TestimonialsSection() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="font-playfair font-bold text-3xl lg:text-4xl mb-4">What Our Users Say</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join thousands of satisfied customers who have revolutionized their shopping experience
        </p>
      </div>

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {trustIndicators.map((indicator, index) => (
          <Card key={index} className="border-0 shadow-lg text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <indicator.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="font-playfair font-bold text-2xl mb-1">{indicator.value}</div>
              <div className="text-sm text-muted-foreground">{indicator.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Testimonials */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-1 mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating ? "fill-primary text-primary" : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>

              <div className="relative mb-4">
                <Quote className="absolute -top-2 -left-2 h-6 w-6 text-primary/20" />
                <p className="text-muted-foreground italic pl-4">{testimonial.text}</p>
              </div>

              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-sm">{testimonial.name}</h4>
                    {testimonial.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security Badges */}
      <div className="flex justify-center items-center space-x-8 py-8 border-t border-b">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Shield className="h-5 w-5" />
          <span className="text-sm font-medium">SSL Secured</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <CheckCircle className="h-5 w-5" />
          <span className="text-sm font-medium">GDPR Compliant</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Award className="h-5 w-5" />
          <span className="text-sm font-medium">ISO Certified</span>
        </div>
      </div>
    </div>
  )
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-start">
      {/* Contact Information */}
      <div className="space-y-8">
        <div>
          <h2 className="font-playfair font-bold text-3xl lg:text-4xl mb-4">Get In Touch</h2>
          <p className="text-xl text-muted-foreground">
            Have questions about Virtual Wardrobe? We're here to help you get started with your digital styling journey.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Email Us</h3>
              <p className="text-muted-foreground">support@virtualwardrobe.com</p>
              <p className="text-muted-foreground">partnerships@virtualwardrobe.com</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Call Us</h3>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
              <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Visit Us</h3>
              <p className="text-muted-foreground">123 Innovation Drive</p>
              <p className="text-muted-foreground">San Francisco, CA 94105</p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <Button variant="outline" size="icon">
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Instagram className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="font-playfair">Send us a Message</CardTitle>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Message Sent!</h3>
              <p className="text-muted-foreground">
                Thank you for contacting us. We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  placeholder="What's this about?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 5000)
    }
  }

  return (
    <Card className="border-0 shadow-xl bg-primary text-primary-foreground">
      <CardContent className="p-8 text-center">
        <h3 className="font-playfair font-bold text-2xl mb-4">Stay Updated</h3>
        <p className="mb-6 opacity-90">
          Get the latest updates on new features, styling tips, and exclusive offers delivered to your inbox.
        </p>

        {isSubscribed ? (
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>Thank you for subscribing!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white text-foreground"
              required
            />
            <Button type="submit" variant="secondary">
              Subscribe
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
