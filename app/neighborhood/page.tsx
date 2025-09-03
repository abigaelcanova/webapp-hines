import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";

export default function NeighborhoodPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/Hines/texastower_banner.jpg"
            alt="Downtown Houston"
            className="w-full h-56 sm:h-72 object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative max-w-none mx-auto px-12 py-10 sm:py-14">
          <h1 className="text-3xl font-semibold text-white">
            The Neighborhood
          </h1>
          <p className="mt-2 text-white/90 max-w-3xl">
            Texas Tower rises in the heart of Downtown Houston—steps from
            transit at Central Station, the Theater District, the historic
            district, and a dynamic dining scene.
          </p>
        </div>
      </section>

      {/* Highlights grid */}
      <section className="bg-white">
        <div className="max-w-none mx-auto px-12 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="rounded-2xl border overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1600&q=80"
              alt="Theater District"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Culture & Arts
              </h2>
              <p className="mt-2 text-gray-700 text-sm">
                Minutes to the Theater District, Alley Theatre, Bayou Place, and
                galleries across Downtown’s historic core.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=80"
              alt="Dining"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Dining & Nightlife
              </h2>
              <p className="mt-2 text-gray-700 text-sm">
                From chef‑driven restaurants to casual lunch spots—Market
                Square, Main Street, and Allen’s Landing are all nearby.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80"
              alt="Parks & Trails"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h2 className="text-lg font-semibold text-gray-900">
                Parks & Trails
              </h2>
              <p className="mt-2 text-gray-700 text-sm">
                Stroll to Buffalo Bayou Park and Discovery Green for outdoor
                events, trails, and weekly programming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transit and access */}
      <section className="bg-[#F9FAFB]">
        <div className="max-w-none mx-auto px-12 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-xl font-semibold">Connected to everything</h2>
            <p className="mt-3 text-gray-700">
              Direct access to METRORail at Central Station, numerous bus lines,
              and quick connections to I‑45, I‑10, and US‑59. Bike storage and
              rideshare pick‑up are steps from the lobby.
            </p>
            <div className="mt-6 flex gap-3">
              <Link href="/contact" className="inline-flex">
                <Button variant="outline">Get directions</Button>
              </Link>
              <Link href="/contact" className="inline-flex">
                <Button className="bg-[#BF1231] hover:bg-[#9f0e28] text-white">
                  Contact us
                </Button>
              </Link>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border">
            <img
              src="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1600&q=80"
              alt="Transit"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      <SiteFooter buildingName="Texas Tower" />
    </main>
  );
}
