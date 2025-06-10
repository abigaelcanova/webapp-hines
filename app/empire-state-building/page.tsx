"use client"

import { useState, useEffect, useRef } from "react"
import {
  Check,
  Search,
  Star,
  ChevronDown,
  Bell,
  Sparkles,
  Calendar,
  MapPin,
  Building,
  ChevronLeftIcon,
  ChevronRightIcon,
  BookOpen,
  User,
  Coffee,
  Wrench,
  AlertTriangle,
  X,
  CalendarDays,
  Home,
  Info,
  Newspaper,
  UserPlus,
  MessageSquare,
  Send,
  MoreHorizontal,
  Maximize2,
  Menu,
  LogOut,
  FileText,
  Smartphone,
  Mail,
  UtensilsCrossed,
  Store,
  Users,
  Gift,
  NotebookTabs,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { ModernCarousel } from "@/components/modern-carousel"
import Link from "next/link"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import { Checkbox } from "@/components/ui/checkbox"
import AnimatedTestimonialsDemo from "@/components/animated-testimonials-demo"
import { HeroCard } from "@/components/hero-card"
import { AIAssistantModal } from "@/components/ai-assistant-modal"
import { AssistantDrawer } from "@/components/assistant-drawer"

export default function VercelNavigation() {
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false)
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false)
  const [primaryBuilding, setPrimaryBuilding] = useState<string>("Empire State Building")
  const [notificationCount, setNotificationCount] = useState(3)
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(true)
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false)
  const [assistantDrawerOpen, setAssistantDrawerOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 4)) // May 2025
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 4, 30)) // May 30, 2025
  const [notificationPopoverOpen, setNotificationPopoverOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState("home")
  const [bookingView, setBookingView] = useState("calendar")
  const [bookingDate, setBookingDate] = useState(new Date(2025, 4, 22)) // May 22, 2025
  const [bookingViewType, setBookingViewType] = useState("day")
  const [selectedResources, setSelectedResources] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [currentMonthLabel, setCurrentMonthLabel] = useState("");
  const [bookingDateLabel, setBookingDateLabel] = useState("");
  const [selectedDateLabel, setSelectedDateLabel] = useState("");
  const [aboutTab, setAboutTab] = useState('Overview');
  const prevIsMobile = useRef(false)
  const [mobileAssistantDrawerOpen, setMobileAssistantDrawerOpen] = useState(false)
  const [mobileActivityDrawerOpen, setMobileActivityDrawerOpen] = useState(false)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [aiModalOpen, setAiModalOpen] = useState(false)
  const [aiModalPrompt, setAiModalPrompt] = useState("")
  const [sharedMessages, setSharedMessages] = useState<any[]>([])
  const [sharedInputValue, setSharedInputValue] = useState("")

  useEffect(() => {
    setCurrentMonthLabel(
      currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })
    );
  }, [currentMonth]);

  useEffect(() => {
    setBookingDateLabel(
      bookingDate.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" })
    );
  }, [bookingDate]);

  useEffect(() => {
    setSelectedDateLabel(
      selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })
    );
  }, [selectedDate]);

  // Keyboard shortcuts for search modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && searchModalOpen) {
        setSearchModalOpen(false)
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        setSearchModalOpen(true)
      }
    }

    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      // Only close drawer when transitioning from desktop to mobile
      if (mobile && !prevIsMobile.current && leftDrawerOpen) {
        setLeftDrawerOpen(false)
      }
      prevIsMobile.current = mobile
    }

    // Initial check
    handleResize()

    document.addEventListener("keydown", handleKeyDown)
    window.addEventListener("resize", handleResize)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("resize", handleResize)
    }
  }, [searchModalOpen, leftDrawerOpen])

  const setPrimary = (buildingName: string) => {
    setPrimaryBuilding(buildingName)
  }

  const openAssistant = () => {
    if (isMobile) {
      setMobileAssistantDrawerOpen(true)
    } else {
      setRightDrawerOpen(false)
      setAssistantDrawerOpen(true)
    }
  }

  const handleAssistantSubmit = (message: string) => {
    setAiModalPrompt(message)
    setSharedMessages([]) // Clear shared messages for new conversation
    setSharedInputValue("") // Clear shared input for new conversation
    setAiModalOpen(true)
  }

  const handleAiModalMinimize = (messages: any[], inputValue: string) => {
    setSharedMessages(messages)
    setSharedInputValue(inputValue)
    setAiModalOpen(false)
    // Open the assistant drawer when minimizing
    if (isMobile) {
      setMobileAssistantDrawerOpen(true)
    } else {
      setAssistantDrawerOpen(true)
      setRightDrawerOpen(false)
    }
  }

  const handleAssistantMaximize = (inputValue: string) => {
    setSharedInputValue(inputValue)
    setAiModalOpen(true)
    setAssistantDrawerOpen(false)
  }

  const openActivity = () => {
    if (isMobile) {
      setMobileActivityDrawerOpen(true)
    } else {
      setAssistantDrawerOpen(false)
      setRightDrawerOpen(true)
    }
  }

  const handleLogout = () => {
    // For prototype: just redirect to home page
    window.location.href = "/"
  }

  const cities = [
    { name: "New York", initials: "NY", color: "bg-purple-600", selected: true },
    { name: "San Francisco", initials: "SF", color: "bg-blue-500", selected: false },
    { name: "Boston", initials: "B", color: "bg-green-500", selected: false },
    { name: "Chicago", initials: "C", color: "bg-yellow-500", selected: false },
    { name: "Los Angeles", initials: "LA", color: "bg-red-500", selected: false },
    { name: "Miami", initials: "M", color: "bg-indigo-500", selected: false },
  ]

  const buildings = [
    {
      name: "Empire State Building",
      image: "https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "One World Trade Center",
      image: "https://images.unsplash.com/photo-1582439170934-d2fbbe3f0937?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "30 Hudson Yards",
      image: "https://images.unsplash.com/photo-1577351594944-ef7e7d394fc8?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Chrysler Building",
      image: "https://images.unsplash.com/photo-1609619385002-f40f1f04888c?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Flatiron Building",
      image: "https://images.unsplash.com/photo-1617688319108-cb3bdc88f587?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "MetLife Building",
      image: "https://images.unsplash.com/photo-1609619385639-63e765f28408?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Time Warner Center",
      image: "https://images.unsplash.com/photo-1582439170934-d2fbbe3f0937?w=120&h=120&fit=crop&crop=faces,center",
    },
  ]

  const notifications = [
    {
      id: 1,
      title: "New guest registered",
      description: "John Smith has been registered for today's meeting",
      time: "2 minutes ago",
      type: "guest",
      unread: true,
    },
    {
      id: 2,
      title: "Maintenance request completed",
      description: "The broken light in Conference Room A has been fixed",
      time: "1 hour ago",
      type: "maintenance",
      unread: true,
    },
    {
      id: 3,
      title: "Event reminder",
      description: "Townhall Meeting starts in 30 minutes",
      time: "2 hours ago",
      type: "event",
      unread: false,
    },
    {
      id: 4,
      title: "Space booking confirmed",
      description: "Your booking for Meeting Room 2B has been confirmed",
      time: "3 hours ago",
      type: "booking",
      unread: false,
    },
    {
      id: 5,
      title: "New building announcement",
      description: "Rooftop terrace will be closed for maintenance this weekend",
      time: "1 day ago",
      type: "announcement",
      unread: false,
    },
  ]

  const bookingResources = [
    { id: "conf-a", name: "Conference Room A", type: "conference" },
    { id: "meeting", name: "Meeting Room", type: "meeting" },
    { id: "lab-101", name: "Lab 101", type: "lab" },
    { id: "research", name: "Research Lab", type: "lab" },
    { id: "auditorium", name: "Auditorium", type: "presentation" },
    { id: "training", name: "Training Room", type: "training" },
    { id: "board", name: "Board Room", type: "meeting" },
    { id: "innovation", name: "Innovation Hub", type: "workspace" },
    { id: "collaboration", name: "Collaboration Space", type: "workspace" },
    { id: "quiet", name: "Quiet Zone", type: "workspace" },
  ]

  const timeSlots = [
    "8 am",
    "9 am",
    "10 am",
    "11 am",
    "12 pm",
    "1 pm",
    "2 pm",
    "3 pm",
    "4 pm",
    "5 pm",
    "6 pm",
    "7 pm",
    "8 pm",
    "9 pm",
  ]

  const selectedCity = cities.find((city) => city.selected)
  const selectedBuilding = buildings.find((building) => building.name === primaryBuilding) || buildings[0]

  // Carousel slides data
  const carouselSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&crop=faces,center",
      title: "Team Collaboration",
      subtitle: "Discover how our teams work together to create amazing experiences and drive innovation.",
      logo: "/placeholder.svg?height=32&width=32&text=🏢",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&crop=faces,center",
      title: "Modern Workspace",
      subtitle: "Experience our state-of-the-art facilities designed for productivity and comfort.",
      logo: "/placeholder.svg?height=32&width=32&text=💼",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&crop=faces,center",
      title: "Innovation Hub",
      subtitle: "Join us in shaping the future with cutting-edge technology and creative solutions.",
      logo: "/placeholder.svg?height=32&width=32&text=🚀",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1515378791036-0648a814c963?w=800&h=600&fit=crop&crop=faces,center",
      title: "Community Events",
      subtitle: "Connect with colleagues and participate in exciting events and activities.",
      logo: "/placeholder.svg?height=32&width=32&text=🎉",
    },
  ]

  // Calendar functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay() || 7 // Convert Sunday (0) to 7 for Monday-based week
  }

  const getPreviousMonthDays = (year: number, month: number) => {
    const firstDay = getFirstDayOfMonth(year, month)
    const prevMonthDays = []
    if (firstDay > 1) {
      const daysInPrevMonth = getDaysInMonth(year, month - 1)
      for (let i = daysInPrevMonth - firstDay + 2; i <= daysInPrevMonth; i++) {
        prevMonthDays.push(i)
      }
    }
    return prevMonthDays
  }

  const getNextMonthDays = (year: number, month: number) => {
    const daysInMonth = getDaysInMonth(year, month)
    const lastDay = new Date(year, month, daysInMonth).getDay() || 7
    const nextMonthDays = []
    if (lastDay < 7) {
      for (let i = 1; i <= 7 - lastDay; i++) {
        nextMonthDays.push(i)
      }
    }
    return nextMonthDays
  }

  const renderCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const prevMonthDays = getPreviousMonthDays(year, month)
    const nextMonthDays = getNextMonthDays(year, month)

    // Days with events or indicators
    const daysWithDots = [
      { date: 1, color: "bg-blue-500" },
      { date: 10, color: "bg-blue-500", highlight: true },
      { date: 30, color: "bg-blue-500", selected: true },
      { date: 34, color: "bg-gray-400" }, // June 4 (30 days in May + 4)
    ]

    const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

    return (
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => {
              const newMonth = new Date(currentMonth)
              newMonth.setMonth(newMonth.getMonth() - 1)
              setCurrentMonth(newMonth)
            }}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { const newMonth = new Date(currentMonth); newMonth.setMonth(newMonth.getMonth() - 1); setCurrentMonth(newMonth); } }}
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-500" />
            <span className="sr-only">Previous month</span>
          </Button>
          <h2 className="text-sm font-medium text-gray-700">
            {currentMonthLabel}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={() => {
              const newMonth = new Date(currentMonth)
              newMonth.setMonth(newMonth.getMonth() + 1)
              setCurrentMonth(newMonth)
            }}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { const newMonth = new Date(currentMonth); newMonth.setMonth(newMonth.getMonth() + 1); setCurrentMonth(newMonth); } }}
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
            <span className="sr-only">Next month</span>
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {weekDays.map((day) => (
            <div key={day} className="py-1 text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}

          {/* Previous month days */}
          {prevMonthDays.map((day) => (
            <div key={`prev-${day}`} className="p-1 text-center">
              <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs text-gray-400">{day}</div>
            </div>
          ))}

          {/* Current month days */}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
            const dayWithDot = daysWithDots.find((d) => d.date === day)
            const isSelected =
              selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year
            const isHighlighted = dayWithDot?.highlight

            return (
              <div key={`current-${day}`} className="p-1 text-center">
                <button
                  type="button"
                  className={cn(
                    "h-7 w-7 rounded-full flex items-center justify-center text-xs relative",
                    isSelected ? "bg-gray-200 text-gray-900" : "",
                    isHighlighted ? "bg-blue-600 text-white" : "",
                    !isSelected && !isHighlighted ? "hover:bg-gray-100" : "",
                  )}
                  onClick={() => setSelectedDate(new Date(year, month, day))}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { const newDate = new Date(year, month, day); setSelectedDate(newDate); } }}
                >
                  {day}
                  {dayWithDot && !isHighlighted && (
                    <span className={cn("absolute bottom-1 h-1 w-1 rounded-full", dayWithDot.color)} />
                  )}
                </button>
              </div>
            )
          })}

          {/* Next month days */}
          {nextMonthDays.map((day) => {
            const dayWithDot = daysWithDots.find((d) => d.date === daysInMonth + day)

            return (
              <div key={`next-${day}`} className="p-1 text-center">
                <div className="h-7 w-7 rounded-full flex items-center justify-center text-xs text-gray-400 relative">
                  {day}
                  {dayWithDot && (
                    <span className={cn("absolute bottom-1 h-1 w-1 rounded-full", dayWithDot.color)} />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#F9FAFB]">
      <div className="flex flex-col min-h-screen w-full">
        <header className="sticky top-0 z-40 grid grid-cols-12 items-center h-14 px-4 bg-[#F9FAFB]">
          {/* Left section - Menu and Logo */}
          <div className="col-span-2 flex items-center gap-4">
            {/* Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => {
                if (isMobile) {
                  setLeftDrawerOpen(true)
                } else {
                  setLeftDrawerOpen(!leftDrawerOpen)
                }
              }}
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>

            {/* Logo */}
            <div className="h-8">
              <img src="/logo.svg" alt="Logo" className="h-full w-auto" />
            </div>
          </div>

          {/* Middle section - City & Building Selectors */}
          <div className="col-span-8 flex items-center gap-4">
            {/* City & Building Selector */}
            <DropdownMenu open={teamDropdownOpen} onOpenChange={setTeamDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto p-2 gap-2 hover:bg-muted">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {!isMobile && <span className="font-medium">{selectedCity?.name}</span>}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[600px] p-0 z-50">
                <div className="grid grid-cols-2">
                  {/* Cities Panel */}
                  <div className="border-r">
                    <div className="p-3 border-b">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Find City..." className="pl-9" />
                      </div>
                    </div>
                    <div className="p-2">
                      <div className="px-2 py-1 text-sm font-medium text-muted-foreground">Cities</div>
                      <div className="space-y-1">
                        {cities.map((city) => (
                          <Button key={city.name} variant="ghost" className="w-full justify-between h-auto p-2">
                            <span className="truncate">{city.name}</span>
                            {city.selected && <Check className="h-4 w-4 text-muted-foreground" />}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Buildings Panel */}
                  <div>
                    <div className="p-3 border-b">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Find Building..." className="pl-9" />
                      </div>
                    </div>
                    <div className="p-2">
                      {primaryBuilding && (
                        <>
                          <div className="px-2 py-1 text-sm font-medium text-muted-foreground">Primary</div>
                          <div className="space-y-1 mb-2">
                            <Button variant="ghost" className="w-full justify-start h-auto p-2">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage
                                  src={selectedBuilding.image || "/placeholder.svg"}
                                  alt={selectedBuilding.name}
                                />
                                <AvatarFallback className="bg-black text-white text-xs font-medium">
                                  <Building className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <span className="truncate">{primaryBuilding}</span>
                            </Button>
                          </div>
                          <Separator className="my-2" />
                        </>
                      )}

                      <div className="px-2 py-1 text-sm font-medium text-muted-foreground">Buildings</div>
                      <div className="space-y-1">
                        {buildings.map((building) => (
                          <div
                            key={building.name}
                            className="group flex items-center justify-between rounded-md hover:bg-muted p-2"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={building.image || "/placeholder.svg"} alt={building.name} />
                                <AvatarFallback className="bg-black text-white text-xs font-medium">
                                  <Building className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <span className="truncate">{building.name}</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 h-auto p-1"
                              onClick={(e) => {
                                e.stopPropagation()
                                setPrimary(building.name)
                              }}
                            >
                              <Star
                                className={`h-4 w-4 ${
                                  primaryBuilding === building.name
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                              />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Building Selector */}
            <DropdownMenu open={projectDropdownOpen} onOpenChange={setProjectDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-auto p-2 gap-2 hover:bg-muted">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={selectedBuilding.image || "/placeholder.svg"} alt={selectedBuilding.name} />
                    <AvatarFallback className="bg-black text-white text-xs font-medium">
                      <Building className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  {!isMobile && <span className="font-medium">{selectedBuilding.name}</span>}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-[346px] p-0 z-50">
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Find Building..." className="pl-9" />
                  </div>
                </div>
                <div className="p-2">
                  {primaryBuilding && (
                    <>
                      <div className="px-2 py-1 text-sm font-medium text-muted-foreground">Primary</div>
                      <div className="space-y-1 mb-2">
                        <Button variant="ghost" className="w-full justify-start h-auto p-2">
                          <Avatar className="h-6 w-6 mr-2">
                            <AvatarImage src={selectedBuilding.image || "/placeholder.svg"} alt={selectedBuilding.name} />
                            <AvatarFallback className="bg-black text-white text-xs font-medium">
                              <Building className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <span className="truncate">{primaryBuilding}</span>
                        </Button>
                      </div>
                      <Separator className="my-2" />
                    </>
                  )}

                  <div className="px-2 py-1 text-sm font-medium text-muted-foreground">Buildings</div>
                  <div className="space-y-1">
                    {buildings
                      .filter((b) => b.name !== primaryBuilding)
                      .slice(0, 3)
                      .map((building) => (
                        <div
                          key={building.name}
                          className="group flex items-center justify-between rounded-md hover:bg-muted p-2"
                        >
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={building.image || "/placeholder.svg"} alt={building.name} />
                              <AvatarFallback className="bg-black text-white text-xs font-medium">
                                <Building className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                            <span className="truncate">{building.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 h-auto p-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              setPrimary(building.name)
                            }}
                          >
                            <Star
                              className={`h-4 w-4 ${
                                primaryBuilding === building.name
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            />
                          </Button>
                        </div>
                      ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right side icons */}
          <div className="col-span-2 flex items-center justify-end space-x-2">
            <Button variant="ghost" size="icon" className="h-9 w-9 p-2" onClick={() => setSearchModalOpen(true)}>
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-9 w-9 p-2", assistantDrawerOpen && "bg-primary/10 text-primary")}
              onClick={openAssistant}
            >
              <Sparkles className="h-4 w-4" />
              <span className="sr-only">AI Features</span>
            </Button>
            <Popover open={notificationPopoverOpen} onOpenChange={setNotificationPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 p-2 relative">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                  {notificationCount > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs font-normal"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0 z-50">
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-medium text-sm">Notifications</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Mark all as read
                  </Button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    <div className="divide-y">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "p-4 hover:bg-muted/50 cursor-pointer transition-colors",
                            notification.unread && "bg-blue-50/50",
                          )}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={cn(
                                "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                                notification.unread ? "bg-blue-500" : "bg-transparent",
                              )}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground mb-1">{notification.title}</p>
                              <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                {notification.description}
                              </p>
                              <p className="text-xs text-muted-foreground">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Bell className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No notifications</p>
                    </div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-3 border-t">
                    <Button variant="ghost" size="sm" className="w-full text-xs">
                      View all notifications
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>

            {/* Separator */}
            <div className="w-px h-6 bg-border mx-3" />

            {/* Activity Button */}
            <Button
              variant={rightDrawerOpen ? "default" : "outline"}
              size="sm"
              className={cn(
                "h-9 px-3 gap-2 rounded-full transition-colors",
                rightDrawerOpen && "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20",
              )}
              onClick={openActivity}
            >
              <Calendar className="h-4 w-4" />
              {!isMobile && <span className="text-sm font-medium">Activity</span>}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 ml-3 cursor-pointer">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">JD</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="flex items-center gap-3 p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">John Doe</span>
                    <span className="text-xs text-muted-foreground">john.doe@company.com</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Building className="h-4 w-4 mr-2" />
                  My buildings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                
                {/* Email Call-out */}
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md mx-2 my-2">
                  <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-blue-100 rounded-md">
                      <Mail className="h-3.5 w-3.5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-blue-900 mb-1">Add personal email</p>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        Connect your personal email to see all buildings you have access to across organizations.
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2 h-6 px-2 text-xs border-blue-300 text-blue-700 hover:bg-blue-100"
                      >
                        Add email
                      </Button>
                    </div>
                  </div>
                </div>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Left Drawer */}
          {isMobile && leftDrawerOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
              onClick={() => setLeftDrawerOpen(false)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setLeftDrawerOpen(false) }}
              role="button"
              tabIndex={0}
            />
          )}
          <aside
            className={cn(
              "bg-white lg:bg-[#F9FAFB] transition-all duration-300 ease-in-out",
              "fixed lg:sticky top-14 self-start h-[calc(100vh-3.5rem)]",
              "lg:sticky lg:block",
              isMobile
                ? leftDrawerOpen
                  ? "fixed inset-y-0 left-0 z-50 w-64 shadow-lg"
                  : "hidden"
                : leftDrawerOpen
                  ? "w-1/6"
                  : "w-0 overflow-hidden",
            )}
          >
            {leftDrawerOpen && (
              <div className="h-full p-4 flex flex-col overflow-hidden">
                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto">
                  <nav className="space-y-0.5 mb-8">
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-auto p-2 font-normal",
                        currentPage === "home"
                          ? "bg-gray-100 text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                      onClick={() => setCurrentPage("home")}
                    >
                      <Home className="h-4 w-4 mr-3" />
                      <span className="text-sm">Home</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto p-2 text-muted-foreground hover:text-foreground font-normal"
                      onClick={() => setCurrentPage("about")}
                    >
                      <Info className="h-4 w-4 mr-3" />
                      <span className="text-sm">About</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto p-2 text-muted-foreground hover:text-foreground font-normal"
                    >
                      <Newspaper className="h-4 w-4 mr-3" />
                      <span className="text-sm flex-1 text-left">Your feed</span>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full ml-auto">
                        3
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto p-2 text-muted-foreground hover:text-foreground font-normal"
                    >
                      <CalendarDays className="h-4 w-4 mr-3" />
                      <span className="text-sm flex-1 text-left">Events</span>
                      <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full ml-auto">
                        2
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-auto p-2 font-normal",
                        currentPage === "book-space"
                          ? "bg-gray-100 text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                      onClick={() => setCurrentPage("book-space")}
                    >
                      <Building className="h-4 w-4 mr-3" />
                      <span className="text-sm">Book a space</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-auto p-2 font-normal",
                        currentPage === "directory"
                          ? "bg-gray-100 text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                      onClick={() => setCurrentPage("directory")}
                    >
                      <NotebookTabs className="h-4 w-4 mr-3" />
                      <span className="text-sm">Directory</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto p-2 text-muted-foreground hover:text-foreground font-normal"
                    >
                      <Wrench className="h-4 w-4 mr-3" />
                      <span className="text-sm">Click to fix</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto p-2 text-muted-foreground hover:text-foreground font-normal"
                    >
                      <UserPlus className="h-4 w-4 mr-3" />
                      <span className="text-sm">Register a guest</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-auto p-2 font-normal",
                        currentPage === "perks-rewards"
                          ? "bg-gray-100 text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                      onClick={() => setCurrentPage("perks-rewards")}
                    >
                      <Gift className="h-4 w-4 mr-3" />
                      <span className="text-sm">Perks & Rewards</span>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-auto p-2 text-muted-foreground hover:text-foreground font-normal"
                    >
                      <MessageSquare className="h-4 w-4 mr-3" />
                      <span className="text-sm">Feedback</span>
                    </Button>
                  </nav>

                  {/* Quick Links Section */}
                  <div className="mb-6">
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 px-2">Helpful links</h4>
                    <div className="space-y-1">
                      <a
                        href="https://example.com/resources"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-left px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-md transition-colors"
                      >
                        Building Resources
                      </a>
                      <a
                        href="https://example.com/policies"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-left px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-md transition-colors"
                      >
                        Policies & Guidelines
                      </a>
                      <a
                        href="https://example.com/emergency"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full text-left px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-gray-100 rounded-md transition-colors"
                      >
                        Emergency Procedures
                      </a>
                    </div>
                  </div>

                  {/* Admin Section */}
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 px-2">Admin</h4>
                    <div className="space-y-1">
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground font-normal"
                      >
                        User Management
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground font-normal"
                      >
                        Feature Management
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground font-normal"
                      >
                        General Settings
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Explore Card - Always visible at bottom */}
                <div className="mt-4 flex-shrink-0">
                  <Link href="/explore" className="relative bg-white rounded-lg p-4 text-gray-900 border shadow-sm cursor-pointer hover:bg-gray-50 block focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden">
                    <div className="absolute inset-0">
                      <img 
                        src="/map-bg.png" 
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover opacity-[0.15]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/70" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-xs font-medium text-gray-900 mb-1">Explore nearby</h4>
                      <p className="text-xs text-gray-600 leading-relaxed">Spaces, events, food & more</p>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </aside>

          {/* Middle Content */}
          <main
            className={cn(
              "flex-1 min-w-0",
              "mx-auto max-w-[1024px] px-4",
              "py-4",
              !leftDrawerOpen && !rightDrawerOpen && !assistantDrawerOpen && "lg:mx-auto"
            )}
          >
            {currentPage === "home" ? (
              <div className="space-y-6">
                {/* Hero Card */}
                <HeroCard
                  backgroundImage="https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=1920&h=600&fit=crop&crop=faces,center"
                  onAssistantSubmit={handleAssistantSubmit}
                />

                {/* Banner Alert */}
                {!bannerDismissed && (
                  <Alert className="border-amber-200 bg-amber-50 text-amber-900">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertDescription className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">5 Lab | Boilers Down Last Night</span>
                        <br />
                        <span className="text-sm">
                          Please be advised that the boilers were down last night so temperatures are low. Our team is working to restore as soon as possible—thank you!
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-amber-700 hover:text-amber-900 hover:bg-amber-100 ml-4 flex-shrink-0"
                        onClick={() => setBannerDismissed(true)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Dismiss alert</span>
                      </Button>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-6 rounded-xl border bg-white shadow-sm">
                    <Building className="h-6 w-6 mb-4 text-gray-500 stroke-[1.5]" />
                    <h3 className="text-base font-medium mb-2">Book a space</h3>
                    <p className="text-sm text-muted-foreground mb-4">Reserve meeting rooms, workspaces, and more.</p>
                  </div>

                  <div className="p-6 rounded-xl border bg-white shadow-sm">
                    <UserPlus className="h-6 w-6 mb-4 text-gray-500 stroke-[1.5]" />
                    <h3 className="text-base font-medium mb-2">Register a guest</h3>
                    <p className="text-sm text-muted-foreground mb-4">Pre-register visitors for easy check-in.</p>
                  </div>

                  <div className="p-6 rounded-xl border bg-white shadow-sm">
                    <Wrench className="h-6 w-6 mb-4 text-gray-500 stroke-[1.5]" />
                    <h3 className="text-base font-medium mb-2">Click to fix</h3>
                    <p className="text-sm text-muted-foreground mb-4">Report and track maintenance issues.</p>
                  </div>

                  <div className="p-6 rounded-xl border bg-white shadow-sm">
                    <CalendarDays className="h-6 w-6 mb-4 text-gray-500 stroke-[1.5]" />
                    <h3 className="text-base font-medium mb-2">View events</h3>
                    <p className="text-sm text-muted-foreground mb-4">See upcoming building events and activities.</p>
                  </div>
                </div>

                {/* Welcome Card with Carousel and Blog Posts */}
                <div className="pt-16 mt-[80px]">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-normal">What's Happening</h2>
                    <Button variant="ghost" className="text-sm gap-2" onClick={() => setCurrentPage("your-feed")}>
                      View all updates
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
                    {/* Carousel Half */}
                    <div className="relative rounded-xl overflow-hidden bg-card border shadow-sm h-full">
                      <ModernCarousel slides={carouselSlides} className="h-full" />
                    </div>

                    {/* Blog Posts Half */}
                    <div className="flex flex-col justify-between h-full">
                      {/* Blog Post 1 */}
                      <div className="group rounded-xl border bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow flex h-[calc(33%-0.5rem)]">
                        <div className="w-1/3 relative">
                          <img 
                            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop" 
                            alt="Rooftop garden" 
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                        </div>
                        <div className="w-2/3 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-50 text-xs">
                              Sustainability
                            </Badge>
                            <span className="text-xs text-muted-foreground">2 days ago</span>
                          </div>
                          <h3 className="text-sm font-semibold mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">New Rooftop Garden Opening This Summer</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">Experience our latest green initiative with stunning city views. Perfect for meetings, lunches, or quiet work time.</p>
                        </div>
                      </div>

                      {/* Blog Post 2 */}
                      <div className="group rounded-xl border bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow flex h-[calc(33%-0.5rem)]">
                        <div className="w-1/3 relative">
                          <img 
                            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop" 
                            alt="Fitness center" 
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                        </div>
                        <div className="w-2/3 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="bg-purple-50 text-purple-700 hover:bg-purple-50 text-xs">
                              Wellness
                            </Badge>
                            <span className="text-xs text-muted-foreground">4 days ago</span>
                          </div>
                          <h3 className="text-sm font-semibold mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">Expanded Fitness Center Hours</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">Our newly renovated fitness center will now be open 24/7 with enhanced security and cleaning protocols.</p>
                        </div>
                      </div>

                      {/* Blog Post 3 */}
                      <div className="group rounded-xl border bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow flex h-[calc(33%-0.5rem)]">
                        <div className="w-1/3 relative">
                          <img 
                            src="https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&h=400&fit=crop" 
                            alt="Electric vehicle charging stations" 
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                        </div>
                        <div className="w-2/3 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-50 text-xs">
                              Infrastructure
                            </Badge>
                            <span className="text-xs text-muted-foreground">1 week ago</span>
                          </div>
                          <h3 className="text-sm font-semibold mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">New EV Charging Stations Added</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2">Ten new electric vehicle charging stations have been installed in the parking garage, supporting our commitment to sustainability.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Testimonials Section */}
                <div className="pt-16 mt-[80px]">
                  <div className="flex items-center justify-center mb-0">
                    <h1 className="text-2xl font-bold text-black">Meet the staff</h1>
                  </div>
                  <AnimatedTestimonialsDemo />
                </div>

                {/* Resources & Mobile App Cards */}
                <div className="pt-16 mt-[80px]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Resources Card */}
                    <div className="bg-white rounded-xl border shadow-sm p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">Resources</h3>
                          <p className="text-sm text-gray-600 mb-4">
                            Access important documents and forms for building services and amenities.
                          </p>
                          <div className="space-y-2">
                            <a 
                              href="/resources/gym-waiver.pdf" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              <FileText className="h-4 w-4" />
                              Gym Waiver Form
                            </a>
                            <a 
                              href="/resources/parking-pass.pdf" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              <FileText className="h-4 w-4" />
                              Parking Pass Application
                            </a>
                            <a 
                              href="/resources/building-policies.pdf" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              <FileText className="h-4 w-4" />
                              Building Policies & Guidelines
                            </a>
                            <a 
                              href="/resources/emergency-procedures.pdf" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                            >
                              <FileText className="h-4 w-4" />
                              Emergency Procedures
                            </a>
                          </div>
                          <Button variant="outline" className="mt-4 w-full">
                            View all resources
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Mobile App Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border shadow-sm p-6 text-white hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-white/10 rounded-lg">
                          <Smartphone className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">Get the Mobile App</h3>
                          <p className="text-sm text-gray-300 mb-4">
                            Access everything on the go with mobile check-in, space booking, and building services.
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <div className="space-y-2 text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                                  <span>Mobile access & check-in</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                                  <span>Book spaces on the go</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                                  <span>Real-time notifications</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                                  <span>Building directory</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="w-20 h-20 bg-white rounded-lg p-2 flex items-center justify-center">
                                <img 
                                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRkZGRkZGIi8+CjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAwMDAiLz4KPHJlY3QgeD0iOCIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSIxNiIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSIyNCIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSIzMiIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSI0MCIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSI0OCIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSI1NiIgeT0iMCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSIwIiB5PSI4IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjE2IiB5PSI4IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjMyIiB5PSI4IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjQ4IiB5PSI4IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjU2IiB5PSI4IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjAiIHk9IjE2IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSIyNCIgeT0iMTYiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAwMDAiLz4KPHJlY3QgeD0iMzIiIHk9IjE2IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjQ4IiB5PSIxNiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSI1NiIgeT0iMTYiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAwMDAiLz4KPHJlY3QgeD0iMCIgeT0iMjQiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAwMDAiLz4KPHJlY3QgeD0iMTYiIHk9IjI0IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjI0IiB5PSIyNCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSIzMiIgeT0iMjQiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAwMDAiLz4KPHJlY3QgeD0iNDgiIHk9IjI0IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjU2IiB5PSIyNCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSIwIiB5PSIzMiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSI4IiB5PSIzMiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSIxNiIgeT0iMzIiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAwMDAiLz4KPHJlY3QgeD0iMjQiIHk9IjMyIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjMyIiB5PSIzMiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSI0MCIgeT0iMzIiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAwMDAiLz4KPHJlY3QgeD0iNDgiIHk9IjMyIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjU2IiB5PSIzMiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSI4IiB5PSI0MCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSIyNCIgeT0iNDAiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAwMDAiLz4KPHJlY3QgeD0iNDAiIHk9IjQwIiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjU2IiB5PSI0MCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSIwIiB5PSI0OCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSIxNiIgeT0iNDgiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAwMDAiLz4KPHJlY3QgeD0iMjQiIHk9IjQ4IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjMyIiB5PSI0OCIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSI0OCIgeT0iNDgiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAwMDAiLz4KPHJlY3QgeD0iNTYiIHk9IjQ4IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjAiIHk9IjU2IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjgiIHk9IjU2IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjE2IiB5PSI1NiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSIyNCIgeT0iNTYiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAwMDAiLz4KPHJlY3QgeD0iMzIiIHk9IjU2IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+CjxyZWN0IHg9IjQwIiB5PSI1NiIgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iIzAwMDAwMCIvPgo8cmVjdCB4PSI0OCIgeT0iNTYiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMwMDAwMDAiLz4KPHJlY3QgeD0iNTYiIHk9IjU2IiB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMDAwMDAwIi8+Cjwvc3ZnPgo="
                                  alt="QR Code"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <p className="text-xs text-gray-400 text-center mt-2">Scan to download</p>
                            </div>
                          </div>
                          <Button variant="secondary" className="mt-4 w-full bg-white text-gray-900 hover:bg-gray-100">
                            Download App
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Events Section */}
                <div className="pt-16 mt-[80px]">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-normal">Upcoming Events</h2>
                    <Button variant="ghost" className="text-sm gap-2" onClick={() => setCurrentPage("events")}>
                      View all events
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Event Card 1 */}
                    <div className="group relative bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                      <img 
                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop" 
                        alt="Networking event" 
                        className="aspect-[4/3] object-cover w-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <p className="text-sm font-medium mb-1">Tech Networking Mixer</p>
                        <p className="text-xs opacity-80">June 15, 2025 • 6:00 PM</p>
                      </div>
                      <div className="p-4 group-hover:opacity-0 transition-opacity">
                        <p className="text-sm font-medium text-gray-900 mb-1">Tech Networking Mixer</p>
                        <p className="text-xs text-gray-600">June 15, 2025 • 6:00 PM</p>
                      </div>
                    </div>

                    {/* Event Card 2 */}
                    <div className="group relative bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                      <img 
                        src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=500&fit=crop" 
                        alt="Wellness workshop" 
                        className="aspect-[4/3] object-cover w-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <p className="text-sm font-medium mb-1">Wellness Workshop</p>
                        <p className="text-xs opacity-80">June 20, 2025 • 12:00 PM</p>
                      </div>
                      <div className="p-4 group-hover:opacity-0 transition-opacity">
                        <p className="text-sm font-medium text-gray-900 mb-1">Wellness Workshop</p>
                        <p className="text-xs text-gray-600">June 20, 2025 • 12:00 PM</p>
                      </div>
                    </div>

                    {/* Event Card 3 */}
                    <div className="group relative bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                      <img 
                        src="https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=500&fit=crop" 
                        alt="Building tour" 
                        className="aspect-[4/3] object-cover w-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                        <p className="text-sm font-medium mb-1">Building Tour & Happy Hour</p>
                        <p className="text-xs opacity-80">June 25, 2025 • 4:00 PM</p>
                      </div>
                      <div className="p-4 group-hover:opacity-0 transition-opacity">
                        <p className="text-sm font-medium text-gray-900 mb-1">Building Tour & Happy Hour</p>
                        <p className="text-xs text-gray-600">June 25, 2025 • 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* On-site Food and Retail Section */}
                <div className="pt-16 mt-[80px]">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-normal">On-site Food and Retail</h2>
                    <Button variant="ghost" className="text-sm gap-2" onClick={() => setCurrentPage("food-retail")}>
                      View all
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Coffee Shop */}
                    <div className="group relative bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop" 
                          alt="Empire Coffee Co." 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                            <Coffee className="h-3 w-3 mr-1" />
                            Coffee Shop
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-sm font-medium mb-1">Empire Coffee Co.</p>
                          <p className="text-xs opacity-90">Premium coffee • Fresh pastries • Quick bites</p>
                        </div>
                      </div>
                      <div className="p-4 group-hover:opacity-0 transition-opacity">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-900">Empire Coffee Co.</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">4.8</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">Premium coffee • Fresh pastries • Quick bites</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-600 font-medium">• Open now</span>
                          <span className="text-gray-500">Ground floor</span>
                        </div>
                      </div>
                    </div>

                    {/* Restaurant 1 */}
                    <div className="group relative bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop" 
                          alt="Skyline Bistro" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            <UtensilsCrossed className="h-3 w-3 mr-1" />
                            Restaurant
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-sm font-medium mb-1">Skyline Bistro</p>
                          <p className="text-xs opacity-90">Modern American • Business lunch • City views</p>
                        </div>
                      </div>
                      <div className="p-4 group-hover:opacity-0 transition-opacity">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-900">Skyline Bistro</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">4.6</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">Modern American • Business lunch • City views</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-600 font-medium">• Open now</span>
                          <span className="text-gray-500">15th floor</span>
                        </div>
                      </div>
                    </div>

                    {/* Restaurant 2 */}
                    <div className="group relative bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                      <div className="aspect-[4/3] relative overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop" 
                          alt="Metro Market" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <Store className="h-3 w-3 mr-1" />
                            Market
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-3 left-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <p className="text-sm font-medium mb-1">Metro Market</p>
                          <p className="text-xs opacity-90">Fresh salads • Grab & go • Healthy options</p>
                        </div>
                      </div>
                      <div className="p-4 group-hover:opacity-0 transition-opacity">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium text-gray-900">Metro Market</h3>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs text-gray-600">4.7</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">Fresh salads • Grab & go • Healthy options</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-green-600 font-medium">• Open now</span>
                          <span className="text-gray-500">Concourse level</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spaces Section */}
                <div className="pt-16 mt-[80px] mb-[88px]">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-normal">Featured Spaces</h2>
                    <Button variant="ghost" className="text-sm gap-2" onClick={() => setCurrentPage("book-space")}>
                      View all spaces
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-12 gap-6">
                    {/* Large Featured Space */}
                    <div className="col-span-12 md:col-span-8">
                      <div className="group relative h-[300px] bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                        <div className="absolute inset-0">
                          <img 
                            src="https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1200&h=800&fit=crop" 
                            alt="Conference center" 
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                        </div>
                        <div className="relative h-full flex flex-col justify-end p-6 text-white">
                          <div className="space-y-2">
                            <Badge className="bg-blue-500/20 text-blue-100 hover:bg-blue-500/30 transition-colors">
                              Conference Center
                            </Badge>
                            <h3 className="text-2xl font-semibold">Grand Hall</h3>
                            <p className="text-sm text-blue-100/80 max-w-md">
                              Our flagship space perfect for large events, conferences, and gatherings up to 200 people
                            </p>
                          </div>
                          <div className="flex items-center gap-4 mt-6">
                            <Button 
                              className="bg-white text-gray-900 hover:bg-white/90"
                              onClick={() => setCurrentPage("book-space")}
                            >
                              Book now
                            </Button>
                            <Button variant="ghost" className="text-white hover:bg-white/20">
                              Learn more
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Side Spaces */}
                    <div className="col-span-12 md:col-span-4 space-y-6">
                      {/* Side Space 1 */}
                      <div className="group relative h-[142px] bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                        <div className="absolute inset-0">
                          <img 
                            src="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600&h=400&fit=crop" 
                            alt="Meeting room" 
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
                        </div>
                        <div className="relative h-full flex flex-col justify-end p-4 text-white">
                          <Badge className="w-fit bg-green-500/20 text-green-100 hover:bg-green-500/30 transition-colors mb-2">
                            Meeting Room
                          </Badge>
                          <p className="text-sm font-medium">Executive Suite</p>
                        </div>
                      </div>

                      {/* Side Space 2 */}
                      <div className="group relative h-[142px] bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                        <div className="absolute inset-0">
                          <img 
                            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=400&fit=crop" 
                            alt="Collaborative space" 
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
                        </div>
                        <div className="relative h-full flex flex-col justify-end p-4 text-white">
                          <Badge className="w-fit bg-purple-500/20 text-purple-100 hover:bg-purple-500/30 transition-colors mb-2">
                            Collaborative
                          </Badge>
                          <p className="text-sm font-medium">Innovation Hub</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : currentPage === "book-space" ? (
              <div className="space-y-6">
                {/* Booking Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h2 className="text-xl font-normal">Book a space</h2>
                    <div className="flex items-center gap-2 ml-8">
                      <Button variant="outline" size="sm" className="h-8">
                        <ChevronLeftIcon className="h-4 w-4" />
                        <span className="sr-only">Previous day</span>
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 px-3 font-normal">
                        {bookingDateLabel}
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <ChevronRightIcon className="h-4 w-4" />
                        <span className="sr-only">Next day</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant={bookingViewType === "day" ? "default" : "outline"} size="sm" onClick={() => setBookingViewType("day")}>
                      Day
                    </Button>
                    <Button variant={bookingViewType === "week" ? "default" : "outline"} size="sm" onClick={() => setBookingViewType("week")}>
                      Week
                    </Button>
                    <Button variant={bookingViewType === "month" ? "default" : "outline"} size="sm" onClick={() => setBookingViewType("month")}>
                      Month
                    </Button>
                  </div>
                </div>

                {/* Resource Type Tabs */}
                <div className="flex gap-2 border-b pb-3">
                  <Button variant="ghost" size="sm" className="text-primary font-medium">
                    Space
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Equipment
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Transportation
                  </Button>
                </div>

                {/* Calendar Grid */}
                <div className="rounded-lg border bg-white shadow-sm">
                  {/* Time Header */}
                  <div className="grid grid-cols-[200px,repeat(14,1fr)] border-b">
                    <div className="p-3 border-r text-sm font-medium">Resource</div>
                    {timeSlots.map((time) => (
                      <div key={time} className="p-3 text-center text-sm text-muted-foreground font-normal">
                        {time}
                      </div>
                    ))}
                  </div>

                  {/* Resource Rows */}
                  <div className="divide-y">
                    {bookingResources.map((resource) => (
                      <div key={resource.id} className="grid grid-cols-[200px,repeat(14,1fr)]">
                        <div className="p-3 border-r">
                          <div className="flex items-center gap-2">
                            <Checkbox id={resource.id} />
                            <label htmlFor={resource.id} className="text-sm font-medium text-blue-600 cursor-pointer hover:text-blue-700">
                              {resource.name}
                            </label>
                          </div>
                        </div>
                        {timeSlots.map((time) => (
                          <div
                            key={`${resource.id}-${time}`}
                            className="p-3 border-r last:border-r-0 group cursor-pointer hover:bg-blue-50 transition-colors relative"
                          >
                            <div className="absolute inset-1 rounded opacity-0 group-hover:opacity-100 border border-dashed border-blue-200 transition-opacity" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legend or Additional Info */}
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-blue-100 border border-blue-300" />
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-blue-500" />
                    <span>Booked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-gray-100 border border-gray-300" />
                    <span>Unavailable</span>
                  </div>
                </div>
              </div>
            ) : currentPage === "about" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">About</h2>
                </div>
                <div className="flex gap-4 border-b">
                  {['Overview', 'Amenities', 'Transportation', 'Contact'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={cn(
                        'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
                        aboutTab === tab
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      )}
                      onClick={() => setAboutTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="aspect-video rounded-xl border bg-white shadow-sm overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop"
                        alt="Building exterior"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="prose max-w-none">
                      <p>
                        Welcome to our state-of-the-art building, where modern design meets functionality. Our space is
                        designed to inspire creativity, foster collaboration, and provide a comfortable environment for all
                        occupants.
                      </p>
                      <p>
                        With a focus on sustainability and innovation, we offer a range of amenities and services to meet
                        the diverse needs of our community. From flexible workspaces to cutting-edge technology
                        infrastructure, every detail has been carefully considered.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="rounded-xl border bg-white shadow-sm">
                      <div className="p-6">
                        <h3 className="text-base font-medium mb-4">Quick facts</h3>
                        <dl className="space-y-4">
                          <div>
                            <dt className="text-sm text-muted-foreground">Year built</dt>
                            <dd className="text-sm font-medium">2020</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-muted-foreground">Square footage</dt>
                            <dd className="text-sm font-medium">250,000 sq ft</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-muted-foreground">Number of floors</dt>
                            <dd className="text-sm font-medium">25</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-muted-foreground">Parking spaces</dt>
                            <dd className="text-sm font-medium">500</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                    <div className="rounded-xl border bg-white shadow-sm">
                      <div className="p-6">
                        <h3 className="text-base font-medium mb-4">Hours of operation</h3>
                        <dl className="space-y-4">
                          <div>
                            <dt className="text-sm text-muted-foreground">Monday - Friday</dt>
                            <dd className="text-sm font-medium">6:00 AM - 10:00 PM</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-muted-foreground">Saturday</dt>
                            <dd className="text-sm font-medium">8:00 AM - 6:00 PM</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-muted-foreground">Sunday</dt>
                            <dd className="text-sm font-medium">Closed</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : currentPage === "explore" ? (
              <div className="flex flex-col h-full w-full">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-medium">Explore</h2>
                </div>
                <div className="relative w-full h-[600px] rounded-xl overflow-hidden border bg-white shadow-sm">
                  <img
                    src="/map.png"
                    alt="Interactive Map"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : null}
          </main>

          {/* Right Drawers */}
          {!isMobile && (
            <>
              <aside className={cn("transition-all duration-300 ease-in-out mr-4 sticky top-14 self-start", rightDrawerOpen ? "w-[320px]" : "w-0")}>
                {rightDrawerOpen && (
                  <div className="h-[calc(100vh-3.5rem-2rem)] bg-white rounded-xl border shadow-sm flex flex-col mt-4 overflow-hidden">
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        <span className="font-regular text-gray-900">Activity</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                          <Maximize2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" type="button" onClick={() => setRightDrawerOpen(false)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setRightDrawerOpen(false) }}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Calendar */}
                    <div className="flex-1 p-4 flex flex-col overflow-y-auto">
                      <div className="mb-6">{renderCalendar()}</div>

                      {/* Selected Day Events */}
                      <div className="space-y-4">
                        <h3 className="text-sm font-normal text-gray-700">
                          {selectedDateLabel}
                        </h3>

                        {/* Events */}
                        <div className="space-y-2">
                          <div className="flex items-center p-3 rounded-md bg-white border border-border shadow-sm">
                            <BookOpen className="h-5 w-5 mr-3 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="text-xs font-normal text-foreground">Booked: Conference Room A</p>
                            </div>
                            <span className="text-[10px] font-normal text-muted-foreground">9:00 AM</span>
                          </div>

                          <div className="flex items-center p-3 rounded-md bg-white border border-border shadow-sm">
                            <User className="h-5 w-5 mr-3 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="text-xs font-normal text-foreground">Guest: Abby Canova</p>
                            </div>
                            <span className="text-[10px] font-normal text-muted-foreground">12:00 PM</span>
                          </div>

                          <div className="flex items-center p-3 rounded-md bg-white border border-border shadow-sm">
                            <Coffee className="h-5 w-5 mr-3 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="text-xs font-normal text-foreground">Lunch & Learn</p>
                            </div>
                            <span className="text-[10px] font-normal text-muted-foreground">1:30 PM</span>
                          </div>
                        </div>

                        {/* Open Requests */}
                        <div className="mt-6">
                          <h3 className="text-sm font-normal text-gray-700 mb-2">Open requests</h3>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-3 rounded-md bg-white border border-border shadow-sm">
                              <div className="flex items-center">
                                <Wrench className="h-5 w-5 mr-3 text-muted-foreground" />
                                <p className="text-xs font-normal text-foreground">New equipment request</p>
                              </div>
                              <span className="text-[10px] font-normal text-muted-foreground">Created 5/10/25</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-md bg-white border border-border shadow-sm">
                              <div className="flex items-center">
                                <AlertTriangle className="h-5 w-5 mr-3 text-muted-foreground" />
                                <p className="text-xs font-normal text-foreground">Broken light</p>
                              </div>
                              <span className="text-[10px] font-normal text-muted-foreground">Created 5/15/25</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </aside>
              <aside className={cn("transition-all duration-300 ease-in-out mr-4 sticky top-14 self-start", assistantDrawerOpen ? "w-[320px]" : "w-0")}>
                <AssistantDrawer
                  isOpen={assistantDrawerOpen}
                  onClose={() => setAssistantDrawerOpen(false)}
                  onMaximize={handleAssistantMaximize}
                  messages={sharedMessages}
                  initialInputValue={sharedInputValue}
                />
              </aside>
            </>
          )}
        </div>

        {/* AI Assistant Modal */}
        <AIAssistantModal
          isOpen={aiModalOpen}
          onClose={() => setAiModalOpen(false)}
          onMinimize={handleAiModalMinimize}
          initialPrompt={aiModalPrompt}
          sharedMessages={sharedMessages}
          sharedInputValue={sharedInputValue}
        />

        {/* Search Modal */}
        {searchModalOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
              <div className="w-full max-w-2xl mx-4">
                <div className="bg-white rounded-xl border shadow-lg overflow-hidden">
                  {/* Search Header */}
                  <div className="flex items-center gap-3 p-4 border-b">
                    <Search className="h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search buildings, people, events, spaces..."
                      className="flex-1 border-0 focus-visible:ring-0 text-base"
                      autoFocus
                    />
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSearchModalOpen(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Search Content */}
                  <div className="max-h-96 overflow-y-auto">
                    {/* Recent Searches */}
                    <div className="p-4 border-b">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent searches</h3>
                      <div className="space-y-2">
                        <button type="button" className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-muted text-left">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Building className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Conference Room A</p>
                            <p className="text-xs text-muted-foreground">Meeting space</p>
                          </div>
                        </button>
                        <button type="button" className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-muted text-left">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <User className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">John Smith</p>
                            <p className="text-xs text-muted-foreground">Building manager</p>
                          </div>
                        </button>
                        <button type="button" className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-muted text-left">
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Townhall Meeting</p>
                            <p className="text-xs text-muted-foreground">May 31, 2025</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick actions</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted text-left" type="button">
                          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Building className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Book a space</p>
                            <p className="text-xs text-muted-foreground">Find and reserve</p>
                          </div>
                        </button>
                        <button className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted text-left" type="button">
                          <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                            <UserPlus className="h-4 w-4 text-teal-600"/>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Register guest</p>
                            <p className="text-xs text-muted-foreground">Add visitor</p>
                          </div>
                        </button>
                        <button className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted text-left" type="button">
                          <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                            <Wrench className="h-4 w-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Report issue</p>
                            <p className="text-xs text-muted-foreground">Click to fix</p>
                          </div>
                        </button>
                        <button className="flex items-center gap-3 p-3 rounded-md border hover:bg-muted text-left" type="button">
                          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <CalendarDays className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">View events</p>
                            <p className="text-xs text-muted-foreground">Upcoming</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Search Footer */}
                  <div className="p-3 border-t bg-muted/30">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>
                          Press <kbd className="px-1.5 py-0.5 bg-background border rounded text-xs">↵</kbd> to search
                        </span>
                        <span>
                          Press <kbd className="px-1.5 py-0.5 bg-background border rounded text-xs">Esc</kbd> to close
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
