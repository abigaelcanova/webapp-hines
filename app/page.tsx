/**
 * Public page: unauthenticated landing with "Tenant log in" entry to /login
 */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { ModernCarousel } from "@/components/modern-carousel";
import { ContentCard } from "@/components/content-card";
import { PublicBookingButton } from "@/components/public-booking";

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
    },
    {
      image: "/images/content/EntireSpace-1.png",
      imageAlt: "Amenity space",
      category: "Spaces",
      timestamp: "Bookable",
      headline: "Executive Boardroom",
      description:
        "Premium AV, seamless video conferencing, and concierge support.",
    },
    {
      image: "/images/content/exos-1-1.jpg",
      imageAlt: "Fitness class",
      category: "Wellness",
      timestamp: "Daily",
      headline: "Group Classes & Personal Training",
      description:
        "Studio sessions and coaching for strength, mobility, and recovery.",
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

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="w-full">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/logos/Hines-Red-Logo-PNG.png"
              alt="Hines"
              className="h-6 w-auto"
            />
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
        <div className="max-w-7xl mx-auto px-6 py-28 sm:py-36">
          <div className="max-w-5xl">
            <div className="flex items-center gap-2">
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                Welcome to Texas Tower
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
              Discover premier workplaces, events, and amenities. Explore our
              buildings and community offerings.
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

      {/* About: building overview */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl font-semibold">About Texas Tower</h2>
            <p className="mt-4 text-gray-700">
              An accelerator for human potential—Texas Tower brings
              hospitality-forward service, flexible amenity spaces, and skyline
              views to the heart of downtown.
            </p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li>• Mixed-use lobby experience with food and drink options</li>
              <li>• Modern fitness center and adaptable studio space</li>
              <li>• Tenant-only rooftop terraces and executive lounges</li>
              <li>• High-tech conference and event spaces</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <Link href="/explore" className="inline-flex">
                <Button variant="outline">Explore amenities</Button>
              </Link>
              <Link href="/login" className="inline-flex">
                <Button className="bg-[#BF1231] hover:bg-[#9f0e28] text-white">
                  Tenant log in
                </Button>
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
        <div className="max-w-7xl mx-auto px-6 py-16">
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
                  <p className="text-gray-600 text-sm mt-1">{tile.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spaces: carousel + supporting cards */}
      <section className="bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-semibold">Spaces</h2>
            <Link
              href="/explore"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Explore availability
            </Link>
          </div>
          <div className="h-72 sm:h-96 rounded-2xl overflow-hidden">
            <ModernCarousel slides={spaceSlides} className="h-full" />
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {highlightCards.map((card, idx) => (
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
        <div className="max-w-7xl mx-auto px-6 py-16">
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
