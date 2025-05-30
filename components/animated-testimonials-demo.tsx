import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export default function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "Steve is your go-to for anything building-related. From move-ins to amenities, she ensures everything runs smoothly so you can focus on what matters most.",
      name: "Steve Chen",
      designation: "Property Manager",
      src: "https://images.unsplash.com/photo-1537511446984-935f663eb1f4?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "If something needs fixing, David is already on it. His behind-the-scenes work keeps the building comfortable, efficient, and running like clockwork.",
      name: "David Morales",
      designation: "Chief Engineer",
      src: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Need a hand with packages, a dinner reservation, or a local recommendation? Jasmine is always at the front desk ready to help with a smile.",
      name: "Jasmine Patel",
      designation: "Concierge",
      src: "https://images.unsplash.com/photo-1484863137850-59afcfe05386?q=80&w=3271&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Your safety is Troy's top priority. He's here day and night, making sure the building stays secure and that you feel safe every step of the way.",
      name: "Troy Bennett",
      designation: "Security Lead",
      src: "https://images.unsplash.com/photo-1731496658386-f743fbb3cf95?q=80&w=2730&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Elena brings the community to life with resident events, fitness classes, and pop-ups. Keep an eye on the calendar—there's always something to look forward to!",
      name: "Elena Ross",
      designation: "Events Coordinator",
      src: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
} 