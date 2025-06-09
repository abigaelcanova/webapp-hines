"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface HeroCardProps {
  backgroundImage: string
  onAssistantSubmit?: (message: string) => void
  className?: string
}

export function HeroCard({
  backgroundImage,
  onAssistantSubmit,
  className = ""
}: HeroCardProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const message = formData.get('message') as string
    if (message.trim() && onAssistantSubmit) {
      onAssistantSubmit(message.trim())
    }
  }

  return (
    <div className={`relative w-full h-[300px] rounded-2xl overflow-hidden ${className}`}>
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Empire State Building"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-3xl font-bold text-white">
            Welcome back to the Empire State Building, John
          </h1>
          
          {/* AI Assistant Prompt */}
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="relative">
              <Input
                name="message"
                placeholder="How can we help you today?"
                className="w-full bg-white/95 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500 pr-12 py-3 text-base rounded-xl shadow-lg"
              />
              <Button 
                type="submit"
                size="icon" 
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-blue-600 hover:bg-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 