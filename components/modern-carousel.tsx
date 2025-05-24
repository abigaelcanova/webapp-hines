"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CarouselSlide {
  id: number
  image: string
  title: string
  subtitle: string
  logo?: string
}

interface ModernCarouselProps {
  slides: CarouselSlide[]
  autoRotateInterval?: number
  className?: string
}

export function ModernCarousel({ slides, autoRotateInterval = 5000, className = "" }: ModernCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-rotation effect
  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [slides.length, autoRotateInterval, isHovered])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div
      className={`relative w-full h-80 rounded-xl overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0.3, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.7, scale: 0.98 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${slides[currentSlide].image})`,
            }}
          >
            {/* Gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-2xl font-semibold mb-1"
              >
                {slides[currentSlide].title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-white/90 text-sm leading-relaxed"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Media Player Style Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-sm rounded-full px-6 py-3">
        {/* Play/Pause Button */}
        <button
          onClick={() => setIsHovered(!isHovered)}
          className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200"
        >
          {isHovered ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          )}
        </button>

        {/* Progress Bar with Indicators */}
        <div className="flex items-center gap-1">
          {slides.map((_, index) => (
            <div key={index} className="relative">
              {index === currentSlide ? (
                // Active slide - progress bar
                <div className="w-12 h-1 bg-white/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: isHovered ? "0%" : "100%" }}
                    transition={{
                      duration: isHovered ? 0 : autoRotateInterval / 1000,
                      ease: "linear",
                    }}
                  />
                </div>
              ) : (
                // Inactive slides - dots
                <button
                  onClick={() => goToSlide(index)}
                  className="w-2 h-2 bg-white/40 hover:bg-white/60 rounded-full transition-all duration-200"
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-2">
          <button
            onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => goToSlide((currentSlide + 1) % slides.length)}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
