"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface HeroCardProps {
  backgroundImage: string
  buildingName: string
  onAssistantSubmit?: (message: string) => void
  className?: string
}

export function HeroCard({
  backgroundImage,
  buildingName,
  onAssistantSubmit,
  className = ""
}: HeroCardProps) {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim() && onAssistantSubmit) {
      onAssistantSubmit(inputValue.trim())
      setInputValue("")
    }
  }

  return (
    <div className={`relative w-full h-[269px] rounded-2xl ${className}`}>
      {/* Background Image */}
      <img
        src={backgroundImage}
                    alt="Hines Center"
        className="absolute inset-0 w-full h-full object-cover object-center rounded-2xl"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 rounded-2xl" />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-start justify-end p-8">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-3xl font-bold text-white">
            Welcome back to the {buildingName}, Rita
          </h1>
          
          {/* AI Assistant Prompt */}
          <div className="relative w-full max-w-md">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Search for events and building information..."
                  className="w-full bg-white/95 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500 pr-12 py-3 text-base rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
                <Button 
                  type="submit"
                  size="icon" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-blue-600 hover:bg-blue-700 transition-colors rounded-full"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 