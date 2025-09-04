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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button as UIButton } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

export default function AvailabilitiesPage() {
  function resetFilters() {
    setSearchType("All");
    setSearchRegion("All regions");
    setSearchCity("All cities");
    setSearchBuildingName("All buildings");
    setSearchDate("");
    setSearchTime("");
    setSearchDurationHrs(2);
    setShowPublicOnly(false);
    setMerchantCategory("All categories");
    setMerchantQuery("");
    setLeaseStartMonth("");
    setLeaseStartYear("");
    setShowOpenOnly(false);
  }
  const params = useSearchParams();
  // Unified availability search state (moved from landing)
  const [searchType, setSearchType] = useState<string>("All");
  const [searchRegion, setSearchRegion] = useState<string>("All regions");
  const [searchCity, setSearchCity] = useState<string>("All cities");
  const [searchDate, setSearchDate] = useState<string>("");
  const [searchTime, setSearchTime] = useState<string>("");
  const [searchDurationHrs, setSearchDurationHrs] = useState<number>(2);
  const [leaseStartMonth, setLeaseStartMonth] = useState<string>("");
  const [leaseStartYear, setLeaseStartYear] = useState<string>("");
  const [leaseTermMonths, setLeaseTermMonths] = useState<number>(12);
  const [showOpenOnly, setShowOpenOnly] = useState<boolean>(false);
  const [searchBuildingName, setSearchBuildingName] =
    useState<string>("All buildings");
  const [showPublicOnly, setShowPublicOnly] = useState<boolean>(false);
  // Merchant directory filters
  const MERCHANT_CATEGORIES = [
    "All categories",
    "Dining",
    "Cafe",
    "Retail",
    "Wellness",
    "Services",
  ] as const;
  const [merchantCategory, setMerchantCategory] =
    useState<string>("All categories");
  const [merchantQuery, setMerchantQuery] = useState<string>("");

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

  // Merchant directory mock data
  const merchants = [
    {
      name: "Atrium Cafe",
      image:
        "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1600&q=80",
      category: "Cafe",
      tags: ["coffee", "pastries"],
      buildingName: "Texas Tower",
      region: "South",
      city: "Houston",
      blurb: "Specialty coffee, fresh-baked pastries, and grab‑and‑go bites.",
    },
    {
      name: "Market Kitchen",
      image:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80",
      category: "Dining",
      tags: ["lunch", "bowls", "salads"],
      buildingName: "Texas Tower",
      region: "South",
      city: "Houston",
      blurb: "Seasonal bowls and salads with plenty of vegetarian options.",
    },
    {
      name: "Ridgewell Retail",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=80",
      category: "Retail",
      tags: ["convenience", "snacks"],
      buildingName: "Hines Demo Building",
      region: "South",
      city: "Houston",
      blurb: "Everyday essentials, snacks, and office supplies.",
    },
    {
      name: "Studio Stretch",
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1600&q=80",
      category: "Wellness",
      tags: ["yoga", "mobility"],
      buildingName: "Texas Tower",
      region: "South",
      city: "Houston",
      blurb: "Daily yoga and mobility classes to recharge during the day.",
    },
    {
      name: "North End Deli",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
      category: "Dining",
      tags: ["sandwiches"],
      buildingName: "Downtown Tower",
      region: "Northeast",
      city: "New York",
      blurb: "Classic deli sandwiches and soups made to order.",
    },
    {
      name: "Green & Co.",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1600&q=80",
      category: "Dining",
      tags: ["salads", "bowls"],
      buildingName: "Seaport Center",
      region: "Northeast",
      city: "Boston",
      blurb: "Build‑your‑own salads with locally sourced produce.",
    },
    {
      name: "Thread & Needle",
      image:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80",
      category: "Retail",
      tags: ["tailor", "dry cleaning"],
      buildingName: "Market Street Hub",
      region: "West",
      city: "San Francisco",
      blurb: "On‑site tailoring and dry cleaning drop‑off services.",
    },
    {
      name: "Cycle Works",
      image:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1600&q=80",
      category: "Services",
      tags: ["bike repair"],
      buildingName: "Pioneer Place",
      region: "West",
      city: "Seattle",
      blurb: "Same‑day bike repair and tune‑ups for commuters.",
    },
    {
      name: "Sunrise Smoothies",
      image:
        "https://images.unsplash.com/photo-1542444459-db63c9f50830?auto=format&fit=crop&w=1600&q=80",
      category: "Cafe",
      tags: ["smoothies", "juice"],
      buildingName: "Lakeside Tower",
      region: "Midwest",
      city: "Chicago",
      blurb: "Cold‑pressed juices and protein smoothies.",
    },
    {
      name: "Fit Lab",
      image:
        "https://images.unsplash.com/photo-1534367610401-9f19cf2600d0?auto=format&fit=crop&w=1600&q=80",
      category: "Wellness",
      tags: ["training"],
      buildingName: "Union Station Campus",
      region: "Mountain",
      city: "Denver",
      blurb: "Personal training and small‑group strength classes.",
    },
    {
      name: "Brickell Flowers",
      image:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=1600&q=80",
      category: "Retail",
      tags: ["gifts", "florist"],
      buildingName: "Brickell View",
      region: "Southeast",
      city: "Miami",
      blurb: "Full‑service florist and gift shop in the lobby arcade.",
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
  const buildingNames = useMemo(
    () => [
      "All buildings",
      ...Array.from(new Set(buildings.map((b) => b.name))),
    ],
    [buildings]
  );
  // Building name -> coords for merchant map markers
  const buildingCoords: Record<
    string,
    { latitude: number; longitude: number }
  > = useMemo(
    () =>
      buildings.reduce((acc: any, b: any) => {
        acc[b.name] = {
          latitude: (b as any).latitude,
          longitude: (b as any).longitude,
        };
        return acc;
      }, {}),
    [buildings]
  );

  // Names of items that are bookable by the public (demo)
  const PUBLIC_BOOKABLE = useMemo(
    () =>
      new Set<string>([
        // Spaces/Amenities/Events
        "Executive Boardroom",
        "Makers Studio",
        "Team Meeting Suite",
        "Chef Pop‑Up Lunch",
        "Mindfulness Workshop",
        // Merchants
        "Atrium Cafe",
        "Market Kitchen",
        "Sunrise Smoothies",
        "North End Deli",
      ]),
    []
  );

  // Initialize filters from URL params on mount
  useEffect(() => {
    if (!params) return;
    const type = params.get("type");
    const region = params.get("region");
    const city = params.get("city");
    const building = params.get("building");
    if (type) setSearchType(type);
    if (region) setSearchRegion(region);
    if (city) setSearchCity(city);
    if (building) setSearchBuildingName(building);
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

    // Merchant directory
    if (searchType === "Merchants") {
      let items = merchants as any[];
      if (searchRegion !== "All regions")
        items = items.filter((m) => m.region === searchRegion);
      if (searchCity !== "All cities")
        items = items.filter((m) => m.city === searchCity);
      if (searchBuildingName !== "All buildings")
        items = items.filter((m) => m.buildingName === searchBuildingName);
      if (merchantCategory !== "All categories")
        items = items.filter((m) => m.category === merchantCategory);
      if (merchantQuery)
        items = items.filter(
          (m) =>
            m.name.toLowerCase().includes(merchantQuery.toLowerCase()) ||
            (m.tags || []).some((t: string) =>
              t.toLowerCase().includes(merchantQuery.toLowerCase())
            )
        );
      if (showPublicOnly)
        items = items.filter((m) => PUBLIC_BOOKABLE.has(m.name));
      return items.map((m) => ({
        image: m.image,
        imageAlt: m.name,
        category: `Merchant · ${m.category}`,
        timestamp: m.buildingName,
        headline: m.name,
        description: m.blurb,
        publicBookable: PUBLIC_BOOKABLE.has(m.name),
      }));
    }

    if (searchType === "Buildings") {
      let items = buildings;
      if (searchRegion !== "All regions")
        items = items.filter((b) => b.region === searchRegion);
      if (searchCity !== "All cities")
        items = items.filter((b) => b.city === searchCity);
      if (searchBuildingName !== "All buildings")
        items = items.filter((b) => b.name === searchBuildingName);

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
    if (showPublicOnly) {
      items = items.filter((c: any) => PUBLIC_BOOKABLE.has(c.headline));
    }
    return items.map((c: any) => ({
      ...c,
      publicBookable: PUBLIC_BOOKABLE.has(c.headline),
    }));
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
    searchBuildingName,
    merchantCategory,
    merchantQuery,
    showPublicOnly,
  ]);

  const filteredBuildings = useMemo(() => {
    let list = buildings;
    if (searchRegion !== "All regions")
      list = list.filter((b) => b.region === searchRegion);
    if (searchCity !== "All cities")
      list = list.filter((b) => b.city === searchCity);
    if (searchBuildingName !== "All buildings")
      list = list.filter((b) => b.name === searchBuildingName);
    return list;
  }, [buildings, searchRegion, searchCity, searchBuildingName]);

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

  // Map points switch: merchants use building coordinates
  const mapPoints = useMemo(() => {
    if (searchType === "Merchants") {
      const results = searchResults as any[];
      const uniqueByBuilding = Array.from(
        new Set(results.map((r) => r.timestamp))
      );
      return uniqueByBuilding
        .map((name) => ({ name }))
        .filter((p) => buildingCoords[p.name])
        .map((p, idx) => ({
          id: String(idx),
          name: p.name,
          latitude: buildingCoords[p.name].latitude,
          longitude: buildingCoords[p.name].longitude,
        }));
    }
    return filteredBuildings.map((b, idx) => ({
      id: String(idx),
      name: b.name,
      latitude: (b as any).latitude ?? 29.7604,
      longitude: (b as any).longitude ?? -95.3698,
    }));
  }, [searchType, searchResults, filteredBuildings, buildingCoords]);

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
          <div className="mt-4 flex flex-wrap justify-center gap-2 items-center">
            {[
              { key: "All", label: "All" },
              { key: "Spaces", label: "Spaces" },
              { key: "Wellness", label: "Amenities" },
              { key: "Events", label: "Events & Services" },
              { key: "Merchants", label: "Merchants" },
            ].map((opt) => (
              <Button
                key={opt.key}
                variant={searchType === opt.key ? "default" : "outline"}
                className={
                  searchType === opt.key
                    ? "bg-[#BF1231] hover:bg-[#9f0e28] text-white h-8 px-3"
                    : "h-8 px-3"
                }
                onClick={() => setSearchType(opt.key)}
              >
                <span className="text-xs">{opt.label}</span>
              </Button>
            ))}

            {/* Filters modal trigger (desktop) */}
            <Dialog>
              <DialogTrigger asChild>
                <UIButton
                  variant="outline"
                  className="h-8 px-3 ml-2 rounded-full hidden md:inline-flex"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-1" />
                  <span className="text-xs">Filters</span>
                </UIButton>
              </DialogTrigger>
              <DialogContent className="max-w-3xl w-auto max-h-[80vh] overflow-y-auto place-content-start rounded-3xl p-0">
                <DialogHeader className="px-6 py-4 border-b text-center w-full">
                  <DialogTitle className="text-xl font-semibold">
                    Filters
                  </DialogTitle>
                </DialogHeader>
                {/* Filters form moved here */}
                <div className="px-4 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
                    <div className="md:col-span-4">
                      <label className="text-xs text-gray-600">Type</label>
                      <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger className="mt-1 h-12 rounded-xl">
                          <SelectValue placeholder="Spaces" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          <SelectItem value="Spaces">Spaces</SelectItem>
                          <SelectItem value="Wellness">Amenities</SelectItem>
                          <SelectItem value="Events">
                            Events & Services
                          </SelectItem>
                          <SelectItem value="Merchants">Merchants</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-4">
                      <label className="text-xs text-gray-600">Region</label>
                      <Select
                        value={searchRegion}
                        onValueChange={setSearchRegion}
                      >
                        <SelectTrigger className="mt-1 h-12 rounded-xl">
                          <SelectValue placeholder="All regions" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All regions">
                            All regions
                          </SelectItem>
                          {allRegions.map((r) => (
                            <SelectItem key={r} value={r}>
                              {r}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-4">
                      <label className="text-xs text-gray-600">City</label>
                      <Select value={searchCity} onValueChange={setSearchCity}>
                        <SelectTrigger className="mt-1 h-12 rounded-xl">
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
                    <div className="md:col-span-12">
                      <label className="text-xs text-gray-600">Building</label>
                      <Select
                        value={searchBuildingName}
                        onValueChange={setSearchBuildingName}
                      >
                        <SelectTrigger className="mt-1 h-12 rounded-xl">
                          <SelectValue placeholder="All buildings" />
                        </SelectTrigger>
                        <SelectContent>
                          {buildingNames.map((n) => (
                            <SelectItem key={n} value={n}>
                              {n}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
                    {searchType === "Merchants" && (
                      <>
                        <div className="md:col-span-4">
                          <label className="text-xs text-gray-600">
                            Merchant category
                          </label>
                          <Select
                            value={merchantCategory}
                            onValueChange={setMerchantCategory}
                          >
                            <SelectTrigger className="mt-1 h-12 rounded-xl">
                              <SelectValue placeholder="All categories" />
                            </SelectTrigger>
                            <SelectContent>
                              {MERCHANT_CATEGORIES.map((c) => (
                                <SelectItem key={c} value={c}>
                                  {c}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-8">
                          <label className="text-xs text-gray-600">
                            Search merchants
                          </label>
                          <Input
                            type="text"
                            className="mt-1 h-12 rounded-xl"
                            placeholder="Find by name or tag (e.g., coffee, salads, gifts)"
                            value={merchantQuery}
                            onChange={(e) => setMerchantQuery(e.target.value)}
                          />
                        </div>
                      </>
                    )}
                    <div className="md:col-span-4">
                      <label className="text-xs text-gray-600">Date</label>
                      <Input
                        type="date"
                        className="mt-1 h-12 rounded-xl"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-4">
                      <label className="text-xs text-gray-600">
                        Start time
                      </label>
                      <Input
                        type="time"
                        className="mt-1 h-12 rounded-xl"
                        value={searchTime}
                        onChange={(e) => setSearchTime(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-4">
                      <label className="text-xs text-gray-600">
                        Duration (hrs)
                      </label>
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
                      <div className="mt-3 flex items-center gap-2">
                        <Checkbox
                          id="public-only-modal"
                          checked={showPublicOnly}
                          onCheckedChange={(v) => setShowPublicOnly(!!v)}
                        />
                        <label
                          htmlFor="public-only-modal"
                          className="text-xs text-gray-700"
                        >
                          Public only
                        </label>
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
                            <SelectTrigger className="mt-1 h-12 rounded-xl">
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
                            <SelectTrigger className="mt-1 h-12 rounded-xl">
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
                </div>
                <div className="px-6 py-4 border-t bg-white sticky bottom-0 flex items-center justify-between">
                  <UIButton variant="outline" onClick={resetFilters}>
                    Clear all
                  </UIButton>
                  <UIButton className="bg-[#BF1231] hover:bg-[#9f0e28] text-white">
                    Show {searchResults.length} results
                  </UIButton>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Explore layout with left filters and wide results grid */}
      <section className="bg-white">
        <div className="max-w-none mx-auto px-12 py-6">
          {/* Filters moved into modal on desktop; keep inline for mobile */}
          <div className="rounded-xl border bg-white p-4 mb-4 md:hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
              <div className="md:col-span-3">
                <label className="text-xs text-gray-600">Type</label>
                <Select value={searchType} onValueChange={setSearchType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Spaces" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    <SelectItem value="Spaces">Spaces</SelectItem>
                    <SelectItem value="Wellness">Amenities</SelectItem>
                    <SelectItem value="Events">Events & Services</SelectItem>
                    <SelectItem value="Merchants">Merchants</SelectItem>
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
              <div className="md:col-span-3">
                <label className="text-xs text-gray-600">Building</label>
                <Select
                  value={searchBuildingName}
                  onValueChange={setSearchBuildingName}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All buildings" />
                  </SelectTrigger>
                  <SelectContent>
                    {buildingNames.map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
              {searchType === "Merchants" && (
                <>
                  <div className="md:col-span-4">
                    <label className="text-xs text-gray-600">
                      Merchant category
                    </label>
                    <Select
                      value={merchantCategory}
                      onValueChange={setMerchantCategory}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {MERCHANT_CATEGORIES.map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-8">
                    <label className="text-xs text-gray-600">
                      Search merchants
                    </label>
                    <Input
                      type="text"
                      className="mt-1"
                      placeholder="Find by name or tag (e.g., coffee, salads, gifts)"
                      value={merchantQuery}
                      onChange={(e) => setMerchantQuery(e.target.value)}
                    />
                  </div>
                </>
              )}
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
                <div className="mt-3 flex items-center gap-2">
                  <Checkbox
                    id="public-only"
                    checked={showPublicOnly}
                    onCheckedChange={(v) => setShowPublicOnly(!!v)}
                  />
                  <label
                    htmlFor="public-only"
                    className="text-xs text-gray-700"
                  >
                    Public only
                  </label>
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
                      <div className="absolute top-2 left-2 flex items-center gap-2">
                        <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/90 text-gray-900 border">
                          {(card as any).category}
                        </span>
                        {(card as any).publicBookable && (
                          <span className="text-[11px] px-2.5 py-1 rounded-full bg-white/90 text-gray-900 border">
                            Public
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-sm font-medium truncate">
                        {card.headline}
                      </div>
                      <p className="mt-1 text-xs text-gray-600 line-clamp-3">
                        {card.description}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button variant="outline" size="sm">
                          Contact to Book
                        </Button>
                        <Link href="/login" className="inline-flex">
                          <Button
                            size="sm"
                            className="bg-[#BF1231] hover:bg-[#9f0e28] text-white"
                          >
                            Tenant log in
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: sticky map always visible */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="sticky top-[88px]">
                <ExploreMap points={mapPoints} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter buildingName="Texas Tower" />
    </main>
  );
}
