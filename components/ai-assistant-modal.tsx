"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Minimize2, Send, Sparkles, Building, Calendar, MapPin, UserPlus } from "lucide-react"

interface AIAssistantModalProps {
  isOpen: boolean
  onClose: () => void
  onMinimize: () => void
  initialPrompt?: string
}

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const demoResponses: Record<string, string> = {
  "Great spaces for large groups": `I'd be happy to help you find great spaces for large groups! Here are some excellent options in the Empire State Building:

**🏛️ Grand Hall (Main Floor)**
• Capacity: 200 people
• Features: State-of-the-art AV system, catering kitchen access
• Perfect for: Corporate events, presentations, galas
• Available: Tomorrow 2-6 PM, Thursday all day

**🎭 Auditorium (15th Floor)**
• Capacity: 150 people theater-style
• Features: Professional lighting, built-in stage
• Perfect for: Conferences, product launches, training
• Available: Next week Tuesday-Thursday

**🌟 Rooftop Terrace (86th Floor)**
• Capacity: 100 people cocktail style
• Features: Stunning city views, outdoor heaters
• Perfect for: Networking events, celebrations
• Available: Weekend evenings

Would you like me to check availability for a specific date or get more details about any of these spaces?`,

  "Register a guest": `I'll help you register a guest! Here's what I need to get them set up:

**👤 Guest Information:**
• Full name
• Company/organization
• Purpose of visit
• Host contact information
• Expected arrival time
• Duration of visit

**🏢 Building Access:**
• Which floors/areas they need access to
• Any special equipment or assistance needed
• Parking requirements

**📋 Quick Registration Options:**
• **Express Check-in**: For returning guests (2 minutes)
• **Standard Registration**: For new visitors (5 minutes)
• **Group Registration**: For multiple guests (bulk upload)

**🔒 Security Requirements:**
• Valid photo ID required
• Background check for sensitive areas
• Escort requirements for restricted floors

Would you like to start the registration process now, or do you need help with something specific about guest access?`,

  "Upcoming events": `Here are the exciting upcoming events at the Empire State Building:

**🎉 This Week:**

**Tuesday, June 10th**
• **Tech Networking Mixer** - 6:00 PM
  📍 Grand Hall | 🎫 Free registration
  Connect with fellow tech professionals over cocktails

**Wednesday, June 11th**
• **Wellness Workshop: Mindful Mornings** - 8:00 AM
  📍 Wellness Center | 🎫 $25
  Start your day with meditation and healthy breakfast

**Thursday, June 12th**
• **Building Tour & History Talk** - 12:00 PM
  📍 Lobby | 🎫 Free for tenants
  Learn fascinating stories about our iconic building

**🗓️ Next Week:**

**Monday, June 16th**
• **Sustainability Summit** - 9:00 AM - 5:00 PM
  📍 Conference Center | 🎫 $150
  Featuring keynotes on green building practices

**Friday, June 20th**
• **Summer Rooftop Party** - 7:00 PM
  📍 86th Floor Terrace | 🎫 $75
  Live music, cocktails, and stunning sunset views

Would you like me to register you for any of these events or get more details?`,

  "Nearby lunch spots": `Great question! Here are fantastic lunch options near the Empire State Building:

**🏢 In-Building Options:**

**Skyline Bistro** (15th Floor)
• Modern American cuisine with city views
• Business lunch specials 11:30 AM - 2:30 PM
• Reservations recommended: (212) 555-0123

**Metro Market** (Concourse Level)
• Fresh salads, sandwiches, grab-and-go options
• Open 7:00 AM - 7:00 PM
• Perfect for quick, healthy meals

**Empire Coffee Co.** (Ground Floor)
• Artisan coffee, pastries, light lunch items
• Great for casual meetings
• Mobile ordering available

**🚶‍♂️ Within 2 Blocks:**

**The Halal Guys** (2 min walk)
• Famous platters and gyros
• Quick service, outdoor seating

**Shake Shack** (3 min walk)
• Gourmet burgers and shakes
• Usually busy 12-1 PM

**Joe's Pizza** (1 min walk)
• Classic NY pizza slices
• Perfect for a quick bite

**🍽️ Fine Dining (5 min walk):**

**Keens Steakhouse**
• Historic steakhouse since 1885
• Reservations essential

Would you like me to make a reservation, check wait times, or get more details about any of these options?`
}

export function AIAssistantModal({ 
  isOpen, 
  onClose, 
  onMinimize, 
  initialPrompt 
}: AIAssistantModalProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (isOpen && initialPrompt) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        type: 'user',
        content: initialPrompt,
        timestamp: new Date()
      }
      
      setMessages([userMessage])
      setIsTyping(true)

      // Simulate AI response delay
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: demoResponses[initialPrompt] || "I'd be happy to help you with that! Let me gather some information for you.",
          timestamp: new Date()
        }
        setMessages(prev => [...prev, assistantMessage])
        setIsTyping(false)
      }, 2000)
    }
  }, [isOpen, initialPrompt])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "Thanks for your question! In a real implementation, I would provide a helpful response based on your query. This is a demo showing the conversation flow.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const getMessageIcon = (content: string) => {
    if (content.includes("spaces") || content.includes("room")) return Building
    if (content.includes("event")) return Calendar
    if (content.includes("lunch") || content.includes("food")) return MapPin
    if (content.includes("guest") || content.includes("register")) return UserPlus
    return Sparkles
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-4 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-white">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">AI Assistant</h2>
                <p className="text-sm text-gray-600">Empire State Building</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onMinimize}
                  className="h-10 w-10 hover:bg-white/50"
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-10 w-10 hover:bg-white/50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => {
                const IconComponent = message.type === 'assistant' ? getMessageIcon(message.content) : null
                
                return (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="max-w-2xl">
                      <div
                        className={`rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="whitespace-pre-wrap text-sm leading-relaxed">
                          {message.content}
                        </div>
                      </div>
                      <div className={`text-xs text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </motion.div>
                )
              })}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t bg-gray-50">
              <div className="flex gap-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about the building..."
                  className="flex-1 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 