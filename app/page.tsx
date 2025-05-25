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
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { ModernCarousel } from "@/components/modern-carousel"
import Link from "next/link"
import { Drawer, DrawerContent } from "@/components/ui/drawer"

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

  const openActivity = () => {
    if (isMobile) {
      setMobileActivityDrawerOpen(true)
    } else {
      setAssistantDrawerOpen(false)
      setRightDrawerOpen(true)
    }
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
    <div className="flex flex-col h-screen w-full bg-white">
      <header className="grid grid-cols-12 items-center h-14 px-4 bg-white">
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
          <Badge className="h-8 px-3 text-sm font-bold bg-gray-200 text-black rounded-md w-full max-w-[144px]">Logo</Badge>
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

          <Avatar className="h-8 w-8 ml-3">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content with 3-column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Drawer */}
        {isMobile && leftDrawerOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setLeftDrawerOpen(false)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setLeftDrawerOpen(false) }} tabIndex={0} role="button" />
        )}
        <aside
          className={cn(
            "bg-white transition-all duration-300 ease-in-out",
            // Mobile: fixed overlay when open, hidden when closed
            "lg:relative lg:block",
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
            <div className="h-full p-4 flex flex-col font-normal">
              {/* Navigation Items */}
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
                  <span className="text-sm">Happenings</span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-2 text-muted-foreground hover:text-foreground font-normal"
                >
                  <CalendarDays className="h-4 w-4 mr-3" />
                  <span className="text-sm">Events</span>
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
                  className="w-full justify-start h-auto p-2 text-muted-foreground hover:text-foreground font-normal"
                >
                  <MessageSquare className="h-4 w-4 mr-3" />
                  <span className="text-sm">Feedback</span>
                </Button>
              </nav>

              {/* Quick Links Section */}
              <div className="mb-6">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 px-2">Quick Links</h4>
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
                  <a
                    href="https://example.com/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-2 py-1.5 text-xs text-muted-foreground hover:bg-gray-100 rounded-md transition-colors"
                  >
                    Contact Directory
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

              {/* Explore Card */}
              <div className="mt-auto">
                <Link href="/explore" className="bg-white rounded-lg p-4 text-gray-900 border shadow-sm cursor-pointer hover:bg-gray-50 block focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <div className="flex-1">
                    <h4 className="text-xs font-medium text-gray-900 mb-1">Explore</h4>
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
            "flex-1 overflow-auto relative",
            // Add proper margins for mobile and desktop
            "mx-4 lg:m-4",
            !leftDrawerOpen && !rightDrawerOpen && !assistantDrawerOpen && "lg:max-w-5xl lg:mx-auto",
          )}
        >
          {/* Main Content */}
          {currentPage === "home" ? (
            <div className="space-y-6">
              {/* Main Row: Left 3/5 actions, Right 2/5 carousel/news */}
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Left 3/5: Welcome Card, Action Cards and Sections */}
                <div className="w-full lg:w-3/5 flex flex-col gap-6">
                  {/* Welcome Card (moved from top) */}
                  <div className="relative rounded-2xl overflow-hidden bg-card border shadow-sm">
                    <div
                      className="relative h-48 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${selectedBuilding.image.replace("w=120&h=120", "w=1200&h=800")})`,
                      }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-40" />
                      <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                        <h1 className="text-3xl font-medium mb-2">{selectedBuilding.name}</h1>
                        <p className="text-white text-lg mb-4">A living piece of New York history.</p>
                        <Button size="sm" className="w-fit bg-white text-black hover:bg-gray-100" onClick={() => setCurrentPage("about")}>About</Button>
                      </div>
                    </div>
                  </div>
                  {/* Carousel and News Feed (now full width, below welcome card) */}
                  <div className="bg-white rounded-xl border shadow-sm p-4 flex flex-col items-center justify-center my-6">
                    <ModernCarousel slides={carouselSlides} />
                    <div className="w-full mt-6">
                      <h2 className="text-sm font-medium text-gray-700 mb-4">What's happening</h2>
                      <div className="space-y-6">
                        {/* Blog-style news posts */}
                        <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm flex flex-col md:flex-row">
                          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80" alt="Rooftop terrace maintenance" className="h-40 md:h-32 w-full md:w-40 object-cover" />
                          <div className="flex-1 p-5 flex flex-col justify-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Rooftop terrace will be closed for maintenance this weekend</h3>
                            <p className="text-sm text-gray-500 mb-2">Building Management &middot; 1 day ago</p>
                            <p className="text-gray-700 text-sm">The rooftop terrace will be temporarily closed for scheduled maintenance. We appreciate your understanding.</p>
                          </div>
                        </div>
                        <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm flex flex-col md:flex-row">
                          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80" alt="Guest registration" className="h-40 md:h-32 w-full md:w-40 object-cover" />
                          <div className="flex-1 p-5 flex flex-col justify-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">John Smith has been registered for today's meeting</h3>
                            <p className="text-sm text-gray-500 mb-2">Front Desk &middot; 2 minutes ago</p>
                            <p className="text-gray-700 text-sm">A new guest, John Smith, has been registered for your meeting. Please greet your guest at the lobby.</p>
                          </div>
                        </div>
                        <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm flex flex-col md:flex-row">
                          <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&q=80" alt="Maintenance update" className="h-40 md:h-32 w-full md:w-40 object-cover" />
                          <div className="flex-1 p-5 flex flex-col justify-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Broken light in Conference Room A has been fixed</h3>
                            <p className="text-sm text-gray-500 mb-2">Maintenance Team &middot; 1 hour ago</p>
                            <p className="text-gray-700 text-sm">The maintenance request for the broken light in Conference Room A has been completed. Thank you for your patience.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 3 Action Cards in a Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Register a Guest Card */}
                    <div className="bg-white rounded-xl p-6 border shadow-sm flex flex-col items-center justify-center text-center h-full">
                      <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center mb-2">
                        <UserPlus className="h-5 w-5 text-teal-600" />
                      </div>
                      <h3 className="font-normal text-sm text-gray-900">Register a Guest</h3>
                    </div>
                    {/* Click to Fix Card */}
                    <div className="bg-white rounded-xl p-6 border shadow-sm flex flex-col items-center justify-center text-center h-full">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center mb-2">
                        <Wrench className="h-5 w-5 text-orange-600" />
                      </div>
                      <h3 className="font-normal text-sm text-gray-900">Click to Fix</h3>
                    </div>
                    {/* Book a Space Card */}
                    <div
                      className="bg-white rounded-xl p-6 border shadow-sm flex flex-col items-center justify-center text-center h-full cursor-pointer hover:bg-gray-50"
                      onClick={() => setCurrentPage("book-space")}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setCurrentPage('book-space'); }}
                    >
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <h3 className="font-normal text-sm text-gray-900">Book a Space</h3>
                    </div>
                  </div>
                  {/* Spaces Section */}
                  <div className="bg-white">
                    <h2 className="text-sm font-medium text-gray-700 mb-4">Spaces</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                      {/* Example tall cards for spaces */}
                      {bookingResources.slice(0, 3).map((space) => (
                        <div key={space.id} className="flex flex-col h-64 rounded-lg overflow-hidden border shadow-sm bg-gray-50">
                          <div className="h-2/3 bg-cover bg-center" style={{backgroundImage: `url('https://source.unsplash.com/400x300/?office,${space.name}')`}} />
                          <div className="flex-1 p-4 flex flex-col justify-between">
                            <h3 className="font-medium text-gray-900 text-base mb-2">{space.name}</h3>
                            <Button size="sm" className="w-fit mt-auto">Book</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Events Section */}
                  <div className="bg-white">
                    <h2 className="text-sm font-medium text-gray-700 mb-4">Events</h2>
                    <div className="overflow-x-auto">
                      <div className="flex gap-6 min-w-full pb-2">
                        {/* Example event cards */}
                        {[
                          {
                            id: 1,
                            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
                            title: "Summer Rooftop Social",
                            host: "By Building Management",
                            desc: "Join your colleagues for drinks, music, and city views on the rooftop.",
                          },
                          {
                            id: 2,
                            image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&q=80",
                            title: "Yoga & Wellness Morning",
                            host: "By Wellness Team",
                            desc: "Start your day with a guided yoga session and healthy snacks.",
                          },
                        ].map(event => (
                          <div key={event.id} className="flex flex-col w-72 rounded-2xl overflow-hidden bg-gray-900 text-white shadow-lg relative">
                            <img src={event.image} alt={event.title} className="h-48 w-full object-cover" />
                            <div className="flex-1 flex flex-col p-5">
                              <h3 className="text-xl font-semibold mb-1">{event.title}</h3>
                              <p className="text-xs text-gray-300 mb-2">{event.host}</p>
                              <p className="text-sm text-gray-100 mb-4 flex-1">{event.desc}</p>
                              <div className="flex gap-2 mt-auto">
                                <button type="button" className="bg-white text-gray-900 font-regular rounded-lg px-4 py-2 text-sm hover:bg-gray-100">RSVP</button>
                                <button type="button" className="bg-gray-800 text-white font-regular rounded-lg px-4 py-2 text-sm border border-white/20 hover:bg-gray-700">View details</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Amenities Section */}
                  <div className="bg-white">
                    <h2 className="text-sm font-medium text-gray-700 mb-4">Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {/* Example amenities */}
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                        <Coffee className="h-6 w-6 text-brown-500 mb-2" />
                        <span className="text-sm text-gray-900">Coffee Bar</span>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                        <User className="h-6 w-6 text-blue-500 mb-2" />
                        <span className="text-sm text-gray-900">Concierge</span>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                        <Wrench className="h-6 w-6 text-orange-500 mb-2" />
                        <span className="text-sm text-gray-900">Maintenance</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right 2/5: Carousel and News Feed */}
                <div className="w-full lg:w-2/5 mx-4">
                  <div className="bg-white rounded-xl border shadow-sm p-4 flex flex-col items-center justify-center sticky top-8">
                    <ModernCarousel slides={carouselSlides} />
                    <div className="w-full mt-6">
                      <h2 className="text-sm font-medium text-gray-700 mb-4">What's happening</h2>
                      <div className="space-y-6">
                        {/* Blog-style news posts */}
                        <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm flex flex-col md:flex-row">
                          <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&q=80" alt="Rooftop terrace maintenance" className="h-40 md:h-32 w-full md:w-40 object-cover" />
                          <div className="flex-1 p-5 flex flex-col justify-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Rooftop terrace will be closed for maintenance this weekend</h3>
                            <p className="text-sm text-gray-500 mb-2">Building Management &middot; 1 day ago</p>
                            <p className="text-gray-700 text-sm">The rooftop terrace will be temporarily closed for scheduled maintenance. We appreciate your understanding.</p>
                          </div>
                        </div>
                        <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm flex flex-col md:flex-row">
                          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80" alt="Guest registration" className="h-40 md:h-32 w-full md:w-40 object-cover" />
                          <div className="flex-1 p-5 flex flex-col justify-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">John Smith has been registered for today's meeting</h3>
                            <p className="text-sm text-gray-500 mb-2">Front Desk &middot; 2 minutes ago</p>
                            <p className="text-gray-700 text-sm">A new guest, John Smith, has been registered for your meeting. Please greet your guest at the lobby.</p>
                          </div>
                        </div>
                        <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm flex flex-col md:flex-row">
                          <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400&q=80" alt="Maintenance update" className="h-40 md:h-32 w-full md:w-40 object-cover" />
                          <div className="flex-1 p-5 flex flex-col justify-center">
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">Broken light in Conference Room A has been fixed</h3>
                            <p className="text-sm text-gray-500 mb-2">Maintenance Team &middot; 1 hour ago</p>
                            <p className="text-gray-700 text-sm">The maintenance request for the broken light in Conference Room A has been completed. Thank you for your patience.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : currentPage === "book-space" ? (
            <div className="space-y-6">
              {/* Book a Space Header */}
              <div>
                <h1 className="text-2xl font-medium text-gray-900 mb-6">Book a space</h1>

                {/* View Tabs */}
                <div className="flex items-center gap-6 mb-6">
                  <button
                    type="button"
                    onClick={() => setBookingView("calendar")}
                    className={cn(
                      "text-sm font-medium pb-2 border-b-2 transition-colors",
                      bookingView === "calendar"
                        ? "text-gray-900 border-gray-900"
                        : "text-gray-500 border-transparent hover:text-gray-700",
                    )}
                  >
                    Calendar view
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingView("list")}
                    className={cn(
                      "text-sm font-medium pb-2 border-b-2 transition-colors",
                      bookingView === "list"
                        ? "text-gray-900 border-gray-900"
                        : "text-gray-500 border-transparent hover:text-gray-700",
                    )}
                  >
                    List view
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingView("map")}
                    className={cn(
                      "text-sm font-medium pb-2 border-b-2 transition-colors",
                      bookingView === "map"
                        ? "text-gray-900 border-gray-900"
                        : "text-gray-500 border-transparent hover:text-gray-700",
                    )}
                  >
                    Map view
                  </button>
                </div>
              </div>

              {bookingView === "calendar" && (
                <div className="bg-white rounded-xl border shadow-sm">
                  {/* Booking Header */}
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      {/* Resource Type Tabs */}
                      <div className="flex items-center gap-6">
                        <button className="text-sm font-medium text-blue-600 pb-2 border-b-2 border-blue-600" type="button">
                          Space
                        </button>
                        <button className="text-sm font-medium text-gray-500 pb-2 border-b-2 border-transparent hover:text-gray-700" type="button">
                          Equipment
                        </button>
                        <button className="text-sm font-medium text-gray-500 pb-2 border-b-2 border-transparent hover:text-gray-700" type="button">
                          Transportation
                        </button>
                      </div>

                      {/* Date and View Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronLeftIcon className="h-4 w-4" />
                          </Button>
                          <span className="text-sm font-medium text-gray-900">
                            {bookingDateLabel}
                          </span>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronRightIcon className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-1 bg-gray-100 rounded-md p-1">
                          <button
                            type="button"
                            onClick={() => setBookingViewType("day")}
                            className={cn(
                              "px-3 py-1 text-xs font-medium rounded-sm transition-colors",
                              bookingViewType === "day"
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-600 hover:text-gray-900",
                            )}
                          >
                            Day
                          </button>
                          <button
                            type="button"
                            onClick={() => setBookingViewType("month")}
                            className={cn(
                              "px-3 py-1 text-xs font-medium rounded-sm transition-colors",
                              bookingViewType === "month"
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-600 hover:text-gray-900",
                            )}
                          >
                            Month
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="overflow-x-auto">
                    <div className="min-w-[1000px]">
                      {/* Time Header */}
                      <div className="flex border-b">
                        <div className="w-48 p-3 text-xs font-medium text-gray-500 bg-gray-50">Resource</div>
                        {timeSlots.map((time, index) => (
                          <div
                            key={time}
                            className="flex-1 p-3 text-xs font-medium text-gray-500 text-center bg-gray-50 border-l"
                          >
                            {time}
                          </div>
                        ))}
                      </div>

                      {/* Resource Rows */}
                      {bookingResources.map((resource, resourceIndex) => (
                        <div key={resource.id} className="flex border-b hover:bg-gray-50/50">
                          <div className="w-48 p-3 flex items-center gap-3 bg-white">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 rounded"
                              checked={selectedResources.includes(resource.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedResources([...selectedResources, resource.id])
                                } else {
                                  setSelectedResources(selectedResources.filter((id) => id !== resource.id))
                                }
                              }}
                            />
                            <span className="text-sm text-blue-600 font-medium">{resource.name}</span>
                          </div>

                          {timeSlots.map((time, timeIndex) => (
                            <div
                              key={`${resource.id}-${time}`}
                              className={cn(
                                "flex-1 p-3 border-l relative cursor-pointer hover:bg-blue-50",
                                timeIndex === 4 && "border-l-2 border-l-red-500", // Current time indicator at 12 pm
                              )}
                            >
                              {/* Add booking slots or events here */}
                              <div className="h-6" />

                              {/* Current time line */}
                              {timeIndex === 4 && (
                                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-red-500"></div>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {bookingView === "list" && (
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <p className="text-gray-500">List view coming soon...</p>
                </div>
              )}

              {bookingView === "map" && (
                <div className="bg-white rounded-xl border shadow-sm p-6">
                  <p className="text-gray-500">Map view coming soon...</p>
                </div>
              )}
            </div>
          ) : currentPage === "about" ? (
            <div className="space-y-6">
              {/* About Hero */}
              <div className="relative rounded-2xl overflow-hidden bg-card border shadow-sm">
                <div
                  className="relative h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedBuilding.image.replace("w=120&h=120", "w=1200&h=800")})` }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                    <h1 className="text-3xl font-medium mb-2">About</h1>
                    <p className="text-white text-lg mb-4">Everything you need to know about your building.</p>
                  </div>
                </div>
              </div>
              {/* Tabs */}
              <div className="bg-white rounded-xl border shadow-sm p-6">
                <div className="border-b border-gray-200 mb-6">
                  <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {['Overview', 'Property Contacts', 'Tenants', 'Features', 'Amenities', 'More'].map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        className={cn(
                          "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm",
                          aboutTab === tab
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        )}
                        onClick={() => setAboutTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </nav>
                </div>
                {/* Tab Content */}
                <div>
                  {aboutTab === 'Overview' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Welcome to {selectedBuilding.name}</h2>
                      <p className="text-gray-700">This is your building's overview. Here you can find general information, history, and highlights about your property.</p>
                    </div>
                  )}
                  {aboutTab === 'Property Contacts' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Property Contacts</h2>
                      <ul className="text-gray-700 space-y-1">
                        <li>Building Manager: John Smith (john.smith@example.com)</li>
                        <li>Security: Jane Doe (security@example.com)</li>
                        <li>Maintenance: Mike Brown (maintenance@example.com)</li>
                      </ul>
                    </div>
                  )}
                  {aboutTab === 'Tenants' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Tenants</h2>
                      <ul className="text-gray-700 space-y-1">
                        <li>Acme Corp</li>
                        <li>Globex Inc</li>
                        <li>Umbrella Co</li>
                      </ul>
                    </div>
                  )}
                  {aboutTab === 'Features' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Features</h2>
                      <ul className="text-gray-700 space-y-1">
                        <li>24/7 Security</li>
                        <li>On-site Fitness Center</li>
                        <li>Conference Rooms</li>
                      </ul>
                    </div>
                  )}
                  {aboutTab === 'Amenities' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">Amenities</h2>
                      <ul className="text-gray-700 space-y-1">
                        <li>Coffee Bar</li>
                        <li>Concierge</li>
                        <li>Maintenance</li>
                      </ul>
                    </div>
                  )}
                  {aboutTab === 'More' && (
                    <div>
                      <h2 className="text-lg font-semibold mb-2">More Useful Info</h2>
                      <p className="text-gray-700">Find building policies, emergency procedures, and more resources here.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : currentPage === "explore" ? (
            <div className="flex flex-col h-full w-full">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b bg-white rounded-t-2xl">
                <h1 className="text-2xl font-semibold">Explore</h1>
                <button type="button" className="p-2 rounded-full hover:bg-gray-100" onClick={() => setCurrentPage('home')} aria-label="Close explore">
                  <X className="h-4 w-4 text-gray-700" />
                </button>
              </div>
              {/* Filter Row */}
              <div className="flex items-center justify-between px-6 py-3 bg-white border-b gap-4">
                {/* Left: Cities, Neighborhoods, Buildings */}
                <div className="flex gap-2 items-center">
                  <select className="border rounded-md px-2 py-1 text-sm">
                    <option>City</option>
                    <option>New York</option>
                    <option>Boston</option>
                  </select>
                  <select className="border rounded-md px-2 py-1 text-sm">
                    <option>Neighborhood</option>
                    <option>Midtown</option>
                    <option>Downtown</option>
                  </select>
                  <select className="border rounded-md px-2 py-1 text-sm">
                    <option>Building</option>
                    <option>Empire State</option>
                    <option>Chrysler</option>
                  </select>
                </div>
                {/* Center: Tab Bar */}
                <div className="flex gap-2 items-center">
                  {['All', 'Events', 'Spaces', 'Food', 'Amenities'].map(tab => (
                    <button key={tab} type="button" className="px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-100">
                      {tab}
                    </button>
                  ))}
                </div>
                {/* Right: Price, Available Now, More */}
                <div className="flex gap-2 items-center">
                  <button type="button" className="px-3 py-1 rounded-md text-sm font-medium border hover:bg-gray-100">Price</button>
                  <button type="button" className="px-3 py-1 rounded-md text-sm font-medium border hover:bg-gray-100">Available now</button>
                  <button type="button" className="px-3 py-1 rounded-md text-sm font-medium border hover:bg-gray-100">More</button>
                </div>
              </div>
              {/* Map Section */}
              <div className="flex-1 p-6">
                <div className="w-full h-full rounded-3xl border overflow-hidden bg-gray-200 flex items-center justify-center text-gray-500 text-lg">
                  [Map Placeholder]
                </div>
              </div>
            </div>
          ) : null}
        </main>

        {/* Right Drawer - Activity (desktop only) */}
        {!isMobile && (
          <aside className={cn("bg-white transition-all duration-300 ease-in-out", rightDrawerOpen ? "w-1/4" : "w-0")}>
            {rightDrawerOpen && (
              <div className="h-full p-4 overflow-y-auto">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-base font-normal">Activity</h2>
                  <Button variant="ghost" size="icon" type="button" onClick={() => setRightDrawerOpen(false)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setRightDrawerOpen(false) }}>
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close activity panel</span>
                  </Button>
                </div>

                {/* Calendar */}
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
            )}
          </aside>
        )}

        {/* Right Drawer - Assistant (desktop only) */}
        {!isMobile && (
          <aside className={cn("transition-all duration-300 ease-in-out", assistantDrawerOpen ? "w-1/4 mr-4 mb-4" : "w-0")}>
            {assistantDrawerOpen && (
              <div className="h-full bg-white rounded-xl border shadow-sm flex flex-col mt-4 mb-4">
                {/* Header */}
                <div className="flex items-center justify-between p-4 ">
                  <div className="flex items-center gap-3">
                    <span className="font-regular text-gray-900">Assistant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" type="button" onClick={() => setAssistantDrawerOpen(false)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setAssistantDrawerOpen(false) }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col">
                  {/* Greeting */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">How can I help you today?</p>
                  </div>

                  {/* Suggestion Card */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-xs text-gray-600">What hours is the rooftop terrace open?</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-xs text-gray-600">What's the food truck schedule for the week?</p>
                  </div>

                  {/* Chat Area - Spacer */}
                  <div className="flex-1" />

                  {/* Input Area */}
                  <div className="space-y-3">
                    <div className="relative">
                      <Input placeholder="Ask anything" className="pr-12 py-3 text-sm" />
                      <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8" type="button">
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
            )}
          </aside>
        )}

        {/* Mobile Bottom Drawer - Activity */}
        <Drawer open={mobileActivityDrawerOpen} onOpenChange={setMobileActivityDrawerOpen}>
          <DrawerContent className="h-[90vh] overflow-y-auto">
            {/* Activity content (copy from right drawer) */}
            <div className="h-full p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-normal">Activity</h2>
                <Button variant="ghost" size="icon" type="button" onClick={() => setMobileActivityDrawerOpen(false)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setMobileActivityDrawerOpen(false) }}>
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close activity panel</span>
                </Button>
              </div>
              <div className="mb-6">{renderCalendar()}</div>
              <div className="space-y-4">
                <h3 className="text-sm font-normal text-gray-700">{selectedDateLabel}</h3>
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
          </DrawerContent>
        </Drawer>
        {/* Mobile Bottom Drawer - Assistant */}
        <Drawer open={mobileAssistantDrawerOpen} onOpenChange={setMobileAssistantDrawerOpen}>
          <DrawerContent className="h-[90vh] overflow-y-auto">
            {/* Assistant content (copy from right drawer) */}
            <div className="h-full bg-white rounded-xl border shadow-sm flex flex-col mt-4 mb-4">
              <div className="flex items-center justify-between p-4 ">
                <div className="flex items-center gap-3">
                  <span className="font-regular text-gray-900">Assistant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" type="button">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" type="button" onClick={() => setMobileAssistantDrawerOpen(false)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setMobileAssistantDrawerOpen(false) }}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex-1 p-4 flex flex-col">
                <div className="mb-4">
                  <p className="text-sm text-gray-600">How can I help you today?</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-xs text-gray-600">What hours is the rooftop terrace open?</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-xs text-gray-600">What's the food truck schedule for the week?</p>
                </div>
                <div className="flex-1" />
                <div className="space-y-3">
                  <div className="relative">
                    <Input placeholder="Ask anything" className="pr-12 py-3 text-sm" />
                    <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8" type="button">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-[10px] text-gray-500 text-center">
                    The assistant can make mistakes. It does not use your data to train its models.{' '}
                    <button className="underline hover:no-underline" type="button">Learn more</button>
                  </p>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

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
                      <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-muted text-left">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <Building className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Conference Room A</p>
                          <p className="text-xs text-muted-foreground">Meeting space</p>
                        </div>
                      </button>
                      <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-muted text-left">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">John Smith</p>
                          <p className="text-xs text-muted-foreground">Building manager</p>
                        </div>
                      </button>
                      <button className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-muted text-left">
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
  )
}
