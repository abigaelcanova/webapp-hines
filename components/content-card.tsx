import React from 'react'
import { Badge } from '@/components/ui/badge'

interface ContentCardProps {
  image: string
  imageAlt: string
  category: string
  categoryColor?: string
  timestamp: string
  headline: string
  description: string
  className?: string
}

export function ContentCard({
  image,
  imageAlt,
  category,
  categoryColor = 'bg-blue-100 text-blue-700',
  timestamp,
  headline,
  description,
  className = ''
}: ContentCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 overflow-hidden h-36 ${className}`}>
      {/* Mobile: Vertical Stack */}
      <div className="sm:hidden">
        <div className="aspect-square relative">
          <img 
            src={image} 
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge className={`${categoryColor} text-xs px-2 py-1`}>
              {category}
            </Badge>
            <span className="text-xs text-gray-500">{timestamp}</span>
          </div>
          <h3 className="font-semibold text-sm mb-1 line-clamp-2">{headline}</h3>
          <p className="text-xs text-gray-600 line-clamp-4">{description}</p>
        </div>
      </div>

      {/* Desktop: Horizontal Layout */}
      <div className="hidden sm:flex h-full">
        {/* Image - Fixed width, full height */}
        <div className="w-36 h-full flex-shrink-0">
          <img 
            src={image} 
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content - Flex to fill remaining space */}
        <div className="flex-1 p-4 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <Badge className={`${categoryColor} text-xs px-2 py-1`}>
              {category}
            </Badge>
            <span className="text-xs text-gray-500">{timestamp}</span>
          </div>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{headline}</h3>
          <p className="text-xs text-gray-600 line-clamp-4">{description}</p>
        </div>
      </div>
    </div>
  )
} 