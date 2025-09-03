"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Building as BuildingIcon } from "lucide-react";

const BUILDINGS = [
  { name: "Hines Demo Building", image: "/Hines.jpg" },
  {
    name: "Williams Tower",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "JPMorgan Chase Tower",
    image:
      "https://images.unsplash.com/photo-1555109307-f7d9da25c244?auto=format&fit=crop&w=1600&q=80",
  },
  {
    name: "717 Texas",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80",
  },
  { name: "All Buildings", image: "/images/logos/lighthouse.png" },
];

export default function SiteHeader() {
  const [primaryBuilding, setPrimaryBuilding] = useState<string>(
    BUILDINGS[0].name
  );

  return (
    <header className="w-full sticky top-0 z-40 bg-[#F9FAFB] border-b">
      <div className="w-full px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8">
            <img
              src="/Hines/herebyhineslogo.png"
              alt="Here by Hines Logo"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <span className="text-lg font-medium text-black">Hines</span>
        </Link>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-9 px-2 py-1 gap-2 hover:bg-muted"
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={
                      BUILDINGS.find((b) => b.name === primaryBuilding)?.image
                    }
                    alt={primaryBuilding}
                  />
                  <AvatarFallback className="bg-[#BF1231] text-white text-xs font-medium">
                    <BuildingIcon className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium truncate max-w-[180px]">
                  {primaryBuilding}
                </span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[320px] p-0 z-50">
              <div className="p-2">
                <div className="px-2 py-1 text-sm font-medium text-muted-foreground">
                  Buildings
                </div>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {BUILDINGS.map((b) => (
                    <div
                      key={b.name}
                      className="group flex items-center justify-between rounded-md hover:bg-muted p-2 cursor-pointer"
                      onClick={() => setPrimaryBuilding(b.name)}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={b.image} alt={b.name} />
                          <AvatarFallback className="bg-[#BF1231] text-white text-xs font-medium">
                            <BuildingIcon className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate">{b.name}</span>
                      </div>
                      {primaryBuilding === b.name && (
                        <span className="text-xs text-[#BF1231]">Selected</span>
                      )}
                    </div>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <Link href="/login">
                    <Button className="w-full bg-[#BF1231] hover:bg-[#9f0e28] text-white">
                      Tenant log in
                    </Button>
                  </Link>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/availabilities"
              className="text-sm text-gray-900 hover:text-gray-700 font-medium"
            >
              Explore
            </Link>
            <Link
              href="/about"
              className="text-sm text-gray-900 hover:text-gray-700 font-medium"
            >
              About
            </Link>
            <Link
              href="/neighborhood"
              className="text-sm text-gray-900 hover:text-gray-700 font-medium"
            >
              Neighborhood
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-900 hover:text-gray-700 font-medium"
            >
              Contact
            </Link>
          </nav>
          <Link href="/login" className="hidden md:inline-flex">
            <Button className="bg-[#BF1231] hover:bg-[#9f0e28] text-white">
              Tenant log in
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
