import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PublicAboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
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
        <div className="max-w-none mx-auto px-12 py-16 sm:py-24">
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
        <div className="max-w-none mx-auto px-12 py-16">
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

      {/* FAQs */}
      <section className="bg-[#F9FAFB]">
        <div className="max-w-none mx-auto px-12 py-16">
          <h2 className="text-2xl font-semibold text-gray-900">FAQs</h2>
          <p className="mt-2 text-gray-600">
            Common questions about Texas Tower.
          </p>
          <div className="mt-6 rounded-2xl border bg-white p-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="q1">
                <AccordionTrigger>
                  What are the building hours?
                </AccordionTrigger>
                <AccordionContent>
                  The building is accessible to tenants 24/7 with keycard
                  access. Lobby concierge services operate weekdays from 7:00am
                  to 7:00pm.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>
                  Where is the parking and how do I enroll?
                </AccordionTrigger>
                <AccordionContent>
                  On‑site garage entry is on Texas Avenue. Monthly parking can
                  be set up through the property management office; visitor
                  parking is available with validation from select tenants.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>
                  How do I book conference rooms and event space?
                </AccordionTrigger>
                <AccordionContent>
                  Tenants can book through the Here by Hines app. For large
                  events, contact our events team for staffing, catering, and AV
                  support.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q4">
                <AccordionTrigger>
                  Is there on‑site fitness and wellness programming?
                </AccordionTrigger>
                <AccordionContent>
                  Yes—our fitness center includes lockers and showers, with
                  daily group classes and personal training available for
                  tenants.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q5">
                <AccordionTrigger>
                  What’s the guest check‑in process?
                </AccordionTrigger>
                <AccordionContent>
                  Guests should register in advance via the app. Upon arrival,
                  they will be issued a temporary badge at the lobby desk with a
                  government ID.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="q6">
                <AccordionTrigger>
                  Who do I contact for maintenance or cleaning?
                </AccordionTrigger>
                <AccordionContent>
                  Submit requests through the app or email the property
                  management team. For urgent issues, call the lobby desk for
                  immediate assistance.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <SiteFooter buildingName="Texas Tower" />
    </main>
  );
}
