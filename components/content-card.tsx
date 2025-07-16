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
    <div className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 overflow-hidden ${className}`}>
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
          <h3 className="font-semibold text-sm mb-1">{headline}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Desktop: Horizontal Layout */}
      <div className="hidden sm:flex items-start p-4 gap-4">
        <div className="flex-shrink-0">
          <img 
            src={image} 
            alt={imageAlt}
            className="w-[120px] h-[120px] object-cover rounded-lg"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <Badge className={`${categoryColor} text-xs px-2 py-1`}>
              {category}
            </Badge>
            <span className="text-xs text-gray-500">{timestamp}</span>
          </div>
          <h3 className="font-semibold text-sm mb-1 leading-tight">{headline}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
} 