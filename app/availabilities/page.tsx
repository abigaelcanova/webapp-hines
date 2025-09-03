"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { AvailabilitiesBrowser } from "@/components/availabilities-browser";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ContentCard } from "@/components/content-card";
import ExploreMap from "@/components/explore-map";

export default function AvailabilitiesPage() {
  const params = useSearchParams();
  // Unified availability search state (moved from landing)
  const [searchType, setSearchType] = useState<string>("Spaces");
  const [searchRegion, setSearchRegion] = useState<string>("All regions");
  const [searchCity, setSearchCity] = useState<string>("All cities");
  const [searchDate, setSearchDate] = useState<string>("");
  const [searchTime, setSearchTime] = useState<string>("");
  const [searchDurationHrs, setSearchDurationHrs] = useState<number>(2);
  const [leaseStartMonth, setLeaseStartMonth] = useState<string>("");
  const [leaseStartYear, setLeaseStartYear] = useState<string>("");
  const [leaseTermMonths, setLeaseTermMonths] = useState<number>(12);
  const [showOpenOnly, setShowOpenOnly] = useState<boolean>(false);

  // Minimal data reused from landing for search demo
  const highlightCards = [
    {
      image: "/images/content/EntireSpace-1.png",
      imageAlt: "Boardroom",
      category: "Spaces",
      timestamp: "Bookable",
      headline: "Executive Boardroom",
      description:
        "Premium AV, seamless video conferencing, and concierge support.",
      region: "South",
      city: "Houston",
      neighborhoodCategory: "Culture & Arts",
    },
    {
      image: "/images/content/Lab3.jpg",
      imageAlt: "Innovation Lab",
      category: "Spaces",
      timestamp: "Bookable",
      headline: "Innovation Lab",
      description:
        "Modular workstations and writable walls for project sprints.",
      region: "West",
      city: "San Francisco",
      neighborhoodCategory: "Culture & Arts",
    },
    {
      image: "/images/content/Microscope.jpg",
      imageAlt: "Makers Studio",
      category: "Spaces",
      timestamp: "Hourly",
      headline: "Makers Studio",
      description: "Prototyping benches, 3D printing, and light fabrication.",
      region: "Northeast",
      city: "New York",
      neighborhoodCategory: "Culture & Arts",
    },
    {
      image: "/images/content/ARENetworkingEvent.jpg",
      imageAlt: "Networking Night",
      category: "Events",
      timestamp: "This month",
      headline: "Tech & Design Mixer",
      description:
        "Meet founders, designers, and operators from top companies.",
      region: "South",
      city: "Austin",
      neighborhoodCategory: "Dining & Nightlife",
    },
    {
      image: "/images/content/innovationevent.jpg",
      imageAlt: "Innovation Summit",
      category: "Events",
      timestamp: "This quarter",
      headline: "Innovation Summit Series",
      description:
        "Talks and workshops with industry leaders in tech and design.",
      region: "West",
      city: "Seattle",
      neighborhoodCategory: "Culture & Arts",
    },
    {
      image: "/images/content/Taco.png",
      imageAlt: "Chef Pop‑Up",
      category: "Events",
      timestamp: "Weekly",
      headline: "Chef Pop‑Up Lunch",
      description: "Rotating menus from local favorites in the main lobby.",
      region: "South",
      city: "Houston",
      neighborhoodCategory: "Dining & Nightlife",
    },
    {
      image: "/images/content/exos-1-1.jpg",
      imageAlt: "Wellness Class",
      category: "Wellness",
      timestamp: "Daily",
      headline: "Group Classes & Training",
      description:
        "Studio sessions and coaching for strength, mobility, and recovery.",
      region: "Northeast",
      city: "Boston",
      neighborhoodCategory: "Parks & Trails",
    },
    {
      image: "/images/content/EntireSpace-1.png",
      imageAlt: "Wellness Lounge",
      category: "Wellness",
      timestamp: "Open now",
      headline: "Wellness Lounge",
      description: "Quiet retreat with massage chairs and meditation pods.",
      region: "Midwest",
      city: "Chicago",
      neighborhoodCategory: "Parks & Trails",
    },
    {
      image: "/images/content/ARENetworkingEvent.jpg",
      imageAlt: "Community Workshop",
      category: "Wellness",
      timestamp: "Monthly",
      headline: "Mindfulness Workshop",
      description: "Guided breathwork and stress‑management techniques.",
      region: "West",
      city: "Los Angeles",
      neighborhoodCategory: "Culture & Arts",
    },
    {
      image: "/images/content/innovationevent.jpg",
      imageAlt: "All‑Hands Space",
      category: "Spaces",
      timestamp: "Bookable",
      headline: "All‑Hands Atrium",
      description:
        "Tiered seating, full lighting grid, and broadcast‑ready AV.",
      region: "Mountain",
      city: "Denver",
      neighborhoodCategory: "Culture & Arts",
    },
    {
      image: "/images/content/EntireSpace-1.png",
      imageAlt: "Meeting Suite",
      category: "Spaces",
      timestamp: "Bookable",
      headline: "Team Meeting Suite",
      description: "Four connected rooms with a private break‑out lounge.",
      region: "Southeast",
      city: "Miami",
      neighborhoodCategory: "Dining & Nightlife",
    },
    {
      image: "/images/content/ARENetworkingEvent.jpg",
      imageAlt: "Town Hall",
      category: "Events",
      timestamp: "Next week",
      headline: "Town Hall & Q&A",
      description: "Company‑wide updates and open Q&A with leadership.",
      region: "Northeast",
      city: "New York",
      neighborhoodCategory: "Culture & Arts",
    },
  ];

  const NEIGHBORHOOD_CATEGORIES = [
    "All",
    "Culture & Arts",
    "Dining & Nightlife",
    "Parks & Trails",
  ] as const;
  type NeighborhoodCategory = (typeof NEIGHBORHOOD_CATEGORIES)[number];
  const [neighborhoodCategory, setNeighborhoodCategory] =
    useState<NeighborhoodCategory>("All");

  const buildings = [
    {
      name: "Texas Tower",
      image: "/Hines/texastower_banner.jpg",
      region: "South",
      city: "Houston",
      availableFrom: "2025-08",
      openTenancy: false,
      floors: [
        { floor: 10, availableFrom: "2025-08", openTenancy: false, rsf: 9000 },
        { floor: 27, availableFrom: "2025-11", openTenancy: true, rsf: 15000 },
      ],
      latitude: 29.7607,
      longitude: -95.3671,
    },
    {
      name: "Hines Demo Building",
      image: "/Hines.jpg",
      region: "South",
      city: "Houston",
      availableFrom: "2025-06",
      openTenancy: true,
      floors: [
        { floor: 18, availableFrom: "2025-06", openTenancy: true, rsf: 12000 },
        { floor: 22, availableFrom: "2025-09", openTenancy: false, rsf: 18500 },
      ],
      latitude: 29.7604,
      longitude: -95.3698,
    },
    {
      name: "Downtown Tower",
      image:
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80",
      region: "Northeast",
      city: "New York",
      availableFrom: "2025-09",
      openTenancy: true,
      floors: [
        { floor: 14, availableFrom: "2025-09", openTenancy: true, rsf: 16000 },
        { floor: 31, availableFrom: "2026-02", openTenancy: false, rsf: 21000 },
      ],
      latitude: 40.758,
      longitude: -73.9855,
    },
    {
      name: "Seaport Center",
      image:
        "https://images.unsplash.com/photo-1505764706515-aa95265c5abc?auto=format&fit=crop&w=1600&q=80",
      region: "Northeast",
      city: "Boston",
      availableFrom: "2025-11",
      openTenancy: false,
      floors: [
        { floor: 7, availableFrom: "2025-11", openTenancy: false, rsf: 8500 },
        { floor: 19, availableFrom: "2026-03", openTenancy: true, rsf: 14000 },
      ],
      latitude: 42.3601,
      longitude: -71.0589,
    },
    {
      name: "Market Street Hub",
      image:
        "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1600&q=80",
      region: "West",
      city: "San Francisco",
      availableFrom: "2025-07",
      openTenancy: true,
      floors: [
        { floor: 8, availableFrom: "2025-07", openTenancy: true, rsf: 11000 },
        { floor: 21, availableFrom: "2025-12", openTenancy: false, rsf: 17500 },
      ],
      latitude: 37.7749,
      longitude: -122.4194,
    },
    {
      name: "Pioneer Place",
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
      region: "West",
      city: "Seattle",
      availableFrom: "2025-10",
      openTenancy: false,
      floors: [
        { floor: 9, availableFrom: "2025-10", openTenancy: false, rsf: 10000 },
        { floor: 17, availableFrom: "2026-01", openTenancy: true, rsf: 15500 },
      ],
      latitude: 47.6062,
      longitude: -122.3321,
    },
    {
      name: "Lakeside Tower",
      image:
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80",
      region: "Midwest",
      city: "Chicago",
      availableFrom: "2025-12",
      openTenancy: true,
      floors: [
        { floor: 12, availableFrom: "2025-12", openTenancy: true, rsf: 13000 },
        { floor: 28, availableFrom: "2026-04", openTenancy: false, rsf: 20000 },
      ],
      latitude: 41.8781,
      longitude: -87.6298,
    },
    {
      name: "Union Station Campus",
      image:
        "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?auto=format&fit=crop&w=1600&q=80",
      region: "Mountain",
      city: "Denver",
      availableFrom: "2025-09",
      openTenancy: false,
      floors: [
        { floor: 6, availableFrom: "2025-09", openTenancy: false, rsf: 7800 },
        { floor: 15, availableFrom: "2026-02", openTenancy: true, rsf: 14200 },
      ],
      latitude: 39.7392,
      longitude: -104.9903,
    },
    {
      name: "Brickell View",
      image:
        "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1600&q=80",
      region: "Southeast",
      city: "Miami",
      availableFrom: "2025-07",
      openTenancy: true,
      floors: [
        { floor: 11, availableFrom: "2025-07", openTenancy: true, rsf: 11500 },
        { floor: 23, availableFrom: "2025-12", openTenancy: false, rsf: 16500 },
      ],
      latitude: 25.7617,
      longitude: -80.1918,
    },
    {
      name: "Arts District Tower",
      image:
        "https://images.unsplash.com/photo-1499914485622-a88fac536970?auto=format&fit=crop&w=1600&q=80",
      region: "West",
      city: "Los Angeles",
      availableFrom: "2025-10",
      openTenancy: false,
      floors: [
        { floor: 5, availableFrom: "2025-10", openTenancy: false, rsf: 9200 },
        { floor: 18, availableFrom: "2026-03", openTenancy: true, rsf: 15800 },
      ],
      latitude: 34.0522,
      longitude: -118.2437,
    },
  ];

  const regions = useMemo(
    () => Array.from(new Set(buildings.map((b) => b.region))).sort(),
    [buildings]
  );
  const cities = useMemo(
    () => Array.from(new Set(buildings.map((b) => b.city))).sort(),
    [buildings]
  );
  const allRegions = regions;
  const allCities = cities;

  // Initialize filters from URL params on mount
  useEffect(() => {
    if (!params) return;
    const type = params.get("type");
    const region = params.get("region");
    const city = params.get("city");
    if (type) setSearchType(type);
    if (region) setSearchRegion(region);
    if (city) setSearchCity(city);
  }, [params]);

  const searchResults = useMemo(() => {
    const toYearMonth = (y: string, m: string) =>
      `${y}-${String(
        (
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ] as const
        ).indexOf(m as never) + 1
      ).padStart(2, "0")}`;

    if (searchType === "Buildings") {
      let items = buildings;
      if (searchRegion !== "All regions")
        items = items.filter((b) => b.region === searchRegion);
      if (searchCity !== "All cities")
        items = items.filter((b) => b.city === searchCity);

      const desiredStart =
        leaseStartMonth && leaseStartYear
          ? toYearMonth(leaseStartYear, leaseStartMonth)
          : "";
      return items.map((b) => {
        const nextOpen = b.availableFrom || "";
        const isOpenNow = b.openTenancy;
        const floors = (b.floors || []).filter((f: any) => {
          if (showOpenOnly) return f.openTenancy;
          if (!desiredStart) return true;
          return f.openTenancy || desiredStart >= f.availableFrom;
        });
        const floorsSummary = floors.length
          ? `Open floors: ${floors
              .slice(0, 4)
              .map((f: any) => f.floor)
              .join(", ")}${floors.length > 4 ? "…" : ""}`
          : "No matching floors";
        return {
          image: b.image,
          imageAlt: b.name,
          category: isOpenNow
            ? "Open tenancy"
            : `Next open: ${nextOpen || "TBD"}`,
          timestamp: floorsSummary,
          headline: b.name,
          description: `${b.region} • ${b.city}`,
        };
      });
    }

    // Spaces/Amenities/Events/All
    let items = highlightCards.filter(
      (c) => searchType === "All" || c.category === searchType
    );
    if (searchRegion !== "All regions")
      items = items.filter((c) => c.region === searchRegion);
    if (searchCity !== "All cities")
      items = items.filter((c) => c.city === searchCity);
    if (neighborhoodCategory !== "All")
      items = items.filter(
        (c: any) => c.neighborhoodCategory === neighborhoodCategory
      );
    return items;
  }, [
    searchType,
    searchRegion,
    searchCity,
    searchDate,
    searchTime,
    searchDurationHrs,
    leaseStartMonth,
    leaseStartYear,
    leaseTermMonths,
    showOpenOnly,
    neighborhoodCategory,
  ]);

  // Derived helper sets for sidebar browse sections
  const cityList = allCities;
  const categoryList = Array.from(
    new Set(searchResults.map((r) => r.category))
  ).sort();

  const [mapBounds, setMapBounds] = useState<{
    north: number;
    south: number;
    east: number;
    west: number;
  } | null>(null);

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Hero header */}
      <section className="bg-white">
        <div className="max-w-none mx-auto px-12 pt-8 pb-4 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold">
            Explore Spaces, Events & Services
          </h1>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto text-sm">
            Discover amazing spaces, join exciting events, and access premium
            services across buildings in major cities.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {[
              "Wellness‑focused",
              "Tech‑Enabled",
              "Large Group Friendly",
              "Premium Amenities",
              "Outdoor Access",
            ].map((t) => (
              <span
                key={t}
                className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-800 border"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Explore layout with left filters and wide results grid */}
      <section className="bg-white">
        <div className="max-w-none mx-auto px-12 py-6">
          {/* Full-width filters bar above the grid */}
          <div className="rounded-xl border bg-white p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
              <div className="md:col-span-3">
                <label className="text-xs text-gray-600">Type</label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Spaces" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spaces">Spaces</SelectItem>
                    <SelectItem value="Wellness">Amenities</SelectItem>
                    <SelectItem value="Events">Events</SelectItem>
                    <SelectItem value="Buildings">Buildings</SelectItem>
                    <SelectItem value="All">All</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3">
                <label className="text-xs text-gray-600">Region</label>
                <Select value={searchRegion} onValueChange={setSearchRegion}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All regions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All regions">All regions</SelectItem>
                    {allRegions.map((r) => (
                      <SelectItem key={r} value={r}>
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3">
                <label className="text-xs text-gray-600">City</label>
                <Select value={searchCity} onValueChange={setSearchCity}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All cities">All cities</SelectItem>
                    {allCities.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3 flex items-end">
                <Button className="w-full bg-[#BF1231] hover:bg-[#9f0e28] text-white">
                  Search
                </Button>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
              <div className="md:col-span-4">
                <label className="text-xs text-gray-600">Date</label>
                <Input
                  type="date"
                  className="mt-1"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
              <div className="md:col-span-4">
                <label className="text-xs text-gray-600">Start time</label>
                <Input
                  type="time"
                  className="mt-1"
                  value={searchTime}
                  onChange={(e) => setSearchTime(e.target.value)}
                />
              </div>
              <div className="md:col-span-4">
                <label className="text-xs text-gray-600">Duration (hrs)</label>
                <div className="mt-2 flex items-center gap-3">
                  <Slider
                    value={[searchDurationHrs]}
                    onValueChange={(v) => setSearchDurationHrs(v[0])}
                    min={0.5}
                    max={8}
                    step={0.5}
                    className="flex-1"
                  />
                  <span className="w-10 text-right text-sm text-gray-700">
                    {searchDurationHrs}
                  </span>
                </div>
              </div>
              {searchType === "Buildings" && (
                <>
                  <div className="md:col-span-4">
                    <label className="text-xs text-gray-600">
                      Lease start month
                    </label>
                    <Select
                      value={leaseStartMonth}
                      onValueChange={setLeaseStartMonth}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Jan",
                          "Feb",
                          "Mar",
                          "Apr",
                          "May",
                          "Jun",
                          "Jul",
                          "Aug",
                          "Sep",
                          "Oct",
                          "Nov",
                          "Dec",
                        ].map((m) => (
                          <SelectItem key={m} value={m}>
                            {m}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-4">
                    <label className="text-xs text-gray-600">
                      Lease start year
                    </label>
                    <Select
                      value={leaseStartYear}
                      onValueChange={setLeaseStartYear}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {[2025, 2026, 2027, 2028, 2029].map((y) => (
                          <SelectItem key={y} value={String(y)}>
                            {y}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-4 flex items-end">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="open-only"
                        checked={showOpenOnly}
                        onCheckedChange={(v) => setShowOpenOnly(!!v)}
                      />
                      <label
                        htmlFor="open-only"
                        className="text-xs text-gray-700"
                      >
                        Open tenancy only
                      </label>
                    </div>
                  </div>
                </>
              )}
            </div>
            {/* Neighborhood categories */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {NEIGHBORHOOD_CATEGORIES.map((c) => (
                <Button
                  key={c}
                  variant={neighborhoodCategory === c ? "default" : "outline"}
                  className={
                    neighborhoodCategory === c
                      ? "bg-[#BF1231] hover:bg-[#9f0e28] text-white h-8 px-3"
                      : "h-8 px-3"
                  }
                  onClick={() => setNeighborhoodCategory(c)}
                >
                  <span className="text-xs">
                    {c === "All" ? "All neighborhoods" : c}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Two-column layout: left results, right sticky map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: results */}
            <div className="lg:col-span-7">
              {/* Filters were moved above the grid */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-600">
                  {searchResults.length} results
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {searchResults.map((card, idx) => (
                  <div
                    key={`sr-card-${idx}`}
                    className="rounded-2xl border overflow-hidden bg-white hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={(card as any).image}
                        alt={(card as any).imageAlt || (card as any).headline}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 text-[11px] px-2.5 py-1 rounded-full bg-white/90 text-gray-900 border">
                        {(card as any).category}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-medium truncate">
                        {card.headline}
                      </div>
                      <p className="mt-1 text-xs text-gray-600 line-clamp-3">
                        {card.description}
                      </p>
                      <div className="mt-3">
                        <Button variant="outline" size="sm">
                          Contact to Book
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: sticky map always visible */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="sticky top-[88px]">
                <ExploreMap
                  points={buildings.map((b, idx) => ({
                    id: String(idx),
                    name: b.name,
                    latitude: (b as any).latitude ?? 29.7604,
                    longitude: (b as any).longitude ?? -95.3698,
                  }))}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter buildingName="Texas Tower" />
    </main>
  );
}
