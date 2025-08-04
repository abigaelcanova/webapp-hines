"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, MoreHorizontal, Maximize2, Send, Sparkles, Building, Calendar, MapPin, UserPlus } from "lucide-react"

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  cards?: any[]
}

interface AssistantDrawerProps {
  isOpen: boolean
  onClose: () => void
  onMaximize?: (inputValue: string) => void
  className?: string
  messages?: Message[]
  initialInputValue?: string
}

export function AssistantDrawer({ 
  isOpen, 
  onClose, 
  onMaximize,
  className = "",
  messages = [],
  initialInputValue = ""
}: AssistantDrawerProps) {
  const [inputValue, setInputValue] = useState(initialInputValue)

  useEffect(() => {
    setInputValue(initialInputValue)
  }, [initialInputValue])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    
    // In a real implementation, this would send the message
    console.log("Sending message:", inputValue)
    
    // If there's a maximize handler, call it to open the full modal
    if (onMaximize) {
      onMaximize(inputValue)
    }
  }

  const handleMaximize = () => {
    if (onMaximize) {
      onMaximize(inputValue)
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
              onClick={handleMaximize}
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
        {messages.length === 0 ? (
          <>
            {/* Greeting */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">How can I help you today?</p>
            </div>

            {/* Suggestion Cards */}
            <div className="space-y-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-4 cursor-pointer transition-colors">
                <p className="text-xs text-gray-600">What hours is the rooftop terrace open?</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 cursor-pointer transition-colors">
                <p className="text-xs text-gray-600">What's the food truck schedule for the week?</p>
              </div>
            </div>

            {/* Chat Area - Spacer */}
            <div className="flex-1" />
          </>
        ) : (
          <>
            {/* Messages */}
            <div className="flex-1 space-y-4 mb-4">
              {messages.slice(-3).map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[85%]">
                    <div
                      className={`rounded-lg px-3 py-2 text-xs ${
                        message.type === 'user'
                          ? 'bg-[#BF1231] text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="leading-relaxed">
                        {message.content.length > 100 
                          ? `${message.content.substring(0, 100)}...` 
                          : message.content
                        }
                      </div>
                    </div>
                    <div className={`text-[10px] text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {messages.length > 3 && (
                <div className="text-center">
                  <button 
                    onClick={handleMaximize}
                    className="text-xs text-[#BF1231] hover:text-[#9f0e28] underline"
                  >
                    View full conversation ({messages.length} messages)
                  </button>
                </div>
              )}
            </div>
          </>
        )}

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