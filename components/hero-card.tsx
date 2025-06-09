"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Users, UserPlus, Calendar, MapPin } from "lucide-react"

interface HeroCardProps {
  backgroundImage: string
  onAssistantSubmit?: (message: string) => void
  className?: string
}

const suggestedPrompts = [
  {
    id: 1,
    text: "Great spaces for large groups",
    icon: Users,
    category: "Spaces"
  },
  {
    id: 2,
    text: "Register a guest",
    icon: UserPlus,
    category: "Services"
  },
  {
    id: 3,
    text: "Upcoming events",
    icon: Calendar,
    category: "Events"
  },
  {
    id: 4,
    text: "Nearby lunch spots",
    icon: MapPin,
    category: "Dining"
  }
]

export function HeroCard({
  backgroundImage,
  onAssistantSubmit,
  className = ""
}: HeroCardProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim() && onAssistantSubmit) {
      onAssistantSubmit(inputValue.trim())
      setInputValue("")
      setIsDropdownOpen(false)
    }
  }

  const handlePromptSelect = (promptText: string) => {
    setInputValue(promptText)
    setIsDropdownOpen(false)
    if (onAssistantSubmit) {
      onAssistantSubmit(promptText)
    }
  }

  const handleInputFocus = () => {
    setIsDropdownOpen(true)
  }

  const handleInputBlur = (e: React.FocusEvent) => {
    // Only close if focus is not moving to the dropdown
    if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
      setIsDropdownOpen(false)
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`relative w-full h-[300px] rounded-2xl ${className}`}>
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Empire State Building"
        className="absolute inset-0 w-full h-full object-cover object-center rounded-2xl"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 rounded-2xl" />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-3xl font-bold text-white">
            Welcome back to the Empire State Building, John
          </h1>
          
          {/* AI Assistant Prompt */}
          <div className="relative w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="How can we help you today?"
                  className="w-full bg-white/95 backdrop-blur-sm border-0 text-gray-900 placeholder:text-gray-500 pr-12 py-3 text-base rounded-xl shadow-lg focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
                <Button 
                  type="submit"
                  size="icon" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>

            {/* Dropdown with suggested prompts */}
            {isDropdownOpen && (
              <div 
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 overflow-hidden z-50 animate-in fade-in-0 slide-in-from-top-2 duration-200"
              >
                <div className="p-2">
                  <div className="text-xs font-medium text-gray-500 px-3 py-2">
                    Suggestions
                  </div>
                  <div className="space-y-1">
                    {suggestedPrompts.map((prompt) => {
                      const IconComponent = prompt.icon
                      return (
                        <button
                          key={prompt.id}
                          type="button"
                          onClick={() => handlePromptSelect(prompt.text)}
                          className="w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg hover:bg-blue-50 transition-colors group"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <IconComponent className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-900 transition-colors">
                              {prompt.text}
                            </p>
                            <p className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
                              {prompt.category}
                            </p>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 