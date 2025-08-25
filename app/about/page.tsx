import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";

export default function PublicAboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Header (same as Public page, with About to the left of Tenant log in) */}
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
          </div>
        </div>
      </header>

      {/* Hero / Banner */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <img
            src="/Hines/texastower_banner.jpg"
            alt="Texas Tower"
            className="w-full h-72 sm:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl font-semibold text-white">
            About Texas Tower
          </h1>
          <p className="mt-3 max-w-3xl text-white/90">
            A next‑generation workplace destination with hospitality‑driven
            services, flexible amenity spaces, and panoramic city views—designed
            to elevate the everyday experience.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left content */}
            <div className="lg:col-span-7">
              <h2 className="text-xl font-semibold">
                An accelerator for human potential
              </h2>
              <p className="mt-3 text-gray-700 leading-relaxed">
                Thoughtfully crafted lobbies, a modern fitness center, premium
                conference facilities, and a collection of tenant‑only lounges
                enable productive work and memorable gatherings. Concierge
                support and on‑site dining bring convenience to your day.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden border aspect-[16/9]">
                  <img
                    src="https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=1600&q=80"
                    alt="Work lounge"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border aspect-[16/9]">
                  <img
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80"
                    alt="Outdoor terrace"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Right sidebar */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border shadow-sm p-5 lg:sticky lg:top-6 bg-white">
                <h3 className="font-medium text-gray-900">Highlights</h3>
                <ul className="mt-3 space-y-2 text-gray-700 text-sm">
                  <li>• Lobby with mixed‑use experience</li>
                  <li>• Fitness center and studio</li>
                  <li>• Conference and event spaces</li>
                  <li>• Tenant‑only roof terraces</li>
                  <li>• On‑site dining & coffee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter buildingName="Texas Tower" />
    </main>
  );
}
