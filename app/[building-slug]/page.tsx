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
  Eye,
  Clock,
  Wifi,
  Monitor,
  Phone,
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
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { ModernCarousel } from "@/components/modern-carousel"
import Link from "next/link"
import { Drawer, DrawerContent } from "@/components/ui/drawer"
import AnimatedTestimonialsDemo from "@/components/animated-testimonials-demo"
import { HeroCard } from "@/components/hero-card"
import { ContentCard } from "@/components/content-card"
import { AIAssistantModal } from "@/components/ai-assistant-modal"
import { AssistantDrawer } from "@/components/assistant-drawer"

import { SiteFooter } from "@/components/site-footer"

export default function VercelNavigation() {
  const params = useParams()
  
  // Convert slug to building name
  const slugToBuildingName = (slug: string): string => {
    return slug.split('-').map(word => {
      // Special case for "are" - should be "ARE" in all caps
      if (word.toLowerCase() === 'are') {
        return 'ARE'
      }
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ')
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
  const [searchExpanded, setSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
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
  const [filtersModalOpen, setFiltersModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    availableNow: false,
    date: "",
    startTime: "",
    endTime: "",
    allDay: false,
    resourceTypes: {
      conferenceRoom: false,
      laboratory: false,
      equipment: false,
      meetingRoom: false,
      lounge: false,
      outdoorSpace: false
    },
    capacity: 1,
    amenities: {
      wifi: false,
      projector: false,
      coffeeMachine: false,
      parking: false
    }
  })
  const [serviceRequestsActiveTab, setServiceRequestsActiveTab] = useState("Open")
  const [accountSettingsModalOpen, setAccountSettingsModalOpen] = useState(false)
  const [updatePasswordModalOpen, setUpdatePasswordModalOpen] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [bookingConfirmationModalOpen, setBookingConfirmationModalOpen] = useState(false)
  const [confirmedBooking, setConfirmedBooking] = useState<any>(null)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [locationsModalOpen, setLocationsModalOpen] = useState(false)
  const [selectedLocations, setSelectedLocations] = useState<string[]>(["ARE Demo Building"])
  
  // Drag selection state for time slots
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<{resourceIndex: number, timeIndex: number} | null>(null)
  const [dragEnd, setDragEnd] = useState<{resourceIndex: number, timeIndex: number} | null>(null)
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<Set<string>>(new Set())

  // Carousel state for what's happening section
  const [currentSlide, setCurrentSlide] = useState(0)

  // Carousel data for what's happening section
  const happeningSlides = [
    {
      id: 1,
      title: "ARE Networking Event",
      description: "Join us for an exclusive networking event for ARE community members. Connect with professionals, enjoy refreshments, and build meaningful relationships within our building community.",
      image: "/images/content/ARENetworkingEvent.jpg",
      date: "Fri, June 14 • 6 PM",
      location: "Boston, MA",
      buttonText: "RSVP"
    },
    {
      id: 2,
      title: "ARE Innovation Event",
      description: "Join us for an inspiring innovation event showcasing groundbreaking ideas, cutting-edge technologies, and forward-thinking solutions within our ARE community.",
      image: "/images/content/innovationevent.jpg",
      date: "Fri, June 15 • 6 PM",
      location: "Boston, MA",
      buttonText: "Register"
    },
    {
      id: 3,
      title: "Wellness Workshop",
      description: "Take a break from your busy schedule and join us for a wellness workshop focused on mindfulness, stress management, and work-life balance.",
      image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
      date: "Wed, June 20 • 12 PM",
      location: "Boston, MA",
      buttonText: "Join"
    },
    {
      id: 4,
      title: "Building Tour",
      description: "Discover the history and architecture of our building with a guided tour. Perfect for new tenants and those interested in our building's story.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
      date: "Thu, June 25 • 2 PM",
      location: "Boston, MA",
      buttonText: "Book"
    },
    {
      id: 5,
      title: "Rooftop Party",
      description: "Join us for our summer rooftop party with live music, food, and stunning views of the city. A perfect way to unwind and socialize.",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
      date: "Sat, June 30 • 7 PM",
      location: "Boston, MA",
      buttonText: "RSVP"
    }
  ]

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

  // Handle mobile responsive behavior and search keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && searchExpanded) {
        setSearchExpanded(false)
        setSearchQuery("")
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        setSearchExpanded(true)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (searchExpanded && !target.closest('.search-container')) {
        if (!searchQuery.trim()) {
          setSearchExpanded(false)
        }
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
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("mouseup", handleTimeSlotMouseUp)
    window.addEventListener("resize", handleResize)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("mouseup", handleTimeSlotMouseUp)
      window.removeEventListener("resize", handleResize)
    }
  }, [leftDrawerOpen, searchExpanded, searchQuery])

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

  // Location data for the locations modal
  const locations = [
    {
      id: 1,
      name: "ARE Demo Building",
      address: "29 1st Ave, New York, NY 10003",
      checked: selectedLocations.includes("ARE Demo Building")
    },
    {
      id: 2,
      name: "100 Binney",
      address: "100 Binney Street, Cambridge, MA",
      checked: selectedLocations.includes("100 Binney")
    },
    {
      id: 3,
      name: "100 Technology Square",
      address: "100 Technology Square, Cambridge, MA",
      checked: selectedLocations.includes("100 Technology Square")
    },
    {
      id: 4,
      name: "201 Brookline",
      address: "201 Brookline Avenue, Boston, MA",
      checked: selectedLocations.includes("201 Brookline")
    },
    {
      id: 5,
      name: "300 Technology Square",
      address: "300 Technology Square, Cambridge, MA",
      checked: selectedLocations.includes("300 Technology Square")
    },
    {
      id: 6,
      name: "Alexandria Center at One Kendall Square - Building 100",
      address: "One Kendall Square, Cambridge, MA",
      checked: selectedLocations.includes("Alexandria Center at One Kendall Square - Building 100")
    }
  ]

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % happeningSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + happeningSlides.length) % happeningSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Helper functions for drag selection
  const getTimeSlotKey = (resourceIndex: number, timeIndex: number) => {
    return `${resourceIndex}-${timeIndex}`
  }

  const getSelectedCells = (start: {resourceIndex: number, timeIndex: number}, end: {resourceIndex: number, timeIndex: number}) => {
    const cells = new Set<string>()
    // Only allow selection within the same resource
    if (start.resourceIndex !== end.resourceIndex) {
      // If different resources, only select the start cell
      cells.add(getTimeSlotKey(start.resourceIndex, start.timeIndex))
      return cells
    }
    
    const minTime = Math.min(start.timeIndex, end.timeIndex)
    const maxTime = Math.max(start.timeIndex, end.timeIndex)

    // Only select cells from the same resource
    for (let timeIndex = minTime; timeIndex <= maxTime; timeIndex++) {
      cells.add(getTimeSlotKey(start.resourceIndex, timeIndex))
    }
    return cells
  }

  const isCellSelected = (resourceIndex: number, timeIndex: number) => {
    const key = getTimeSlotKey(resourceIndex, timeIndex)
    
    // Always check if the cell is in selectedTimeSlots first
    if (selectedTimeSlots.has(key)) {
      return true
    }
    
    // If dragging, also check if it's in the current drag selection
    if (isDragging && dragStart && dragEnd) {
      const draggedCells = getSelectedCells(dragStart, dragEnd)
      return draggedCells.has(key)
    }
    
    return false
  }

  const handleTimeSlotMouseDown = (resourceIndex: number, timeIndex: number) => {
    // Don't start drag on unavailable slots
    const resources = [
      { name: 'Conference room', location: 'Main Building', unavailable: [0, 1, 2, 3] },
      { name: 'Lab 3', location: 'Science Wing', unavailable: [] },
      { name: 'Telescope', location: 'Observatory', unavailable: [] },
      { name: 'Meeting room', location: 'East Tower', unavailable: [] },
      { name: 'The Lounge', location: 'Student Center', unavailable: [] },
      { name: 'Roof deck', location: 'North Building', unavailable: [] }
    ]
    
    const currentTimeIndex = 3
    const pastTimeSlots = Array.from({ length: currentTimeIndex }, (_, i) => i)
    const allUnavailable = [...new Set([...pastTimeSlots, ...resources[resourceIndex].unavailable])]
    
    if (allUnavailable.includes(timeIndex)) return
    
    const cellKey = getTimeSlotKey(resourceIndex, timeIndex)
    
    // If already selected, deselect it
    if (selectedTimeSlots.has(cellKey)) {
      setSelectedTimeSlots(prev => {
        const newSet = new Set(prev)
        newSet.delete(cellKey)
        console.log('Deselected cell:', cellKey)
        return newSet
      })
      return
    }
    
    // Check if we're starting a drag on a different resource than existing selections
    const hasExistingSelections = selectedTimeSlots.size > 0
    if (hasExistingSelections) {
      // Check if any existing selections are from a different resource
      const existingResourceIndex = Array.from(selectedTimeSlots).some(key => {
        const [existingResource] = key.split('-').map(Number)
        return existingResource !== resourceIndex
      })
      
      if (existingResourceIndex) {
        // Clear existing selections when starting on a different resource
        setSelectedTimeSlots(new Set())
        console.log('Cleared existing selections - starting on different resource')
      }
    }
    
    console.log('Starting drag from:', resourceIndex, timeIndex)
    setIsDragging(true)
    setDragStart({ resourceIndex, timeIndex })
    setDragEnd({ resourceIndex, timeIndex })
  }

  const handleTimeSlotMouseEnter = (resourceIndex: number, timeIndex: number) => {
    if (isDragging && dragStart) {
      // Only allow drag continuation within the same resource
      if (resourceIndex === dragStart.resourceIndex) {
        console.log('Drag continuing to:', resourceIndex, timeIndex)
        setDragEnd({ resourceIndex, timeIndex })
      } else {
        console.log('Drag blocked - different resource:', resourceIndex, 'vs', dragStart.resourceIndex)
      }
    }
  }

  const handleTimeSlotMouseUp = () => {
    console.log('Mouse up triggered. isDragging:', isDragging, 'dragStart:', dragStart, 'dragEnd:', dragEnd)
    if (isDragging && dragStart && dragEnd) {
      const newSelectedCells = getSelectedCells(dragStart, dragEnd)
      console.log('Drag ended. Adding cells:', Array.from(newSelectedCells))
      // Merge with existing selected cells instead of replacing
      setSelectedTimeSlots(prev => {
        const merged = new Set([...prev, ...newSelectedCells])
        console.log('Total selected cells after drag:', Array.from(merged))
        return merged
      })
    }
    
    // Always reset drag state
    if (isDragging) {
      console.log('Resetting drag state')
      setIsDragging(false)
      setDragStart(null)
      setDragEnd(null)
    }
  }

  // Location modal functions
  const toggleLocation = (locationName: string) => {
    setSelectedLocations(prev => {
      if (prev.includes(locationName)) {
        return prev.filter(loc => loc !== locationName)
      } else {
        return [...prev, locationName]
      }
    })
  }

  const toggleAllLocations = () => {
    const allLocationNames = locations.map(loc => loc.name)
    if (selectedLocations.length === allLocationNames.length) {
      setSelectedLocations([])
    } else {
      setSelectedLocations(allLocationNames)
    }
  }

  const handleLocationsDone = () => {
    setLocationsModalOpen(false)
    // You can add additional logic here if needed
  }

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
            <div className="relative search-container">
              <div className={cn(
                "flex items-center transition-all duration-300 ease-in-out",
                searchExpanded ? "w-80" : "w-8"
              )}>
                {searchExpanded ? (
                  <div className="flex items-center w-full bg-white border border-gray-200 rounded-md shadow-sm">
                    <Search className="h-4 w-4 text-gray-400 ml-3" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search"
                      className="flex-1 border-0 focus-visible:ring-0 h-8 px-3"
                      autoFocus
                      onBlur={() => {
                        // Only close if there's no search query
                        if (!searchQuery.trim()) {
                          setSearchExpanded(false)
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") {
                          setSearchExpanded(false)
                          setSearchQuery("")
                        }
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-1 mr-1"
                      onClick={() => {
                        setSearchExpanded(false)
                        setSearchQuery("")
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-1"
                    onClick={() => setSearchExpanded(true)}
                  >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
                )}
              </div>
            </div>

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
                <div className="h-10 w-10 flex items-center justify-center cursor-pointer ml-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-600 text-white text-sm">PT</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="flex items-center gap-3 p-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-600 text-white text-sm">PT</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">Pat Tobin</span>
                    <span className="text-xs text-muted-foreground">pat.tobin@are.com</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => setAccountSettingsModalOpen(true)}>
                  <Settings className="h-4 w-4 mr-2" />
                  Manage my account
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-blue-600 hover:text-blue-700">
                  <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                  Launch admin
                </DropdownMenuItem>
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
              "fixed top-20 left-0 bottom-0 z-30",
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
                <div className="flex-1 min-h-0">
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

                    {/* Book a space */}
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
                        <span>Book a space</span>
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
                        <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs font-medium px-1.5 py-0.5 min-w-[20px] h-5 rounded-md ml-auto">
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
                        <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs font-medium px-1.5 py-0.5 min-w-[20px] h-5 rounded-md ml-auto">
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
                          <h4 className="text-xs font-medium mb-1">It's even better on the go.</h4>
                          <p className="text-xs text-blue-100 mb-3">Download the app</p>
                        </div>
                        <div className="bg-white rounded ml-3">
                          <div className="w-12 h-12 rounded flex items-center justify-center">
                            <img 
                              src="/images/logos/QR_code_white.png" 
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
              "px-4 py-4 w-full max-w-[1024px] flex-1",
              !isMobile && leftDrawerOpen ? "ml-[280px]" : "mx-auto"
            )}
          >
            {currentPage === "home" ? (
              <div className="space-y-6">
                {/* Hero Card */}
                <HeroCard
                  backgroundImage="/images/buildings/Program-Alexandria-Center-Gallery-Image-Photo-Evan-Joseph-Courtey-of-Alexandria-Center-0685.webp"
                  buildingName={primaryBuilding}
                  onAssistantSubmit={handleAssistantSubmit}
                />

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Book a space */}
                  <div 
                    className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setCurrentPage("book-space")}
                  >
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
                  <div 
                    className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setCurrentPage("visitor-management")}
                  >
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
                  <div 
                    className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setCurrentPage("service-requests")}
                  >
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
                  <div 
                    className="p-6 rounded-xl border bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setCurrentPage("events")}
                  >
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
                    <Button 
                      variant="ghost" 
                      className="text-sm text-gray-600 hover:text-gray-900"
                      onClick={() => {
                        setCurrentPage("my-feed");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      View all updates →
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Featured Event Carousel */}
                    <div className="bg-white rounded-lg border shadow-sm overflow-hidden relative">
                      {/* Carousel Container */}
                      <div className="relative">
                        {/* Left Arrow */}
                        <button
                          onClick={prevSlide}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-md transition-colors"
                        >
                          <ChevronLeft className="h-5 w-5 text-gray-700" />
                        </button>

                        {/* Right Arrow */}
                        <button
                          onClick={nextSlide}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white/90 rounded-full p-2 shadow-md transition-colors"
                        >
                          <ChevronRight className="h-5 w-5 text-gray-700" />
                        </button>

                        {/* Slide Content */}
                      <div className="aspect-[4/3] relative">
                        <img 
                            src={happeningSlides[currentSlide].image} 
                            alt={happeningSlides[currentSlide].title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      </div>

                      {/* Slide Information */}
                      <div className="p-6">
                        <h3 className="text-2xl font-semibold mb-2">{happeningSlides[currentSlide].title}</h3>
                        <p className="text-gray-600 mb-4">
                          {happeningSlides[currentSlide].description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{happeningSlides[currentSlide].date}</p>
                            <p className="text-sm text-gray-600">{happeningSlides[currentSlide].location}</p>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                            {happeningSlides[currentSlide].buttonText}
                          </Button>
                        </div>
                      </div>

                      {/* Navigation Dots */}
                      <div className="flex justify-center space-x-2 pb-4">
                        {happeningSlides.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-colors ${
                              index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Feed Items */}
                    <div className="flex flex-col h-full gap-6">
                      <ContentCard
                        image="/images/content/exos-1-1.jpg"
                        imageAlt="Gym facility"
                        category="Announcement"
                        categoryColor="bg-blue-100 text-blue-700"
                        timestamp="2 days ago"
                        headline="Explore all our gym amenity has to offer"
                        description="Exos is a performance training company that focuses on helping individuals and organizations reach their full potential. Our state-of-the-art fitness facility offers personalized training programs, cutting-edge equipment, and expert coaching to help you achieve your wellness goals. From strength training to cardio workouts, recovery services, and nutritional guidance, we provide everything you need for a comprehensive fitness experience."
                        className="flex-1"
                      />

                      <ContentCard
                        image="/images/content/Taco.png"
                        imageAlt="Taco Trot event"
                        category="Event"
                        categoryColor="bg-green-100 text-green-700"
                        timestamp="4 days ago"
                        headline="Taco Trot"
                        description="Join us for our annual Taco Trot event! A fun-filled afternoon of delicious tacos, live music, and community spirit. This popular gathering brings together our building community for an afternoon of authentic Mexican cuisine from local food trucks, live entertainment, networking opportunities, and family-friendly activities. Come hungry and ready to connect with your neighbors while enjoying some of the best tacos in the city. Don't miss out on this tasty celebration!"
                        className="flex-1"
                      />

                      <ContentCard
                        image="/images/content/Microscope.jpg"
                        imageAlt="Microscope"
                        category="Amenities"
                        categoryColor="bg-blue-100 text-blue-700"
                        timestamp="1 week ago"
                        headline="New microscopes in every lab"
                        description="We've upgraded all our laboratory spaces with state-of-the-art microscopes to enhance research capabilities and provide cutting-edge equipment for our scientific community. These advanced instruments feature high-resolution imaging, digital connectivity, and automated sample handling systems. The new microscopes support a wide range of research applications including cell biology, materials science, and biomedical research. Our tenants now have access to professional-grade equipment that was previously only available in specialized research facilities."
                        className="flex-1"
                      />
                    </div>
                  </div>
                </div>

                {/* Upcoming events */}
                <div className="pt-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Upcoming events</h2>
                    <Button 
                      variant="ghost" 
                      className="text-sm text-gray-600 hover:text-gray-900"
                      onClick={() => {
                        setCurrentPage("events");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      View all events →
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Tech Networking Mixer */}
                    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                      <div className="aspect-[4/3] relative">
                        <img 
                          src="/images/content/innovationevent.jpg" 
                          alt="Tech Networking Mixer" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Alexandria Innovation Event</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600">August 2, 2025 • 6:00 PM</p>
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
                          src="/images/content/EntireSpace-1.png" 
                          alt="Summer Party" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">Monthly All-Hands</h3>
                        <div className="flex items-center justify-between">
                          <p className="text-gray-600">September 1, 2025 • 6:00 PM</p>
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
                    <Button 
                      variant="ghost" 
                      className="text-sm text-gray-600 hover:text-gray-900"
                      onClick={() => {
                        setCurrentPage("about");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
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
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8"
                      onClick={() => setLocationsModalOpen(true)}
                    >
                      {selectedLocations.length === 1 
                        ? selectedLocations[0] 
                        : selectedLocations.length > 1 
                        ? `${selectedLocations.length} locations` 
                        : "Select locations"}
                          <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                    <Button variant="outline" size="sm" className="h-8" onClick={() => setFiltersModalOpen(true)}>
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
                <div 
                  className={cn("rounded-lg border bg-white relative", isDragging && "select-none")}
                  onMouseUp={handleTimeSlotMouseUp}
                  onMouseLeave={handleTimeSlotMouseUp}
                >
                  {isDragging && (
                    <div className="absolute inset-0 bg-transparent pointer-events-none z-10" />
                  )}
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
                  <div className="divide-y relative">
                    {[
                      { name: 'Conference room', location: 'Main Building', unavailable: [0, 1, 2, 3] },
                      { name: 'Lab 3', location: 'Science Wing', unavailable: [] },
                      { name: 'Telescope', location: 'Observatory', unavailable: [] },
                      { name: 'Meeting room', location: 'East Tower', unavailable: [] },
                      { name: 'The Lounge', location: 'Student Center', unavailable: [] },
                      { name: 'Roof deck', location: 'North Building', unavailable: [] }
                    ].map((resource, index) => {
                      // Current time is at 12 PM (index 3), so indices 0, 1, 2 are in the past
                      const currentTimeIndex = 3;
                      const pastTimeSlots = Array.from({ length: currentTimeIndex }, (_, i) => i);
                      const allUnavailable = [...new Set([...pastTimeSlots, ...resource.unavailable])];
                      
                      return (
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
                        {['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM'].map((time, timeIndex) => {
                          const isSelected = isCellSelected(index, timeIndex)
                          const isUnavailable = allUnavailable.includes(timeIndex)
                          
                          return (
                          <div
                            key={`${resource.name}-${time}`}
                            className={cn(
                                "p-3 border-r last:border-r-0 h-16 relative select-none",
                                isUnavailable 
                                  ? "bg-gray-100 cursor-not-allowed" 
                                  : isSelected 
                                    ? "bg-blue-500 border-blue-600 text-white" 
                                    : "hover:bg-blue-50 cursor-pointer"
                              )}
                              onMouseDown={(e) => {
                                e.preventDefault()
                                handleTimeSlotMouseDown(index, timeIndex)
                              }}
                              onMouseEnter={() => handleTimeSlotMouseEnter(index, timeIndex)}
                              style={{ userSelect: 'none' }}
                            >
                              {isSelected && !isUnavailable && (
                                <div className="absolute inset-0 bg-blue-600 bg-opacity-90 rounded-sm pointer-events-none border border-blue-700">
                                  <div className="absolute top-1 left-1 w-2 h-2 bg-white rounded-full opacity-80" />
                              </div>
                            )}
                          </div>
                          )
                        })}
                      </div>
                    );
                    })}
                    
                    {/* Navy blue vertical line with dots spanning full height for 12 PM column */}
                    <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: 'calc(200px + 3 * (100% - 200px) / 10)' }}>
                      {/* Top dot */}
                      <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-600 rounded-full" />
                      {/* Vertical line */}
                      <div className="absolute top-0 bottom-0 w-0.5 bg-blue-600 left-0" />
                      {/* Bottom dot */}
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-600 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Legend and Selection Controls */}
                <div className="flex items-center justify-between mb-16">
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gray-100 border border-gray-300 rounded"></div>
                      <span className="text-gray-700">Unavailable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 border border-blue-600 rounded"></div>
                      <span className="text-gray-700">Selected</span>
                    </div>
                  </div>
                  
                  {selectedTimeSlots.size > 0 && (
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTimeSlots(new Set())}
                      >
                        Clear Selection
                      </Button>
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => setBookingModalOpen(true)}
                      >
                        Book Selected
                      </Button>
                    </div>
                  )}
                </div>

                {/* My Bookings Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">My bookings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Lab Equipment Booking */}
                    <div className="border rounded-lg bg-white p-4 space-y-3">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <img 
                          src="/images/beakers.jpg" 
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
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <img 
                          src="/images/content/EntireSpace-1.png" 
                          alt="Large conference space" 
                          className="w-full h-full object-cover"
                        />
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

                    {/* Lab 3 Booking */}
                    <div className="border rounded-lg bg-white p-4 space-y-3">
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <img 
                          src="/images/content/Lab3.jpg" 
                          alt="Lab 3" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Lab 3</h4>
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
                        "px-4 py-2 text-sm font-medium whitespace-nowrap rounded-lg transition-colors",
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
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={visitor.avatar} alt={visitor.name} />
                                  <AvatarFallback className="bg-blue-600 text-white text-sm">
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
                              <Calendar className="h-3 w-3 mr-1" />
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
                            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs font-medium">
                              Service
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Wellness Facial</h3>
                          <p className="text-gray-600 text-sm mb-4">Rejuvenating facial treatment with organic products and relaxation</p>
                          <div className="flex justify-end">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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
                            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs font-medium">
                              Service
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Therapeutic Massage</h3>
                          <p className="text-gray-600 text-sm mb-4">Professional massage therapy for stress relief and muscle recovery</p>
                          <div className="flex justify-end">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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
                            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs font-medium">
                              Service
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Personal Training</h3>
                          <p className="text-gray-600 text-sm mb-4">One-on-one fitness coaching tailored to your goals</p>
                          <div className="flex justify-end">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Past Event 1 */}
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
                              <Calendar className="h-3 w-3 mr-1" />
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
                          </div>
                        </div>
                      </div>

                      {/* Past Service 1 */}
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
                            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs font-medium">
                              Service
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Wellness Facial</h3>
                          <p className="text-gray-600 text-sm mb-4">Rejuvenating facial treatment with organic products and relaxation</p>
                        </div>
                      </div>

                      {/* Past Service 2 */}
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
                            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100 text-xs font-medium">
                              Service
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold mb-2">Therapeutic Massage</h3>
                          <p className="text-gray-600 text-sm mb-4">Professional massage therapy for stress relief and muscle recovery</p>
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
                    <button 
                      onClick={() => setServiceRequestsActiveTab("Open")}
                      className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        serviceRequestsActiveTab === "Open"
                          ? "text-gray-900 bg-white shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Open
                    </button>
                    <button 
                      onClick={() => setServiceRequestsActiveTab("Closed")}
                      className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        serviceRequestsActiveTab === "Closed"
                          ? "text-gray-900 bg-white shadow-sm"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Closed
                    </button>
                  </div>

                  {/* Service Requests List */}
                  <div className="space-y-4">
                    {serviceRequestsActiveTab === "Open" ? (
                      <>
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
                      </>
                    ) : (
                      <>
                        {/* Closed Service Request 1 */}
                        <div className="bg-white border rounded-lg p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-medium text-gray-900 mb-1">HVAC temperature control</h3>
                              <div className="flex items-center text-sm text-gray-500 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>Cobblestone Collaborative</span>
                              </div>
                            </div>
                            <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">
                              Closed
                            </Badge>
                          </div>
                        </div>

                        {/* Closed Service Request 2 */}
                        <div className="bg-white border rounded-lg p-4 shadow-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="text-lg font-medium text-gray-900 mb-1">WiFi connectivity issue</h3>
                              <div className="flex items-center text-sm text-gray-500 mb-2">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span>Cobblestone Collaborative</span>
                              </div>
                            </div>
                            <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">
                              Closed
                            </Badge>
                          </div>
                        </div>
                      </>
                    )}
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

        {/* Filters Modal */}
        {filtersModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-lg bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFilters({
                        availableNow: false,
                        date: "",
                        startTime: "",
                        endTime: "",
                        allDay: false,
                        resourceTypes: {
                          conferenceRoom: false,
                          laboratory: false,
                          equipment: false,
                          meetingRoom: false,
                          lounge: false,
                          outdoorSpace: false
                        },
                        capacity: 1,
                        amenities: {
                          wifi: false,
                          projector: false,
                          coffeeMachine: false,
                          parking: false
                        }
                      })}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Clear all
                    </button>
                    <button
                      onClick={() => setFiltersModalOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-6 w-6" />
                    </button>
                          </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Available Now */}
                  <div className="flex items-center justify-between">
                          <div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                        <span className="font-medium text-gray-900">Available Now</span>
                          </div>
                      <p className="text-sm text-gray-600 mt-1">Show only resources available right now</p>
                    </div>
                    <Switch
                      checked={filters.availableNow}
                      onCheckedChange={(checked) => setFilters({...filters, availableNow: checked})}
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="h-5 w-5 text-gray-500" />
                      <span className="font-medium text-gray-900">Date & Time</span>
                    </div>
                    
                    <div className="space-y-4">
                          <div>
                        <Label htmlFor="date" className="text-sm text-gray-700">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={filters.date}
                          onChange={(e) => setFilters({...filters, date: e.target.value})}
                          className="mt-1"
                        />
                          </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startTime" className="text-sm text-gray-700">Start Time</Label>
                          <Input
                            id="startTime"
                            type="time"
                            value={filters.startTime}
                            onChange={(e) => setFilters({...filters, startTime: e.target.value})}
                            className="mt-1"
                          />
                          </div>
                          <div>
                          <Label htmlFor="endTime" className="text-sm text-gray-700">End Time</Label>
                          <Input
                            id="endTime"
                            type="time"
                            value={filters.endTime}
                            onChange={(e) => setFilters({...filters, endTime: e.target.value})}
                            className="mt-1"
                          />
                          </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">All Day</span>
                        <Switch
                          checked={filters.allDay}
                          onCheckedChange={(checked) => setFilters({...filters, allDay: checked})}
                        />
                      </div>
                      </div>
                    </div>

                  {/* Resource Type */}
                  <div className="space-y-4">
                    <span className="font-medium text-gray-900">Resource Type</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Conference Room</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">18</span>
                                                     <Checkbox
                             checked={filters.resourceTypes.conferenceRoom}
                             onCheckedChange={(checked) => setFilters({
                               ...filters,
                               resourceTypes: {...filters.resourceTypes, conferenceRoom: !!checked}
                             })}
                           />
                          </div>
                          </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Laboratory</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">12</span>
                                                     <Checkbox
                             checked={filters.resourceTypes.laboratory}
                             onCheckedChange={(checked) => setFilters({
                               ...filters,
                               resourceTypes: {...filters.resourceTypes, laboratory: !!checked}
                             })}
                           />
                         </div>
                       </div>
                       <div className="flex items-center justify-between">
                         <span className="text-sm text-gray-700">Equipment</span>
                         <div className="flex items-center gap-2">
                           <span className="text-xs text-gray-500">8</span>
                           <Checkbox
                             checked={filters.resourceTypes.equipment}
                             onCheckedChange={(checked) => setFilters({
                               ...filters,
                               resourceTypes: {...filters.resourceTypes, equipment: !!checked}
                             })}
                           />
                         </div>
                       </div>
                       <div className="flex items-center justify-between">
                         <span className="text-sm text-gray-700">Meeting Room</span>
                         <div className="flex items-center gap-2">
                           <span className="text-xs text-gray-500">22</span>
                           <Checkbox
                             checked={filters.resourceTypes.meetingRoom}
                             onCheckedChange={(checked) => setFilters({
                               ...filters,
                               resourceTypes: {...filters.resourceTypes, meetingRoom: !!checked}
                             })}
                           />
                         </div>
                       </div>
                       <div className="flex items-center justify-between">
                         <span className="text-sm text-gray-700">Lounge</span>
                         <div className="flex items-center gap-2">
                           <span className="text-xs text-gray-500">5</span>
                           <Checkbox
                             checked={filters.resourceTypes.lounge}
                             onCheckedChange={(checked) => setFilters({
                               ...filters,
                               resourceTypes: {...filters.resourceTypes, lounge: !!checked}
                             })}
                           />
                         </div>
                       </div>
                       <div className="flex items-center justify-between">
                         <span className="text-sm text-gray-700">Outdoor Space</span>
                         <div className="flex items-center gap-2">
                           <span className="text-xs text-gray-500">3</span>
                           <Checkbox
                             checked={filters.resourceTypes.outdoorSpace}
                             onCheckedChange={(checked) => setFilters({
                               ...filters,
                               resourceTypes: {...filters.resourceTypes, outdoorSpace: !!checked}
                             })}
                           />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-gray-500" />
                      <span className="font-medium text-gray-900">Capacity</span>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>1 people</span>
                        <span>100+ people</span>
                      </div>
                      <Slider
                        value={[filters.capacity]}
                        onValueChange={(value) => setFilters({...filters, capacity: value[0]})}
                        max={100}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-4">
                    <span className="font-medium text-gray-900">Amenities</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Wi-Fi</span>
                                                         <Checkbox
                               checked={filters.amenities.wifi}
                               onCheckedChange={(checked) => setFilters({
                                 ...filters,
                                 amenities: {...filters.amenities, wifi: !!checked}
                               })}
                             />
                           </div>
                         </div>
                       </div>
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                           <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                           </svg>
                         </div>
                         <div className="flex-1">
                           <div className="flex items-center justify-between">
                             <span className="text-sm text-gray-700">Projector</span>
                             <Checkbox
                               checked={filters.amenities.projector}
                               onCheckedChange={(checked) => setFilters({
                                 ...filters,
                                 amenities: {...filters.amenities, projector: !!checked}
                               })}
                             />
                           </div>
                         </div>
                       </div>
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                           <Coffee className="h-4 w-4 text-gray-600" />
                         </div>
                         <div className="flex-1">
                           <div className="flex items-center justify-between">
                             <span className="text-sm text-gray-700">Coffee Machine</span>
                             <Checkbox
                               checked={filters.amenities.coffeeMachine}
                               onCheckedChange={(checked) => setFilters({
                                 ...filters,
                                 amenities: {...filters.amenities, coffeeMachine: !!checked}
                               })}
                             />
                           </div>
                         </div>
                       </div>
                       <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                           <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                           </svg>
                         </div>
                         <div className="flex-1">
                           <div className="flex items-center justify-between">
                             <span className="text-sm text-gray-700">Parking</span>
                             <Checkbox
                               checked={filters.amenities.parking}
                               onCheckedChange={(checked) => setFilters({
                                 ...filters,
                                 amenities: {...filters.amenities, parking: !!checked}
                               })}
                             />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-between p-6 border-t bg-gray-50">
                  <span className="text-sm text-gray-600">No filters applied</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setFiltersModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => setFiltersModalOpen(false)}
                    >
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-lg max-h-[90vh] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                {/* Header with back button */}
                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setBookingModalOpen(false)}
                    className="absolute top-4 left-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                        </button>
                  
                  {/* Room Image */}
                  <div className="h-48 bg-gray-200 overflow-hidden">
                    {(() => {
                      const firstSlot = Array.from(selectedTimeSlots)[0]
                      if (firstSlot) {
                        const [resourceIndex] = firstSlot.split('-').map(Number)
                        const resourceImages = [
                          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=400&fit=crop", // Conference room
                          "/images/content/Lab3.jpg", // Lab 3
                          "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&h=400&fit=crop", // Telescope
                          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=400&fit=crop", // Meeting room
                          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop", // The Lounge
                          "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&h=400&fit=crop" // Roof deck
                        ]
                        return (
                          <img 
                            src={resourceImages[resourceIndex]} 
                            alt="Space" 
                            className="w-full h-full object-cover"
                          />
                        )
                      }
                      return <div className="w-full h-full bg-gray-100" />
                    })()}
                          </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 overflow-y-auto flex-1">
                  {/* Title and subtitle */}
                          <div>
                    {(() => {
                      const firstSlot = Array.from(selectedTimeSlots)[0]
                      if (firstSlot) {
                        const [resourceIndex] = firstSlot.split('-').map(Number)
                        const resources = [
                          { name: 'Conference room', subtitle: 'The Hive Conference Room', type: 'Conference Center (Small)' },
                          { name: 'Lab 3', subtitle: 'Science Wing Laboratory', type: 'Laboratory Space' },
                          { name: 'Telescope', subtitle: 'Observatory Viewing Station', type: 'Telescope Access' },
                          { name: 'Meeting room', subtitle: 'East Tower Conference Room', type: 'Meeting Space' },
                          { name: 'The Lounge', subtitle: 'Student Center Lounge', type: 'Lounge Area' },
                          { name: 'Roof deck', subtitle: 'North Building Roof Deck', type: 'Outdoor Space' }
                        ]
                        const resource = resources[resourceIndex]
                        return (
                          <>
                            <h2 className="text-2xl font-bold text-gray-900">{resource.type}</h2>
                            <p className="text-gray-600 text-lg">{resource.subtitle}</p>
                          </>
                        )
                      }
                      return <h2 className="text-2xl font-bold text-gray-900">Select a resource</h2>
                    })()}
                          </div>

                  {/* Date and Time Selection */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <div className="relative">
                        <select className="border border-gray-300 rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none">
                          <option>May 25</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <span className="text-lg font-medium">
                        {(() => {
                          const slots = Array.from(selectedTimeSlots)
                          if (slots.length === 0) return "Select time"
                          
                          const timeSlots = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM']
                          const timeIndexes = slots.map(slot => parseInt(slot.split('-')[1])).sort((a, b) => a - b)
                          const startTime = timeSlots[timeIndexes[0]]
                          const endTime = timeSlots[timeIndexes[timeIndexes.length - 1] + 1] || '7 PM'
                          
                          return `${startTime} - ${endTime}`
                        })()}
                      </span>
                    </div>
                  </div>

                  {/* Time Schedule Visual */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>9 AM</span>
                      <span>12 PM</span>
                      <span>3 PM</span>
                      <span>6 PM</span>
                    </div>
                    <div className="relative h-16 bg-gray-100 rounded-lg overflow-hidden">
                      {/* Time slots visual */}
                      <div className="absolute inset-0 flex">
                        {Array.from({ length: 9 }, (_, i) => {
                          const timeIndex = i + 1 // Skip 9 AM for visual purposes
                          const isSelected = Array.from(selectedTimeSlots).some(slot => 
                            slot.split('-')[1] === timeIndex.toString()
                          )
                          const isPast = timeIndex < 3 // Before 12 PM
                          const isUnavailable = timeIndex > 8 // After 6 PM
                          
                          return (
                            <div
                              key={i}
                              className={`flex-1 h-full border-r border-gray-200 ${
                                isSelected 
                                  ? 'bg-blue-500' 
                                  : isPast 
                                    ? 'bg-gray-300 bg-opacity-50' 
                                    : isUnavailable
                                      ? 'bg-gray-200'
                                      : 'bg-white'
                              }`}
                            />
                          )
                        })}
                      </div>
                      
                      {/* Selected time indicator */}
                      {Array.from(selectedTimeSlots).length > 0 && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xs font-medium">
                          {Array.from(selectedTimeSlots).length} slot{Array.from(selectedTimeSlots).length > 1 ? 's' : ''}
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                      Not available after 6:00 PM
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>ARE Demo Building, 29 1st Ave, New York, NY 10003, USA</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm underline">
                      Open in maps
                        </button>
                          </div>

                  {/* Amenities */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Amenities</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <Wifi className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-900">Wi-Fi</span>
                          </div>
                      <div className="flex items-center gap-3">
                        <Monitor className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-900">TV / Projector</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                    <div className="text-gray-700 space-y-4">
                      <p>
                        Great ideas come through collaboration, which is why ARE Demo Building offers a fully amenitized conference center to incubate your next great idea.
                      </p>
                      <p>
                        Holds up to 6 people (comfortably 4).
                      </p>
                    </div>
                  </div>

                  {/* Opening Hours */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Opening hours</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Sun</span>
                        <span className="text-gray-700">Closed</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Mon</span>
                        <span className="text-gray-700">08:00 AM - 05:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Tue</span>
                        <span className="text-gray-700">08:00 AM - 05:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Wed</span>
                        <span className="text-gray-700">08:00 AM - 05:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Thu</span>
                        <span className="text-gray-700">08:00 AM - 05:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Fri</span>
                        <span className="text-gray-700">08:00 AM - 05:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Sat</span>
                        <span className="text-gray-700">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t bg-gray-50 space-y-4 flex-shrink-0">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">Additional information required for this booking</p>
                    <p className="text-sm font-medium text-gray-900">
                      {(() => {
                        const slots = Array.from(selectedTimeSlots)
                        if (slots.length === 0) return "May 25 • Select time"
                        
                        const timeSlots = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM']
                        const timeIndexes = slots.map(slot => parseInt(slot.split('-')[1])).sort((a, b) => a - b)
                        const startTime = timeSlots[timeIndexes[0]]
                        const endTime = timeSlots[timeIndexes[timeIndexes.length - 1] + 1] || '7 PM'
                        
                        const formatTime = (time: string) => {
                          const [hour, period] = time.split(' ')
                          const hourNum = parseInt(hour)
                          return `${hourNum}:00 ${period.toLowerCase()}`
                        }
                        
                        return `May 25 • ${formatTime(startTime)} - ${formatTime(endTime)}`
                      })()}
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={() => {
                      // Create booking confirmation data
                      const slots = Array.from(selectedTimeSlots)
                      if (slots.length > 0) {
                        const firstSlot = slots[0]
                        const [resourceIndex] = firstSlot.split('-').map(Number)
                        const resources = [
                          { name: 'Conference room', subtitle: 'The Hive Conference Room', type: 'Conference Center (Small)' },
                          { name: 'Lab 3', subtitle: 'Science Wing Laboratory', type: 'Laboratory Space' },
                          { name: 'Telescope', subtitle: 'Observatory Viewing Station', type: 'Telescope Access' },
                          { name: 'Meeting room', subtitle: 'East Tower Conference Room', type: 'Meeting Space' },
                          { name: 'The Lounge', subtitle: 'Student Center Lounge', type: 'Lounge Area' },
                          { name: 'Roof deck', subtitle: 'North Building Roof Deck', type: 'Outdoor Space' }
                        ]
                        const resource = resources[resourceIndex]
                        
                        const timeSlots = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM']
                        const timeIndexes = slots.map(slot => parseInt(slot.split('-')[1])).sort((a, b) => a - b)
                        const startTime = timeSlots[timeIndexes[0]]
                        const endTime = timeSlots[timeIndexes[timeIndexes.length - 1] + 1] || '7 PM'
                        
                        setConfirmedBooking({
                          resource: resource,
                          date: 'May 25',
                          startTime: startTime,
                          endTime: endTime,
                          slots: slots
                        })
                      }
                      
                      setBookingModalOpen(false)
                      setBookingConfirmationModalOpen(true)
                    }}
                  >
                    Book
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Confirmation Modal */}
        {bookingConfirmationModalOpen && confirmedBooking && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-lg max-h-[90vh] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Booking confirmed</h2>
                  </div>
                  <button
                    onClick={() => {
                      setBookingConfirmationModalOpen(false)
                      setConfirmedBooking(null)
                      setSelectedTimeSlots(new Set())
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                        </button>
                          </div>

                {/* Content */}
                <div className="p-6 space-y-6 overflow-y-auto flex-1">
                  {/* Confirmation message */}
                  <p className="text-gray-700">
                    Your booking for {confirmedBooking.resource.name} is confirmed for Wednesday, July 16. You will receive an email confirmation with details.
                  </p>

                  {/* Details Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Details</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-gray-900">Wednesday, July 16, 2025</span>
                          </div>
                      
                      <div className="ml-6 text-gray-600">
                        {(() => {
                          const formatTime = (time: string) => {
                            const [hour, period] = time.split(' ')
                            const hourNum = parseInt(hour)
                            return `${hourNum}:45 ${period}`
                          }
                          return `${formatTime(confirmedBooking.startTime)} - ${formatTime(confirmedBooking.endTime)}`
                        })()}
                      </div>
                      
                      <button className="ml-6 text-orange-600 hover:text-orange-700 text-sm underline">
                        Cancel booking
                        </button>
                      </div>
                    </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-600" />
                      <span className="font-medium text-gray-900">Cobblestone Collaborative</span>
                    </div>
                    <div className="ml-6 text-gray-600">{confirmedBooking.resource.name}</div>
                  </div>

                  {/* Amenities */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Amenities</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Monitor className="h-4 w-4 text-gray-600" />
                        <span className="text-gray-900">TV / Projector</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-600" />
                        <span className="text-gray-900">Phone</span>
                    </div>
                      <div className="flex items-center gap-3">
                        <Wifi className="h-4 w-4 text-gray-600" />
                        <span className="text-gray-900">Wi-Fi</span>
                  </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Payment details</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">{confirmedBooking.resource.name}</span>
                      <span className="text-gray-900 font-medium">$20.00</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t bg-gray-50 flex-shrink-0">
                  <Button 
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={() => {
                      setBookingConfirmationModalOpen(false)
                      setConfirmedBooking(null)
                      setSelectedTimeSlots(new Set())
                    }}
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Account Settings Modal */}
        {accountSettingsModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Account settings</h2>
                  <button
                    onClick={() => setAccountSettingsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First name
                      </label>
                      <input
                        type="text"
                        defaultValue="Pat"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last name
                      </label>
                      <input
                        type="text"
                        defaultValue="Tobin"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    </div>

                  {/* Company and Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        defaultValue="HqO"
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        defaultValue="pat.tobin@are.com"
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Default Building */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default building
                    </label>
                    <select defaultValue="ARE Demo Building" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      {buildings.map((building) => (
                        <option key={building.name} value={building.name}>
                          {building.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Links */}
                  <div className="space-y-3">
                    <button className="block text-sm text-blue-600 hover:text-blue-700 underline">
                      Terms of service
                    </button>
                    <button className="block text-sm text-blue-600 hover:text-blue-700 underline">
                      Privacy policy
                    </button>
                    <button 
                      className="block text-sm text-blue-600 hover:text-blue-700 underline"
                      onClick={() => {
                        setAccountSettingsModalOpen(false)
                        setUpdatePasswordModalOpen(true)
                      }}
                    >
                      Update password
                    </button>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t">
                  <Button 
                    variant="outline"
                    onClick={() => setAccountSettingsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Update Password Modal */}
        {updatePasswordModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Update Password</h2>
                  <button
                    onClick={() => {
                      setUpdatePasswordModalOpen(false)
                      setPasswordForm({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      })
                      setShowNewPassword(false)
                      setShowConfirmPassword(false)
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Current Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter your current password here..."
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* New Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter your new password here..."
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                        className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        show
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm new password here..."
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                        className="w-full px-3 py-2 pr-16 border border-gray-300 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        show
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-600">Both upper and lower cases</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-600">At least one number</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-600">At least one special character</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-600">At least 8 characters</span>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 p-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setUpdatePasswordModalOpen(false)
                      setPasswordForm({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      })
                      setShowNewPassword(false)
                      setShowConfirmPassword(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Update Password
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Locations Modal */}
        {locationsModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-900">Locations</h2>
                  <button
                    onClick={() => setLocationsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Select all locations toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Select all locations</span>
                    <button
                      onClick={toggleAllLocations}
                      className={`w-11 h-6 rounded-full transition-colors ${
                        selectedLocations.length === locations.length
                          ? 'bg-blue-600'
                          : 'bg-gray-200'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                          selectedLocations.length === locations.length
                            ? 'translate-x-5'
                            : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Location List */}
                  <div className="space-y-3">
                    {locations.map((location) => (
                      <div
                        key={location.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          location.checked
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => toggleLocation(location.name)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{location.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {location.address}
                            </div>
                          </div>
                          {location.checked && (
                            <div className="flex items-center justify-center w-5 h-5 bg-blue-500 rounded-sm">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Selected count */}
                  <div className="text-sm text-gray-600">
                    {selectedLocations.length} selected
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t bg-gray-50">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleLocationsDone}
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Spacer to push footer down with consistent 160px gap */}
      <div className="flex-1 min-h-[160px]"></div>

      {/* Footer positioned to align with main content */}
      <div className="flex flex-1 justify-center">
        <div className={cn(
          "px-4 py-4 w-full max-w-[1024px]",
          !isMobile && leftDrawerOpen ? "ml-[280px]" : "mx-auto"
        )}>
        <SiteFooter buildingName={primaryBuilding} />
        </div>
      </div>
    </div>
  )
}

