"use client";
/**
 * Public page: unauthenticated landing with "Tenant log in" entry to /login
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { ModernCarousel } from "@/components/modern-carousel";
import { ContentCard } from "@/components/content-card";
import { PublicBookingButton } from "@/components/public-booking";
import { useState, useMemo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown, Building as BuildingIcon } from "lucide-react";
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

export default function PublicPage() {
  // Image-forward content modeled after logged-in styling
  const amenityTiles = [
    {
      title: "Modern Fitness Center",
      subtitle: "Cardio, weights, and studio classes",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&h=1000&fit=crop",
    },
    {
      title: "Rooftop Terrace",
      subtitle: "Skyline views for events and breaks",
      image:
        "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1600&h=1000&fit=crop",
    },
    {
      title: "Concierge Services",
      subtitle: "Hospitality-forward building team",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=1000&fit=crop",
    },
    {
      title: "Dining & Coffee",
      subtitle: "Onsite cafés, grab-and-go, and catering",
      image:
        "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1600&q=80",
    },
  ];

  const spaceSlides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80",
      title: "Conference Rooms",
      subtitle: "Bookable spaces with AV and video conferencing",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=1600&q=80",
      title: "Flexible Workspaces",
      subtitle: "Breakout areas for collaboration or quiet focus",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1600&q=80",
      title: "Event Lounge",
      subtitle: "Host community gatherings and tenant events",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
      title: "Outdoor Terrace",
      subtitle: "Fresh air, sunlight, and panoramic city views",
    },
  ];

  const highlightCards = [
    {
      image: "/images/content/innovationevent.jpg",
      imageAlt: "Innovation event",
      category: "Events",
      timestamp: "This month",
      headline: "Innovation Summit Series",
      description:
        "Talks and workshops with industry leaders in tech and design.",
      region: "South",
      city: "Houston",
    },
    {
      image: "/images/content/EntireSpace-1.png",
      imageAlt: "Amenity space",
      category: "Spaces",
      timestamp: "Bookable",
      headline: "Executive Boardroom",
      description:
        "Premium AV, seamless video conferencing, and concierge support.",
      region: "South",
      city: "Houston",
    },
    {
      image: "/images/content/exos-1-1.jpg",
      imageAlt: "Fitness class",
      category: "Wellness",
      timestamp: "Daily",
      headline: "Group Classes & Personal Training",
      description:
        "Studio sessions and coaching for strength, mobility, and recovery.",
      region: "South",
      city: "Houston",
    },
  ];

  const publicFeed = [
    {
      image:
        "https://images.unsplash.com/photo-1515168833906-d2a3b82b302a?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Networking event on the plaza",
      category: "Community",
      timestamp: "Public",
      headline: "After‑hours Networking Night",
      description:
        "Open‑invite mixer for downtown professionals; meet neighbors and local teams.",
    },
    {
      image: "/foodtruck.jpg",
      imageAlt: "Food trucks",
      category: "Programming",
      timestamp: "Fridays",
      headline: "Food Truck Fridays",
      description:
        "Rotating local favorites on the plaza with live music and lawn games.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
      imageAlt: "Innovation talk",
      category: "Talks",
      timestamp: "Next week",
      headline: "Downtown Innovation Talk",
      description:
        "A public speaker series featuring Houston founders and designers.",
    },
  ];

  const buildings = [
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
        { floor: 30, availableFrom: "2026-01", openTenancy: false, rsf: 20000 },
      ],
    },
    {
      name: "Williams Tower",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      region: "South",
      city: "Houston",
      availableFrom: "2025-09",
      openTenancy: false,
      floors: [
        { floor: 14, availableFrom: "2025-09", openTenancy: false, rsf: 15000 },
        { floor: 27, availableFrom: "2025-12", openTenancy: false, rsf: 18000 },
      ],
    },
    {
      name: "JPMorgan Chase Tower",
      image:
        "https://images.unsplash.com/photo-1555109307-f7d9da25c244?auto=format&fit=crop&w=1600&q=80",
      region: "South",
      city: "Houston",
      availableFrom: "2026-01",
      openTenancy: false,
      floors: [
        { floor: 9, availableFrom: "2026-01", openTenancy: false, rsf: 10000 },
        { floor: 25, availableFrom: "2026-06", openTenancy: false, rsf: 16000 },
      ],
    },
    {
      name: "717 Texas",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1600&q=80",
      region: "South",
      city: "Houston",
      availableFrom: "2025-07",
      openTenancy: true,
      floors: [
        { floor: 12, availableFrom: "2025-07", openTenancy: true, rsf: 11000 },
        { floor: 17, availableFrom: "2025-10", openTenancy: false, rsf: 14500 },
      ],
    },
    {
      name: "All Buildings",
      image: "/images/logos/lighthouse.png",
      region: "",
      city: "",
      availableFrom: "",
      openTenancy: false,
      floors: [],
    },
  ];
  const [projectDropdownOpen, setProjectDropdownOpen] = useState(false);
  const [primaryBuilding, setPrimaryBuilding] = useState<string>(
    buildings[0].name
  );
  const selectedBuilding =
    buildings.find((b) => b.name === primaryBuilding) || buildings[0];
  const isPortfolio = primaryBuilding === "All Buildings";

  // Portfolio filters for buildings
  const regions = Array.from(
    new Set(buildings.filter((b) => b.region).map((b) => b.region))
  ).sort();
  const cities = Array.from(
    new Set(buildings.filter((b) => b.city).map((b) => b.city))
  ).sort();
  const [activeRegion, setActiveRegion] = useState<string>("All regions");
  const [activeCity, setActiveCity] = useState<string>("All cities");

  // Portfolio filters for spaces
  const spaceRegions = Array.from(
    new Set(highlightCards.filter((s) => s.region).map((s) => s.region))
  ).sort();
  const spaceCities = Array.from(
    new Set(highlightCards.filter((s) => s.city).map((s) => s.city))
  ).sort();
  const [activeSpaceRegion, setActiveSpaceRegion] =
    useState<string>("All regions");
  const [activeSpaceCity, setActiveSpaceCity] = useState<string>("All cities");

  // Unified availability search state
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

  const allRegions = useMemo(
    () =>
      Array.from(new Set([...(regions as string[]), ...spaceRegions])).sort(),
    [regions, spaceRegions]
  );
  const allCities = useMemo(
    () => Array.from(new Set([...(cities as string[]), ...spaceCities])).sort(),
    [cities, spaceCities]
  );

  const searchResults = useMemo(() => {
    // Helper to parse YYYY-MM
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
      // Build from buildings list
      let items = buildings.filter((b) => b.name !== "All Buildings");
      if (isPortfolio && searchRegion !== "All regions")
        items = items.filter((b) => b.region === searchRegion);
      if (isPortfolio && searchCity !== "All cities")
        items = items.filter((b) => b.city === searchCity);

      // Evaluate open tenancy with basic logic
      const desiredStart =
        leaseStartMonth && leaseStartYear
          ? toYearMonth(leaseStartYear, leaseStartMonth)
          : "";
      const results = items
        .map((b) => {
          const nextOpen = b.availableFrom || "";
          const isOpenNow = b.openTenancy;
          const fitsLease = desiredStart
            ? (isOpenNow || desiredStart >= nextOpen) && leaseTermMonths >= 6
            : true;

          // Evaluate floor-level matches
          const matchedFloors = (b.floors || []).filter((f: any) => {
            if (showOpenOnly) return f.openTenancy;
            if (!desiredStart) return true;
            return f.openTenancy || desiredStart >= f.availableFrom;
          });
          const floorsSummary = matchedFloors.length
            ? `Open floors: ${matchedFloors
                .slice(0, 4)
                .map((f: any) => f.floor)
                .join(", ")}${matchedFloors.length > 4 ? "…" : ""}`
            : "No matching floors";

          return {
            image: b.image,
            imageAlt: b.name,
            category: "Buildings",
            timestamp: isOpenNow
              ? "Open tenancy"
              : nextOpen
              ? `Next open: ${nextOpen}`
              : "",
            headline: b.name,
            description: `${b.region} • ${b.city} • ${floorsSummary}`,
            region: b.region,
            city: b.city,
            openNow: isOpenNow,
            fitsLease,
          };
        })
        .filter((r) => (showOpenOnly ? r.openNow : true))
        .filter((r) => r.fitsLease);
      return results;
    }

    // Combine spaces/amenities/events using highlightCards as mock data
    const pool = highlightCards;
    return pool
      .filter((item) =>
        searchType === "All"
          ? true
          : item.category.toLowerCase().includes(searchType.toLowerCase())
      )
      .filter((item) =>
        isPortfolio
          ? searchRegion === "All regions" || item.region === searchRegion
          : true
      )
      .filter((item) =>
        isPortfolio
          ? searchCity === "All cities" || item.city === searchCity
          : true
      )
      .filter(() => {
        if (!searchDate || !searchTime) return true;
        return searchDurationHrs <= 4; // simple demo rule
      });
  }, [
    buildings,
    highlightCards,
    isPortfolio,
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
  ]);

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <img
            src="/Hines.jpg"
            alt="Hines"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 py-28 sm:py-36">
          <div className="max-w-5xl">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                {isPortfolio
                  ? "Explore our portfolio"
                  : `Welcome to ${primaryBuilding}`}
              </h1>
              {/* Overlapping badges inline with heading */}
              <div className="relative h-28 w-48 hidden sm:block">
                {/* Back badge */}
                <img
                  src="/historic-explorer.png"
                  alt="Historic Explorer"
                  className="absolute right-0 top-1.5 h-24 w-24 object-contain drop-shadow-[0_3px_8px_rgba(0,0,0,0.35)]"
                />
                {/* Front badge */}
                <img
                  src="/transit-titan.png"
                  alt="Transit Titan"
                  className="absolute right-16 top-1.5 h-24 w-24 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.45)]"
                />
              </div>
            </div>
            <p className="mt-4 text-lg text-white/90">
              {isPortfolio
                ? "Discover workplaces, amenities, and events across our portfolio."
                : "Discover premier workplaces, events, and amenities. Explore our buildings and community offerings."}
            </p>
            <div className="mt-8 flex gap-3">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-[#BF1231] hover:bg-[#9f0e28] text-white"
                >
                  Tenant log in
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Availability Search moved to /availabilities */}

      {/* Portfolio vs Building-specific sections */}
      {isPortfolio ? (
        <section className="bg-white">
          <div className="max-w-[1280px] mx-auto px-6 py-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Our buildings</h2>
              <div className="flex items-center gap-3 text-sm">
                <select
                  className="border rounded-md h-9 px-2 bg-white text-gray-900"
                  value={activeRegion}
                  onChange={(e) => setActiveRegion(e.target.value)}
                >
                  <option>All regions</option>
                  {regions.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <select
                  className="border rounded-md h-9 px-2 bg-white text-gray-900"
                  value={activeCity}
                  onChange={(e) => setActiveCity(e.target.value)}
                >
                  <option>All cities</option>
                  {cities.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {buildings
                .filter((b) => b.name !== "All Buildings")
                .filter((b) =>
                  activeRegion === "All regions"
                    ? true
                    : b.region === activeRegion
                )
                .filter((b) =>
                  activeCity === "All cities" ? true : b.city === activeCity
                )
                .map((b) => (
                  <div
                    key={b.name}
                    className="rounded-2xl overflow-hidden border bg-white"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={b.image}
                        alt={b.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <h3 className="text-gray-900 text-base font-semibold truncate mr-3">
                          {b.name}
                        </h3>
                        <Link href="/login" className="inline-flex">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                      <div className="mt-2 text-xs text-gray-600">
                        {b.region} • {b.city}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* About: building overview */}
          <section className="bg-white">
            <div className="max-w-[1280px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-2xl font-semibold">About Texas Tower</h2>
                <p className="mt-4 text-gray-700">
                  An accelerator for human potential—Texas Tower brings
                  hospitality-forward service, flexible amenity spaces, and
                  skyline views to the heart of downtown.
                </p>
                <ul className="mt-6 space-y-2 text-gray-700">
                  <li>
                    • Mixed-use lobby experience with food and drink options
                  </li>
                  <li>• Modern fitness center and adaptable studio space</li>
                  <li>• Tenant-only rooftop terraces and executive lounges</li>
                  <li>• High-tech conference and event spaces</li>
                </ul>
                <div className="mt-6 flex gap-3">
                  <Link href="/explore" className="inline-flex">
                    <Button variant="outline">Explore amenities</Button>
                  </Link>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="rounded-2xl overflow-hidden border">
                  <img
                    src="/Hines/texastower_banner.jpg"
                    alt="Texas Tower"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Amenities: image-forward grid */}
          <section className="bg-white">
            <div className="max-w-[1280px] mx-auto px-6 py-16">
              <div className="flex items-end justify-between mb-6">
                <h2 className="text-2xl font-semibold">Amenities</h2>
                <Link
                  href="/login"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Sign in for full details
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {amenityTiles.map((tile) => (
                  <div
                    key={tile.title}
                    className="group relative rounded-2xl overflow-hidden border bg-white"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={tile.image}
                        alt={tile.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-gray-900 text-base font-semibold">
                        {tile.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {tile.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Spaces: carousel + supporting cards */}
      <section className="bg-[#F9FAFB]">
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-semibold">Spaces</h2>
            <div className="flex items-center gap-3">
              {isPortfolio && (
                <>
                  <select
                    className="border rounded-md h-9 px-2 bg-white text-gray-900 text-sm"
                    value={activeSpaceRegion}
                    onChange={(e) => setActiveSpaceRegion(e.target.value)}
                  >
                    <option>All regions</option>
                    {spaceRegions.map((r) => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                  <select
                    className="border rounded-md h-9 px-2 bg-white text-gray-900 text-sm"
                    value={activeSpaceCity}
                    onChange={(e) => setActiveSpaceCity(e.target.value)}
                  >
                    <option>All cities</option>
                    {spaceCities.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </>
              )}
              <Link
                href="/explore"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Explore availability
              </Link>
            </div>
          </div>
          <div className="h-72 sm:h-96 rounded-2xl overflow-hidden">
            <ModernCarousel slides={spaceSlides} className="h-full" />
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {(isPortfolio
              ? highlightCards
                  .filter((s) =>
                    activeSpaceRegion === "All regions"
                      ? true
                      : s.region === activeSpaceRegion
                  )
                  .filter((s) =>
                    activeSpaceCity === "All cities"
                      ? true
                      : s.city === activeSpaceCity
                  )
              : highlightCards
            ).map((card, idx) => (
              <ContentCard
                key={card.headline}
                image={card.image}
                imageAlt={card.imageAlt}
                category={card.category}
                timestamp={card.timestamp}
                headline={card.headline}
                description={card.description}
                layout="vertical"
                footer={
                  idx < 2 ? (
                    <PublicBookingButton
                      spaceName={card.headline}
                      className="bg-[#BF1231] hover:bg-[#9f0e28] text-white w-full"
                    />
                  ) : undefined
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* Public updates: open to everyone */}
      <section className="bg-white">
        <div className="max-w-[1280px] mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-semibold">Public updates</h2>
            <span className="text-sm text-gray-600">Open to everyone</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {publicFeed.map((item) => (
              <ContentCard
                key={item.headline}
                image={item.image}
                imageAlt={item.imageAlt}
                category={item.category}
                timestamp={item.timestamp}
                headline={item.headline}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter buildingName="Hines" />
    </main>
  );
}
