"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For prototype: just show success message
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex">
          {/* Left side - Success message */}
          <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
            <div className="w-full max-w-md space-y-8">
              {/* Logo */}
              <div className="flex justify-center">
                <div className="h-36 w-auto">
                  <img 
                    src="/images/logos/Hines-Red-Logo-PNG.png" 
                    alt="Hines Logo" 
                    className="h-full w-auto"
                  />
                </div>
              </div>

              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-semibold text-gray-900">Check your email</h1>
                <p className="text-gray-600">We've sent a password reset link to {email}</p>
              </div>

              <div className="text-center">
                <Link 
                  href="/login" 
                  className="text-primary hover:text-primary/90 transition-colors font-medium"
                >
                  ← Back to sign in
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Hines Center image */}
          <div className="flex-1 relative overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="/Hines.jpg"
                alt="Hines Center"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        {/* Site Footer */}
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex">
        {/* Left side - Reset password form */}
        <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
          <div className="w-full max-w-md space-y-8">
            {/* Logo */}
            <div className="flex justify-center">
              <div className="h-36 w-auto">
                <img 
                  src="/images/logos/Hines-Red-Logo-PNG.png" 
                  alt="Hines Logo" 
                  className="h-full w-auto"
                />
              </div>
            </div>

            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold text-gray-900">Reset your password</h1>
              <p className="text-gray-600">Enter your email address and we'll send you a link to reset your password</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-colors font-medium"
              >
                Send reset link
              </Button>

              <div className="text-center">
                <Link 
                  href="/login" 
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  ← Back to sign in
                </Link>
              </div>
            </form>

            <div className="text-center text-xs text-gray-500 mt-8">
              © 2025
            </div>
          </div>
        </div>

        {/* Right side - Hines Center image */}
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/Hines.jpg"
              alt="Hines Center"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      
      {/* Site Footer */}
      <SiteFooter />
    </div>
  )
} 