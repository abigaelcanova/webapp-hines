"use client"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
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
  Upload,
  Settings,
  QrCode,
  CreditCard,
  IdCard,
  Plus,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { ModernCarousel } from "@/components/modern-carousel"
import Link from "next/link"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import AnimatedTestimonialsDemo from "@/components/animated-testimonials-demo"
import { HeroCard } from "@/components/hero-card"
import { AIAssistantModal } from "@/components/ai-assistant-modal"
import { AssistantDrawer } from "@/components/assistant-drawer"
import { Banner } from "@/components/ui/banner"
import { SiteFooter } from "@/components/site-footer"

export default function VercelNavigation() {
  const params = useParams()
  
  // Convert slug to building name
  const slugToBuildingName = (slug: string): string => {
    return slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }
  
  const buildingName = slugToBuildingName(params['building-slug'] as string)
  
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false)
  const [primaryBuilding, setPrimaryBuilding] = useState<string>(buildingName)
  const [notificationCount, setNotificationCount] = useState(0)
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
  const [isAddRequestModalOpen, setIsAddRequestModalOpen] = useState(false)
  const [sharedMessages, setSharedMessages] = useState<any[]>([])
  const [sharedInputValue, setSharedInputValue] = useState("")
  const [feedSearchQuery, setFeedSearchQuery] = useState("")
  const [feedActiveFilter, setFeedActiveFilter] = useState("All")
  const [helpForm, setHelpForm] = useState({
    requestType: "",
    subject: "",
    description: "",
    documents: [] as File[]
  })
  const [visitorActiveTab, setVisitorActiveTab] = useState("Visits")
  const [visitorDate, setVisitorDate] = useState(new Date("2025-01-10"))
  const [visitorSearchQuery, setVisitorSearchQuery] = useState("")
  const [visitorFilters, setVisitorFilters] = useState({
    type: "",
    group: "",
    host: "",
    hostCompany: "",
    status: ""
  })

  // Sample visitor data
  const visitorData = [
    {
      id: 1,
      name: "Olivia Rhye",
      avatar: "/placeholder-user.jpg",
      expected: "11/21/2024, 8:00 AM",
      endTime: "6:00 PM",
      host: "Orlando Diggs",
      hostCompany: "HqO",
      inviteStatus: "sent",
      inviteTime: "2/18/25 12:30 PM",
      status: "Checked-out",
      statusColor: "bg-orange-100 text-orange-700",
      badge: "Deactivated"
    },
    {
      id: 2,
      name: "Jay Long",
      avatar: "/placeholder-user.jpg",
      expected: "11/21/2024, 8:00 AM",
      endTime: "6:00 PM",
      host: "Orlando Diggs",
      hostCompany: "HqO",
      inviteStatus: "none",
      status: "Cancelled",
      statusColor: "bg-gray-100 text-gray-700",
      badge: "Failed",
      badgeColor: "text-red-600"
    },
    {
      id: 3,
      name: "Phoenix Baker",
      avatar: "",
      initials: "PB",
      expected: "11/21/2024, 8:00 AM",
      endTime: "6:00 PM",
      host: "Orlando Diggs",
      hostCompany: "HqO",
      inviteStatus: "failed",
      inviteTime: "2/18/25 12:30 PM",
      status: "Checked-in",
      statusColor: "bg-green-100 text-green-700",
      badge: "Activated"
    },
    {
      id: 4,
      name: "Lana Steiner",
      avatar: "/placeholder-user.jpg",
      expected: "11/21/2024, 8:00 AM",
      endTime: "6:00 PM",
      host: "Orlando Diggs",
      hostCompany: "HqO",
      inviteStatus: "sent",
      inviteTime: "2/18/25 12:30 PM",
      status: "Expected",
      statusColor: "bg-purple-100 text-purple-700",
      badge: "activate"
    },
    {
      id: 5,
      name: "John Baker",
      avatar: "/placeholder-user.jpg",
      expected: "11/21/2024, 8:00 AM",
      endTime: "6:00 PM",
      host: "Orlando Diggs",
      hostCompany: "HqO",
      inviteStatus: "none",
      status: "Expected",
      statusColor: "bg-purple-100 text-purple-700",
      badge: "activate"
    },
    {
      id: 6,
      name: "Demi Wilkinson",
      avatar: "/placeholder-user.jpg",
      expected: "11/21/2024, 8:00 AM",
      endTime: "6:00 PM",
      host: "Orlando Diggs",
      hostCompany: "HqO",
      inviteStatus: "sent",
      inviteTime: "2/18/25 12:30 PM",
      status: "Expected",
      statusColor: "bg-purple-100 text-purple-700",
      badge: "activate"
    },
    {
      id: 7,
      name: "Candice Wu",
      avatar: "/placeholder-user.jpg",
      expected: "11/21/2024, 8:00 AM",
      endTime: "6:00 PM",
      host: "Orlando Diggs",
      hostCompany: "HqO",
      inviteStatus: "failed",
      inviteTime: "2/18/25 12:30 PM",
      status: "Checked-in",
      statusColor: "bg-green-100 text-green-700",
      badge: "Activated"
    }
  ]

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
      image: "/images/buildings/Program-Alexandria-Center-Gallery-Image-Photo-Evan-Joseph-Courtey-of-Alexandria-Center-0685.webp",
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
        <header className="sticky top-0 z-40 grid grid-cols-12 items-center h-20 px-4 bg-[#F9FAFB]">
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

            {/* Logo and Landlord Name */}
            <div className="flex items-center gap-3">
              <div className="h-8">
                <img src="/images/logos/lighthouse.png" alt="Logo" className="h-full w-auto" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Alexandria</span>
            </div>
          </div>

          {/* Middle section - Spacer */}
          <div className="col-span-8"></div>

          {/* Right side icons */}
          <div className="col-span-2 flex items-center justify-end gap-3">
            {/* Building Selector */}
            <DropdownMenu open={projectDropdownOpen} onOpenChange={setProjectDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 px-1 py-1 gap-1 hover:bg-muted">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={selectedBuilding.image || "/placeholder.svg"} alt={selectedBuilding.name} />
                    <AvatarFallback className="bg-blue-600 text-white text-xs font-medium">
                      <Building className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{primaryBuilding}</span>
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
                            <AvatarFallback className="bg-blue-600 text-white text-xs font-medium">
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
                              <AvatarFallback className="bg-blue-600 text-white text-xs font-medium">
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

            {/* Search */}
            <Button variant="ghost" size="icon" className="h-8 w-8 p-1" onClick={() => setSearchModalOpen(true)}>
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Notifications */}
            <Popover open={notificationPopoverOpen} onOpenChange={setNotificationPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-1 relative">
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

            {/* User Profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="h-8 w-8 flex items-center justify-center cursor-pointer ml-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-600 text-white">PT</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="flex items-center gap-3 p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-600 text-white">PT</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">Pat Tobin</span>
                    <span className="text-xs text-muted-foreground">pat.tobin@are.com</span>
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
        <div className="flex flex-1 justify-center">
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
              "fixed top-20 left-0 h-[calc(100vh-300px)] z-30",
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
              <div className="h-full p-4 flex flex-col">
                {/* Navigation Items */}
                <div className="flex-1 overflow-y-auto min-h-0">
                  <nav className="space-y-1 mb-8">
                    {/* Home - Active */}
                    <div className="relative">
                      {currentPage === "home" && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full"></div>
                      )}
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
                    </div>

                    {/* Spaces */}
                    <div className="relative">
                      {currentPage === "book-space" && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full"></div>
                      )}
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
                    </div>

                    {/* Events & services */}
                    <div className="relative">
                      {currentPage === "events" && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full"></div>
                      )}
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-10 px-3 font-normal text-sm",
                          currentPage === "events"
                            ? "bg-blue-50 text-blue-600 hover:bg-blue-50"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                        )}
                        onClick={() => setCurrentPage("events")}
                      >
                        <Calendar className="h-4 w-4 mr-3" />
                        <span>Events & services</span>
                        <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs font-medium px-1.5 py-0.5 min-w-[20px] h-5 rounded-full ml-auto">
                          2
                        </Badge>
                      </Button>
                    </div>

                    {/* Service requests */}
                    <div className="relative">
                      {currentPage === "service-requests" && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full"></div>
                      )}
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-10 px-3 font-normal text-sm",
                          currentPage === "service-requests"
                            ? "bg-blue-50 text-blue-600 hover:bg-blue-50"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                        )}
                        onClick={() => setCurrentPage("service-requests")}
                      >
                        <Wrench className="h-4 w-4 mr-3" />
                        <span>Service requests</span>
                      </Button>
                    </div>

                    {/* My feed */}
                    <div className="relative">
                      {currentPage === "my-feed" && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full"></div>
                      )}
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-10 px-3 font-normal text-sm",
                          currentPage === "my-feed"
                            ? "bg-blue-50 text-blue-600 hover:bg-blue-50"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                        )}
                        onClick={() => setCurrentPage("my-feed")}
                      >
                        <FileText className="h-4 w-4 mr-3" />
                        <span>My feed</span>
                        <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs font-medium px-1.5 py-0.5 min-w-[20px] h-5 rounded-full ml-auto">
                          3
                        </Badge>
                      </Button>
                    </div>

                    {/* Visitor registration */}
                    <div className="relative">
                                              {currentPage === "visitor-management" && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full"></div>
                        )}
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-10 px-3 font-normal text-sm",
                                                currentPage === "visitor-management"
                        ? "bg-blue-50 text-blue-600 hover:bg-blue-50"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                        )}
                        onClick={() => setCurrentPage("visitor-management")}
                      >
                        <UserCheck className="h-4 w-4 mr-3" />
                        <span>Visitor management</span>
                      </Button>
                    </div>

                    {/* About */}
                    <div className="relative">
                      {currentPage === "about" && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full"></div>
                      )}
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
                    </div>

                    {/* Help */}
                    <div className="relative">
                      {currentPage === "help" && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full"></div>
                      )}
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start h-10 px-3 font-normal text-sm",
                          currentPage === "help"
                            ? "bg-blue-50 text-blue-600 hover:bg-blue-50"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                        )}
                        onClick={() => setCurrentPage("help")}
                      >
                        <HelpCircle className="h-4 w-4 mr-3" />
                        <span>Help</span>
                      </Button>
                    </div>
                  </nav>

                  {/* App Download Section */}
                  <div className="space-y-4 mb-8">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium mb-1">It's even better on the go.</h4>
                          <p className="text-xs text-blue-100 mb-3">Download the app</p>
                        </div>
                        <div className="bg-white rounded p-2 ml-3">
                          <div className="w-12 h-12 rounded flex items-center justify-center">
                            <img 
                              src="/images/logos/QRfinal.png" 
                              alt="QR Code" 
                              className="w-full h-full object-contain"
                            />
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


              </div>
            )}
          </aside>

          {/* Middle Content */}
          <main
            className={cn(
              "px-4 py-4 w-full max-w-[1024px]",
              !isMobile && leftDrawerOpen ? "ml-[280px]" : "mx-auto"
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
                  backgroundImage="/images/buildings/Program-Alexandria-Center-Gallery-Image-Photo-Evan-Joseph-Courtey-of-Alexandria-Center-0685.webp"
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
                        <div 
                          className="w-16 h-16"
                          style={{
                            backgroundImage: 'url(/images/icons/bookaspace.png)',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Visitor Management */}
                  <div className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-base font-medium mb-2 text-gray-900">Visitor Management</h3>
                        <p className="text-sm text-gray-600">Manage visitors and guest access.</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <div 
                          className="w-16 h-16"
                          style={{
                            backgroundImage: 'url(/images/icons/VM.png)',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                          }}
                        />
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
                        <div 
                          className="w-16 h-16"
                          style={{
                            backgroundImage: 'url(/images/icons/SR.png)',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                          }}
                        />
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
                        <div 
                          className="w-16 h-16"
                          style={{
                            backgroundImage: 'url(/images/icons/events.png)',
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* What's happening */}
                <div className="pt-8 mt-[40px] space-y-8">
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
                    <div className="flex flex-col h-full gap-6">
                      <div className="bg-white rounded-lg border shadow-sm p-6 flex items-start gap-4 flex-1">
                        <img 
                          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop" 
                          alt="Food" 
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Food</Badge>
                            <span className="text-sm text-gray-500">2 days ago</span>
                          </div>
                          <h4 className="font-semibold text-lg mb-2">Order lunch with Picnic!</h4>
                          <p className="text-gray-600 leading-relaxed">Quantum City has partnered with Picnic, the leading provider of endless food options delivered effortlessly to your doorstep.</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border shadow-sm p-6 flex items-start gap-4 flex-1">
                        <img 
                          src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop" 
                          alt="App update" 
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Announcement</Badge>
                            <span className="text-sm text-gray-500">4 days ago</span>
                          </div>
                          <h4 className="font-semibold text-lg mb-2">Mobile app update</h4>
                          <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border shadow-sm p-6 flex items-start gap-4 flex-1">
                        <img 
                          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=80&h=80&fit=crop" 
                          alt="Food hall" 
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Amenities</Badge>
                            <span className="text-sm text-gray-500">1 week ago</span>
                          </div>
                          <h4 className="font-semibold text-lg mb-2">New food hall</h4>
                          <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming events */}
                <div className="pt-8 space-y-6">
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
                <div className="pt-8 space-y-6 mb-[88px]">
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
                {/* Header */}
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Book a resource</h2>
                  <p className="text-sm text-gray-600">Find and reserve what you need, when you need it. Drag to select time slots.</p>
                </div>

                {/* Date Navigation and Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="h-8">
                      <ChevronLeftIcon className="h-4 w-4" />
                      <span className="sr-only">Previous day</span>
                    </Button>
                    <span className="text-sm font-medium">May 25, 2025</span>
                    <Button variant="outline" size="sm" className="h-8">
                      <ChevronRightIcon className="h-4 w-4" />
                      <span className="sr-only">Next day</span>
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8">
                          Main Building
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Main Building</DropdownMenuItem>
                        <DropdownMenuItem>Science Wing</DropdownMenuItem>
                        <DropdownMenuItem>East Tower</DropdownMenuItem>
                        <DropdownMenuItem>North Building</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm" className="h-8">
                      <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                      </svg>
                      Filters
                    </Button>
                  </div>
                </div>

                {/* Resource Type Tabs */}
                <div className="flex gap-1">
                  <Button variant="default" size="sm" className="bg-primary text-white">
                    All
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    Lab
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    Conference space
                  </Button>
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    Equipment
                  </Button>
                </div>

                {/* Time Slot Grid */}
                <div className="rounded-lg border bg-white">
                  {/* Time Header */}
                  <div className="grid grid-cols-[200px,repeat(10,1fr)] border-b">
                    <div className="p-3 border-r text-sm font-medium">Resource</div>
                    {['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'].map((time) => (
                      <div key={time} className="p-3 text-center text-sm text-gray-600 font-normal">
                        {time}
                      </div>
                    ))}
                  </div>

                  {/* Resource Rows */}
                  <div className="divide-y">
                    {[
                      { name: 'Conference room', location: 'Main Building', unavailable: [0, 1, 2, 3] },
                      { name: 'Lab 3', location: 'Science Wing', unavailable: [] },
                      { name: 'Telescope', location: 'Observatory', unavailable: [] },
                      { name: 'Meeting room', location: 'East Tower', unavailable: [] },
                      { name: 'The Lounge', location: 'Student Center', unavailable: [] },
                      { name: 'Roof deck', location: 'North Building', unavailable: [] }
                    ].map((resource, index) => (
                      <div key={index} className="grid grid-cols-[200px,repeat(10,1fr)]">
                        <div className="p-3 border-r">
                          <div className="space-y-1">
                            <div className="text-sm font-medium">{resource.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Building className="h-3 w-3" />
                              {resource.location}
                            </div>
                          </div>
                        </div>
                        {['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'].map((time, timeIndex) => (
                          <div
                            key={`${resource.name}-${time}`}
                            className={cn(
                              "p-3 border-r last:border-r-0 h-16 relative",
                              resource.unavailable.includes(timeIndex) ? "bg-gray-100" : "hover:bg-blue-50 cursor-pointer"
                            )}
                          >
                            {timeIndex === 3 && index === 0 && (
                              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-500" />
                            )}
                            {resource.unavailable.includes(timeIndex) && (
                              <div className="text-xs text-gray-400 absolute bottom-1 left-1">
                                Unavailable
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* My Bookings Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">My bookings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Lab Equipment Booking */}
                    <div className="border rounded-lg bg-white p-4 space-y-3">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <img 
                          src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=200&fit=crop" 
                          alt="Lab equipment" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Lab equipment</h4>
                        <p className="text-sm text-gray-600">Tests, experiments, equipment</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            40
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                              <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                              <path d="M12 20h.01"></path>
                            </svg>
                            Wi-Fi
                          </span>
                          <span>+2</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <CalendarDays className="h-4 w-4" />
                          <span>May 25, 2025</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">10:00 AM - 12:00 PM</div>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Large Conference Space Booking */}
                    <div className="border rounded-lg bg-white p-4 space-y-3">
                      <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
                        <svg className="h-12 w-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <path d="M21 15l-5-5L5 21"></path>
                        </svg>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Large conference space</h4>
                        <p className="text-sm text-gray-600">Tests, experiments, equipment</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            40
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                              <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                              <path d="M12 20h.01"></path>
                            </svg>
                            Wi-Fi
                          </span>
                          <span>+2</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <CalendarDays className="h-4 w-4" />
                          <span>May 25, 2025</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">10:00 AM - 12:00 PM</div>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Co-working Space Booking */}
                    <div className="border rounded-lg bg-white p-4 space-y-3">
                      <div className="aspect-video rounded-lg bg-gray-100 flex items-center justify-center">
                        <svg className="h-12 w-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <path d="M21 15l-5-5L5 21"></path>
                        </svg>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Co-working space</h4>
                        <p className="text-sm text-gray-600">Tests, experiments, equipment</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            40
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                              <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                              <path d="M12 20h.01"></path>
                            </svg>
                            Wi-Fi
                          </span>
                          <span>+2</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-blue-600">
                          <CalendarDays className="h-4 w-4" />
                          <span>May 25, 2025</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-gray-500">10:00 AM - 12:00 PM</div>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : currentPage === "about" ? (
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">About ARE Demo Building</h1>
                </div>

                {/* Building Overview Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Building Image */}
                  <div className="aspect-[4/3] rounded-xl overflow-hidden">
                    <img
                      src="/images/buildings/Program-Alexandria-Center-Gallery-Image-Photo-Evan-Joseph-Courtey-of-Alexandria-Center-0685.webp"
                      alt="ARE Demo Building"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Building Description */}
                  <div className="flex flex-col">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        The Alexandria Center for Life Science, located at 29th St and 1st Ave between Bellevue Hospital and NYU Medical Center, is a state-of-the-art research and development campus that serves as the flagship location for New York City's expanding life sciences sector.
                      </p>
                      <p className="text-gray-700 leading-relaxed mt-4">
                        Strategically located along Manhattan's East Side Medical Corridor, The Alexandria Center™ capitalizes on its proximity to the City's top academic, medical institutions and major hospitals. Upon completion of the North Tower will provide 1.3 million-square-feet of first-class office and laboratory space in a campus setting designed to foster cross-institutional collaboration.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Building Hours and Map Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Building Hours */}
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-900">Building hours</h2>
                    <div className="rounded-xl border bg-white shadow-sm">
                      <div className="p-6">
                        <dl className="space-y-4">
                          <div>
                            <dt className="text-sm text-muted-foreground">Monday-Thursday:</dt>
                            <dd className="text-sm font-medium">8:00 AM - 6:00 PM</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-muted-foreground">Friday:</dt>
                            <dd className="text-sm font-medium">8:00 AM - 5:00 PM</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-muted-foreground">Saturday:</dt>
                            <dd className="text-sm font-medium">10:00 AM - 4:00 PM</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-muted-foreground">Sunday:</dt>
                            <dd className="text-sm font-medium">Closed</dd>
                          </div>
                          <div>
                            <dt className="text-sm text-muted-foreground">Holidays:</dt>
                            <dd className="text-sm font-medium">Closed for all major holiday</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>

                  {/* Map Section */}
                  <div className="space-y-6">
                    <div className="h-6"></div>
                    <div className="rounded-xl overflow-hidden shadow-sm bg-white border">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095344!2d-73.9899!3d40.7424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0x274d24df1dbe2fc5!2sE%2029th%20St%2C%20New%20York%2C%20NY%2010016!5e0!3m2!1sen!2sus!4v1709760000000!5m2!1sen!2sus"
                        width="100%"
                        height="390"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Building Location Map"
                      />
                    </div>
                  </div>
                </div>

                {/* Support Materials Section */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900">Support materials</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Row 1 */}
                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Gym Waiver Form</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Emergency Procedures</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Emergency Procedures</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Parking Pass Application</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Emergency Procedures</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Emergency Procedures</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Building Policies</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Emergency Procedures</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Emergency Procedures</h3>
                          <p className="text-sm text-gray-500">Last updated June 3, 2025 8 AM</p>
                        </div>
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
            ) : currentPage === "my-feed" ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <h1 className="text-2xl font-semibold text-gray-900">My feed</h1>
                  <p className="text-gray-600">Explore our latest articles, tutorials, and insights</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Search"
                    value={feedSearchQuery}
                    onChange={(e) => setFeedSearchQuery(e.target.value)}
                    className="pl-10 bg-white border-gray-200"
                  />
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto">
                  {["All", "In the neighborhood", "News", "What's happening", "Deals", "Employee offers"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setFeedActiveFilter(filter)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors",
                        feedActiveFilter === filter
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(() => {
                                         const feedItems = [
                       {
                         id: 1,
                         title: "New park opening",
                         description: "The city is opening a new community park with playgrounds and walking trails this weekend.",
                         category: "In the neighborhood",
                         image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
                         date: "June 15, 2025",
                         readTime: "5 min read",
                         badgeStyle: "bg-blue-100 text-blue-700 hover:bg-blue-100"
                       },
                       {
                         id: 2,
                         title: "Local business",
                         description: "The city is opening a new community park with playgrounds and walking trails this weekend.",
                         category: "In the neighborhood",
                         image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
                         date: "June 15, 2025",
                         readTime: "5 min read",
                         badgeStyle: "bg-blue-100 text-blue-700 hover:bg-blue-100"
                       },
                       {
                         id: 3,
                         title: "Tech Networking Mixer",
                         description: "Join us this weekend for our first annual Tech Networking Mixer",
                         category: "What's happening",
                         image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
                         date: "June 15, 2025",
                         readTime: null,
                         badgeStyle: "bg-green-100 text-green-700 hover:bg-green-100",
                         hasButton: true
                       },
                       {
                         id: 4,
                         title: "Community cleanup",
                         description: "The city is opening a new community park with playgrounds and walking trails this weekend.",
                         category: "In the neighborhood",
                         image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
                         date: "June 15, 2025",
                         readTime: "5 min read",
                         badgeStyle: "bg-blue-100 text-blue-700 hover:bg-blue-100"
                       },
                       {
                         id: 5,
                         title: "50% off local restaurants",
                         description: "The city is opening a new community park with playgrounds and walking trails this weekend.",
                         category: "Deals",
                         image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
                         date: "June 15, 2025",
                         readTime: "5 min read",
                         badgeStyle: "bg-orange-100 text-orange-700 hover:bg-orange-100"
                       },
                       {
                         id: 6,
                         title: "Employee discount program",
                         description: "The city is opening a new community park with playgrounds and walking trails this weekend.",
                         category: "Employee offers",
                         image: null,
                         date: "June 15, 2025",
                         readTime: "5 min read",
                         badgeStyle: "bg-purple-100 text-purple-700 hover:bg-purple-100",
                         isEmployeeDiscount: true
                       },
                       {
                         id: 7,
                         title: "Building security updates",
                         description: "New security protocols and access card updates will be implemented next week for all tenants.",
                         category: "News",
                         image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
                         date: "June 12, 2025",
                         readTime: "3 min read",
                         badgeStyle: "bg-gray-100 text-gray-700 hover:bg-gray-100"
                       },
                       {
                         id: 8,
                         title: "New tenant welcome package",
                         description: "Welcome to our newest tenants! Learn about building amenities and services available to you.",
                         category: "News",
                         image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
                         date: "June 10, 2025",
                         readTime: "4 min read",
                         badgeStyle: "bg-gray-100 text-gray-700 hover:bg-gray-100"
                       },
                       {
                         id: 9,
                         title: "Quarterly newsletter",
                         description: "Check out our latest quarterly newsletter featuring tenant spotlights and upcoming events.",
                         category: "News",
                         image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
                         date: "June 8, 2025",
                         readTime: "8 min read",
                         badgeStyle: "bg-gray-100 text-gray-700 hover:bg-gray-100"
                       },
                       {
                         id: 10,
                         title: "Wellness program enrollment",
                         description: "Sign up for our comprehensive wellness program with gym memberships and health screenings.",
                         category: "Employee offers",
                         image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
                         date: "June 14, 2025",
                         readTime: "6 min read",
                         badgeStyle: "bg-purple-100 text-purple-700 hover:bg-purple-100"
                       },
                       {
                         id: 11,
                         title: "Free coffee week",
                         description: "Enjoy complimentary coffee and pastries all week long at our lobby café.",
                         category: "Deals",
                         image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
                         date: "June 13, 2025",
                         readTime: "2 min read",
                         badgeStyle: "bg-orange-100 text-orange-700 hover:bg-orange-100"
                       },
                       {
                         id: 12,
                         title: "Summer rooftop party",
                         description: "Join us for our annual summer rooftop party with live music, food, and networking opportunities.",
                         category: "What's happening",
                         image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
                         date: "June 20, 2025",
                         readTime: null,
                         badgeStyle: "bg-green-100 text-green-700 hover:bg-green-100",
                         hasButton: true
                       }
                     ];

                    // Filter items based on active filter and search query
                    const filteredItems = feedItems.filter(item => {
                      const matchesFilter = feedActiveFilter === "All" || item.category === feedActiveFilter;
                      const matchesSearch = feedSearchQuery === "" || 
                        item.title.toLowerCase().includes(feedSearchQuery.toLowerCase()) ||
                        item.description.toLowerCase().includes(feedSearchQuery.toLowerCase());
                      return matchesFilter && matchesSearch;
                    });

                    return filteredItems.map(item => {
                      if (item.isEmployeeDiscount) {
                        return (
                          <div key={item.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
                            <div className="aspect-[4/3] relative">
                              <img 
                                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=300&fit=crop" 
                                alt={item.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={item.badgeStyle}>{item.category}</Badge>
                              </div>
                              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                              <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {item.date}
                                </span>
                                <span className="flex items-center gap-1">
                                  <BookOpen className="h-3 w-3" />
                                  {item.readTime}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }

                                             return (
                         <div key={item.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
                           <div className="aspect-[4/3] relative">
                             <img 
                               src={item.image || "/placeholder.svg"} 
                               alt={item.title} 
                               className="w-full h-full object-cover"
                             />
                           </div>
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={item.badgeStyle}>{item.category}</Badge>
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                            {item.hasButton ? (
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {item.date}
                                  </span>
                                </div>
                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                  View
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  {item.date}
                                </span>
                                {item.readTime && (
                                  <span className="flex items-center gap-1">
                                    <BookOpen className="h-3 w-3" />
                                    {item.readTime}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            ) : currentPage === "help" ? (
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <h1 className="text-2xl font-semibold text-gray-900">Help</h1>
                  <p className="text-gray-600">Need assistance? Submit a support request and our team will get back to you.</p>
                </div>

                {/* Help Form */}
                <form className="space-y-6">
                    {/* Request Type */}
                    <div className="space-y-2">
                      <Label htmlFor="request-type" className="text-sm font-medium text-gray-700">
                        What is the general nature of your request? <span className="text-red-500">*</span>
                      </Label>
                      <Select value={helpForm.requestType} onValueChange={(value) => setHelpForm({...helpForm, requestType: value})}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select request type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing Issue</SelectItem>
                          <SelectItem value="access">Access Request</SelectItem>
                          <SelectItem value="maintenance">Maintenance Request</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                        Subject <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="subject"
                        placeholder="Brief description of your issue"
                        value={helpForm.subject}
                        onChange={(e) => setHelpForm({...helpForm, subject: e.target.value})}
                        className="w-full"
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                          Description <span className="text-red-500">*</span>
                        </Label>
                        <Info className="h-4 w-4 text-gray-400" />
                      </div>
                      <Textarea
                        id="description"
                        placeholder="Please provide detailed information about your request..."
                        value={helpForm.description}
                        onChange={(e) => setHelpForm({...helpForm, description: e.target.value})}
                        className="w-full min-h-[120px] resize-none"
                        maxLength={100}
                      />
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>This is a hint text to help user.</span>
                        <span>{helpForm.description.length}/100</span>
                      </div>
                    </div>

                    {/* Documents */}
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h3 className="text-sm font-medium text-gray-900">Documents</h3>
                        <p className="text-sm text-gray-600">Upload the document and enter the details</p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700">Document uploader</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center hover:border-gray-400 transition-colors bg-white">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-gray-600 mb-2">Drag and drop your documents here</p>
                          <p className="text-sm text-gray-600">
                            or{" "}
                            <button type="button" className="text-blue-600 hover:text-blue-700 underline">
                              browse
                            </button>
                            {" "}to upload
                          </p>
                          <p className="text-xs text-gray-500 mt-2">PDF (max. 30 MB)</p>
                        </div>
                      </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-3 pt-6">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setHelpForm({requestType: "", subject: "", description: "", documents: []})}
                      >
                        Clear form
                      </Button>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                        Submit request
                      </Button>
                    </div>
                  </form>
                </div>
              ) : currentPage === "visitor-management" ? (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl font-semibold text-gray-900">Visitor Management</h1>
                      <Settings className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="outline" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Scan LP
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <QrCode className="h-4 w-4" />
                        Scan QR
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <IdCard className="h-4 w-4" />
                        Scan ID
                      </Button>
                      <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Create visit
                      </Button>
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div className="border-b">
                    <nav className="flex space-x-8">
                      {["Visits", "Visitors", "Vendors", "Tenant employees", "Requests", "Watchlist", "Groups"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setVisitorActiveTab(tab)}
                          className={cn(
                            "py-2 px-1 border-b-2 font-medium text-sm transition-colors",
                            visitorActiveTab === tab
                              ? "border-blue-500 text-blue-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          )}
                        >
                          {tab}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Statistics Container */}
                  <div className="bg-white rounded-lg border shadow-sm p-6">
                    <div className="flex items-center gap-8">
                      {/* Date Picker */}
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-gray-500" />
                        <Button variant="outline" size="sm">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2 min-w-[160px]">
                          January 10, 2025
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Statistics */}
                      <div className="text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-1">367</div>
                        <div className="text-sm text-gray-600">Total visits</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                          <div className="text-3xl font-bold text-gray-900">201</div>
                        </div>
                        <div className="text-sm text-gray-600">Expected</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                          <div className="text-3xl font-bold text-gray-900">12</div>
                        </div>
                        <div className="text-sm text-gray-600">Checked-in</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <div className="text-3xl font-bold text-gray-900">99</div>
                        </div>
                        <div className="text-sm text-gray-600">Cancelled</div>
                      </div>

                      {/* Progress Bar */}
                      <div className="flex-1 ml-8">
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div className="flex h-3 rounded-full overflow-hidden">
                            <div className="bg-purple-600" style={{ width: "54.8%" }}></div>
                            <div className="bg-green-600" style={{ width: "3.3%" }}></div>
                            <div className="bg-gray-500" style={{ width: "27.0%" }}></div>
                            <div className="bg-gray-300 flex-1"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Filters Section */}
                  <div className="space-y-4">
                    {/* Header with Title and Download */}
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">All visits</h2>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex items-center justify-between">
                      {/* Search Bar */}
                      <div className="relative flex-shrink-0 w-80">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Search"
                          value={visitorSearchQuery}
                          onChange={(e) => setVisitorSearchQuery(e.target.value)}
                          className="pl-9"
                        />
                      </div>

                      {/* Filter Dropdowns */}
                      <div className="flex items-center gap-4">
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-2">
                            Type
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, type: "Meeting"})}>
                            Meeting
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, type: "Delivery"})}>
                            Delivery
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, type: "Interview"})}>
                            Interview
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-2">
                            Group
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, group: "VIP"})}>
                            VIP
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, group: "Contractor"})}>
                            Contractor
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, group: "Vendor"})}>
                            Vendor
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-2">
                            Host
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, host: "John Smith"})}>
                            John Smith
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, host: "Jane Doe"})}>
                            Jane Doe
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, host: "Mike Johnson"})}>
                            Mike Johnson
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-2">
                            Host company
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, hostCompany: "Tech Corp"})}>
                            Tech Corp
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, hostCompany: "Design Studio"})}>
                            Design Studio
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, hostCompany: "Marketing Inc"})}>
                            Marketing Inc
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-2">
                            Status
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, status: "Expected"})}>
                            Expected
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, status: "Checked-in"})}>
                            Checked-in
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setVisitorFilters({...visitorFilters, status: "Cancelled"})}>
                            Cancelled
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>

                  {/* Visitor Table */}
                  <div className="bg-white rounded-lg border shadow-sm">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b">
                          <TableHead className="w-12">
                            <Checkbox />
                          </TableHead>
                          <TableHead className="text-left font-medium text-gray-700">Visitor</TableHead>
                          <TableHead className="text-left font-medium text-gray-700">
                            <div className="flex items-center gap-1">
                              Expected
                              <ChevronDown className="h-4 w-4 rotate-180" />
                            </div>
                          </TableHead>
                          <TableHead className="text-left font-medium text-gray-700">Host</TableHead>
                          <TableHead className="text-left font-medium text-gray-700">Invite</TableHead>
                          <TableHead className="text-left font-medium text-gray-700">Status</TableHead>
                          <TableHead className="text-left font-medium text-gray-700">Badge</TableHead>
                          <TableHead className="w-12"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {visitorData.map((visitor) => (
                          <TableRow key={visitor.id} className="border-b hover:bg-gray-50">
                            <TableCell>
                              <Checkbox />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={visitor.avatar} alt={visitor.name} />
                                  <AvatarFallback className="bg-blue-600 text-white">
                                    {visitor.initials || visitor.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="font-medium text-blue-600">{visitor.name}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium text-gray-900">{visitor.expected}</div>
                                <div className="text-sm text-gray-500">End time: {visitor.endTime}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="font-medium text-blue-600">{visitor.host}</div>
                                <div className="text-sm text-gray-500">{visitor.hostCompany}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {visitor.inviteStatus === "sent" && (
                                  <>
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-gray-400" />
                                      <span className="text-sm text-gray-600">Sent {visitor.inviteTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-gray-400" />
                                      <span className="text-sm text-gray-600">Sent {visitor.inviteTime}</span>
                                    </div>
                                  </>
                                )}
                                {visitor.inviteStatus === "failed" && (
                                  <>
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-gray-400" />
                                      <span className="text-sm text-gray-600">Sent {visitor.inviteTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <FileText className="h-4 w-4 text-red-500" />
                                      <span className="text-sm text-red-600">Failed {visitor.inviteTime}</span>
                                    </div>
                                  </>
                                )}
                                {visitor.inviteStatus === "none" && (
                                  <span className="text-sm text-gray-400">–</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge className={`${visitor.statusColor} hover:${visitor.statusColor}`}>
                                <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                                {visitor.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {visitor.badge === "activate" ? (
                                <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                                  Activate
                                </Button>
                              ) : (
                                <span className={`text-sm ${visitor.badgeColor || 'text-gray-600'}`}>
                                  {visitor.badge}
                                </span>
                              )}
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit visit</DropdownMenuItem>
                                  <DropdownMenuItem>Cancel visit</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : currentPage === "events" ? (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-900">Events & services</h1>
                    <p className="text-gray-600">View your upcoming and past events & services</p>
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search"
                      className="pl-10 bg-white border-gray-200"
                    />
                  </div>

                  {/* Upcoming Events */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Event 1 */}
                      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                        <div className="aspect-[4/3] relative">
                          <img 
                            src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&h=600&fit=crop" 
                            alt="Tech Networking Mixer" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="mb-2">
                            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs font-medium">
                              Event
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Tech Networking Mixer</h3>
                          <p className="text-gray-600 text-sm mb-4">Join us this weekend for our first annual Tech Networking Mixer</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">June 15, 2025</span>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                              RSVP
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Service 1 - Wellness Facial */}
                      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                        <div className="aspect-[4/3] relative">
                          <img 
                            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop" 
                            alt="Wellness Facial Service" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="mb-2">
                            <Badge className="bg-green-100 text-green-600 hover:bg-green-100 text-xs font-medium">
                              Service
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Wellness Facial</h3>
                          <p className="text-gray-600 text-sm mb-4">Rejuvenating facial treatment with organic products and relaxation</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">Available Daily</span>
                            </div>
                            <Button className="bg-green-600 hover:bg-green-700 text-white">
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Service 2 - Therapeutic Massage */}
                      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                        <div className="aspect-[4/3] relative">
                          <img 
                            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop" 
                            alt="Therapeutic Massage Service" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="mb-2">
                            <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100 text-xs font-medium">
                              Service
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Therapeutic Massage</h3>
                          <p className="text-gray-600 text-sm mb-4">Professional massage therapy for stress relief and muscle recovery</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">Mon-Fri</span>
                            </div>
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Service 3 - Personal Training */}
                      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                        <div className="aspect-[4/3] relative">
                          <img 
                            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop" 
                            alt="Personal Training Service" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="mb-2">
                            <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100 text-xs font-medium">
                              Service
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Personal Training</h3>
                          <p className="text-gray-600 text-sm mb-4">One-on-one fitness coaching tailored to your goals</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm text-gray-600">By Appointment</span>
                            </div>
                            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                              Book Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Past Events & Services */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-900">Past events & services</h2>
                    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                      <div className="flex">
                        <div className="w-48 aspect-[4/3] relative">
                          <img 
                            src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&h=600&fit=crop" 
                            alt="Tech Networking Mixer" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <div className="mb-2">
                            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs font-medium">
                              Event
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Tech Networking Mixer</h3>
                          <p className="text-gray-600 text-sm mb-4">Join us this weekend for our first annual Tech Networking Mixer</p>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">June 15, 2025</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : currentPage === "service-requests" ? (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">Service requests</h1>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setIsAddRequestModalOpen(true)}
                    >
                      Add new request
                    </Button>
                  </div>

                  {/* Tabs */}
                  <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg max-w-md">
                    <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-white rounded-md shadow-sm">
                      Open
                    </button>
                    <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                      Closed
                    </button>
                  </div>

                  {/* Service Requests List */}
                  <div className="space-y-4">
                    {/* Service Request Item */}
                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">Bin request</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>Cobblestone Collaborative</span>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">
                          Open
                        </Badge>
                      </div>
                    </div>

                    {/* Additional Sample Service Request */}
                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">Maintenance request</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>Cobblestone Collaborative</span>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">
                          Open
                        </Badge>
                      </div>
                    </div>

                    {/* Another Sample Service Request */}
                    <div className="bg-white border rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">Lighting issue</h3>
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>Cobblestone Collaborative</span>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">
                          Open
                        </Badge>
                      </div>
                    </div>
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

        {/* Add Request Modal */}
        {isAddRequestModalOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Add new request</h2>
                  <button
                    onClick={() => setIsAddRequestModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-6">
                    Please provide the information requested in order to complete your request.
                  </p>

                  <div className="space-y-4">
                    {/* Request Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Request Type <span className="text-red-500">*</span>
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Select request type</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="security">Security</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter location"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t">
                  <Button 
                    className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
                    disabled
                  >
                    Enter required fields
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        {/* Site Footer */}
        <SiteFooter buildingName={primaryBuilding} />
      </div>
    </div>
  )
}

