import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import { AvailabilitiesBrowser } from "@/components/availabilities-browser";

export default function AvailabilitiesPage() {
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

      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <AvailabilitiesBrowser />
        </div>
      </section>

      <SiteFooter buildingName="Texas Tower" />
    </main>
  );
}
