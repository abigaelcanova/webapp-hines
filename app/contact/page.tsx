import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { SiteFooter } from "@/components/site-footer";

export default function PublicContactPage() {
  const teamMembers = [
    {
      name: "Michael Anderson",
      role: "Leasing",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&h=400&q=80",
    },
    {
      name: "Sarah Chen",
      role: "Property Manager",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&h=400&q=80",
    },
    {
      name: "Daniel Rivera",
      role: "Operations",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=400&q=80",
    },
    {
      name: "Ava Patel",
      role: "Concierge Lead",
      image:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&h=400&q=80",
    },
    {
      name: "Jordan Lee",
      role: "Events & Community",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80",
    },
    {
      name: "Priya Nair",
      role: "Wellness Director",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&h=400&q=80",
    },
    {
      name: "Marcus Boyd",
      role: "Security Director",
      image:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&h=400&q=80",
    },
    {
      name: "Elena Rossi",
      role: "Food & Beverage",
      image:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&h=400&q=80",
    },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Header */}
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

      {/* Hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <img
            src="/Hines/texastower_banner.jpg"
            alt="Texas Tower"
            className="w-full h-56 sm:h-72 object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="max-w-7xl mx-auto px-6 py-10 sm:py-14">
          <h1 className="text-3xl font-semibold text-white">Contact</h1>
          <p className="mt-2 text-white/90 max-w-3xl">
            Have a question about Texas Tower, amenities, or leasing? Send us a
            message and we’ll get back to you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border p-6 bg-white shadow-sm">
              <ContactForm />
            </div>
          </div>
          {/* Info */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border p-6 bg-white shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                Building contacts
              </h2>
              <div className="mt-4 space-y-2 text-gray-700 text-sm">
                <p>
                  <span className="font-medium">Address:</span> 845 Texas Ave,
                  Houston, TX
                </p>
                <p>
                  <span className="font-medium">Phone:</span> (713) 877-1550
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  info@texastower.com
                </p>
              </div>
              <div className="mt-6">
                <Link href="/" className="inline-flex">
                  <Button variant="outline">Back to Public page</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the team */}
      <section className="bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold text-center">Meet the team</h2>
          <p className="mt-2 text-center text-gray-600">
            Your on‑site team is here to help with leasing, amenities, events,
            and more.
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border bg-white p-6 text-center"
              >
                <div className="mx-auto h-20 w-20 rounded-full overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <div className="font-medium text-gray-900">{m.name}</div>
                  <div className="text-sm text-gray-600">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter buildingName="Texas Tower" />
    </main>
  );
}
