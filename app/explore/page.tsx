"use client"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ExplorePage() {
  const router = useRouter()
  const lastPage = useRef<string | null>(null)
  const [activeTab, setActiveTab] = useState("All")
  const tabs = ["All", "Events", "Spaces", "Food", "Amenities"]

  return (
    <div className="flex flex-col h-screen w-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b relative">
        <h1 className="text-2xl font-semibold">Explore</h1>
        {/* Chip Bar Centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? "bg-gray-100 text-gray-900 border-gray-200 border" 
                  : "bg-white text-gray-500 border-gray-200 border hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => router.back()}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close explore</span>
        </Button>
      </div>
      {/* Filter Row */}
      <div className="flex items-center justify-between px-6 py-3 bg-white border-b gap-4">
        {/* Left: Cities, Neighborhoods, Buildings */}
        <div className="flex gap-2 items-center">
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new-york">New York</SelectItem>
              <SelectItem value="boston">Boston</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Neighborhood" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="midtown">Midtown</SelectItem>
              <SelectItem value="downtown">Downtown</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Building" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="empire-state">Empire State</SelectItem>
              <SelectItem value="chrysler">Chrysler</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Right: Price, Available Now, More */}
        <div className="flex gap-2 items-center">
          <Button variant="outline" size="sm">Price</Button>
          <Button variant="outline" size="sm">Available now</Button>
          <Button variant="outline" size="sm">More</Button>
        </div>
      </div>
      {/* Map Section */}
      <div className="flex-1 p-6">
        <div className="w-full h-full rounded-3xl border overflow-hidden">
          <img
            src="/map.png"
            alt="Interactive Map"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
} 