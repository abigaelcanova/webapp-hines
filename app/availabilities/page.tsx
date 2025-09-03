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
      latitude: 29.7604,
      longitude: -95.3698,
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
      latitude: 29.7607,
      longitude: -95.3671,
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

  // Derived helper sets for sidebar browse sections
  const cityList = allCities;
  const categoryList = Array.from(
    new Set(searchResults.map((r) => r.category))
  ).sort();

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Hero header */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 pt-8 pb-4 text-center">
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
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left rail: Filters (reuse your search controls) */}
          <aside className="lg:col-span-3 space-y-3">
            <div className="rounded-xl border bg-white p-4">
              <h3 className="text-sm font-semibold mb-2">Filters</h3>
              <div className="grid grid-cols-1 gap-3">
                <div>
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
                <div>
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
                <div>
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
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-600">Date</label>
                    <Input
                      type="date"
                      className="mt-1"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Start time</label>
                    <Input
                      type="time"
                      className="mt-1"
                      value={searchTime}
                      onChange={(e) => setSearchTime(e.target.value)}
                    />
                  </div>
                </div>
                <div>
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
                </div>
                {searchType === "Buildings" && (
                  <>
                    <div>
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
                    <div>
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
                    <div>
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
                <Button className="w-full bg-[#BF1231] hover:bg-[#9f0e28] text-white">
                  Search
                </Button>
              </div>
            </div>

            {/* Browse: Cities */}
            <div className="rounded-xl border bg-white p-4">
              <h4 className="text-sm font-semibold mb-2">City</h4>
              <div className="space-y-1 text-sm">
                {cityList.map((c) => (
                  <button
                    key={c}
                    className={`w-full text-left px-2 py-1 rounded ${
                      searchCity === c ? "bg-gray-100" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSearchCity(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Browse: Categories */}
            <div className="rounded-xl border bg-white p-4">
              <h4 className="text-sm font-semibold mb-2">Categories</h4>
              <div className="space-y-1 text-sm">
                {categoryList.map((cat) => (
                  <button
                    key={cat}
                    className="w-full text-left px-2 py-1 rounded hover:bg-gray-50"
                    onClick={() =>
                      setSearchType(cat === "Buildings" ? "Buildings" : cat)
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Center: browsable cards */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-600">
                {searchResults.length} results
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {searchResults.map((card, idx) => (
                <div
                  key={`sr-card-${idx}`}
                  className="rounded-2xl border overflow-hidden bg-white hover:shadow-md transition-shadow"
                >
                  <div className="h-28 bg-gradient-to-b from-blue-500 to-indigo-500 flex items-center justify-center">
                    <span className="text-white text-xs opacity-90">
                      {card.category}
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
        </div>
      </section>

      <SiteFooter buildingName="Texas Tower" />
    </main>
  );
}
