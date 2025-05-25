"use client"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import { useRef, useState } from "react"

export default function ExplorePage() {
  const router = useRouter()
  const lastPage = useRef<string | null>(null)
  const [activeTab, setActiveTab] = useState("All")
  const tabs = ["All", "Events", "Spaces", "Food", "Amenities"]

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white rounded-t-2xl relative">
        <h1 className="text-2xl font-semibold">Explore</h1>
        {/* Chip Bar Centered */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${activeTab === tab ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button type="button" className="p-2 rounded-full hover:bg-gray-100" onClick={() => router.back()} aria-label="Close explore">
          <X className="h-6 w-6 text-gray-700" />
        </button>
      </div>
      {/* Filter Row */}
      <div className="flex items-center justify-between px-6 py-3 bg-white gap-4">
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
        {/* Right: Price, Available Now, More */}
        <div className="flex gap-2 items-center">
          <button type="button" className="px-3 py-1 rounded-md text-sm font-medium border hover:bg-gray-100">Price</button>
          <button type="button" className="px-3 py-1 rounded-md text-sm font-medium border hover:bg-gray-100">Available now</button>
          <button type="button" className="px-3 py-1 rounded-md text-sm font-medium border hover:bg-gray-100">More</button>
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