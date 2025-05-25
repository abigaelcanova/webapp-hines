"use client"

import { useState } from "react"

interface CarouselSlide {
  id: number
  image: string
  title: string
  subtitle: string
  logo?: string
}

interface ModernCarouselProps {
  slides: CarouselSlide[]
  className?: string
}

export function ModernCarousel({ slides, className = "" }: ModernCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  return (
    <div className={`relative w-full h-full rounded-xl overflow-hidden ${className}`}>
      {/* Slide Image */}
      <img
        src={slides[currentSlide].image}
        alt={slides[currentSlide].title || 'Carousel image'}
        className="w-full h-full object-cover"
      />
      {/* Gradient and Text */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 via-black/10 to-transparent">
        <h3 className="text-xl font-semibold text-white mb-1">{slides[currentSlide].title}</h3>
        <p className="text-white/90 text-sm leading-relaxed">{slides[currentSlide].subtitle}</p>
      </div>
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center"
        aria-label="Previous slide"
        type="button"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
      </button>
      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-9 h-9 flex items-center justify-center"
        aria-label="Next slide"
        type="button"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${idx === currentSlide ? 'bg-white' : 'bg-white/40'}`}
            aria-label={`Go to slide ${idx + 1}`}
            type="button"
          />
        ))}
      </div>
    </div>
  )
}
