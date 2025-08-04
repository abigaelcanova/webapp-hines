"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"


export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For prototype: just redirect to authenticated version
            window.location.href = "/hines-demo-building"
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex">
        {/* Left side - Login form */}
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
              <h1 className="text-3xl font-semibold text-gray-900">Welcome back</h1>
              <p className="text-gray-600">Sign in to access Hines Demo Building</p>
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoComplete="new-password"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                  required
                />
              </div>

              <div className="text-left">
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Forgot password
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#BF1231] hover:bg-[#9f0e28] text-white py-3 rounded-md transition-colors font-medium"
              >
                Sign in
              </Button>

              <div className="text-center">
                <span className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link 
                    href="/signup" 
                    className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
                  >
                    Request access
                  </Link>
                </span>
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
    </div>
  )
} 