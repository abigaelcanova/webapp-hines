"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Minimize2, Send, Sparkles, Building, Calendar, MapPin, UserPlus, ExternalLink, Phone, Navigation } from "lucide-react"

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
  cards?: Card[]
}

interface Card {
  id: string
  type: 'restaurant' | 'space' | 'event'
  title: string
  subtitle?: string
  image: string
  details: string[]
  actions: CardAction[]
}

interface CardAction {
  label: string
  type: 'primary' | 'secondary'
  icon?: any
  onClick: () => void
}

const demoCards: Record<string, Card[]> = {
  "Nearby lunch spots": [
    {
      id: "skyline-bistro",
      type: "restaurant",
      title: "Skyline Bistro",
      subtitle: "Modern American • 15th Floor",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
      details: ["$$-$$$", "Business lunch specials", "City views", "11:30 AM - 2:30 PM"],
      actions: [
        { label: "Book table", type: "primary", icon: Phone, onClick: () => console.log("Book Skyline Bistro") },
        { label: "View menu", type: "secondary", icon: ExternalLink, onClick: () => console.log("View menu") },
        { label: "Directions", type: "secondary", icon: Navigation, onClick: () => console.log("Get directions") }
      ]
    },
    {
      id: "metro-market",
      type: "restaurant", 
      title: "Metro Market",
      subtitle: "Fresh & Healthy • Concourse Level",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
      details: ["$-$$", "Grab & go options", "Salads & sandwiches", "7:00 AM - 7:00 PM"],
      actions: [
        { label: "Order ahead", type: "primary", icon: Phone, onClick: () => console.log("Order Metro Market") },
        { label: "View menu", type: "secondary", icon: ExternalLink, onClick: () => console.log("View menu") },
        { label: "Directions", type: "secondary", icon: Navigation, onClick: () => console.log("Get directions") }
      ]
    },
    {
      id: "halal-guys",
      type: "restaurant",
      title: "The Halal Guys", 
      subtitle: "Middle Eastern • 2 min walk",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      details: ["$-$$", "Famous platters", "Quick service", "Usually busy 12-1 PM"],
      actions: [
        { label: "Order ahead", type: "primary", icon: Phone, onClick: () => console.log("Order Halal Guys") },
        { label: "Get directions", type: "secondary", icon: Navigation, onClick: () => console.log("Get directions") }
      ]
    }
  ],
  "Great spaces for large groups": [
    {
      id: "grand-hall",
      type: "space",
      title: "Grand Hall",
      subtitle: "Main Floor • Up to 200 people",
      image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=400&h=300&fit=crop",
      details: ["State-of-the-art AV system", "Catering kitchen access", "Corporate events & galas", "Available: Tomorrow 2-6 PM"],
      actions: [
        { label: "Book now", type: "primary", icon: Calendar, onClick: () => console.log("Book Grand Hall") },
        { label: "View details", type: "secondary", icon: ExternalLink, onClick: () => console.log("View Grand Hall details") },
        { label: "Check availability", type: "secondary", icon: Calendar, onClick: () => console.log("Check availability") }
      ]
    },
    {
      id: "auditorium",
      type: "space",
      title: "Auditorium", 
      subtitle: "15th Floor • Up to 150 people",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
      details: ["Theater-style seating", "Professional lighting & stage", "Conferences & training", "Available: Next week Tue-Thu"],
      actions: [
        { label: "Book now", type: "primary", icon: Calendar, onClick: () => console.log("Book Auditorium") },
        { label: "View details", type: "secondary", icon: ExternalLink, onClick: () => console.log("View Auditorium details") },
        { label: "Check availability", type: "secondary", icon: Calendar, onClick: () => console.log("Check availability") }
      ]
    },
    {
      id: "rooftop-terrace",
      type: "space",
      title: "Rooftop Terrace",
      subtitle: "86th Floor • Up to 100 people",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      details: ["Stunning city views", "Outdoor heaters", "Networking & celebrations", "Available: Weekend evenings"],
      actions: [
        { label: "Book now", type: "primary", icon: Calendar, onClick: () => console.log("Book Rooftop Terrace") },
        { label: "View details", type: "secondary", icon: ExternalLink, onClick: () => console.log("View Rooftop details") },
        { label: "Check availability", type: "secondary", icon: Calendar, onClick: () => console.log("Check availability") }
      ]
    }
  ]
}

const demoResponses: Record<string, string> = {
  "Great spaces for large groups": "I found several excellent spaces perfect for large groups in the Empire State Building. Here are your best options:",

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

  "Nearby lunch spots": "Here are some great lunch options near the Empire State Building:"
}

function ActionCard({ card }: { card: Card }) {
  return (
    <div className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={card.image} 
          alt={card.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-medium text-gray-900 text-sm">{card.title}</h3>
          {card.subtitle && (
            <p className="text-xs text-gray-600">{card.subtitle}</p>
          )}
        </div>
        <div className="space-y-1 mb-4">
          {card.details.map((detail, index) => (
            <p key={index} className="text-xs text-gray-600">• {detail}</p>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {card.actions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <Button
                key={index}
                variant={action.type === 'primary' ? 'default' : 'outline'}
                size="sm"
                className="h-8 text-xs"
                onClick={action.onClick}
              >
                {IconComponent && <IconComponent className="h-3 w-3 mr-1" />}
                {action.label}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
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
          timestamp: new Date(),
          cards: demoCards[initialPrompt] || undefined
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
                      <div>
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
                        
                        {/* Cards */}
                        {message.cards && message.cards.length > 0 && (
                          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {message.cards.map((card) => (
                              <ActionCard key={card.id} card={card} />
                            ))}
                          </div>
                        )}
                        
                        <div className={`text-xs text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
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