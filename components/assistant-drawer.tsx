"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, MoreHorizontal, Maximize2, Send } from "lucide-react"

interface AssistantDrawerProps {
  isOpen: boolean
  onClose: () => void
  onMaximize?: () => void
  className?: string
}

export function AssistantDrawer({ 
  isOpen, 
  onClose, 
  onMaximize,
  className = ""
}: AssistantDrawerProps) {
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    // In a real implementation, this would send the message
    console.log("Sending message:", inputValue)
    setInputValue("")
    
    // If there's a maximize handler, call it to open the full modal
    if (onMaximize) {
      onMaximize()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className={`h-[calc(100vh-3.5rem-2rem)] bg-white rounded-xl border shadow-sm flex flex-col mt-4 overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <span className="font-regular text-gray-900">Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
          {onMaximize && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              type="button"
              onClick={onMaximize}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            type="button" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col overflow-y-auto">
        {/* Greeting */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">How can I help you today?</p>
        </div>

        {/* Suggestion Cards */}
        <div className="space-y-3 mb-4">
          <div className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors">
            <p className="text-xs text-gray-600">What hours is the rooftop terrace open?</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors">
            <p className="text-xs text-gray-600">What's the food truck schedule for the week?</p>
          </div>
        </div>

        {/* Chat Area - Spacer */}
        <div className="flex-1" />

        {/* Input Area */}
        <div className="space-y-3">
          <div className="relative">
            <Input 
              placeholder="Ask anything" 
              className="pr-12 py-3 text-sm" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button 
              size="icon" 
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8" 
              type="button"
              onClick={handleSendMessage}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-[10px] text-gray-500 text-center">
            The assistant can make mistakes. It does not use your data to train its models.{" "}
            <button className="underline hover:no-underline" type="button">Learn more</button>
          </p>
        </div>
      </div>
    </div>
  )
} 