"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PublicBookingButton } from "@/components/public-booking";

interface Availability {
  id: string;
  suite: string;
  floor: number;
  rsf: number;
  use: string;
  availability: string; // e.g. "Now" or "Q4 2025"
  condition?: string;
  planUrl?: string;
  imageUrl?: string;
}

const RAW_AVAILABILITIES: Availability[] = [
  {
    id: "tt-42a",
    suite: "Suite 4205",
    floor: 42,
    rsf: 12000,
    use: "Office",
    availability: "Now",
    condition: "Built / Furnished",
    planUrl: "/images/content/EntireSpace-1.png",
    imageUrl: "/Hines/Room1.jpeg",
  },
  {
    id: "tt-30b",
    suite: "Suite 3010",
    floor: 30,
    rsf: 18500,
    use: "Office",
    availability: "Q4 2025",
    condition: "Whitebox",
    planUrl: "/images/content/exos-1-1.jpg",
    imageUrl: "/Hines/Room2.jpeg",
  },
  {
    id: "tt-18c",
    suite: "Suite 1802",
    floor: 18,
    rsf: 8000,
    use: "Spec Suite",
    availability: "Now",
    condition: "New Spec",
    planUrl: "/images/content/innovationevent.jpg",
    imageUrl: "/Hines/Room3.jpeg",
  },
];

function formatNumber(n: number) {
  return n.toLocaleString();
}

export function AvailabilitiesBrowser() {
  const [floor, setFloor] = useState<string>("all");
  const [minSize, setMinSize] = useState<string>("");
  const [maxSize, setMaxSize] = useState<string>("");
  const [availability, setAvailability] = useState<string>("all");
  const [active, setActive] = useState<Availability | null>(
    RAW_AVAILABILITIES[0]
  );

  const floors = useMemo(() => {
    const uniq = Array.from(
      new Set(RAW_AVAILABILITIES.map((a) => a.floor))
    ).sort((a, b) => b - a);
    return uniq;
  }, []);

  const filtered = useMemo(() => {
    let items = RAW_AVAILABILITIES;
    if (floor !== "all") items = items.filter((a) => a.floor === Number(floor));
    if (availability !== "all") {
      if (availability === "now")
        items = items.filter((a) => a.availability.toLowerCase() === "now");
      if (availability === "future")
        items = items.filter((a) => a.availability.toLowerCase() !== "now");
    }
    const min = Number(minSize);
    const max = Number(maxSize);
    if (!Number.isNaN(min)) items = items.filter((a) => a.rsf >= (min || 0));
    if (!Number.isNaN(max) && max > 0)
      items = items.filter((a) => a.rsf <= max);
    return items.sort((a, b) => b.floor - a.floor || a.rsf - b.rsf);
  }, [floor, availability, minSize, maxSize]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Left: Filters + Table */}
      <div className="lg:col-span-8 space-y-4">
        <div className="rounded-2xl border bg-white p-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="col-span-1">
            <label className="text-xs text-gray-600">Floor</label>
            <Select value={floor} onValueChange={setFloor}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All floors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All floors</SelectItem>
                {floors.map((f) => (
                  <SelectItem key={f} value={String(f)}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-gray-600">Min RSF</label>
            <Input
              value={minSize}
              onChange={(e) => setMinSize(e.target.value)}
              placeholder="0"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Max RSF</label>
            <Input
              value={maxSize}
              onChange={(e) => setMaxSize(e.target.value)}
              placeholder=""
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-gray-600">Availability</label>
            <Select value={availability} onValueChange={setAvailability}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="now">Available Now</SelectItem>
                <SelectItem value="future">Future</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-2xl border bg-white overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Suite</TableHead>
                <TableHead>Floor</TableHead>
                <TableHead className="text-right">RSF</TableHead>
                <TableHead>Use</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((a) => (
                <TableRow
                  key={a.id}
                  className={active?.id === a.id ? "bg-gray-50" : ""}
                >
                  <TableCell>{a.suite}</TableCell>
                  <TableCell>{a.floor}</TableCell>
                  <TableCell className="text-right">
                    {formatNumber(a.rsf)}
                  </TableCell>
                  <TableCell>{a.use}</TableCell>
                  <TableCell>{a.availability}</TableCell>
                  <TableCell className="space-x-2">
                    {a.planUrl ? (
                      <a href={a.planUrl} target="_blank" rel="noreferrer">
                        <Button variant="outline" size="sm">
                          View plan
                        </Button>
                      </a>
                    ) : null}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActive(a)}
                    >
                      Preview
                    </Button>
                    <PublicBookingButton
                      label="Inquire"
                      spaceName={`${a.suite} • ${formatNumber(a.rsf)} RSF`}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="lg:col-span-4 space-y-4">
        <div className="rounded-2xl border bg-white overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">
              {active
                ? `${active.suite} • Floor ${active.floor}`
                : "Select a suite"}
            </h3>
            <p className="text-sm text-gray-600">
              {active
                ? `${formatNumber(active.rsf)} RSF • ${active.use} • ${
                    active.availability
                  }`
                : ""}
            </p>
          </div>
          {active ? (
            <img
              src={active.imageUrl || "/images/content/EntireSpace-1.png"}
              alt={active.suite}
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="p-6 text-sm text-gray-600">
              Choose an availability from the table to see a preview.
            </div>
          )}
          <div className="p-4 flex gap-2">
            {active?.planUrl ? (
              <a
                href={active.planUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex"
              >
                <Button variant="outline">View plan</Button>
              </a>
            ) : null}
            {active ? (
              <PublicBookingButton
                label="Inquire"
                spaceName={`${active.suite} • ${formatNumber(active.rsf)} RSF`}
              />
            ) : null}
            {active ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Full preview</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      {active.suite} • Floor {active.floor}
                    </DialogTitle>
                  </DialogHeader>
                  <img
                    src={active.imageUrl || "/images/content/EntireSpace-1.png"}
                    alt={active.suite}
                    className="w-full h-[420px] object-cover rounded"
                  />
                </DialogContent>
              </Dialog>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
