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
  HelpCircle,
  Dumbbell,
  UserCheck,
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
import { Banner } from "@/components/ui/banner"

export default function VercelNavigation() {
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false)
  const [primaryBuilding, setPrimaryBuilding] = useState<string>("ARE Demo Building")
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
      name: "100 Binney",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "100 Technology Square",
      image: "https://images.unsplash.com/photo-1555109307-f7d9da25c244?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "201 Brookline",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "300 Technology Square",
      image: "https://images.unsplash.com/photo-1577351594944-ef7e7d394fc8?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "399 Binney Street",
      image: "https://images.unsplash.com/photo-1582439170934-d2fbbe3f0937?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "400 Technology Square",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "50-60 Binney Street",
      image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "500 Technology Square",
      image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "75-125 Binney Street",
      image: "https://images.unsplash.com/photo-1590725175499-15425f32e0c4?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "ARE Demo Building",
      image: "https://images.unsplash.com/photo-1554638413-dbf3b0c6e1f7?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Alexandria Center at One Kendall Square - Building 100",
      image: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Alexandria Center at One Kendall Square - Building 1400",
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c983?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Alexandria Center at One Kendall Square - Building 200",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Alexandria Center at One Kendall Square - Building 600/650",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Building 10210",
      image: "https://images.unsplash.com/photo-1609619385002-f40f1f04888c?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Campus Point by Alexandria",
      image: "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Lab Building",
      image: "https://images.unsplash.com/photo-1581094287473-c9b0b9d2b1b6?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Pacific Horizon Tower",
      image: "https://images.unsplash.com/photo-1551887373-6edba6dacbb1?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Pasadena HQ",
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Reserve Equipment",
      image: "https://images.unsplash.com/photo-1609619385639-63e765f28408?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Reserve Transportation",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=120&h=120&fit=crop&crop=faces,center",
    },
    {
      name: "Seaside Innovation Center",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=120&h=120&fit=crop&crop=faces,center",
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
            <div className="h-24">
              <img src="/logo.svg" alt="Logo" className="h-full w-auto" />
            </div>
          </div>

          {/* Middle section - Spacer */}
          <div className="col-span-8"></div>

          {/* Right side icons */}
          <div className="col-span-2 flex items-center justify-end space-x-2">
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
              <DropdownMenuContent align="end" className="w-[346px] p-0 z-50">
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
                  <div className="space-y-1 max-h-64 overflow-y-auto">
                    {buildings
                      .filter((b) => b.name !== primaryBuilding)
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
                  ? "w-1/6 max-w-[280px]"
                  : "w-0 overflow-hidden",
            )}
          >
            {leftDrawerOpen && (
              <div className="h-full p-4 flex flex-col overflow-hidden">
                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto">
                  <nav className="space-y-1 mb-8">
                    {/* Home - Active */}
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-10 px-3 font-normal text-sm",
                        currentPage === "home"
                          ? "bg-blue-50 text-blue-600 hover:bg-blue-50"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                      )}
                      onClick={() => setCurrentPage("home")}
                    >
                      <Home className="h-4 w-4 mr-3" />
                      <span>Home</span>
                    </Button>

                    {/* Spaces */}
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-10 px-3 font-normal text-sm",
                        currentPage === "book-space"
                          ? "bg-blue-50 text-blue-600 hover:bg-blue-50"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                      )}
                      onClick={() => setCurrentPage("book-space")}
                    >
                      <MapPin className="h-4 w-4 mr-3" />
                      <span>Spaces</span>
                    </Button>

                    {/* Events & services */}
                    <Button
                      variant="ghost"
                      className="w-full justify-between h-10 px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setCurrentPage("events")}
                    >
                      <div className="flex items-center">
                        <Dumbbell className="h-4 w-4 mr-3" />
                        <span>Events & services</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs font-medium px-1.5 py-0.5 min-w-[20px] h-5 rounded-full">
                        2
                      </Badge>
                    </Button>

                    {/* Service requests */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-10 px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setCurrentPage("service-requests")}
                    >
                      <Wrench className="h-4 w-4 mr-3" />
                      <span>Service requests</span>
                    </Button>

                    {/* My feed */}
                    <Button
                      variant="ghost"
                      className="w-full justify-between h-10 px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setCurrentPage("my-feed")}
                    >
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-3" />
                        <span>My feed</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs font-medium px-1.5 py-0.5 min-w-[20px] h-5 rounded-full">
                        3
                      </Badge>
                    </Button>

                    {/* Visitor registration */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-10 px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setCurrentPage("visitor-registration")}
                    >
                      <UserCheck className="h-4 w-4 mr-3" />
                      <span>Visitor registration</span>
                    </Button>

                    {/* About */}
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start h-10 px-3 font-normal text-sm",
                        currentPage === "about"
                          ? "bg-blue-50 text-blue-600 hover:bg-blue-50"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                      )}
                      onClick={() => setCurrentPage("about")}
                    >
                      <Info className="h-4 w-4 mr-3" />
                      <span>About</span>
                    </Button>

                    {/* Help */}
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-10 px-3 font-normal text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      onClick={() => setCurrentPage("help")}
                    >
                      <HelpCircle className="h-4 w-4 mr-3" />
                      <span>Help</span>
                    </Button>
                  </nav>

                </div>

                {/* App Download Section */}
                <div className="mt-4 flex-shrink-0 space-y-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-sm font-medium mb-1">It's even better on the go.</h4>
                        <p className="text-xs text-blue-100 mb-3">Download the app</p>
                      </div>
                      <div className="bg-white rounded p-2 ml-3">
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                          <div className="grid grid-cols-3 gap-0.5">
                            {Array.from({ length: 9 }).map((_, i) => (
                              <div key={i} className="w-1 h-1 bg-gray-800 rounded-sm" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Helpful Links */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 mb-3">Helpful links</h5>
                    <div className="space-y-2">
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto p-0 font-normal text-sm text-gray-600 hover:text-gray-900 hover:bg-transparent"
                      >
                        Building resources
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto p-0 font-normal text-sm text-gray-600 hover:text-gray-900 hover:bg-transparent"
                      >
                        Policies & guidelines
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto p-0 font-normal text-sm text-gray-600 hover:text-gray-900 hover:bg-transparent"
                      >
                        Emergency procedures
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto p-0 font-normal text-sm text-gray-600 hover:text-gray-900 hover:bg-transparent"
                      >
                        Contact directory
                      </Button>
                    </div>
                  </div>
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
                {/* Banner Alert */}
                <Banner
                  title="5 Lab | Boilers Down Last Night"
                  description="Please be advised that the boilers were down last night so temperatures are low. Our team is working to restore as soon as possible—thank you!"
                  variant="warning"
                  onDismiss={() => setBannerDismissed(true)}
                />

                {/* Hero Card */}
                <HeroCard
                  backgroundImage="https://images.unsplash.com/photo-1554638413-dbf3b0c6e1f7?w=1920&h=600&fit=crop&crop=faces,center"
                  buildingName={primaryBuilding}
                  onAssistantSubmit={handleAssistantSubmit}
                />

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Book a space */}
                  <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Book a space</h3>
                        <p className="text-sm text-gray-600">Reserve meeting rooms, workspaces, and more.</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="w-12 h-12">
                            <path d="M12 16L36 16L34 32L14 32L12 16Z" fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5"/>
                            <rect x="16" y="20" width="16" height="8" fill="#BBDEFB" stroke="#1976D2" strokeWidth="1"/>
                            <circle cx="20" cy="24" r="1" fill="#1976D2"/>
                            <circle cx="28" cy="24" r="1" fill="#1976D2"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Register a guest */}
                  <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Register a guest</h3>
                        <p className="text-sm text-gray-600">Pre-register guest for easy check-in.</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-lg flex items-center justify-center">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="w-12 h-12">
                            <circle cx="18" cy="18" r="6" fill="#C8E6C9" stroke="#388E3C" strokeWidth="1.5"/>
                            <circle cx="30" cy="22" r="4" fill="#A5D6A7" stroke="#388E3C" strokeWidth="1.5"/>
                            <path d="M8 40C8 32 12 28 18 28C24 28 28 32 28 40" fill="#E8F5E8" stroke="#388E3C" strokeWidth="1.5"/>
                            <path d="M22 40C22 36 24 34 30 34C36 34 38 36 38 40" fill="#C8E6C9" stroke="#388E3C" strokeWidth="1.5"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service requests */}
                  <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Service requests</h3>
                        <p className="text-sm text-gray-600">Report and track maintenance issues</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="w-12 h-12">
                            <circle cx="24" cy="28" r="6" fill="#FFE0B2" stroke="#F57C00" strokeWidth="1.5"/>
                            <path d="M18 28L20 26L22 28" fill="none" stroke="#F57C00" strokeWidth="1.5"/>
                            <path d="M26 28L28 26L30 28" fill="none" stroke="#F57C00" strokeWidth="1.5"/>
                            <rect x="20" y="16" width="8" height="8" fill="#FFCC80" stroke="#F57C00" strokeWidth="1.5" rx="1"/>
                            <path d="M22 18L26 18M22 20L26 20M22 22L24 22" stroke="#F57C00" strokeWidth="1"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Events & services */}
                  <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Events & services</h3>
                        <p className="text-sm text-gray-600">See upcoming events and services</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg flex items-center justify-between">
                          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="w-12 h-12">
                            <rect x="12" y="18" width="24" height="18" fill="#E1BEE7" stroke="#7B1FA2" strokeWidth="1.5" rx="2"/>
                            <rect x="16" y="22" width="4" height="3" fill="#CE93D8" rx="0.5"/>
                            <rect x="22" y="22" width="4" height="3" fill="#CE93D8" rx="0.5"/>
                            <rect x="28" y="22" width="4" height="3" fill="#CE93D8" rx="0.5"/>
                            <rect x="16" y="27" width="4" height="3" fill="#CE93D8" rx="0.5"/>
                            <rect x="22" y="27" width="4" height="3" fill="#CE93D8" rx="0.5"/>
                            <path d="M18 14V18M30 14V18" stroke="#7B1FA2" strokeWidth="1.5"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What's happening */}
                <div className="pt-16 mt-[80px] space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">What's happening</h2>
                    <Button variant="ghost" className="text-sm text-gray-600 hover:text-gray-900">
                      View all updates →
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Featured Event Card */}
                    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                      <div className="aspect-[4/3] relative">
                        <img 
                          src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop" 
                          alt="Summer Outing" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-semibold mb-2">Summer Outing</h3>
                        <p className="text-gray-600 mb-4">
                          Join us for our annual Summer Outing on June 10, 2025, from 3:00 PM to 7:00 PM at Riverside Park. Enjoy food, games, and great company!
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Sat, June 10 • 3 PM</p>
                            <p className="text-sm text-gray-600">Boston, MA</p>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                            RSVP
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Feed Items */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop" 
                            alt="Food" 
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Food</Badge>
                              <span className="text-sm text-gray-500">2 days ago</span>
                            </div>
                            <h4 className="font-medium mb-1">Order lunch with Picnic!</h4>
                            <p className="text-sm text-gray-600">Quantum City has partnered with Picnic, the leading provider of endless food options delivered effortlessly to your doorstep.</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop" 
                            alt="App update" 
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Announcement</Badge>
                              <span className="text-sm text-gray-500">4 days ago</span>
                            </div>
                            <h4 className="font-medium mb-1">Mobile app update</h4>
                            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=80&h=80&fit=crop" 
                            alt="Food hall" 
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Amenities</Badge>
                              <span className="text-sm text-gray-500">1 week ago</span>
                            </div>
                            <h4 className="font-medium mb-1">New food hall</h4>
                            <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming events */}
                <div className="pt-16 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Upcoming events</h2>
                    <Button variant="ghost" className="text-sm text-gray-600 hover:text-gray-900">
                      View all events →
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tech Networking Mixer */}
                    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                      <div className="aspect-[4/3] relative">
                        <img 
                          src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&h=600&fit=crop" 
                          alt="Tech Networking Mixer" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Tech Networking Mixer</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600">June 15, 2025 • 6:00 PM</p>
                          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                            RSVP
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Summer Party */}
                    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                      <div className="aspect-[4/3] relative">
                        <img 
                          src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop" 
                          alt="Summer Party" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Summer Party</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600">June 15, 2025 • 6:00 PM</p>
                          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                            RSVP
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support materials */}
                <div className="pt-16 space-y-6 mb-[88px]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Support materials</h2>
                    <Button variant="ghost" className="text-sm text-gray-600 hover:text-gray-900">
                      View all materials →
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Row 1 */}
                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mt-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Gym Waiver Form</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mt-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Emergency Procedures</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mt-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Parking Pass Application</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mt-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Building Policies</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mt-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Safety Guidelines</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mt-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Visitor Guidelines</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mt-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Event Request Form</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mt-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Facility Map</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mt-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">Maintenance Request</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
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
