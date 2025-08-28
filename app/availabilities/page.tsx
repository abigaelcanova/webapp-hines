"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { AvailabilitiesBrowser } from "@/components/availabilities-browser";
import { useMemo, useState } from "react";
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

export default function AvailabilitiesPage() {
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
      ],
    },
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
  ]);

  return (
    <main className="min-h-screen flex flex-col bg-white">
      <header className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <img
                src="/images/logos/Hines-Red-Logo-PNG.png"
                alt="Hines"
                className="h-6 w-auto"
              />
            </Link>
          </div>
          <div className="flex items-center gap-6">
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
              href="/availabilities"
              className="text-sm text-gray-900 hover:text-gray-700 font-medium"
            >
              Availabilities
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-900 hover:text-gray-700 font-medium"
            >
              Contact
            </Link>
            <Link href="/login">
              <Button className="bg-[#BF1231] hover:bg-[#9f0e28] text-white">
                Tenant log in
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Hines/texastower_banner.jpg"
            alt="Texas Tower"
            className="w-full h-56 sm:h-72 object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-10 sm:py-14">
          <h1 className="text-3xl font-semibold text-white">Availabilities</h1>
          <p className="mt-2 text-white/90 max-w-3xl">
            Browse suites at Texas Tower and inquire directly with our team.
          </p>
        </div>
      </section>

      {/* Search availability (moved from landing) */}
      <section className="bg-white border-b">
        <div className="max-w-[1440px] mx-auto px-6 py-6">
          <div className="rounded-xl border bg-white shadow-sm p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold">Search availability</h3>
              <span className="text-xs text-gray-500">
                Find buildings, spaces, and amenities by time
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
              <div className="md:col-span-2">
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
              <div className="md:col-span-2">
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
              <div className="md:col-span-2">
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
              <div className="md:col-span-2">
                <label className="text-xs text-gray-600">Date</label>
                <Input
                  type="date"
                  className="mt-1"
                  value={searchDate}
                  onChange={(e) => setSearchDate(e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs text-gray-600">Start time</label>
                <Input
                  type="time"
                  className="mt-1"
                  value={searchTime}
                  onChange={(e) => setSearchTime(e.target.value)}
                />
              </div>
              <div className="md:col-span-3">
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
                  <div className="md:col-span-2">
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
                  <div className="md:col-span-2">
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
                  <div className="md:col-span-2 flex items-end gap-2">
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
                  <div className="md:col-span-3">
                    <label className="text-xs text-gray-600">
                      Lease term (months)
                    </label>
                    <div className="mt-2 flex items-center gap-3">
                      <Slider
                        value={[leaseTermMonths]}
                        onValueChange={(v) => setLeaseTermMonths(v[0])}
                        min={6}
                        max={120}
                        step={6}
                        className="flex-1"
                      />
                      <span className="w-12 text-right text-sm text-gray-700">
                        {leaseTermMonths}
                      </span>
                    </div>
                  </div>
                </>
              )}
              <div className="md:col-span-1 flex items-end">
                <Button className="w-full bg-[#BF1231] hover:bg-[#9f0e28] text-white">
                  Search
                </Button>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-600">
              {searchResults.length} results
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((card) => (
                <ContentCard
                  key={`sr-${card.headline}`}
                  image={card.image}
                  imageAlt={card.imageAlt}
                  category={card.category}
                  timestamp={card.timestamp}
                  headline={card.headline}
                  description={card.description}
                  layout="vertical"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <AvailabilitiesBrowser />
        </div>
      </section>

      <SiteFooter buildingName="Texas Tower" />
    </main>
  );
}
