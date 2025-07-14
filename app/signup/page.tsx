"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For prototype: just redirect to authenticated version
    window.location.href = "/empire-state-building"
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Signup form */}
      <div className="flex-1 flex items-center justify-center px-8 py-12 bg-white">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="h-36 w-auto">
              <img 
                src="/logo.svg" 
                alt="Logo" 
                className="h-full w-auto"
              />
            </div>
          </div>

          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Request account</h1>
            <p className="text-gray-600">Request access to Empire State Building</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First name
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last name
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
            </div>

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
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                Company
              </Label>
              <Input
                id="company"
                type="text"
                placeholder="Enter your company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium"
            >
              Request account
            </Button>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link 
                  href="/login" 
                  className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </form>

          <div className="text-center text-xs text-gray-500 mt-8">
            © 2025
          </div>
        </div>
      </div>

      {/* Right side - Alexandria Center image */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/buildings/Program-Alexandria-Center-Gallery-Image-Photo-Evan-Joseph-Courtey-of-Alexandria-Center-0685.webp"
            alt="Alexandria Center"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-black/60" />
        </div>
      </div>
    </div>
  )
} 